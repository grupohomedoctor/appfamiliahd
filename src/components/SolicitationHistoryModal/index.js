import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modalbox';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import oxygenLogo from '../../assets/icons/oxygen.png';
import houseLogo from '../../assets/icons/house.png';
import scaleLogo from '../../assets/icons/scale.png';
import examLogo from '../../assets/icons/exam.png';
import { withNavigation } from 'react-navigation';

const decideImage = typeOfSolicitation => {
  // console.log('typeOfSolicitation');
  // console.log(typeOfSolicitation);
  if (typeOfSolicitation.toUpperCase().includes('RECARGA')) {
    return <Image style={styles.logo} source={oxygenLogo} />;
  } else if (typeOfSolicitation.toUpperCase().includes('EQUIPAMENTOS')) {
    return <Image style={styles.logo} source={scaleLogo} />;
  } else if (typeOfSolicitation.toUpperCase().includes('REMOÇÕES')) {
    return <Image style={styles.logo} source={houseLogo} />;
  } else if (typeOfSolicitation.toUpperCase().includes('EXAME')) {
    return <Image style={styles.logo} source={examLogo} />;
  }
};

function SolicitationHistoryModal(props) {
  const [solicitations, setSolicitations] = useState([]);

  useEffect(() => {
    if (props.openSolicitations) {
      // const orderSolicitation = props.openSolicitations.sort(
      //   (a, b) => new Date(b.CreationDate) - new Date(a.CreationDate),
      // );
      // const orderSolicitation = props.openSolicitations.sort(
      //   // (a, b) => new Date(b.CreationDate) - new Date(a.CreationDate),

      // );
      const orderSolicitation = props.openSolicitations.sort(function(a, b) {
        return +a.ID < +b.ID
          ? 1
          : +b.ID < +a.ID
          ? -1
          : 0;
      });

      // console.log(orderSolicitation)

      setSolicitations(orderSolicitation);
    }
  }, [props.openSolicitations, solicitations]);

  // console.log('solicitations');
  // console.log(solicitations);

  function handleOpenDetails(solicitation) {
    props.onClosed();
    props.navigation.navigate('SolicitationDetails', { solicitation });
  }

  return (
    <Modal
      coverScreen
      swipeToClose={true}
      swipeThreshold={0}
      swipeArea={40}
      backdropPressToClose={false}
      isOpen={props.isOpen}
      backButtonClose
      onClosed={props.onClosed}>
      <Icon style={styles.gripIcon} name="grip-lines" size={20} />
      {props.openSolicitations ? (
        <View style={styles.modalContainer}>
          <FlatList
            keyExtractor={solicitation => solicitation.ID}
            // data={
            //   props.openSolicitations &&
            //   props.openSolicitations.sort(
            //     (a, b) => Number(b.ID) - Number(a.ID),
            //   )
            // }
            // data={props.openSolicitations}
            data={solicitations}
            renderItem={({ item: solicitation }) => (
              <TouchableOpacity
                onPress={() => handleOpenDetails(solicitation)}
                style={styles.solicitationContainer}>
                {decideImage(solicitation.Subject)}
                <View style={{ flexGrow: 1 }}>
                  <Text>{solicitation.EventDate}</Text>
                  <Text
                    style={styles.nunito}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    {solicitation.Subject}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      ) : (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#282829" />
          <Text>Carregando...</Text>
        </View>
      )}
    </Modal>
  );
}

export default withNavigation(SolicitationHistoryModal);
