import { combineReducers } from 'redux';

import login from './login';
import dbConnection from './dbConnection';
import home from './homePostResult';
import asyncStorage from './asyncStorage';
import getOpenSolicitations from './getOpenSolicitations';
import getNotifications from './getNotifications';
import updateNotifications from './updateNotifications';
import registerUser from './registerUser';
import forgot from './forgot';

export default combineReducers({
  home,
  login,
  dbConnection,
  asyncStorage,
  getOpenSolicitations,
  getNotifications,
  updateNotifications,
  registerUser,
  forgot,
});
