import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signin from '../Componentes/InicioSesion';
import Registro from '../Componentes/Registro';
import Principal from '../Pages/Principal';
import Perfil from '../Pages/Perfil';

const Stack = createNativeStackNavigator();

const Navegacion = () => {
  return (
    <Stack.Navigator
      initialRouteName="Signin"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="Signin" component={Signin} />
      <Stack.Screen name="Registro" component={Registro} />
      <Stack.Screen name="Principal" component={Principal} />
      <Stack.Screen name="Perfil" component={Perfil} />
    </Stack.Navigator>
  );
};

export default Navegacion;
