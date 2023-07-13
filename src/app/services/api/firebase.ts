import { initializeApp } from 'firebase/app';
import {
  AuthError,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { child, get, getDatabase, push, ref as dbRef, serverTimestamp, set, update } from 'firebase/database';
import {
  collection,
  doc,
  DocumentReference,
  getDocs,
  getFirestore,
  Query,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { deleteObject, getDownloadURL, getStorage, listAll, ref as stRef, uploadBytes } from 'firebase/storage';
import { v4 as uuid } from 'uuid';

import { firebaseConfig } from '#constants/firebase';
import { IMessage, IUser, IUserChat, IUserInfo } from '#models';
import { Nullable } from '#types/nullable';
import { parseFirebaseError } from '#utils/parseFirebaseError';

import {
  FirebasePaths,
  IFirebaseAuthResponse,
  IFirebaseGetUserChatResponse,
  IFirebaseLoginData,
  IFirebaseRegisterData,
  IFirebaseSearchResponse,
} from './types';

// intentionally
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const storage = getStorage();
const firestore = getFirestore();
const database = getDatabase();

const getCurrentUser = () => auth.currentUser?.uid;

const registerUser = async ({ avatar, email, nickname, password }: IFirebaseRegisterData) => {
  const registerUserResponse: IFirebaseAuthResponse = {
    user: null,
    error: null,
  };
  let photoURL = '';

  try {
    registerUserResponse.user = (await createUserWithEmailAndPassword(auth, email, password)).user;
  } catch (error) {
    registerUserResponse.error = parseFirebaseError((error as AuthError).code);
  }

  if (!registerUserResponse.error && registerUserResponse.user) {
    const storageRef = stRef(storage, `${FirebasePaths.Avatars}/${email}`);
    if (avatar) {
      await uploadBytes(storageRef, avatar);
      photoURL = await getDownloadURL(storageRef);
      await updateProfile(registerUserResponse.user, {
        displayName: nickname,
        photoURL,
      });
    } else {
      await updateProfile(registerUserResponse.user, {
        displayName: nickname,
      });
    }

    await setDoc<IUser, IUser>(
      doc(firestore, FirebasePaths.Users, registerUserResponse.user.uid) as DocumentReference<IUser, IUser>,
      {
        uid: registerUserResponse.user.uid,
        nickname,
        email,
        avatarUrl: photoURL,
      },
    );
  }

  return registerUserResponse;
};

const loginUser = async ({ email, password }: IFirebaseLoginData) => {
  const loginUserResponse: IFirebaseAuthResponse = {
    user: null,
    error: null,
  };

  try {
    loginUserResponse.user = (await signInWithEmailAndPassword(auth, email, password)).user;
  } catch (error) {
    loginUserResponse.error = parseFirebaseError((error as AuthError).code);
  }

  return loginUserResponse;
};

const searchUser = async (nickname: string) => {
  const searchUserResponse: IFirebaseSearchResponse = {
    users: [],
    error: null,
  };

  const searchedUsers: IUser[] = [];

  const q = query<IUser, IUser>(
    collection(firestore, FirebasePaths.Users) as Query<IUser, IUser>,
    where('nickname', '>=', nickname),
    where('nickname', '<', `${nickname}\uf8ff`),
  );

  try {
    const querySnapshot = await getDocs<IUser, IUser>(q);
    querySnapshot.forEach(d => {
      searchedUsers.push(d.data());
    });
  } catch {
    searchUserResponse.error = 'firestoreSearchUser';
  }
  searchUserResponse.users = searchedUsers;

  return searchUserResponse;
};

const getUserChat = async (interlocutor: IUserInfo) => {
  const getUserChatResponse: IFirebaseGetUserChatResponse = {
    chat: null,
    error: null,
  };
  const currentUserUid = getCurrentUser() ?? '';
  const chatUid =
    currentUserUid > interlocutor.uid ? currentUserUid + interlocutor.uid : interlocutor.uid + currentUserUid;

  try {
    const chat = await get(child(dbRef(database), `${FirebasePaths.Chats}/${chatUid}`));
    if (!chat.exists() && auth.currentUser) {
      await set(dbRef(database, `${FirebasePaths.Chats}/${chatUid}`), {
        createdAt: serverTimestamp(),
      });
      await set(dbRef(database, `${FirebasePaths.UserChats}/${currentUserUid}/${chatUid}`), {
        interlocutorInfo: {
          avatarUrl: interlocutor.avatarUrl,
          nickname: interlocutor.nickname,
          uid: interlocutor.uid,
        },
        lastUpdate: serverTimestamp() as unknown,
        chatUid,
      } as IUserChat);
      await set(dbRef(database, `${FirebasePaths.UserChats}/${interlocutor.uid}/${chatUid}`), {
        interlocutorInfo: {
          avatarUrl: auth.currentUser.photoURL ?? '',
          nickname: auth.currentUser.displayName ?? '',
          uid: auth.currentUser.uid,
        },
        lastUpdate: serverTimestamp() as unknown,
        chatUid,
      } as IUserChat);
    }

    getUserChatResponse.chat = (
      await get(child(dbRef(database), `${FirebasePaths.UserChats}/${auth.currentUser?.uid}/${chatUid}`))
    ).val();
  } catch (e) {
    getUserChatResponse.error = 'firebaseGetUserChat';
  }

  return getUserChatResponse;
};

const sendMessage = async (text: string, chatUid: string, imgFile: Nullable<File>) => {
  const messagesRef = dbRef(database, `${FirebasePaths.Chats}/${chatUid}/${FirebasePaths.Messages}`);
  const newMessageRef = push(messagesRef);

  let imgUrl = '';
  const messageId = uuid();

  if (imgFile) {
    const chatImageRef = stRef(storage, `${FirebasePaths.Attachments}/${chatUid}/${messageId}`);
    await uploadBytes(chatImageRef, imgFile);
    imgUrl = await getDownloadURL(chatImageRef);
  }

  set(newMessageRef, {
    text,
    senderId: getCurrentUser(),
    id: messageId,
    createdAt: serverTimestamp() as unknown,
    imgUrl,
  } as IMessage);

  const userChat: IUserChat = (
    await get(child(dbRef(database), `${FirebasePaths.UserChats}/${getCurrentUser()}/${chatUid}`))
  ).val();

  await update(dbRef(database, `${FirebasePaths.UserChats}/${getCurrentUser()}/${chatUid}`), {
    lastUpdate: serverTimestamp(),
    lastMessage: text || (imgUrl && '[ attachment ]'),
  });

  await update(dbRef(database, `${FirebasePaths.UserChats}/${userChat.interlocutorInfo.uid}/${chatUid}`), {
    lastUpdate: serverTimestamp(),
    lastMessage: text || (imgUrl && '[ attachment ]'),
  });
};

const clearChatHistory = async (chatUid: string) => {
  const chat = await get(child(dbRef(database), `${FirebasePaths.Chats}/${chatUid}`));

  if (chat.exists() && auth.currentUser) {
    await update(dbRef(database, `${FirebasePaths.Chats}/${chatUid}`), {
      messages: null,
    });

    const userChat: IUserChat = (
      await get(child(dbRef(database), `${FirebasePaths.UserChats}/${getCurrentUser()}/${chatUid}`))
    ).val();

    await update(dbRef(database, `${FirebasePaths.UserChats}/${getCurrentUser()}/${chatUid}`), {
      lastUpdate: '',
      lastMessage: '',
    });
    await update(dbRef(database, `${FirebasePaths.UserChats}/${userChat.interlocutorInfo.uid}/${chatUid}`), {
      lastUpdate: '',
      lastMessage: '',
    });

    const chatImagesRef = stRef(storage, `${FirebasePaths.Attachments}/${chatUid}`);
    const chatImages = await listAll(chatImagesRef);
    chatImages.items.map(image => deleteObject(image));
  }
};

const setUserAlias = async (chatUid: string, alias: string) => {
  await update(dbRef(database), {
    [`${FirebasePaths.UserChats}/${getCurrentUser()}/${chatUid}/interlocutorInfo/alias`]: alias,
  });
};

export const firebaseApi = {
  getCurrentUser,
  registerUser,
  loginUser,
  searchUser,
  getUserChat,
  sendMessage,
  clearChatHistory,
  setUserAlias,
};
