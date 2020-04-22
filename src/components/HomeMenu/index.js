import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import style from './style';
import oxygenLogo from '../../assets/icons/oxygen.png';
import houseLogo from '../../assets/icons/house.png';
import scaleLogo from '../../assets/icons/scale.png';
import examLogo from '../../assets/icons/exam.png';
import { withNavigation } from 'react-navigation';

const HomeMenu = props => {
  const navigationHandler = path => {
    props.navigation.navigate(path);
  };

  return (
    <View style={style.row}>
      <View style={style.column}>
        <TouchableOpacity
          style={{ ...style.square, ...style.squareTypeOne }}
          onPress={() => navigationHandler('OxygenRefill')}
          activeOpacity={0.8}>
          <Image resizeMode="center" source={oxygenLogo} style={style.logo} />
          <Text style={style.buttonLabel}>
            Recarga de cilindros de oxigênio
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ ...style.square, ...style.squareTypeTwo }}
          onPress={() => navigationHandler('Exams')}
          activeOpacity={0.8}>
          <Image resizeMode="center" source={examLogo} style={style.logo} />
          <Text style={style.buttonLabel}>Exame</Text>
        </TouchableOpacity>
      </View>
      <View style={style.column}>
        <TouchableOpacity
          style={{ ...style.square, ...style.squareTypeTwo }}
          onPress={() => navigationHandler('ElectiveRemoval')}
          activeOpacity={0.8}>
          <Image resizeMode="center" source={houseLogo} style={style.logo} />
          <Text style={style.buttonLabel}>Remoção eletiva</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ ...style.square, ...style.squareTypeOne }}
          onPress={() => navigationHandler('Equipment')}
          activeOpacity={0.8}>
          <Image resizeMode="center" source={scaleLogo} style={style.logo} />
          <Text style={style.buttonLabel}>
            Troca ou manutenção de equipamentos
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default withNavigation(HomeMenu);
