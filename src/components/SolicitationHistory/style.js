import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
  history: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
    backgroundColor: 'white',
    width: '100%',
  },
  divisor: {
    height: 2,
    backgroundColor: '#00000026',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
  seeAll: {
    color: 'blue',
    // padding: 2,
  },
  customFont: {
    fontFamily: 'Nunito-SemiBold',
    letterSpacing: 1.4,
    fontSize: 13,
    flex: 1,
    paddingRight: 10,
  },
});

export default style;
