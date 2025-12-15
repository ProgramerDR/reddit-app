import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface MenuProps {
  navigation: any; 
}

const Menu: React.FC<MenuProps> = ({ navigation }) => {
  const handlePrincipal = () => {
    navigation.navigate('Principal');
  };

  const handlePerfil = () => {
    navigation.navigate('Perfil');
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0098ff', '#0052cc']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.menu}
      >
        <Text style={styles.titulomenu}>Share App</Text>

        <View style={styles.menuBotones}>
          <TouchableOpacity
            style={styles.botonPrincipal}
            onPress={handlePrincipal}
            activeOpacity={0.8}
          >
            <Text style={styles.botonPrincipalTexto}>Principal</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.perfilmenu}
            onPress={handlePerfil}
            activeOpacity={0.8}
          >
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarText}>MP</Text>
            </View>
            <Text style={styles.perfiltexto}>Mi perfil</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
  },
  menu: {
    paddingVertical: 25,
    paddingHorizontal: 40,
    alignItems: 'center',
    gap: 20,
  },
  titulomenu: {
    color: 'white',
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
  },
  menuBotones: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  botonPrincipal: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  botonPrincipalTexto: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  perfilmenu: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  avatarPlaceholder: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'white',
  },
  avatarText: {
    color: '#0098ff',
    fontSize: 16,
    fontWeight: '700',
  },
  perfiltexto: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Menu;