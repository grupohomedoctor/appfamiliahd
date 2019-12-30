import { call } from 'redux-saga/effects';
import {
  POST_OAUTH_CUSTOMER_KEY,
  POST_OAUTH_CUSTOMER_SECRET_KEY,
  POST_OAUTH_TOKEN,
  POST_OAUTH_TOKEN_SECRET,
  GET_OAUTH_CUSTOMER_KEY,
  GET_OAUTH_CUSTOMER_SECRET_KEY,
  GET_OAUTH_TOKEN,
  GET_OAUTH_TOKEN_SECRET,
  ID_FOLDER,
} from 'react-native-dotenv';

import { apiFluig } from '../../services/apis';
import auth from '../../services/Oauth';

export function* uploadFiles(files) {
  try {
    const headers = yield call(
      auth,
      'ecm/upload',
      POST_OAUTH_CUSTOMER_KEY,
      POST_OAUTH_CUSTOMER_SECRET_KEY,
      POST_OAUTH_TOKEN,
      POST_OAUTH_TOKEN_SECRET,
      'POST',
    );

    const { data } = yield call(apiFluig.post, 'ecm/upload', files, headers);

    return data.files[0];
  } catch (err) {
    return false;
  }
}

export function* saveFiles(files) {
  try {
    const headers = yield call(
      auth,
      'api/public/ecm/document/createDocument',
      POST_OAUTH_CUSTOMER_KEY,
      POST_OAUTH_CUSTOMER_SECRET_KEY,
      POST_OAUTH_TOKEN,
      POST_OAUTH_TOKEN_SECRET,
      'POST',
    );

    const documentPack = {
      description: files.name,
      parentId: ID_FOLDER,
      attachments: [
        {
          fileName: files.name,
        },
      ],
    };

    const {
      data: {
        content: { id },
      },
    } = yield call(
      apiFluig.post,
      'api/public/ecm/document/createDocument',
      JSON.stringify(documentPack),
      headers,
    );
    return id;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export function* getDownloadUrl(id) {
  try {
    const headers = yield call(
      auth,
      `api/public/2.0/documents/getDownloadURL/${id}`,
      GET_OAUTH_CUSTOMER_KEY,
      GET_OAUTH_CUSTOMER_SECRET_KEY,
      GET_OAUTH_TOKEN,
      GET_OAUTH_TOKEN_SECRET,
      'GET',
    );

    const {
      data: { content },
    } = yield call(
      apiFluig.get,
      `api/public/2.0/documents/getDownloadURL/${id}`,
      headers,
    );

    return content;
  } catch (err) {
    return false;
  }
}
