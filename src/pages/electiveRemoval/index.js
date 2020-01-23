import React, { useState } from 'react';
import { View, ScrollView, Text, TextInput, Alert } from 'react-native';
import styles from './styles';
import SolicitationHeader from '../../components/SolicitationHeader';
import InputWithLabel from './../../components/InputWithLabel';
import GradientButton from '../../components/GradientButton';
import DatePicker from 'react-native-datepicker';
import { TextInputMask } from 'react-native-masked-text';
import SolicitationPickerWithLabel from './../../components/SolicitationPickerWithLabel';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as dbConnectionActions } from '../../store/ducks/dbConnection';

const ElectiveRemoval = props => {
  const [requesterTitle, setRequesterTitle] = useState('');
  const [removalDate, setRemovalDate] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  const [originAddress, setOriginAddress] = useState('');
  const [destinationAddress, setDestinationAddress] = useState('');
  const [destinationPhone, setDestinationPhone] = useState('');
  const [removalReason, setRemovalReason] = useState('');
  const [trajectory, setTrajectory] = useState('');
  // Conditional
  const [otherDescription, setOtherDescription] = useState('');
  const [doctorsSpecialty, setDoctorsSpecialty] = useState('');
  const [procedure, setProcedure] = useState('');
  const [examName, setExamName] = useState('');

  const dispatch = useDispatch();
  const loading = useSelector(state => state.dbConnection.loading);
  const userName = useSelector(state => state.asyncStorage.userName);
  const IDAdmission = useSelector(state => state.asyncStorage.IDAdmission);
  const patientsAddress = useSelector(
    state => state.asyncStorage.patientsAddress,
  );
  const Base = useSelector(state => state.asyncStorage.Base);

  const submitHandle = () => {
    const fields = [
      requesterTitle,
      removalDate,
      arrivalTime,
      originAddress,
      destinationAddress,
      destinationPhone,
      removalReason,
      trajectory,
    ];
    const description = `Nome do solicitante: ${userName} &lt;br&gt; Cargo/Parentesco do Solicitante: ${requesterTitle} &lt;br&gt; ID do Paciente: ${IDAdmission} &lt;br&gt; Tipo de solicitação: Remoção eletiva &lt;br&gt; Endereço do paciente: ${patientsAddress} &lt;br&gt; Data de remoção: ${removalDate} &lt;br&gt; Horário de Chegada no destino: ${arrivalTime} &lt;br&gt; Endereço de origem: ${originAddress} &lt;br&gt; Endereço de destino: ${destinationAddress} &lt;br&gt; Telefone do destino: ${destinationPhone} &lt;br&gt; Motivo da remoção: ${removalReason} &lt;br&gt; ${
      removalReason === 'Outros'
        ? `Descrição: ${otherDescription} &lt;br&gt;`
        : ''
    }${
      removalReason === 'Consulta'
        ? `Especialidade do Doutor: ${doctorsSpecialty} &lt;br&gt;`
        : ''
    }${
      removalReason === 'Procedimento'
        ? `Nome do procedimento: ${procedure} &lt;br&gt;`
        : ''
    }${
      removalReason === 'Exames' ? `Nome do exame: ${examName} &lt;br&gt;` : ''
    } Trajeto:${trajectory}`;

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
          404,
          description,
          userName,
          null,
        ),
      );
    }
  };

  return (
    <>
      <SolicitationHeader pathToGoBackTo="Home" headerTitle="Remoção eletiva" />

      <ScrollView fillViewport="true" style={styles.form}>
        <View style={styles.scrollChildren} layout_height="wrap_content">
          <View style={styles.containerObs}>
            <Text style={styles.nunito}>
              Fique atento! Remoções solicitadas fora do prazo de antecedência
              mínimo definido por seu convênio não serão agendadas.
            </Text>
          </View>
          <InputWithLabel
            inputTitle={'Cargo/Parentesco do Solicitante'}
            placeholder={'Cargo/Parentesco...'}
            value={requesterTitle}
            onChangeText={title => setRequesterTitle(title)}
          />

          <View style={styles.container}>
            <View style={[styles.row, styles.inputLabel]}>
              <Text style={styles.nunito}>Data da Remoção</Text>
            </View>
            <View style={styles.paddingHorizontalOf6Percent}>
              <View style={{ ...styles.row, ...styles.inputContainer }}>
                <DatePicker
                  style={styles.datePicker}
                  date={removalDate}
                  mode="date"
                  placeholder="Selecione uma data..."
                  format="DD-MM-YYYY"
                  // eslint-disable-next-line prettier/prettier
                  minDate={`${new Date().getDate()}-${(
                    '0' +
                    (new Date().getMonth() + 1)
                  ).slice(-2)}-${new Date().getFullYear()}`}
                  maxDate="30-12-2099"
                  confirmBtnText="Confirmar"
                  cancelBtnText="Cancelar"
                  customStyles={{
                    dateIcon: {
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      marginLeft: 0,
                    },
                    dateInput: {
                      marginLeft: 0,
                      borderWidth: 0,
                    },
                  }}
                  onDateChange={date => setRemovalDate(date)}
                />
              </View>
            </View>
          </View>

          <View style={styles.container}>
            <View style={[styles.row, styles.inputLabel]}>
              <Text style={styles.nunito}>Horário de Chegada no Destino</Text>
            </View>
            <View style={styles.paddingHorizontalOf6Percent}>
              <View style={{ ...styles.row, ...styles.inputContainer }}>
                <DatePicker
                  style={styles.datePicker}
                  date={arrivalTime}
                  mode="time"
                  placeholder="Selecione um horário..."
                  confirmBtnText="Confirmar"
                  cancelBtnText="Cancelar"
                  customStyles={{
                    dateIcon: {
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      marginLeft: 0,
                    },
                    dateInput: {
                      marginLeft: 0,
                      borderWidth: 0,
                    },
                  }}
                  onDateChange={time => setArrivalTime(time)}
                />
              </View>
            </View>
          </View>

          <InputWithLabel
            inputTitle={'Endereço de Origem'}
            placeholder={'Endereço...'}
            value={originAddress}
            onChangeText={address => setOriginAddress(address)}
          />

          <InputWithLabel
            inputTitle={'Endereço Completo do Destino'}
            placeholder={'Endereço...'}
            value={destinationAddress}
            onChangeText={address => setDestinationAddress(address)}
          />

          <View style={styles.container}>
            <View style={[styles.row, styles.inputLabel]}>
              <Text style={styles.nunito}>Telefone do Destino</Text>
            </View>
            <View style={styles.paddingHorizontalOf6Percent}>
              <View style={{ ...styles.row, ...styles.inputContainer }}>
                <TextInputMask
                  style={styles.input}
                  type={'cel-phone'}
                  options={{
                    maskType: 'BRL',
                    withDDD: true,
                    dddMask: '(99) ',
                  }}
                  value={destinationPhone}
                  onChangeText={phoneNumber => setDestinationPhone(phoneNumber)}
                  placeholder={'Telefone...'}
                />
              </View>
            </View>
          </View>

          <SolicitationPickerWithLabel
            placeholder={'Motivo...'}
            inputTitle={'Motivo da Remoção'}
            items={[
              { label: 'Consulta', value: 'Consulta' },
              { label: 'Procedimento', value: 'Procedimento' },
              { label: 'Exames', value: 'Exames' },
              { label: 'Outros', value: 'Outros' },
            ]}
            value={removalReason}
            onSelectedChange={reason => setRemovalReason(reason)}
          />

          {removalReason === 'Outros' ? (
            <View style={styles.container}>
              <View style={[styles.row, styles.inputLabel]}>
                <Text style={styles.nunito}>Descrição</Text>
              </View>
              <View style={styles.paddingHorizontalOf6Percent}>
                <View
                  style={{
                    ...styles.row,
                    ...styles.inputContainer,
                    ...styles.textAreaContainer,
                  }}>
                  <TextInput
                    value={otherDescription}
                    onChangeText={other => setOtherDescription(other)}
                    multiline={true}
                    numberOfLines={4}
                    placeholder="Descrição..."
                    style={styles.input}
                  />
                </View>
              </View>
            </View>
          ) : null}

          {removalReason === 'Consulta' ? (
            <InputWithLabel
              inputTitle={'Especialidade do Médico'}
              placeholder={'Especialidade...'}
              valor={doctorsSpecialty}
              onChangeText={specialty => setDoctorsSpecialty(specialty)}
            />
          ) : null}

          {removalReason === 'Procedimento' ? (
            <InputWithLabel
              inputTitle={'Nome do Procedimento'}
              placeholder={'Procedimento...'}
              valor={procedure}
              onChangeText={proced => setProcedure(proced)}
            />
          ) : null}

          {removalReason === 'Exames' ? (
            <InputWithLabel
              inputTitle={'Nome dos Exames'}
              placeholder={'Nome...'}
              value={examName}
              onChangeText={exam => setExamName(exam)}
            />
          ) : null}

          <SolicitationPickerWithLabel
            placeholder={'Trajeto...'}
            inputTitle={'Trajeto'}
            items={[
              {
                label: 'Ida e Volta',
                value: 'Ida e Volta',
              },
              {
                label: 'Volta no dia seguinte',
                value: 'Volta no dia seguinte',
              },
            ]}
            value={trajectory}
            onSelectedChange={selected => setTrajectory(selected)}
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
