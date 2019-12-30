import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  modalContainer: {
    justifyContent: 'flex-start',
    flex: 1,
  },
  solicitationContainer: {
    height: 100,
    width: '100%',
    marginVertical: 6,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#add8e621',
  },
  gripIcon: {
    alignSelf: 'center',
    paddingTop: 10,
  },
  logo: {
    height: 80,
    width: 80,
    marginHorizontal: 20,
  },
});

export default styles;
