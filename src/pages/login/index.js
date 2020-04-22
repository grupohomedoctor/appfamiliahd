import React, { useState, useEffect } from 'react';
import {
  View,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Alert,
  Keyboard,
  Text,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import logo from '../../assets/images/logo-home-doctor.png';
import GradientButton from '../../components/GradientButton';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as LoginActions } from '../../store/ducks/login';
import styles from './styles';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

function Login({ navigation }) {
  const [eitherEmailOrCpf, setEitherEmailOrCpf] = useState('');
  const [password, setPassword] = useState('');
  const [typing, setTyping] = useState(false);

  const dispatch = useDispatch();

  let passwordInput = {};

  const loginHandler = () => {
    const fields = [eitherEmailOrCpf, password];

    if (fields.includes('') || fields.includes(undefined)) {
      Alert.alert(
        'Faltam alguns dados!',
        'Por favor preencha todos os campos',
        [{ text: 'Ok', style: 'destructive', onPress: null }],
      );
    } else {
      // AsyncStorage.setItem('userName', eitherEmailOrCpf);
      dispatch(LoginActions.loginRequest(eitherEmailOrCpf, password));
    }
  };

  const loading = useSelector(state => state.login.loading);

  const error = useSelector(state => state.login.error);

  useEffect(() => {
    if (error) {
      Alert.alert(
        'Usuário ou senha inválidos',
        'Por favor verifique os dados inseridos',
        [{ text: 'Ok', style: 'destructive', onPress: null }],
      );
      dispatch(LoginActions.default());
    }
  }, [error, dispatch]);

  return (
    <View>
      <KeyboardAvoidingView style={styles.Container} behavior="padding" enabled>
        {!typing ? (
          <View style={styles.ImageContainer}>
            <Image resizeMode="center" style={styles.Image} source={logo} />
          </View>
        ) : (
          <View style={styles.ImageContainer} />
        )}
        <View style={styles.InputContainer}>
          <Icon style={styles.Icon} name="user" size={20} />
          <TextInput
            style={styles.Input}
            placeholder="E-mail ou CPF"
            value={eitherEmailOrCpf}
            onChangeText={text => setEitherEmailOrCpf(text)}
            onFocus={() => setTyping(true)}
            onBlur={() => setTyping(false)}
            onSubmitEditing={() => passwordInput.focus()}
            blurOnSubmit={false}
            editable={!loading}
            autoCorrect={false}
            autoCapitalize="none"
          />
        </View>
        <View style={styles.InputContainer}>
          <Icon style={styles.Icon} name="lock" size={20} />
          <TextInput
            style={styles.Input}
            placeholder="Senha"
            value={password}
            onChangeText={text => setPassword(text)}
            onFocus={() => setTyping(true)}
            onBlur={() => setTyping(false)}
            secureTextEntry
            ref={input => (passwordInput = input)}
            editable={!loading}
            returnKeyType="send"
            autoCapitalize="none"
          />
        </View>
        <View style={styles.containerForgot}>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('Forgot')}>
            <Text style={styles.btnForgotText}>Recuperar senha</Text>
          </TouchableWithoutFeedback>
        </View>
        <GradientButton
          onPress={loginHandler}
          buttonTitle="Entrar"
          buttonWidth={200}
          loading={loading}
        />
        <View style={styles.containerButtonRegister}>
          <TouchableOpacity onPress={() => navigation.navigate('RegisterUser')}>
            <Text style={styles.buttonRegisterText}>Cadastrar</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      <TouchableOpacity
        style={styles.iconInfo}
        onPress={() => navigation.navigate('Info', { toLogin: true })}>
        <Icon color="#999" name="info-circle" size={25} />
      </TouchableOpacity>
    </View>
  );
}

export default Login;
