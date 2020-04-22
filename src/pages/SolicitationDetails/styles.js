import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  headerContainer: {
    paddingRight: 50,
  },
  detailsContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignSelf: 'stretch',
  },
  details: {
    marginTop: 15,
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: 'Nunito-Regular',
    fontSize: 18,
    color: '#999',
  },
  text: {
    fontFamily: 'Nunito-Regular',
    fontSize: 20,
  },
});

export default styles;
