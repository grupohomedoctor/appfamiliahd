import React, {useEffect, useState} from 'react';
import {View, ScrollView, Alert, Text, Linking} from 'react-native';
import style from './style';
import HomeHeader from '../../components/HomeHeader';
import HomeMenu from '../../components/HomeMenu';
import SolicitationHistory from '../../components/SolicitationHistory';
import {useDispatch, useSelector} from 'react-redux';
import {Creators as homePostResult} from '../../store/ducks/homePostResult';
// import { Creators as getOpenSolicitations } from '../../store/ducks/getOpenSolicitations';
import {Creators as getNotifications} from '../../store/ducks/getNotifications';
import {Creators as getVersion} from '../../store/ducks/getVersion';
import {Creators as AsyncStorageActions} from '../../store/ducks/asyncStorage';
import {CURRENT_VERSION} from 'react-native-dotenv';
import AsyncStorage from '@react-native-community/async-storage';

import SolicitationHistoryModal from '../../components/SolicitationHistoryModal';
import NotificationModal from '../../components/NotificationModal';
import ButtonLogout from '../../components/ButtonLogout';

const Home = props => {
  const dispatch = useDispatch();
  const success = useSelector(state => state.home.success);
  const error = useSelector(state => state.home.error);
  const userName = useSelector(state => state.asyncStorage.userName);
  const IDAdmission = useSelector(state => state.asyncStorage.IDAdmission);
  const pacienteDataNasc = useSelector(
    state => state.asyncStorage.pacienteDataNasc,
  );
  const pacienteNome = useSelector(state => state.asyncStorage.pacienteNome);
  const openSolicitationsLoading = useSelector(
    state => state.getOpenSolicitations.loading,
  );
  const openSolicitations = useSelector(
    state => state.getOpenSolicitations.solicitations,
  );
  const notificationsLoading = useSelector(
    state => state.getNotifications.loading,
  );
  const notifications = useSelector(
    state => state.getNotifications.notifications,
  );
  const realVersion = useSelector(state => state.getVersion.version);
  const versionError = useSelector(state => state.getVersion.error);
  // const allState = useSelector(state => state.getVersion);
  // console.log('allState');
  // console.log(allState);

  const [historyModalIsOpen, setHistoryModalIsOpen] = useState(false);
  const [notificationModalIsOpen, setNotificationModalIsOpen] = useState(false);

  // TEMPORARIO
  const dataFormat = () => {
    let data = pacienteDataNasc
      .split(' ')[0]
      .split('-')
      .reverse()
      .join('/');
    return data;
  };

  async function clearAsyncStorage() {
    try {
      await AsyncStorage.clear();
      dispatch(AsyncStorageActions.clearDataStorage());
    } catch (error) {
      // Error retrieving data
    }
  }

  useEffect(() => {
    dispatch(getVersion.getVersion());
    if (IDAdmission) {
      dispatch(getNotifications.getNotifications(IDAdmission));
    }
  }, [IDAdmission, dispatch]);

  // Tratamento de resultado de solicitação
  useEffect(() => {
    if (error) {
      Alert.alert(
        'Houve um erro ao abrir a solicitação',
        'Por favor entre em contato com sac@homedoctor.com.br',
        [{text: 'Ok', style: 'destructive', onPress: null}],
      );
    } else if (success) {
      Alert.alert(
        'Solicitação aberta com sucesso!',
        'Acompanhe pelo histórico',
        [{text: 'Ok', style: 'destructive', onPress: null}],
      );
    }
    dispatch(homePostResult.default());
  }, [error, success, dispatch]);

  // verifica se a versão está correta
  useEffect(() => {
    // console.log('useEffect de verificação');
    // console.log(realVersion);
    if (realVersion != null) {
      // if (realVersion != null && realVersion != undefined) {
      // console.log('typeof');
      // console.log(typeof CURRENT_VERSION);
      // console.log(typeof realVersion);
      // console.log('CURRENT_VERSION');
      // console.log(CURRENT_VERSION);
      // console.log('realVersion');
      // console.log(realVersion);
      if (CURRENT_VERSION != realVersion) {
        // versões divergentes
        Alert.alert(
          'Seu aplicativo está em uma versão desatualizada',
          'Realize a atualização do seu aplicativo na Play Store',
          [
            {
              text: 'Ok',
              style: 'destructive',
              onPress: () => {
                Linking.openURL(
                  'https://play.google.com/store/apps/details?id=com.homedoctor',
                );
                clearAsyncStorage();
                props.navigation.navigate('Login');
              },
            },
          ],
        );
      }
    }
  }, [realVersion]);
  // }, [props.navigation, clearAsyncStorage, realVersion]);

  const notificationClosedHandler = () => {
    setNotificationModalIsOpen(false);
    dispatch(getNotifications.getNotifications(IDAdmission));
  };

  return (
    <ScrollView contentContainerStyle={style.mainView}>
      <HomeHeader
        userName={userName}
        onBellPress={() => setNotificationModalIsOpen(true)}
        notifications={notifications}
        notificationsLoading={notificationsLoading}
      />
      <View style={style.HomeMenu}>
        <View style={{margin: 8}}>
          <Text style={style.nunitoBold}>Paciente: {pacienteNome}</Text>
          <Text style={style.nunitoBold}>Nasc: {dataFormat()}</Text>
        </View>
        <HomeMenu />
      </View>
      <View style={style.SolicitationHistory}>
        <SolicitationHistory onPress={() => setHistoryModalIsOpen(true)} />
      </View>
      <NotificationModal
        isOpen={notificationModalIsOpen}
        onClosed={notificationClosedHandler}
        notificationsLoading={notificationsLoading}
        notifications={notifications}
        IDAdmission={IDAdmission}
      />
      <SolicitationHistoryModal
        isOpen={historyModalIsOpen}
        onClosed={() => setHistoryModalIsOpen(false)}
        openSolicitationsLoading={openSolicitationsLoading}
        openSolicitations={openSolicitations}
      />
      <ButtonLogout />
    </ScrollView>
  );
};

export default Home;
