import React, { useState, useEffect } from 'react';
import { View, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import SolicitationHeader from '../../components/SolicitationHeader';
import InputWithLabel from '../../components/InputWithLabel';
import GradientButton from '../../components/GradientButton';

import { Creators as ForgotActions } from '../../store/ducks/forgot';
import styles from './styles';

export default function Forgot({ navigation }) {
  const [cpf, setCpf] = useState('');

  const { loading, error, success } = useSelector(state => state.forgot);

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      dispatch(ForgotActions.forgotDefault());
      Alert.alert('Erro', error);
    }
    if (success) {
      dispatch(ForgotActions.forgotDefault());
      Alert.alert('Sucesso', 'E-mail enviado');
      navigation.navigate('Login');
    }
  }, [dispatch, error, navigation, success]);

  function submitHandle() {
    const regex = /^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}|[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2})$/;

    if (cpf !== '' && regex.test(cpf)) {
      dispatch(ForgotActions.forgotRequest(cpf));
    } else {
      Alert.alert('Erro', 'Preencha todos o CPF corretamente');
    }
  }

  return (
    <View style={styles.container}>
      <SolicitationHeader
        style={styles.headerContainer}
        pathToGoBackTo="Login"
        headerTitle="Recuperação de senha"
      />
      <InputWithLabel
        inputTitle={'CPF'}
        value={cpf}
        onChangeText={text => setCpf(text)}
        mask="cpf"
      />
      <GradientButton
        buttonTitle="ENVIAR"
        buttonWidth={330}
        onPress={submitHandle}
        loading={loading}
      />
    </View>
  );
}
