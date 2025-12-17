import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

const Registro = ({ navigation }: any) => {
  const [Usuario, setUsuario] = useState('');
  const [Correo, setCorreo] = useState('');
  const [Contra, setContra] = useState('');
  const [Confirmar, setConfirmar] = useState('');

  const handleRegister = async () => {
    if (!Usuario || !Correo || !Contra || !Confirmar) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    if (Contra !== Confirmar) {
      Alert.alert('Error', 'Las contraseñas no son iguales amigo');
      return;
    }

    try {
      const res = await fetch('http://10.0.2.2:3000/crear', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Usuario,
          Correo,
          Contra,
        }),
      });

      const text = await res.text();

      if (!res.ok) {
        Alert.alert('Error', text);
        return;
      }

      Alert.alert('Éxito', 'Usuario registrado correctamente', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Signin'),
        },
      ]);
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'No se pudo conectar al servidor');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>

      <TextInput
        style={styles.input}
        placeholder="Usuario"
        value={Usuario}
        onChangeText={setUsuario}
      />

      <TextInput
        style={styles.input}
        placeholder="Correo"
        value={Correo}
        onChangeText={setCorreo}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={Contra}
        onChangeText={setContra}
      />

      <TextInput
        style={styles.input}
        placeholder="Confirmar contraseña"
        secureTextEntry
        value={Confirmar}
        onChangeText={setConfirmar}
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
        <Text style={styles.link}>¿Ya tienes cuenta? Inicia sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Registro;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#0052cc',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  link: {
    color: '#0052cc',
    textAlign: 'center',
    marginTop: 15,
  },
});