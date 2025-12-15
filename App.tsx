import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import Navegacion from './src/Navegacion/Navegacion';

function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar 
          barStyle="light-content" 
          backgroundColor="#000" 
        />
        <View style={styles.container}>
          <Navegacion />
        </View>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});

export default App;