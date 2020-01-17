import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  headerRow: {
    paddingVertical: 30,
    justifyContent: 'space-between',
  },
  // alterado
  header: {
    fontSize: 26,
    fontFamily: 'Nunito-SemiBold',
    textAlign: 'justify',
  },
  headerContainerStyle: {
    // paddingRight: 200,
    paddingRight: 150,
  },
});

export default styles;
