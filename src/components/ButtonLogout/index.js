import React from 'react';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useDispatch } from 'react-redux';
import { RectButton } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

import { Creators as AsyncStorageActions } from '../../store/ducks/asyncStorage';

import styles from './styles';

export default function ButtonLogout() {
  const dispatch = useDispatch();

  async function clearAsyncStorage() {
    try {
      await AsyncStorage.clear();
      dispatch(AsyncStorageActions.clearDataStorage());
    } catch (error) {
      // Error retrieving data
    }
  }

  function hamdleLogout() {
    Alert.alert('Alerta', 'Tem certeza que deseja sair?', [
      {
        text: 'Sim',
        onPress: () => clearAsyncStorage(),
      },
      {
        text: 'Não',
        style: 'cancel',
      },
    ]);
  }

  return (
    <RectButton style={styles.button} onPress={hamdleLogout}>
      <Icon name="sign-out-alt" size={25} color="#999" />
    </RectButton>
  );
}
