import { call, put } from 'redux-saga/effects';
import {
  SERVER_FLUIG,
  COMPANY_FLUIG,
  USER_FLUIG,
  PASS_FLUIG,
  DATASET_REGISTER_USER,
} from 'react-native-dotenv';
import xml2js from 'react-native-xml2js';
import { Creators as RegisterUser } from '../ducks/registerUser';

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

export function* registerUser({
  payload: {
    name,
    cpf,
    email,
    password,
    namePatient,
    // emailPatient,
    birthPatient,
  },
}) {
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
              <fieldName>usuarioNome</fieldName>
              <finalValue>${name}</finalValue>
              <initialValue>${name}</initialValue>
            </item>
            <item>
              <contraintType>0</contraintType>
              <fieldName>usuarioEmail</fieldName>
              <finalValue>${email}</finalValue>
              <initialValue>${email}</initialValue>
            </item>
            <item>
              <contraintType>0</contraintType>
              <fieldName>usuarioSenha</fieldName>
              <finalValue>${password}</finalValue>
              <initialValue>${password}</initialValue>
            </item>
            <item>
              <contraintType>0</contraintType>
              <fieldName>operacao</fieldName>
              <finalValue>0</finalValue>
              <initialValue>0</initialValue>
            </item>
            <item>
              <contraintType>0</contraintType>
              <fieldName>patientName</fieldName>
              <finalValue>${namePatient}</finalValue>
              <initialValue>${namePatient}</initialValue>
            </item>
            <item>
              <contraintType>0</contraintType>
              <fieldName>emailPatient</fieldName>
              <finalValue>${email}</finalValue>
              <initialValue>${email}</initialValue>
            </item>
            <item>
              <contraintType>0</contraintType>
              <fieldName>birthday</fieldName>
              <finalValue>${birthPatient}</finalValue>
              <initialValue>${birthPatient}</initialValue>
            </item>
          </constraints>
          <order>
          </order>
      </ws:getDataset>
    </soapenv:Body>
  </soapenv:Envelope>`;
    const headers = { headers: { 'Content-Type': 'text/xml' } };

    console.log(xmls);

    let data = yield fetch(`${SERVER_FLUIG}/webdesk/ECMDatasetService`, {
      method: 'POST',
      ...headers,
      body: xmls,
    }).then(response => response.text());

    console.log('cadastro user antes retorno')
    console.log(data)

    data = yield call(formatXml, data);

    console.log('cadastro user retorno');
    console.log(data);

    if (data.STATUS === 'Usuario cadastrado com sucesso') {
      yield put(RegisterUser.registerUserSuccess());
    } else {
      console.log('cadastro user else');
      console.log(data);
      let statusError = data.STATUS;
      let msgError = '';
      if ( statusError.length === 61 && statusError.indexOf('Nome do Paciente, e-mail e data de nascimento n') !== -1 ) {
        msgError = 'Nome do Paciente, e-mail e data de nascimento não encontrados';
      } else {
        msgError = statusError;
      }
      yield put(RegisterUser.registerUserFailure(msgError));
    }
  } catch (error) {
    yield put(RegisterUser.registerUserFailure('Erro ao cadastrar o usuário'));
  }
}
