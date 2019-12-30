import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import Modal from 'react-native-modalbox';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import oxygenLogo from '../../assets/icons/oxygen.png';
import houseLogo from '../../assets/icons/house.png';
import scaleLogo from '../../assets/icons/scale.png';
import examLogo from '../../assets/icons/exam.png';

const decideImage = typeOfNotification => {
  if (typeOfNotification.toUpperCase().includes('RECARGA')) {
    return <Image style={styles.logo} source={oxygenLogo} />;
  } else if (typeOfNotification.toUpperCase().includes('EQUIPAMENTOS')) {
    return <Image style={styles.logo} source={scaleLogo} />;
  } else if (typeOfNotification.toUpperCase().includes('REMOÇÕES')) {
    return <Image style={styles.logo} source={houseLogo} />;
  } else if (typeOfNotification.toUpperCase().includes('EXAME')) {
    return <Image style={styles.logo} source={examLogo} />;
  }
};

let modalRef = null;

const sortNotificationsByDate = notifications => {
  return notifications.sort((a, b) => {
    let fullDate = a.value[4];
    let fullDate2 = b.value[4];
    fullDate = fullDate.split(' ');
    fullDate2 = fullDate2.split(' ');

    let date = fullDate[0].split(/\//);
    let date2 = fullDate2[0].split(/\//);
    let time = fullDate[1];
    let time2 = fullDate2[1];

    let newDate = date[1] + '/' + date[0] + '/' + date[2] + ' ' + time;
    let newDate2 = date2[1] + '/' + date2[0] + '/' + date2[2] + ' ' + time2;
    let k = new Date(newDate);
    let y = new Date(newDate2);
    return y - k;
  });
};

const NotificationModal = props => {
  const notificationsContent = () => {
    if (props.notifications.length) {
      return (
        <View style={styles.modalContainer}>
          <FlatList
            contentContainerStyle={styles.flatList}
            keyExtractor={notification => notification.value[1]}
            data={sortNotificationsByDate(props.notifications)}
            renderItem={({ item: notification }) => (
              <View style={styles.notificationContainer}>
                {decideImage(notification.value[9])}
                <View>
                  <Text>{notification.value[4]}</Text>
                  <Text>{notification.value[9]}</Text>
                </View>
              </View>
            )}
          />
        </View>
      );
    } else {
      return (
        <View style={styles.messageContainer}>
          <Text>Não há notificações para serem exibidas.</Text>
        </View>
      );
    }
  };

  return (
    <Modal
      ref={modal => (modalRef = modal)}
      entry="top"
      coverScreen
      swipeToClose={false}
      swipeThreshold={0}
      swipeArea={0}
      backdropPressToClose={false}
      isOpen={props.isOpen}
      onClosed={props.onClosed}
      onOpened={props.onOpened}>
      {!props.notificationsLoading ? (
        notificationsContent()
      ) : (
        <View style={styles.messageContainer}>
          <ActivityIndicator size="large" color="#282829" />
          <Text>Carregando...</Text>
        </View>
      )}
      <TouchableWithoutFeedback
        touchSoundDisabled={true}
        onPressIn={() => modalRef.close()}>
        <Icon style={styles.gripIcon} name="grip-lines" size={20} />
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default NotificationModal;
