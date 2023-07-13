import { SVG } from '#assets/svg';
import { useAppDispatch, useAppSelector } from '#hooks';
import { userSlice } from '#redux/slices';
import { apiInstance } from '#services/api';

import styles from './ChatMenu.module.scss';

export const ChatMenu: React.ComponentType = () => {
  const { chat } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  const handleRenameUser = () => {
    if (chat) {
      const alias = prompt("Enter the user's alias. To remove an alias, leave the line empty.");

      if (alias !== null) {
        apiInstance.firebase.setUserAlias(chat.chatUid, alias);
        dispatch(userSlice.actions.getInterlocutor(chat.interlocutorInfo));
      }
    }
  };

  const handleClearHistory = () => {
    if (chat) {
      apiInstance.firebase.clearChatHistory(chat.chatUid);
    }
  };

  return (
    <div className={styles.container}>
      <SVG.Options />
      <div className={styles.menu}>
        <button onClick={handleRenameUser}>Rename</button>
        <button onClick={handleClearHistory}>Clear history</button>
      </div>
    </div>
  );
};
