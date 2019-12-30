import React, { useState } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import styles from './styles';
import SolicitationHeader from '../../components/SolicitationHeader';
import InputWithLabel from './../../components/InputWithLabel';
import GradientButton from '../../components/GradientButton';
import SolicitationPickerWithLabel from './../../components/SolicitationPickerWithLabel';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as dbConnectionActions } from '../../store/ducks/dbConnection';

const OxygenRefill = () => {
  const [requesterTitle, setRequesterTitle] = useState('');
  const [cylinderSize, setCylinderSize] = useState('');
  const [oxygenLeft, setOxygenLeft] = useState('');

  const dispatch = useDispatch();
  const loading = useSelector(state => state.dbConnection.loading);
  const userName = useSelector(state => state.asyncStorage.userName);
  const IDAdmission = useSelector(state => state.asyncStorage.IDAdmission);

  const submitHandle = () => {
    const fields = [requesterTitle, cylinderSize, oxygenLeft];
    const description = `Nome do solicitante: ${userName} &lt;br&gt; Cargo/Parentesco do Solicitante: ${requesterTitle} &lt;br&gt; ID do Paciente: ${IDAdmission} &lt;br&gt; Tipo de solicitação: Recarga de cilindros de oxigênio &lt;br&gt; Tamanho do Cilindro: ${cylinderSize} &lt;br&gt; Oxigênio restante: ${oxygenLeft}`;

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
          'SP',
          401,
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
        headerTitle="Solicitar recarga de cilindros de oxigênio"
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
            placeholder={'Tamanho do Cilindro'}
            inputTitle={'Tamanho do Cilindro'}
            items={[
              { label: '10m³', value: '10m³' },
              { label: '8m³', value: '8m³' },
              { label: '7m³', value: '7m³' },
              { label: '6,2m³', value: '6,2m³' },
              { label: '4m³', value: '4m³' },
              { label: '3,5m³', value: '3,5m³' },
              { label: '1m³', value: '1m³' },
            ]}
            value={cylinderSize}
            onSelectedChange={size => setCylinderSize(size)}
          />

          <InputWithLabel
            inputTitle={'Oxigênio Restante (Verifique no Manômetro)'}
            placeholder={'Selecione...'}
            value={oxygenLeft}
            onChangeText={oxygenAmount => setOxygenLeft(oxygenAmount)}
          />

          <GradientButton
            buttonTitle="SOLICITAR"
            buttonWidth={330}
            onPress={submitHandle}
            loading={loading}
          />
        </View>
      </ScrollView>
    </>
  );
};

export default OxygenRefill;
