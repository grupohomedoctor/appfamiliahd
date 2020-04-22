import {call, put} from 'redux-saga/effects';
import {
  SERVER_FLUIG,
  COMPANY_FLUIG,
  USER_FLUIG,
  PASS_FLUIG,
  DATASET_VERSION,
} from 'react-native-dotenv';
import xml2js from 'react-native-xml2js';
// import { Creators as getNotifications } from '../ducks/getNotifications';
import {Creators as getVersion} from '../ducks/getVersion';
// import { Creators as getOpenSolicitations } from '../ducks/getOpenSolicitations';

function formatXml(data, typeUser) {
  const parser = new xml2js.Parser({ignoreAttrs: true});
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

export function* getVersionDataset({payload}) {
  try {
    const xmls = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.dataservice.ecm.technology.totvs.com/">
    <soapenv:Header/>
      <soapenv:Body>
        <ws:getDataset>
          <companyId>${COMPANY_FLUIG}</companyId>
          <username>${USER_FLUIG}</username>
          <password>${PASS_FLUIG}</password>
          <name>${DATASET_VERSION}</name>
          <fields>
          </fields>
          <constraints>
          </constraints>
          <order>
          </order>
      </ws:getDataset>
    </soapenv:Body>
  </soapenv:Envelope>`;

    // console.log('xmls');
    // console.log(xmls);

    const headers = {headers: {'Content-Type': 'text/xml'}};

    let data = yield call(fetch, `${SERVER_FLUIG}/webdesk/ECMDatasetService`, {
      method: 'POST',
      headers,
      body: xmls,
    });

    if (data) {
      const jsonResponse = yield data.text();
      data = yield call(formatXml, jsonResponse);

      // yield put(getOpenSolicitations.getOpenSolicitations(payload.IDAdmission));

      // console.log('data version');
      // console.log(data);
      // console.log('data.values version');
      // console.log(data.values);

      if (data) {
        // console.log('data.values version ORIGINAL');
        // console.log(data.values);
        // console.log('data.values version FORMATADA');
        // console.log(data.values[0].value[11]);
        yield put(getVersion.success(data.values[0].value[11])); // pega apenas o valor da versão
      } else {
        yield put(
          getVersion.failure(
            'Houve um erro ao gravar os dados da versão no banco do IW',
          ),
        );
        yield put(getVersion.failure());
      }
    } else {
      yield put(
        getVersion.failure(
          'Houve um erro ao verificar a versão. Por favor entre em contato com sac@homedoctor.com.br',
        ),
      );
      yield put(getVersion.failure());
    }
  } catch (error) {
    yield put(
      getVersion.failure(
        'Houve um erro ao verificar a versão. Por favor entre em contato com sac@homedoctor.com.br',
      ),
    );
    yield put(getVersion.failure());
  }
}
