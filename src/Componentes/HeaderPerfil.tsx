import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HeaderPerfil: React.FC = () => {
  const [usuario, setUsuario] = useState<any>(null);

  useEffect(() => {
    const cargarUsuario = async () => {
      const usuarioGuardado = await AsyncStorage.getItem('usuario');
      if (usuarioGuardado) {
        setUsuario(JSON.parse(usuarioGuardado));
      }
    };

    cargarUsuario();
  }, []);

  if (!usuario) {
    return (
      <View style={styles.container}>
        <Text style={styles.usuario}>Cargando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.avatar}
      />
      <Text style={styles.usuario}>@{usuario.Usuario}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: '#0052cc',
    paddingHorizontal: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#222',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  usuario: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default HeaderPerfil;
