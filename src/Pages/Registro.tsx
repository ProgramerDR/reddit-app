import React from 'react';
import { View } from 'react-native';
import InicioSesionComponent from '../Componentes/InicioSesion';

const InicioSesion = ({ navigation }: any) => {
  return (
    <View style={{ flex: 1 }}>
      <InicioSesionComponent navigation={navigation} />
    </View>
  );
};

export default InicioSesion;
