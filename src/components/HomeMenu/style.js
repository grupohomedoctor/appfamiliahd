import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  square: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 12,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,

    elevation: 20,
  },
  squareTypeOne: {
    height: 170,
    width: 150,
  },
  squareTypeTwo: {
    height: 130,
    width: 150,
  },
  logo: {
    width: '50%',
    height: '50%',
  },
  buttonLabel: {
    textAlign: 'center',
    fontFamily: 'Nunito-SemiBold',
  },
});

export default style;
