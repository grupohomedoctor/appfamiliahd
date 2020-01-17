import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
  mainView: {
    flex: 1,
    flexGrow: 1,
    height: '100%',
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 40,
    paddingLeft: '10%',
    paddingBottom: '8%',
    fontFamily: 'Nunito-SemiBold',
  },
  SolicitationHistory: {
    width: '100%',
    // position: 'absolute',
    bottom: 0,
  },
  HomeMenu: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  nunitoBold: {
    fontFamily: 'Nunito-Bold',
    fontSize: 14,
    textAlign: 'justify',
  },
});

export default style;
