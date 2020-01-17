import React, { useEffect, useState } from 'react';
import { View, ScrollView, Alert, Text } from 'react-native';
import style from './style';
import HomeHeader from '../../components/HomeHeader';
import HomeMenu from '../../components/HomeMenu';
import SolicitationHistory from '../../components/SolicitationHistory';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as homePostResult } from '../../store/ducks/homePostResult';
// import { Creators as getOpenSolicitations } from '../../store/ducks/getOpenSolicitations';
import { Creators as getNotifications } from '../../store/ducks/getNotifications';
import { Creators as updateNotifications } from '../../store/ducks/updateNotifications';
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

  useEffect(() => {
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
        [{ text: 'Ok', style: 'destructive', onPress: null }],
      );
    } else if (success) {
      Alert.alert(
        'Solicitação aberta com sucesso!',
        'Acompanhe pelo histórico',
        [{ text: 'Ok', style: 'destructive', onPress: null }],
      );
    }
    dispatch(homePostResult.default());
  }, [error, success, dispatch]);

  const notificationVisualizedHandler = () => {
    if (notifications.length) {
      dispatch(updateNotifications.update(IDAdmission));
    }
  };

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
        <View style={{ margin: 8 }}>
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
        onOpened={notificationVisualizedHandler}
        onClosed={notificationClosedHandler}
        notificationsLoading={notificationsLoading}
        notifications={notifications}
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
