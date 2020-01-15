import React from 'react';
import { View, ScrollView, Text, Linking } from 'react-native';
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
            <Text style={styles.nunitoSemiBoldTitle}>
              Em caso de dificuldades, ligue para o SAC Home Doctor:
            </Text>

            <Text style={styles.nunitoSemiBold}>São Paulo</Text>
            <Text style={styles.nunito}>Tel. (11) 2344.8200</Text>
            <Text style={styles.nunitoMB10}>
              Opção 2 – SAC (todos os dias das 06h às 22h)
            </Text>

            <Text style={styles.nunito}>
              Em casos de eventualidades, como falta de telefonia,
              disponibilizaremos os seguintes telefones emergenciais:
            </Text>
            <Text style={styles.nunitoCenter}>(11) 99746.1230 *</Text>
            <Text style={styles.nunitoCenter}>(11) 99734.7989 *</Text>
            <Text style={styles.nunitoCenter}>(11) 99738.8611 *</Text>
            <Text style={styles.nunitoItalic}>
              * Importante: Em situações de normalidade, os números acima
              ficarão indisponíveis.
            </Text>

            <Text style={styles.nunitoSemiBold}>Demais localidades</Text>
            <Text style={styles.nunito}>
              4001.0000 (capitais e regiões metropolitanas)
            </Text>
            <Text style={styles.nunito}>
              0800 777 4010 (demais localidades)
            </Text>
            <Text style={styles.nunito}>
              Opção 2 – SAC (todos os dias das 06h às 22h)
            </Text>

            <Text style={styles.link}>sac@homedoctor.com.br</Text>
            <Text
              style={styles.link}
              onPress={() => Linking.openURL('http://www.homedoctor.com.br/')}>
              www.homedoctor.com.br
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default InfoPage;
