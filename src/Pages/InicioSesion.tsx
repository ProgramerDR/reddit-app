import React from "react";
import { View, StyleSheet } from "react-native";
import Signin from "../Componentes/InicioSesion";

const InicioSesion = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Signin navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default InicioSesion;