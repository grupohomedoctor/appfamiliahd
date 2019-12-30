import { call, put } from 'redux-saga/effects';
import {
  SERVER_FLUIG,
  COMPANY_FLUIG,
  USER_FLUIG,
  PASS_FLUIG,
  DATASET_GET,
} from 'react-native-dotenv';
import xml2js from 'react-native-xml2js';
import { Creators as getOpenSolicitations } from '../ducks/getOpenSolicitations';

function formatXml(data) {
  const parser = new xml2js.Parser({ ignoreAttrs: true });
  const arr = [];

  parser.parseString(data, async (err, result) => {
    const dataXml =
      result['soap:Envelope']['soap:Body'][0]['ns1:getDatasetResponse'][0]
        .dataset[0];

    dataXml.values.forEach((e, i) => {
      const obj = {};
      dataXml.columns.forEach((f, j) => {
        if (f.startsWith('fotosEPlantasTableJSON')) {
          obj[f] =
            dataXml.values[i].value[j].trim() !== ''
              ? dataXml.values[i].value[j]
              : null;
        } else {
          obj[f] =
            dataXml.values[i].value[j].trim() !== ''
              ? decodeURI(dataXml.values[i].value[j]).trim()
              : null;
        }
      });

      arr.push(obj);
    });
  });

  return arr;
}

export function* getOpenSolicitationsDataset({ payload }) {
  try {
    const xmls = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.dataservice.ecm.technology.totvs.com/">
    <soapenv:Header/>
      <soapenv:Body>
        <ws:getDataset>
          <companyId>${COMPANY_FLUIG}</companyId>
          <username>${USER_FLUIG}</username>
          <password>${PASS_FLUIG}</password>
          <name>${DATASET_GET}</name>
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
        yield put(getOpenSolicitations.success(data));
      } else {
        yield put(
          getOpenSolicitations.failure(
            'Houve um erro ao gravar os dados no banco do IW',
          ),
        );
        yield put(getOpenSolicitations.failure());
      }
    } else {
      yield put(
        getOpenSolicitations.failure(
          'Houve um erro ao carregar os dados. Por favor entre em contato com sac@homedoctor.com.br',
        ),
      );
      yield put(getOpenSolicitations.failure());
    }
  } catch (error) {
    yield put(
      getOpenSolicitations.failure(
        'Houve um erro ao carregar os dados. Por favor entre em contato com sac@homedoctor.com.br',
      ),
    );
    yield put(getOpenSolicitations.failure());
  }
}
