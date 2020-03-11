import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  Container: {
    height: '100%',
    padding: 20,
    backgroundColor: 'white',
  },
  ImageContainer: {
    paddingTop: '20%',
    paddingHorizontal: '20%',
    paddingBottom: 0,
    height: '40%',
  },
  Image: {
    width: '100%',
    height: '100%',
  },
  InputContainer: {
    marginHorizontal: '10%',
    backgroundColor: '#eceff1',
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 0,
    height: 56,
  },
  Input: {
    flex: 1,
  },
  Icon: {
    paddingHorizontal: '5%',
    opacity: 0.4,
  },
  containerForgot: {
    marginHorizontal: '10%',
    marginTop: 5,
  },
  btnForgotText: {
    color: '#000',
  },
  containerButtonRegister: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonRegisterText: {
    fontSize: 14,
  },
  iconInfo: {
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
});

export default styles;
