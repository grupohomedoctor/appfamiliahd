import React from 'react';
import { ScrollView, View, Text, useEffect, useState } from 'react-native';
import HTMLView from 'react-native-render-html';

import SolicitationHeader from '../../components/SolicitationHeader';

import styles from './styles';

export default function SolicitationDetails({ navigation }) {
  // const [solicitation, setSolicitation] = useState([{ solicitation }]);
  const solicitation = navigation.getParam('solicitation');

  // useEffect(() => {
  //   // setSolicitation(navigation.getParam('solicitation'));
  //   // solicitation = navigation.getParam('solicitation');
  // });
  // useEffect(() => {
  //   const solicitation = navigation.getParam('solicitation');
  // }, [solicitation]);

  // console.log('solicitation details');
  // console.log(solicitation);

  const desc = () => {
    let resp = null;
    if (solicitation.Subject !== 'EXAMES - Agendamento') {
      resp = (
        <HTMLView
          tagsStyles={{
            span: {
              fontFamily: 'Nunito-Regular',
              fontSize: 20,
            },
          }}
          html={`<span>${solicitation.Description}</span>`}
        />
      );
    } else {
      resp = (
        <Text style={{ fontFamily: 'Nunito-Regular', fontSize: 20 }}>
          Imagem anexada
        </Text>
      );
    }
    return resp;
  };

  return (
    <ScrollView style={styles.container}>
      <SolicitationHeader
        style={styles.headerContainer}
        pathToGoBackTo="Home"
        headerTitle="Detalhes da solicitação"
      />
      <View style={styles.detailsContainer}>
        <View style={styles.details}>
          <Text style={styles.title}>Titulo</Text>
          <Text style={styles.text}>{solicitation.Subject}</Text>
        </View>
        <View style={styles.details}>
          <Text style={styles.title}>Descrição</Text>
          {/*desc()*/}
          <HTMLView
            tagsStyles={{
              span: {
                fontFamily: 'Nunito-Regular',
                fontSize: 20,
              },
            }}
            html={`<span>${solicitation.Description}</span>`}
          />
        </View>
        <View style={styles.details}>
          <Text style={styles.title}>Status</Text>
          <Text style={styles.text}>{solicitation.Status}</Text>
        </View>
        <View style={styles.details}>
          <Text style={styles.title}>Base</Text>
          <Text style={styles.text}>{solicitation.Base}</Text>
        </View>
      </View>
    </ScrollView>
  );
}
