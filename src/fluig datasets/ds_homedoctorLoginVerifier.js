/* eslint-disable */
function createDataset(fields, constraints, sortFields) {
  //You know what it DO
  var dataset = DatasetBuilder.newDataset();
  dataset.addColumn("ok");
  dataset.addColumn("name");
  dataset.addColumn("IDAdmission");
  dataset.addColumn("patientsAddress");

  var ok = false;
  var name = '';
  var password = '';
  var IDAdmission = '';
  var patientsAddress = '';
  var eitherEmailOrCpf = '';

  for (var i = 0; i < constraints.length; i++) {
      if (constraints[i].fieldName == "eitherEmailOrCpf") {
        eitherEmailOrCpf = constraints[i].initialValue;
      }
      if (constraints[i].fieldName == "password") {
          password = constraints[i].initialValue;
      }
  }

  var patientsPaiXFilhoDataset = DatasetFactory.getDataset("ds_homedoctorGetPaiXFilho", ['cpf', 'name', 'email', 'password', 'IDAdmission', 'patientsAddress'], null, null);

  for (var i = 0; i < patientsPaiXFilhoDataset.rowsCount; i++) {
      var rowCpf = patientsPaiXFilhoDataset.getValue(i, "cpf");
      rowCpf = rowCpf.replace('.','');
      rowCpf = rowCpf.replace('-', '');
      var rowName = patientsPaiXFilhoDataset.getValue(i, "name");
      var rowEmail = patientsPaiXFilhoDataset.getValue(i, "email");
      var rowPassword = patientsPaiXFilhoDataset.getValue(i, "password");
      var rowIDAdmission = patientsPaiXFilhoDataset.getValue(i, "IDAdmission");
      var rowPatientsAddress = patientsPaiXFilhoDataset.getValue(i, "patientsAddress");

      if (rowCpf == eitherEmailOrCpf || rowEmail == eitherEmailOrCpf) {
        if (rowPassword == password) {
          ok = true;
          name = rowName;
          IDAdmission = rowIDAdmission;
          patientsAddress = rowPatientsAddress;
        }
      }
  }

  dataset.addRow(new Array(
      ok,
      name,
      IDAdmission,
      patientsAddress
  ));

  return dataset;
}