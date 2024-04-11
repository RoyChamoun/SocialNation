import {StyleSheet} from 'react-native';

export const profileStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FFF',
  },
  userInfo: {
    backgroundColor: '#fff',
    width: '80%',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  infoBox: {
    backgroundColor: '#eee',
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
  userInfoText: {
    fontSize: 16,
    color: '#555',
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    marginBottom: 5,
  },
  button: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});
