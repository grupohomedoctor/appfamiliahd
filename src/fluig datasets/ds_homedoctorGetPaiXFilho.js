/* eslint-disable */
// Este dataset filtra (ds_serviços) e retorna os serviços disponíveis
function createDataset(fields, constraints, sortFields) {
    //Cria as colunas
    var dataset = DatasetBuilder.newDataset();
    dataset.addColumn("documentId");
    dataset.addColumn("cpf");
    dataset.addColumn("name");
    dataset.addColumn("email");
    dataset.addColumn("password");
    dataset.addColumn("IDAdmission");
    dataset.addColumn("patientsAddress");

    //Cria a constraint para buscar os registros do formulário ativos
    var constraints = new Array();
    constraints.push(DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST));

    // Aqui eu efetuo a busca dos registros do form ativos
    var datasetPrincipal = DatasetFactory.getDataset("ds_RegistroPacientes_HD", null, constraints, null);

    // Roda todos os retornos, no caso, todos os registros ativos
    for (var i = 0; i < datasetPrincipal.rowsCount; i++) {
        var documentId      = datasetPrincipal.getValue(i, "metadata#id");
        var documentVersion = datasetPrincipal.getValue(i, "metadata#version");

        //Cria as constraints para buscar os campos filhos, passando o tablename, número da formulário e versão
        var constraintsFilhos = new Array();
        constraintsFilhos.push(DatasetFactory.createConstraint("tablename", "tb_usuarios" ,"tb_usuarios", ConstraintType.MUST));
        constraintsFilhos.push(DatasetFactory.createConstraint("metadata#id", documentId, documentId, ConstraintType.MUST));
        constraintsFilhos.push(DatasetFactory.createConstraint("metadata#version", documentVersion, documentVersion, ConstraintType.MUST));

        //Busca o dataset
        // Aqui eu efetuo a busca nos registros ativos pegando a pai x filho (especificado na constraint tablename)
        var datasetFilhos = DatasetFactory.getDataset("ds_RegistroPacientes_HD", null, constraintsFilhos, null);

        // Pra cada registro eu pego seu docId
        for (var j = 0; j < datasetFilhos.rowsCount; j++) {
            //Adiciona os valores nas colunas respectivamente.
            dataset.addRow(new Array(
                  documentId,
                  datasetFilhos.getValue(j, "usuarioCPF"),
                  datasetFilhos.getValue(j, "usuarioNome"),
                  datasetFilhos.getValue(j, "usuarioEmail"),
                  datasetFilhos.getValue(j, "usuarioSenha"),
                  datasetPrincipal.getValue(i, "IDAdmission"),
                  'CEP: ' + datasetPrincipal.getValue(i, "pacienteCEP") + ', Rua: ' + datasetPrincipal.getValue(i, "pacienteLogradouro") + ', Número: ' + datasetPrincipal.getValue(i, "pacienteNumero")
                ));
        }
    }

    return dataset;
}