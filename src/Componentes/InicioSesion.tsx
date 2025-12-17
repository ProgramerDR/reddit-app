import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  signinWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  signin: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  titulo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  imgContainer: {
    marginBottom: 30,
  },
  imalogin: {
    width: 120,
    height: 120,
  },
  formContainer: {
    width: '100%',
  },
  formTitulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    color: 'white',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  signiboton: {
    backgroundColor: '#FFD700',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  botonText: {
    color: '#0052cc',
    fontSize: 18,
    fontWeight: 'bold',
  },
  pregunta: {
    marginTop: 15,
    alignItems: 'center',
  },
  link: {
    color: 'white',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});

const Signin = ({ navigation }: any) => {
  const [Correo, setCorreo] = useState('');
  const [Contra, setContra] = useState('');

const handleLogin = async () => {
  if (!Correo || !Contra) {
    Alert.alert('Error', 'Todos los campos son obligatorios');
    return;
  }

  try {
    const res = await fetch('http://10.0.2.2:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ Correo, Contra }),
    });

    const data = await res.json();

    if (!res.ok) {
      Alert.alert('Error', data);
      return;
    }

    navigation.reset({
      index: 0,
      routes: [{ name: 'Principal' }],
    });

  } catch (error) {
    Alert.alert('Error', 'No se pudo conectar al servidor');
  }
};

const handleNavigateToRegister = () => {
  navigation.navigate('Registro');
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


export default Signin;

