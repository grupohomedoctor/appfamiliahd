import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  form: {
    flex: 1,
  },
  container: {
    marginTop: 15,
  },
  row: {
    flexDirection: 'row',
  },
  inputLabel: {
    paddingHorizontal: 30,
    paddingBottom: 10,
    justifyContent: 'flex-start',
  },
  icon: {
    paddingRight: 20,
  },
  nunito: {
    fontFamily: 'Nunito-Regular',
    fontSize: 20,
  },
  paddingHorizontalOf6Percent: {
    paddingHorizontal: '6%',
  },
  inputContainer: {
    marginVertical: '1%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    height: 56,
    backgroundColor: '#eceff1',
  },
  input: {
    flex: 1,
  },
});

export default styles;
