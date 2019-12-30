import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import style from './style';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { withNavigation } from 'react-navigation';

const HomeHeader = props => {
  const navigationHandler = path => {
    props.navigation.navigate(path);
  };

  return (
    <View>
      <View style={style.header}>
        <Text style={style.headerText}>{props.userName}</Text>
        <TouchableOpacity onPress={props.onBellPress}>
          <Icon style={style.iconNotification} name="bell" size={25} />
          {!props.notificationsLoading ? (
            <View style={style.notification}>
              <Text style={style.notificationText}>
                {props.notifications.length}
              </Text>
            </View>
          ) : (
            <View style={style.notification}>
              <ActivityIndicator size="small" color="#ffffff" />
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigationHandler('Info')}>
          <Icon style={style.icon} name="info-circle" size={25} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default withNavigation(HomeHeader);
