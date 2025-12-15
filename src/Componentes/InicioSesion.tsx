import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

interface SigninProps {
  navigation?: any;
  onNavigateToRegister?: () => void;
  onNavigateToPrincipal?: () => void;
}

const Signin: React.FC<SigninProps> = ({ 
  navigation, 
  onNavigateToRegister,
  onNavigateToPrincipal 
}) => {
  const [Correo, setCorreo] = useState('');
  const [Contra, setContra] = useState('');

  const handleLogin = () => {
    if (navigation) {
      navigation.navigate('Principal');
    } else if (onNavigateToPrincipal) {
      onNavigateToPrincipal();
    }
  };

  const handleNavigateToRegister = () => {
    if (navigation) {
      navigation.navigate('Registro');
    } else if (onNavigateToRegister) {
      onNavigateToRegister();
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.signinWrapper}>
          <LinearGradient
            colors={['#0098ff', '#0052cc']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.signin}
          >
            {/* Título */}
            <Text style={styles.titulo}>Share App</Text>

            {/* Imagen más pequeña y centrada */}
            <View style={styles.imgContainer}>
              <Image
                source={require('../img/logo_app.png')}
                style={styles.imalogin}
                resizeMode="cover"
              />
            </View>

            {/* Formulario */}
            <View style={styles.formContainer}>
              <Text style={styles.formTitulo}>Iniciar Sesión</Text>
              
              <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                placeholderTextColor="rgba(255, 255, 255, 0.6)"
                value={Correo}
                onChangeText={setCorreo}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <TextInput
                style={styles.input}
                placeholder="Contraseña"
                placeholderTextColor="rgba(255, 255, 255, 0.6)"
                value={Contra}
                onChangeText={setContra}
                secureTextEntry
                autoCapitalize="none"
              />

              <TouchableOpacity
                style={styles.signiboton}
                onPress={handleLogin}
                activeOpacity={0.8}
              >
                <Text style={styles.botonText}>Entrar</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                onPress={handleNavigateToRegister}
                style={styles.pregunta}
              >
                <Text style={styles.link}>¿No tienes cuenta? Regístrate aquí</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
  },
  signinWrapper: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  signin: {
    padding: 30,
    borderRadius: 25,
    width: '100%',
    maxWidth: 450,
    alignItems: 'center',
    shadowColor: '#0098ff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 25,
    elevation: 15,
  },
  titulo: {
    color: 'white',
    fontSize: 36,
    fontWeight: '800',
    marginBottom: 25,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  imgContainer: {
    marginBottom: 25,
    borderRadius: 75,
    overflow: 'hidden',
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  imalogin: {
    width: 130,
    height: 130,
  },
  formContainer: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    padding: 25,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  formTitulo: {
    color: 'white',
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    padding: 14,
    marginBottom: 12,
    borderRadius: 12,
    color: 'white',
    fontSize: 16,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  signiboton: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  botonText: {
    color: '#0052cc',
    fontWeight: '700',
    fontSize: 17,
  },
  pregunta: {
    alignItems: 'center',
    marginTop: 18,
    paddingVertical: 8,
  },
  link: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default Signin;