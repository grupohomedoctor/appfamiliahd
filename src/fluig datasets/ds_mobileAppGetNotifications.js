function createDataset(fields, constraints, sortFields) {
  var IDAdmission = '';

  if (constraints != null) {
    for (var i = 0; i < constraints.length; i++) {
      if (constraints[i].fieldName == 'IDAdmission') {
        IDAdmission = constraints[i].initialValue;
      }
    }
  }

  if (IDAdmission) {
    var dataset = DatasetBuilder.newDataset();
    var dataSource = "/jdbc/IW2";
    var ic = new javax.naming.InitialContext();
    var ds = ic.lookup(dataSource);
    var created = false;
    var selectQuery = "select Base, ID, IDAdmission, Status, EventDate, MonitStaff, Description, IDException, ExceptionType, Subject, CreationDate, ElapsedTime, WriteoffDate, PersonWriteOffName, Notified from vw_HD_FL_CAPEXCEPTION where WriteoffDate IS NOT NULL and Notified IS NULL and IDAdmission = " + IDAdmission;
    try {
        var conn = ds.getConnection();
        var stmt = conn.createStatement();
        var rs = stmt.executeQuery(selectQuery);
        var columnCount = rs.getMetaData().getColumnCount();
        while (rs.next()) {
            if (!created) {
                for (var i = 1; i <= columnCount; i++) {
                    dataset.addColumn(rs.getMetaData().getColumnName(i));
                }
                created = true;
            }
            var Arr = new Array();
            for (var i = 1; i <= columnCount; i++) {
                var obj = rs.getObject(rs.getMetaData().getColumnName(i));
                if (null != obj) {
                    Arr[i - 1] = rs.getObject(rs.getMetaData().getColumnName(i)).toString();
                } else {
                    Arr[i - 1] = "null";
                }
            }
            dataset.addRow(Arr);
        }
    } catch (e) {
        log.error("Erro ao buscar as solicitações abertas para o app mobile Home Doctor, erro: " + e.message);
    } finally {
        if (rs != null) {
            rs.close();
        }
        if (stmt != null) {
            stmt.close();
        }
        if (conn != null) {
            conn.close();
        }
    }
    return dataset;
  } else {
    var dataset = DatasetBuilder.newDataset();
    dataset.addColumn('Erro');
    dataset.addRow(new Array(
      'Por favor informe um IDAdmission'
    ));
    return dataset;
  }
}