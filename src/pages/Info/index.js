import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import styles from './styles';
import SolicitationHeader from '../../components/SolicitationHeader';

const InfoPage = ({ navigation }) => {
  const toLogin = navigation.getParam('toLogin');

  return (
    <View style={styles.flexOne}>
      <SolicitationHeader
        style={styles.headerContainer}
        pathToGoBackTo={toLogin ? 'Login' : 'Home'}
        headerTitle="Informações Adicionais"
      />

      <ScrollView
        // eslint-disable-next-line react-native/no-inline-styles
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={styles.footer}>
          <View style={styles.PB20}>
            <Text style={styles.nunitoSemiBold}>
              O Serviço de Atendimento ao Cliente está disponível 24 horas:
            </Text>
            <Text style={styles.nunitoSemiBold}>(11) 2344-8200</Text>
            <Text style={styles.nunitoSemiBold}>sac@homedoctor.com.br</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default InfoPage;
