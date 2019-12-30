import React, { useState, useEffect } from 'react';
import { ScrollView, View, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { Creators as RegisterUserActions } from '../../store/ducks/registerUser';

import SolicitationHeader from '../../components/SolicitationHeader';
import InputWithLabel from '../../components/InputWithLabel';
import GradientButton from '../../components/GradientButton';

import styles from './styles';

export default function RegisterUser({ navigation }) {
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [namePatient, setNamePatient] = useState('');
  // const [emailPatient, setEmailPatient] = useState('');
  const [birthPatient, setBirthPatient] = useState('');

  const { loading, error, success } = useSelector(state => state.registerUser);

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      dispatch(RegisterUserActions.registerUserDefault());
      Alert.alert('Erro', error);
    }
    if (success) {
      dispatch(RegisterUserActions.registerUserDefault());
      Alert.alert('Sucesso', 'Cadastro de usuário realizado');
      navigation.navigate('Login');
    }
  }, [dispatch, error, navigation, success]);

  function submitHandle() {
    if (
      name !== '' &&
      cpf !== '' &&
      email !== '' &&
      password !== '' &&
      confirmPassword === password &&
      namePatient !== '' &&
      birthPatient !== ''
    ) {
      const formatDate = `${birthPatient.substr(6, 4)}-${birthPatient.substr(
        3,
        2,
      )}-${birthPatient.substr(0, 2)} 00:00:00.0`;

      dispatch(
        RegisterUserActions.registerUserRequest(
          name,
          cpf,
          email,
          password,
          namePatient,
          // emailPatient,
          formatDate,
        ),
      );
    } else {
      if (password !== confirmPassword) {
        Alert.alert(
          'Erro',
          'Campos senha e confirme a senha estão diferentes.',
        );
      } else {
        Alert.alert('Erro', 'Preencha todos os campos');
      }
    }
  }

  return (
    <ScrollView fillViewport="true" style={styles.form}>
      <SolicitationHeader
        style={styles.headerContainer}
        pathToGoBackTo="Login"
        headerTitle="Cadastro de usuário"
        backToLogin
      />
      <InputWithLabel
        inputTitle={'Nome'}
        value={name}
        onChangeText={text => setName(text)}
      />
      <InputWithLabel
        inputTitle={'CPF'}
        value={cpf}
        onChangeText={text => setCpf(text)}
        mask="cpf"
      />
      <InputWithLabel
        inputTitle={'E-mail'}
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <InputWithLabel
        inputTitle={'Senha'}
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry={true}
      />
      <InputWithLabel
        inputTitle={'Confirme a senha'}
        value={confirmPassword}
        onChangeText={text => setConfirmPassword(text)}
        secureTextEntry={true}
      />
      <InputWithLabel
        inputTitle={'Nome do paciente'}
        value={namePatient}
        onChangeText={text => setNamePatient(text)}
      />
      {/*<InputWithLabel
        inputTitle={'E-mail do paciente'}
        value={emailPatient}
        onChangeText={text => setEmailPatient(text)}
      />*/}
      <InputWithLabel
        inputTitle={'Data de nasc. paciente'}
        value={birthPatient}
        onChangeText={text => setBirthPatient(text)}
        mask="datetime"
      />
      <GradientButton
        buttonTitle="CADASTRAR"
        buttonWidth={330}
        onPress={submitHandle}
        loading={loading}
      />
      <View style={styles.separator} />
    </ScrollView>
  );
}
