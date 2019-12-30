import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import styles from './styles';
import goBackIcon from '../../assets/icons/angle-left-solid.png';
import { withNavigation } from 'react-navigation';

const GoBackButton = props => {
  const navigationHandler = () => {
    props.navigation.navigate(props.path);
  };

  return (
    <TouchableOpacity
      onPress={navigationHandler}
      style={styles.TouchableOpacity}>
      <View accessible style={styles.buttonContainer}>
        <Image source={goBackIcon} />
      </View>
    </TouchableOpacity>
  );
};

export default withNavigation(GoBackButton);
