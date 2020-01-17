import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import GoBackButton from './../GoBackButton';

const SolicitationHeader = props => {
  return (
    <View style={{ ...styles.row, ...styles.headerRow }}>
      <GoBackButton
        backToLogin={props.backToLogin}
        path={props.pathToGoBackTo}
      />
      <View style={{ ...styles.headerContainerStyle }}>
        <Text style={styles.header}>{props.headerTitle}</Text>
      </View>
    </View>
  );
};

export default SolicitationHeader;
