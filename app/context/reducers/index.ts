import login from './loginReducer';
import profile from './profileReducer';
import picture from './pictureReducer';
import chat from './chatReducer';
import member from './memberReducer';
import activeTab from './activeTabReducer';
import drawerStatus from './userDrawerReducer';

const reducer = {
  login,
  profile,
  picture,
  chat,
  member,
  activeTab,
  drawerStatus,
};
export default reducer;
