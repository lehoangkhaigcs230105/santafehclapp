import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 24,
    paddingBottom: 32,
    position: 'relative', // 🔥 QUAN TRỌNG
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 32,
    textAlign: 'center',
    color: '#222',
  },

  languageButton: {
    position: 'absolute',
    top: 40,
    right: 16,
    zIndex: 999,      // 🔥 FIX CLICK
    elevation: 10,    // 🔥 ANDROID
  },

  languageButtonAfterClick: {
    position: 'absolute',
    top: 40,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 10,
    padding: 8,
    minWidth: 140,
    zIndex: 1000,     // 🔥 cao hơn icon
  },

  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 8,
  },

  languageText: {
    fontSize: 14,
    color: '#222',
  },

  changeScreen: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  signupText: {
    color: '#888',
    fontSize: 14,
  },

  forgotPassText: {
    color: '#888',
    fontSize: 14,
  },
});

export default styles;