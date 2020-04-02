import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  nunito: {
    fontFamily: 'Nunito-Regular',
    fontSize: 20,
    textAlign: 'justify',
  },
  nunitoBold: {
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
    textAlign: 'justify',
  },
  nunitoBoldRed: {
    color: 'red',
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
    textAlign: 'justify',
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
  containerObs: {
    paddingHorizontal: 30,
    paddingVertical: 22,
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
  scrollChildren: {marginBottom: 30},
});

export default styles;
