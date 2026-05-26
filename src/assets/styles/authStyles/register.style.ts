import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#fff',
    },
  scroll: {
    padding: 24,
    paddingTop: 64,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  logo: {
    width: 220,
    height: 140,
    marginBottom: 8,
    marginTop: 12,
    alignSelf: 'center',
    opacity: 0.25,
  },
  form: {
    width: '100%',
    paddingHorizontal: 32,
    marginTop: 0,
  },
  inputIcon: {
    position: 'absolute',
    right: 0,
  },
  loginBtn: {
    marginLeft: 8,
    marginRight: 0,
    alignSelf: 'flex-end',
    right: 0,
  },
  haveAccountText: {
    color: '#888',
    fontSize: 14,
    marginTop: 10,
    marginBottom: 18,
    alignSelf: 'flex-start',
  },
});

export default styles;
