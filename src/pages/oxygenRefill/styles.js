import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  nunito: {
    fontFamily: 'Nunito-Regular',
  },
  headerRow: {
    paddingVertical: 30,
    justifyContent: 'space-between',
  },
  header: {
    fontSize: 26,
    fontFamily: 'Nunito-SemiBold',
  },
  headerContainer: {
    // paddingRight: 130,
  },
  form: {
    flex: 1,
    backgroundColor: 'white',
  },
  inputLabel: {
    paddingHorizontal: 30,
    paddingBottom: 10,
    justifyContent: 'flex-start',
  },
  icon: {
    paddingRight: 20,
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
    backgroundColor: '#eceff1',
    width: '100%',
  },
  paddingHorizontalOf6Percent: {
    paddingHorizontal: '6%',
  },
  buttonContainer: {
    paddingTop: 20,
    borderRadius: 50,
    alignItems: 'center',
  },
  scrollChildren: { marginBottom: 30 },
});

export default styles;
