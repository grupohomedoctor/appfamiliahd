import { call, put } from 'redux-saga/effects';
import {
  SERVER_FLUIG,
  COMPANY_FLUIG,
  USER_FLUIG,
  PASS_FLUIG,
  DATASET_REGISTER_USER,
} from 'react-native-dotenv';
import xml2js from 'react-native-xml2js';
import { Creators as RegisterUser } from '../ducks/forgot';

function formatXml(data) {
  const parser = new xml2js.Parser({ ignoreAttrs: true });
  let obj = {};

  // eslint-disable-next-line handle-callback-err
  parser.parseString(data, (err, result) => {
    const dataXml =
      result['soap:Envelope']['soap:Body'][0]['ns1:getDatasetResponse'][0]
        .dataset[0];

    dataXml.columns.forEach((e, i) => {
      obj[e] = dataXml.values[0].value[i];
    });
  });

  return obj;
}

export function* forgot({ payload: { cpf } }) {
  try {
    const xmls = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.dataservice.ecm.technology.totvs.com/">
    <soapenv:Header/>
      <soapenv:Body>
        <ws:getDataset>
          <companyId>${COMPANY_FLUIG}</companyId>
          <username>${USER_FLUIG}</username>
          <password>${PASS_FLUIG}</password>
          <name>${DATASET_REGISTER_USER}</name>
          <fields>
          </fields>
          <constraints>
            <item>
              <contraintType>0</contraintType>
              <fieldName>usuarioCPF</fieldName>
              <finalValue>${cpf}</finalValue>
              <initialValue>${cpf}</initialValue>
            </item>
            <item>
              <contraintType>0</contraintType>
              <fieldName>operacao</fieldName>
              <finalValue>2</finalValue>
              <initialValue>2</initialValue>
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
      ...headers,
      body: xmls,
    }).then(response => response.text());

    yield call(formatXml, data);

    yield put(RegisterUser.forgotSuccess());
  } catch (error) {
    yield put(RegisterUser.forgotFailure('Erro ao buscar usuário'));
  }
}
