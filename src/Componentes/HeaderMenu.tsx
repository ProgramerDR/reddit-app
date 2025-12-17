import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import HeaderMenuStyles from '../Styles/HeaderMenuStyles';

const HeaderMenu = () => {
  const navigation = useNavigation<any>();
  const route = useRoute();

  const isPerfil = route.name === 'Perfil';
  const isPrincipal = route.name === 'Principal';

  // Avatar por defecto
  const defaultAvatar = 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png';

  return (
    <View style={HeaderMenuStyles.container}>
      
      {/* Fila Superior */}
      <View style={HeaderMenuStyles.topSection}>
        {isPerfil ? (
          // En Perfil: Botón atrás + Título
          <View style={HeaderMenuStyles.profileHeader}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={HeaderMenuStyles.backButton}
            >
              <Text style={HeaderMenuStyles.backArrow}>←</Text>
            </TouchableOpacity>
            <Text style={HeaderMenuStyles.headerTitle}>Mi Perfil</Text>
            <View style={HeaderMenuStyles.placeholder} />
          </View>
        ) : (
          // En otras pantallas: Nombre de App
          <View style={HeaderMenuStyles.appHeader}>
            <Text style={HeaderMenuStyles.appName}>ShareApp</Text>
            <Text style={HeaderMenuStyles.appSlogan}>Comparte lo que importa</Text>
          </View>
        )}
      </View>

      {/* Navegación (solo si NO está en Perfil) */}
      {!isPerfil && (
        <View style={HeaderMenuStyles.navContainer}>
          
          {/* Botón Principal */}
          <TouchableOpacity
            style={[
              HeaderMenuStyles.navButton,
              isPrincipal && HeaderMenuStyles.activeNavButton
            ]}
            onPress={() => navigation.navigate('Principal')}
          >
            <Text style={[
              HeaderMenuStyles.navButtonText,
              isPrincipal && HeaderMenuStyles.activeNavButtonText
            ]}>
              🏠 Principal
            </Text>
          </TouchableOpacity>

          {/* Separador */}
          <View style={HeaderMenuStyles.separator} />

          {/* Botón Perfil */}
          <TouchableOpacity
            style={HeaderMenuStyles.profileNavButton}
            onPress={() => navigation.navigate('Perfil')}
          >
            <View style={HeaderMenuStyles.avatarContainer}>
              <Image
                source={{ uri: defaultAvatar }}
                style={HeaderMenuStyles.avatar}
              />
              <View style={HeaderMenuStyles.onlineIndicator} />
            </View>
            <View style={HeaderMenuStyles.profileInfo}>
              <Text style={HeaderMenuStyles.profileName}>Mi Perfil</Text>
              <Text style={HeaderMenuStyles.profileSubtitle}>Ver mi cuenta →</Text>
            </View>
          </TouchableOpacity>

        </View>
      )}
    </View>
  );
};

export default HeaderMenu;