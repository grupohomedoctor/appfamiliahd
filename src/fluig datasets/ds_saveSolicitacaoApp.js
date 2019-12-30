function createDataset(fields, constraints, sortFields) {
  var dataset = DatasetBuilder.newDataset();
  dataset.addColumn('ok');
  var ok = false;

  var IDAdmission = '';
  var Base = '';
  var IDException = '';
  var IDSubject = '';
  var Description = '';
  var RequesterName = '';
  var imageBase64 = '';
  var imagem = '';

  if (constraints != null) {
    for (var i = 0; i < constraints.length; i++) {
      if (constraints[i].fieldName == 'IDAdmission') {
        IDAdmission = constraints[i].initialValue;
      }
      if (constraints[i].fieldName == 'Base') {
        Base = constraints[i].initialValue;
      }
      if (constraints[i].fieldName == 'IDException') {
        IDException = constraints[i].initialValue;
      }
      if (constraints[i].fieldName == 'IDSubject') {
        IDSubject = constraints[i].initialValue;
      }
      if (constraints[i].fieldName == 'Description') {
        Description = constraints[i].initialValue;
      }
      if (constraints[i].fieldName == 'RequesterName') {
        RequesterName = constraints[i].initialValue;
      }
      if (constraints[i].fieldName == 'imageBase64') {
        imageBase64 = constraints[i].initialValue;
        imagem = ', Hd_imagem';
        imageBase64 = ', ' + "'" + imageBase64 + "'";
      }
    }
  }

  var query =
    'INSERT INTO TD_HD_CAPEXCEPTION(Base, IDAdmission, IDException, IDSubject, CreationDate, Description, Name' +
    imagem +
    ') VALUES(' +
    "'" +
    Base +
    "', " +
    "'" +
    IDAdmission +
    "', " +
    "'" +
    IDException +
    "', " +
    "'" +
    IDSubject +
    "', GETDATE(), " +
    "'" +
    Description +
    "', " +
    "'" +
    RequesterName +
    "'" +
    imageBase64 +
    ')';

  var c1 = DatasetFactory.createConstraint(
    'query',
    query,
    query,
    ConstraintType.MUST,
  );

  var dsQuery = DatasetFactory.getDataset('ds_queries', null, [c1], null);

  log.info('Andre 14/11');
  log.info(dsQuery);

  if (dsQuery) {
    ok = true;
  }

  dataset.addRow(new Array(ok));

  return dataset;
}
