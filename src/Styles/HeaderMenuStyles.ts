import { StyleSheet } from 'react-native';

const HeaderMenuStyles = StyleSheet.create({
  // Contenedor Principal
  container: {
    backgroundColor: '#1E3A8A', // Azul oscuro
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },

  // Sección Superior
  topSection: {
    marginBottom: 15,
  },

  // Encabezado en Perfil
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrow: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    flex: 1,
    textAlign: 'center',
  },
  placeholder: {
    width: 40,
  },

  // Encabezado de App
  appHeader: {
    alignItems: 'center',
  },
  appName: {
    fontSize: 32,
    fontWeight: '900',
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: 1,
    marginBottom: 5,
  },
  appSlogan: {
    fontSize: 14,
    color: '#A5C8FF',
    fontStyle: 'italic',
    textAlign: 'center',
  },

  // Navegación Inferior
  navContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 12,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },

  // Botón Principal
  navButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#F0F7FF',
    borderRadius: 12,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeNavButton: {
    backgroundColor: '#3B82F6',
  },
  navButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4A90E2',
  },
  activeNavButtonText: {
    color: '#FFFFFF',
  },

  // Separador
  separator: {
    width: 1,
    height: 30,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 12,
  },

  // Botón Perfil
  profileNavButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#F8FAFF',
    borderRadius: 12,
    flex: 2,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E8F0FE',
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#3B82F6',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    backgroundColor: '#10B981',
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  profileInfo: {
    flex: 1,
    marginLeft: 12,
  },
  profileName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1F2937',
  },
  profileSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
});

export default HeaderMenuStyles;