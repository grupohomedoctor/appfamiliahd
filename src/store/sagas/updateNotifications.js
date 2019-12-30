import { call, put } from 'redux-saga/effects';
import {
  SERVER_FLUIG,
  COMPANY_FLUIG,
  USER_FLUIG,
  PASS_FLUIG,
  DATASET_UPDATE,
} from 'react-native-dotenv';
import xml2js from 'react-native-xml2js';
import { Creators as updateNotifications } from '../ducks/updateNotifications';

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

export function* updateNotificationsDataset({ payload }) {
  try {
    const xmls = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.dataservice.ecm.technology.totvs.com/">
    <soapenv:Header/>
      <soapenv:Body>
        <ws:getDataset>
          <companyId>${COMPANY_FLUIG}</companyId>
          <username>${USER_FLUIG}</username>
          <password>${PASS_FLUIG}</password>
          <name>${DATASET_UPDATE}</name>
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
      if (data) {
        console.log(data);
      } else {
        yield put(updateNotifications.updateFailure());
      }
    } else {
      yield put(updateNotifications.updateFailure());
    }
  } catch (error) {
    yield put(updateNotifications.updateFailure());
  }
}
