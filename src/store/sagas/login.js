import { call, put } from 'redux-saga/effects';
import {
  SERVER_FLUIG,
  COMPANY_FLUIG,
  USER_FLUIG,
  PASS_FLUIG,
  DATASET_FLUIG,
} from 'react-native-dotenv';
import xml2js from 'react-native-xml2js';
import { Creators as LoginActions } from './../ducks/login';
import { Creators as AsyncStorageActions } from './../ducks/asyncStorage';
import { navigate } from '../../services/navigation';

function formatXml(data, typeUser) {
  const parser = new xml2js.Parser({ ignoreAttrs: true });
  let obj = {};

  // eslint-disable-next-line handle-callback-err
  parser.parseString(data, (err, result) => {
    const dataXml =
      typeUser === 'employee'
        ? result['soap:Envelope']['soap:Body'][0][
            'ns1:getSimpleColleagueResponse'
          ][0].result[0]
        : result['soap:Envelope']['soap:Body'][0]['ns1:getDatasetResponse'][0]
            .dataset[0];

    if (typeUser === 'customer') {
      dataXml.columns.forEach((e, i) => {
        obj[e] = dataXml.values[0].value[i];
      });
    } else {
      obj = dataXml;
    }
  });

  return obj;
}

export function* Login({ payload }) {
  try {
    const xmls = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.dataservice.ecm.technology.totvs.com/">
      <soapenv:Header/>
        <soapenv:Body>
          <ws:getDataset>
            <companyId>${COMPANY_FLUIG}</companyId>
            <username>${USER_FLUIG}</username>
            <password>${PASS_FLUIG}</password>
            <name>${DATASET_FLUIG}</name>
            <fields>
            </fields>
            <constraints>
              <item>
                <contraintType>1</contraintType>
                <fieldName>eitherEmailOrCpf</fieldName>
                <finalValue>${payload.eitherEmailOrCpf}</finalValue>
                <initialValue>${payload.eitherEmailOrCpf}</initialValue>
              </item>
              <item>
                <contraintType>1</contraintType>
                <fieldName>password</fieldName>
                <finalValue>${payload.password}</finalValue>
                <initialValue>${payload.password}</initialValue>
              </item>
            </constraints>
            <order>
            </order>
        </ws:getDataset>
      </soapenv:Body>
    </soapenv:Envelope>`;

    const headers = { headers: { 'Content-Type': 'text/xml' } };

    let data = yield fetch(`${SERVER_FLUIG}/webdesk/ECMDatasetService`, {
      method: 'POST',
      headers,
      body: xmls,
    }).then(response => response.text());

    data = yield call(formatXml, data);

    // console.log('teste: data');
    // console.log(data);
    // console.log('data.values');
    // console.log(data.values);

    if (data.columns.includes('ok')) {
      console.log('RETORNO DADOS USER');
      console.log(data);
      if (data.values[0].value[0] && data.values[0].value[0] !== 'false') {
        yield put(
          AsyncStorageActions.setDataStorage(
            data.values[0].value[1],
            data.values[0].value[2],
            data.values[0].value[3],
            data.values[0].value[4],
            data.values[0].value[5],
            data.values[0].value[6],
          ),
        );

        yield put(LoginActions.loginSuccess());
        yield call(navigate, 'Home');
      } else {
        yield put(LoginActions.loginFailure('Usuário ou senha inválidos'));
      }
    } else {
      yield put(
        LoginActions.loginFailure(
          'Houve um erro ao carregar os dados. Por favor entre em contato com sac@homedoctor.com.br',
        ),
      );
    }
  } catch (err) {
    yield put(
      LoginActions.loginFailure(
        'Houve um erro ao carregar os dados. Por favor entre em contato com sac@homedoctor.com.br',
      ),
    );
  }
}
