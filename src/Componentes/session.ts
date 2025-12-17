import AsyncStorage from '@react-native-async-storage/async-storage';

export interface UsuarioSesion {
  id: string;
  Usuario: string;
  Correo: string;
  Rol: string;
}

export const guardarUsuario = async (user: UsuarioSesion) => {
  await AsyncStorage.setItem('usuario', JSON.stringify(user));
};

export const obtenerUsuario = async (): Promise<UsuarioSesion | null> => {
  const data = await AsyncStorage.getItem('usuario');
  return data ? JSON.parse(data) : null;
};

export const cerrarSesion = async () => {
  await AsyncStorage.removeItem('usuario');
};
