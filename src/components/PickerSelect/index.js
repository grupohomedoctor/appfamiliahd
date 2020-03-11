import React, { useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';

export const Dropdown = props => {
  const [selectedValue, setSelectedValue] = useState('');

  const valueChangeHandler = value => {
    setSelectedValue(value);
    props.onSelectedChange(value);
  };

  const pickerStyle = {
    inputIOS: {
      color: '#000',
      fontSize: 14,
      paddingLeft: 28,
      backgroundColor: '#eceff1',
      height: 54,
    },
    inputAndroid: {
      color: '#000',
      fontSize: 14,
      paddingLeft: 28,
      backgroundColor: '#eceff1',
      height: 54,
    },
  };

  return (
    <RNPickerSelect
      placeholder={{ label: props.placeholder }}
      useNativeAndroidPickerStyle={false}
      onValueChange={valueChangeHandler}
      items={props.items}
      style={pickerStyle}
      value={selectedValue}
    />
  );
};

export default Dropdown;
