import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
  ButtonContainer: {
    paddingTop: 20,
    borderRadius: 50,
    alignItems: 'center',
  },
  LinearGradient: {
    height: 50,
    width: '100%',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  TouchableOpacity: {
    height: 50,
    alignItems: 'center',
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    padding: 15,
    width: 200,
    fontSize: 15,
  },
  ActivityIndicator: { width: 200 },
});

export default style;
