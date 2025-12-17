import { StyleSheet } from 'react-native';

export const HeaderStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#000',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },

  backButton: {
    padding: 5,
  },

  backText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },

  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '800',
  },

  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  mainButton: {
    marginRight: 15,
  },

  mainText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },

  profileButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 6,
  },

  profileText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
