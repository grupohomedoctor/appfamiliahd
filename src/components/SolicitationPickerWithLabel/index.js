import React from 'react';
import Dropdown from './../PickerSelect';
import { View, Text } from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome5';

const SolicitationPickerWithLabel = props => {
  return (
    <View style={styles.container}>
      <View style={[styles.row, styles.inputLabel]}>
        {props.iconName ? (
          <Icon style={styles.icon} name={props.iconName} size={20} />
        ) : null}
        <Text style={styles.nunito}>{props.inputTitle}</Text>
      </View>
      <View style={styles.paddingHorizontalOf6Percent}>
        <Dropdown
          items={props.items}
          onSelectedChange={value => props.onSelectedChange(value)}
          placeholder={props.placeholder}
        />
      </View>
    </View>
  );
};

export default SolicitationPickerWithLabel;
