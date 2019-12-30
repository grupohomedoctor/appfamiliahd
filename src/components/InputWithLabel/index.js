import React, { useMemo } from 'react';
import { View, Text, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from './styles';
import { TextInputMask } from 'react-native-masked-text';

const InputWithLabel = props => {
  const Input = useMemo(() => (props.mask ? TextInputMask : TextInput), [
    props.mask,
  ]);

  return (
    <View style={styles.container}>
      <View style={[styles.row, styles.inputLabel]}>
        {props.iconName ? (
          <Icon style={styles.icon} name={props.iconName} size={20} />
        ) : null}
        <Text style={styles.nunito}>{props.inputTitle}</Text>
      </View>
      <View style={styles.paddingHorizontalOf6Percent}>
        <View style={{ ...styles.row, ...styles.inputContainer }}>
          <Input
            style={styles.input}
            multiline={props.multiline}
            numberOfLines={props.numberOfLines}
            placeholder={props.placeholder}
            onChangeText={props.onChangeText}
            secureTextEntry={props.secureTextEntry ? true : false}
            type={props.mask}
            options={{
              format: 'DD/MM/YYYY',
            }}
            value={props.value}
          />
        </View>
      </View>
    </View>
  );
};

export default InputWithLabel;
