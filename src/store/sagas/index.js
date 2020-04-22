import { all, takeLatest, takeEvery } from 'redux-saga/effects';

import { Types as loginTypes } from '../ducks/login';
import { Types as dbConnectionTypes } from '../ducks/dbConnection';
import { Types as getNotificationTypes } from '../ducks/getNotifications';
import { Types as updateNotificationTypes } from '../ducks/updateNotifications';
import { Types as getOpenSolicitationsTypes } from '../ducks/getOpenSolicitations';
import { Types as RegisterUserTypes } from '../ducks/registerUser';
import { Types as ForgotTypes } from '../ducks/forgot';
import { Types as VersionTypes } from '../ducks/getVersion';

import { Login } from './login';
import { Post } from './dbConnection';
import { getNotificationsDataset } from './getNotifications';
import { updateNotificationsDataset } from './updateNotifications';
import { getOpenSolicitationsDataset } from './getOpenSolicitations';
import { registerUser } from './registerUser';
import { forgot } from './forgot';
import { getVersionDataset } from './getVersion';

export default function* rootSaga() {
  return yield all([
    takeLatest(loginTypes.LOGIN_REQUEST, Login),
    takeEvery(dbConnectionTypes.REQUEST_DB, Post),
    takeEvery(
      getNotificationTypes.REQUEST_GETNOTIFICATIONS,
      getNotificationsDataset,
    ),
    takeEvery(VersionTypes.REQUEST_GETVERSION, getVersionDataset),
    takeEvery(
      updateNotificationTypes.UPDATE_REQUEST,
      updateNotificationsDataset,
    ),
    takeEvery(
      getOpenSolicitationsTypes.REQUEST_GETOPENSOLICITATIONS,
      getOpenSolicitationsDataset,
    ),
    takeEvery(RegisterUserTypes.REGISTER_USER_REQUEST, registerUser),
    takeEvery(ForgotTypes.FORGOT_REQUEST, forgot),
  ]);
}
