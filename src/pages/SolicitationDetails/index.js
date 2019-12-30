import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import HTMLView from 'react-native-render-html';

import SolicitationHeader from '../../components/SolicitationHeader';

import styles from './styles';

export default function SolicitationDetails({ navigation }) {
  const solicitation = navigation.getParam('solicitation');
  console.log(solicitation);

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
