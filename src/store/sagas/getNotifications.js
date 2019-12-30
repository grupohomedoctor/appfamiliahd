import { call, put } from 'redux-saga/effects';
import {
  SERVER_FLUIG,
  COMPANY_FLUIG,
  USER_FLUIG,
  PASS_FLUIG,
  DATASET_GETNOTIFICATION,
} from 'react-native-dotenv';
import xml2js from 'react-native-xml2js';
import { Creators as getNotifications } from '../ducks/getNotifications';
import { Creators as getOpenSolicitations } from '../ducks/getOpenSolicitations';

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

export function* getNotificationsDataset({ payload }) {
  try {
    const xmls = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.dataservice.ecm.technology.totvs.com/">
    <soapenv:Header/>
      <soapenv:Body>
        <ws:getDataset>
          <companyId>${COMPANY_FLUIG}</companyId>
          <username>${USER_FLUIG}</username>
          <password>${PASS_FLUIG}</password>
          <name>${DATASET_GETNOTIFICATION}</name>
          <fields>
          </fields>
          <constraints>
            <item>
              <contraintType>1</contraintType>
              <fieldName>IDAdmission</fieldName>
              <finalValue>${payload.IDAdmission}</finalValue>
              <initialValue>${payload.IDAdmission}</initialValue>
            </item>
          </constraints>
          <order>
          </order>
      </ws:getDataset>
    </soapenv:Body>
  </soapenv:Envelope>`;

    const headers = { headers: { 'Content-Type': 'text/xml' } };

    let data = yield call(fetch, `${SERVER_FLUIG}/webdesk/ECMDatasetService`, {
      method: 'POST',
      headers,
      body: xmls,
    });

    if (data) {
      const jsonResponse = yield data.text();
      data = yield call(formatXml, jsonResponse);
      yield put(getOpenSolicitations.getOpenSolicitations(payload.IDAdmission));
      if (data) {
        yield put(getNotifications.success(data.values));
      } else {
        yield put(
          getNotifications.failure(
            'Houve um erro ao gravar os dados no banco do IW',
          ),
        );
        yield put(getNotifications.failure());
      }
    } else {
      yield put(
        getNotifications.failure(
          'Houve um erro ao carregar os dados. Por favor entre em contato com sac@homedoctor.com.br',
        ),
      );
      yield put(getNotifications.failure());
    }
  } catch (error) {
    yield put(
      getNotifications.failure(
        'Houve um erro ao carregar os dados. Por favor entre em contato com sac@homedoctor.com.br',
      ),
    );
    yield put(getNotifications.failure());
  }
}
