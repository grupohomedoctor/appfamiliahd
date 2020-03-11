import React, { useState } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import styles from './styles';
import SolicitationHeader from '../../components/SolicitationHeader';
import InputWithLabel from './../../components/InputWithLabel';
import GradientButton from '../../components/GradientButton';
import SolicitationPickerWithLabel from './../../components/SolicitationPickerWithLabel';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as dbConnectionActions } from '../../store/ducks/dbConnection';

const ElectiveRemoval = props => {
  const [requesterTitle, setRequesterTitle] = useState('');
  const [equipment, setEquipment] = useState('');
  const [defect, setDefect] = useState('');

  const dispatch = useDispatch();
  const loading = useSelector(state => state.dbConnection.loading);
  const userName = useSelector(state => state.asyncStorage.userName);
  const IDAdmission = useSelector(state => state.asyncStorage.IDAdmission);
  const patientsAddress = useSelector(
    state => state.asyncStorage.patientsAddress,
  );
  const Base = useSelector(state => state.asyncStorage.Base);

  const submitHandle = () => {
    const fields = [requesterTitle, equipment, defect];
    const description = `Nome do solicitante: ${userName} &lt;br&gt; Cargo/Parentesco do Solicitante: ${requesterTitle} &lt;br&gt; ID do Paciente: ${IDAdmission} &lt;br&gt; Endereço do paciente: ${patientsAddress} &lt;br&gt; Tipo de solicitação: Troca ou manutenção de equipamentos &lt;br&gt; Motivo da Remoção: ${equipment} &lt;br&gt; Defeito: ${defect} &lt;br&gt;`;
    if (fields.includes('') || fields.includes(undefined)) {
      Alert.alert(
        'Faltam alguns dados!',
        'Por favor preencha todos os campos',
        [{ text: 'Ok', style: 'destructive', onPress: null }],
      );
    } else {
      dispatch(
        dbConnectionActions.Post(
          IDAdmission,
          Base,
          // 'SP',
          402,
          description,
          userName,
          null,
        ),
      );
    }
  };

  return (
    <>
      <SolicitationHeader
        pathToGoBackTo="Home"
        headerTitle="Troca ou manutenção de equipamentos"
      />

      <ScrollView fillViewport="true" style={styles.form}>
        <View style={styles.scrollChildren} layout_height="wrap_content">
          <InputWithLabel
            inputTitle={'Cargo/Parentesco do Solicitante'}
            placeholder={'Cargo/Parentesco...'}
            value={requesterTitle}
            onChangeText={title => setRequesterTitle(title)}
          />

          <SolicitationPickerWithLabel
            placeholder={'Motivo...'}
            inputTitle={'Nome do equipamento'}
            items={[
              { label: 'Base Aquecida', value: 'Base Aquecida' },
              {
                label: 'Cabo Extensor de Oxímetro',
                value: 'Cabo Extensor de Oxímetro',
              },
              { label: 'Cadeira Higiênica', value: 'Cadeira Higiênica' },
              { label: 'Colchão Hospitalar', value: 'Colchão Hospitalar' },
              {
                label: 'Cough Assist/Indutor de Tosse',
                value: 'Cough Assist/Indutor de Tosse',
              },
              { label: 'Inalador', value: 'Inalador' },
              { label: 'No Break', value: 'No Break' },
              { label: 'Bomba Infusora', value: 'Bomba Infusora' },
              { label: 'Cadeira de Rodas', value: 'Cadeira de Rodas' },
              { label: 'Cama Hospitalar', value: 'Cama Hospitalar' },
              {
                label: 'Concentrador de Oxigênio',
                value: 'Concentrador de Oxigênio',
              },
              { label: 'Fluxômetro', value: 'Fluxômetro' },
              { label: 'Monitor de Glicemia', value: 'Monitor de Glicemia' },
              { label: 'Oxímetro', value: 'Oxímetro' },
            ]}
            value={equipment}
            onSelectedChange={selectedEquipment =>
              setEquipment(selectedEquipment)
            }
          />

          <InputWithLabel
            inputTitle={'Defeito'}
            placeholder={'Defeito...'}
            valor={defect}
            onChangeText={writtenDefect => setDefect(writtenDefect)}
          />

          <View style={styles.buttonContainer}>
            <GradientButton
              buttonTitle="SOLICITAR"
              buttonWidth={330}
              onPress={submitHandle}
              loading={loading}
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default ElectiveRemoval;
