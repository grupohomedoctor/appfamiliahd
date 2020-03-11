import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import style from './style';

const SolicitationHistory = props => {
  return (
    <View style={style.history}>
      <View style={style.divisor} />
      <View style={style.header}>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={[style.customFont, style.solicitationsHeader]}>
          SOLICITAÇÕES ABERTAS POR VOCÊ
        </Text>
        <TouchableOpacity onPress={props.onPress}>
          <Text style={[style.customFont, style.seeAll]}>Ver todas</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SolicitationHistory;
