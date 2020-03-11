import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  headerContainer: {
    paddingRight: 50,
  },
  buttonContainer: {
    paddingBottom: 30,
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  form: {
    flex: 1,
    backgroundColor: 'white',
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
  datePicker: {
    flex: 1,
    paddingRight: 100,
  },
  textAreaContainer: {
    height: 90,
    paddingRight: 20,
  },
  imageContainer: {
    paddingTop: 40,
    paddingHorizontal: '5%',
    paddingBottom: 0,
    height: '65%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default styles;
