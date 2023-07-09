import { initializeApp } from 'firebase/app';
import {
  AuthError,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

import { firebaseConfig } from '#constants/firebase';
import { parseFirebaseError } from '#utils/parseFirebaseError';

import { FirestoreCollections, IFirebaseAuthResponse, IFirebaseLoginData, IFirebaseRegisterData } from './types';

// intentionally
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const app = initializeApp(firebaseConfig);

const getCurrentUser = () => getAuth().currentUser?.uid;

const registerUser = async ({ avatar, email, nickname, password }: IFirebaseRegisterData) => {
  const registerUserResponse: IFirebaseAuthResponse = {
    user: null,
    error: null,
  };
  let photoURL = '';

  try {
    registerUserResponse.user = (await createUserWithEmailAndPassword(getAuth(), email, password)).user;
  } catch (error) {
    registerUserResponse.error = parseFirebaseError((error as AuthError).code);
  }

  if (!registerUserResponse.error && registerUserResponse.user) {
    const storageRef = ref(getStorage(), `avatars/${email}`);
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

    await setDoc(doc(getFirestore(), FirestoreCollections.Users, registerUserResponse.user.uid), {
      uid: registerUserResponse.user.uid,
      nickname,
      email,
      photoURL,
    });

    await setDoc(doc(getFirestore(), FirestoreCollections.UserChats, registerUserResponse.user.uid), {});
  }

  return registerUserResponse;
};

const loginUser = async ({ email, password }: IFirebaseLoginData) => {
  const loginUserResponse: IFirebaseAuthResponse = {
    user: null,
    error: null,
  };

  try {
    loginUserResponse.user = (await signInWithEmailAndPassword(getAuth(), email, password)).user;
  } catch (error) {
    loginUserResponse.error = parseFirebaseError((error as AuthError).code);
  }

  return loginUserResponse;
};

export const firebaseApi = {
  getCurrentUser,
  registerUser,
  loginUser,
};
