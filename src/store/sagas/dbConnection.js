import { call, put } from 'redux-saga/effects';
import {
  SERVER_FLUIG,
  COMPANY_FLUIG,
  USER_FLUIG,
  PASS_FLUIG,
  DATASET_POST,
  IDException,
} from 'react-native-dotenv';
import xml2js from 'react-native-xml2js';
import { Creators as dbConnection } from '../ducks/dbConnection';
import { Creators as homePostResult } from '../ducks/homePostResult';
import { navigate } from '../../services/navigation';
import { uploadFiles, saveFiles, getDownloadUrl } from './uploadFiles';

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

export function* Post({ payload }) {
  console.log('payload')
  console.log(payload)
  try {
    let image = '';
    if (payload.files) {
      const upload = yield call(uploadFiles, payload.files);
      console.log('upload')
      console.log(upload)
      if (!upload) {
        throw new Error('files');
      }

      const id = yield call(saveFiles, upload);

      if (!id) {
        throw new Error('files');
      }

      const url = yield call(getDownloadUrl, id);

      if (!url) {
        throw new Error('files');
      }

      image = `<item>
              <contraintType>1</contraintType>
              <fieldName>imageBase64</fieldName>
              <finalValue>${url}</finalValue>
              <initialValue>${url}</initialValue>
            </item>`;
    }

    console.log('payload.base')
    console.log(payload.base)
    console.log('payload.Base')
    console.log(payload.Base)

    let xmls = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.dataservice.ecm.technology.totvs.com/">
      <soapenv:Header/>
        <soapenv:Body>
          <ws:getDataset>
            <companyId>${COMPANY_FLUIG}</companyId>
            <username>${USER_FLUIG}</username>
            <password>${PASS_FLUIG}</password>
            <name>${DATASET_POST}</name>
            <fields>
            </fields>
            <constraints>
              <item>
              <contraintType>1</contraintType>
                <fieldName>IDAdmission</fieldName>
                <finalValue>${payload.IDAdmission}</finalValue>
                <initialValue>${payload.IDAdmission}</initialValue>
              </item>
              <item>
              <contraintType>1</contraintType>
                <fieldName>Base</fieldName>
                <finalValue>${payload.base}</finalValue>
                <initialValue>${payload.base}</initialValue>
              </item>
              <item>
              <contraintType>1</contraintType>
                <fieldName>IDException</fieldName>
                <finalValue>${IDException}</finalValue>
                <initialValue>${IDException}</initialValue>
              </item>
              <item>
              <contraintType>1</contraintType>
                <fieldName>IDSubject</fieldName>
                <finalValue>${payload.idSubject}</finalValue>
                <initialValue>${payload.idSubject}</initialValue>
              </item>
              <item>
              <contraintType>1</contraintType>
                <fieldName>Description</fieldName>
                <finalValue>${payload.description}</finalValue>
                <initialValue>${payload.description}</initialValue>
              </item>
              <item>
              <contraintType>1</contraintType>
                <fieldName>RequesterName</fieldName>
                <finalValue>${payload.requesterName}</finalValue>
                <initialValue>${payload.requesterName}</initialValue>
              </item>
              ${image}
            </constraints>
            <order>
            </order>
        </ws:getDataset>
      </soapenv:Body>
    </soapenv:Envelope>`;

    const headers = { headers: { 'Content-Type': 'text/xml' } };

    console.log('xmls')
    console.log(xmls)

    let data = yield call(fetch, `${SERVER_FLUIG}/webdesk/ECMDatasetService`, {
      method: 'POST',
      headers,
      body: xmls,
    });

    console.log('data exams')
    console.log(data)

    if (data) {
      const jsonResponse = yield data.text();
      data = yield call(formatXml, jsonResponse);
      if (data.values[0].value[0] && data.values[0].value[0] !== 'false') {
        yield put(dbConnection.postSuccess());
        yield put(homePostResult.success());
        yield call(navigate, 'Home');
      } else {
        yield put(
          dbConnection.postFailure(
            'Houve um erro ao gravar os dados no banco do IW',
          ),
        );
        yield put(homePostResult.failure());
      }
    } else {
      yield put(
        dbConnection.postFailure(
          'Houve um erro ao carregar os dados. Por favor entre em contato com sac@homedoctor.com.br',
        ),
      );
      yield put(homePostResult.failure());
    }
  } catch (error) {
    console.log('error')
    console.log(error)
    yield put(
      dbConnection.postFailure(
        'Houve um erro ao carregar os dados. Por favor entre em contato com sac@homedoctor.com.br',
      ),
    );
    yield put(homePostResult.failure());
  }
}
