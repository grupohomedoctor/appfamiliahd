import oauthSignature from 'oauth-signature';
import { SERVER_FLUIG } from 'react-native-dotenv';

function generateNonce() {
  let text = '';
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 11; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

export default function auth(
  endpoint,
  customerKey,
  customerSecretKey,
  token,
  tokenSecret,
  type,
) {
  const dataAuth = {
    requestResponse: null,
    parameters: {
      oauth_consumer_key: customerKey, // your consumer_key
      oauth_token: token, // your token
      oauth_signature_method: 'HMAC-SHA1',
      oauth_timestamp: '',
      oauth_nonce: '',
      oauth_version: '1.0',
    },
    consumerSecret: customerSecretKey, // your consumer_secret
    tokenSecret, // your token_secret
  };

  const requestParams = { ...dataAuth.parameters };
  requestParams.oauth_nonce = generateNonce(); // unique identifier
  requestParams.oauth_timestamp = new Date()
    .getTime()
    .toString()
    .slice(0, 10); // we need just the first 10 digits from current time

  const encodedSignature = oauthSignature.generate(
    type,
    `${SERVER_FLUIG}/${endpoint}`,
    requestParams,
    dataAuth.consumerSecret,
    dataAuth.tokenSecret,
  );

  const authorizationHeader = `OAuth oauth_consumer_key="${
    requestParams.oauth_consumer_key
  }",oauth_token="${requestParams.oauth_token}",oauth_signature_method="${
    requestParams.oauth_signature_method
  }",oauth_timestamp="${requestParams.oauth_timestamp}",oauth_nonce="${
    requestParams.oauth_nonce
  }",oauth_version="${
    requestParams.oauth_version
  }",oauth_signature="${encodedSignature}"`;
  const headers = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: authorizationHeader,
    },
  };

  return headers;
}
