import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  flexOne: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContainer: {
    // paddingRight: 50,
    textAlign: 'center',
  },
  nunito: {
    fontFamily: 'Nunito-Regular',
    fontSize: 20,
    textAlign: 'justify',
  },
  nunitoCenter: {
    fontFamily: 'Nunito-Regular',
    fontSize: 20,
    textAlign: 'center',
  },
  nunitoMB10: {
    fontFamily: 'Nunito-Regular',
    fontSize: 20,
    textAlign: 'justify',
    marginBottom: 15,
  },
  nunitoItalic: {
    fontFamily: 'Nunito-RegularItalic',
    fontSize: 20,
    textAlign: 'justify',
    marginBottom: 15,
  },
  paddingBottomZero: {
    paddingBottom: 0,
  },
  nunitoSemiBold: {
    fontFamily: 'Nunito-SemiBold',
    // textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 14,
    // color: '#296e42',
  },
  nunitoSemiBoldTitle: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 14,
  },
  link: {
    color: 'blue',
    fontFamily: 'Nunito-Regular',
    fontSize: 20,
    textDecorationLine: 'underline',
    marginTop: 8,
    textAlign: 'center',
  },
  PB20: {
    paddingBottom: 20,
  },
  footer: {
    paddingTop: 25,
    paddingHorizontal: 25,
    bottom: 0,
  },
});

export default styles;
