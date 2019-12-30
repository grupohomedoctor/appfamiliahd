import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
  header: {
    paddingTop: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  icon: {
    opacity: 0.8,
    paddingRight: 20,
  },
  iconNotification: {
    opacity: 0.8,
    paddingRight: 35,
  },
  headerText: {
    flex: 1,
    paddingLeft: 30,
    fontSize: 18,
    fontFamily: 'Nunito-SemiBold',
  },
  notification: {
    position: 'absolute',
    top: 10,
    left: 15,
    width: 28,
    height: 28,
    backgroundColor: 'red',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationText: {
    fontFamily: 'Nunito-SemiBold',
    color: 'white',
    fontSize: 16,
  },
});

export default style;
