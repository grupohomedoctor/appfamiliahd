import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  nunito: {
    fontFamily: 'Nunito-Regular',
    fontSize: 20,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  avatarContainer: {
    marginRight: 25,
  },
  avatarCharacter: {
    color: '#333',
    fontSize: 16,
    fontFamily: 'Nunito-Regular',
    textTransform: 'uppercase',
  },
  card: {
    borderWidth: 1,
    borderColor: '#81c784',
    marginTop: 15,
    alignItems: 'center',
    backgroundColor: '#c8e6c9',
    borderRadius: 10,
    width: '80%',
    height: 80,
    padding: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,
    elevation: 20,
  },
  contactCardsContainer: {
    alignItems: 'center',
    flex: 1,
    height: '100%',
  },
  contactDescription: {
    fontSize: 18,
  },
  contactDescription2: {
    fontSize: 16,
  },
});

export default styles;
