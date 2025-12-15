import React from "react";
import { View, StyleSheet } from "react-native";
import RegistroComponent from "../Componentes/Registro";

const Registro = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <RegistroComponent navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Registro;