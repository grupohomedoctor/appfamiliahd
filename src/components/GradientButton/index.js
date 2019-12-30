import React from 'react';
import { View, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import style from './style';

const GradientButton = props => {
  return (
    <View style={style.ButtonContainer}>
      <TouchableOpacity style={style.TouchableOpacity} onPress={props.onPress}>
        <LinearGradient
          colors={['#2ba534', '#2edd74']}
          start={{ x: 0.0, y: 1.0 }}
          end={{ x: 1.0, y: 1.0 }}
          style={style.LinearGradient}>
          {props.loading ? (
            <ActivityIndicator
              size="small"
              color="#00ff00"
              style={style.ActivityIndicator}
            />
          ) : (
            <Text style={{ ...style.buttonText, width: props.buttonWidth }}>
              {props.buttonTitle}
            </Text>
          )}
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default GradientButton;
