import React from 'react';
import { ScrollView, StyleSheet, View, Text, Image } from 'react-native';
import Menu from '../Componentes/Menu';
import Postuser from '../Componentes/Postuser';

const Perfil = ({ navigation }: any) => {
  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View>
        <Menu navigation={navigation} />
        
        <View style={styles.profileHeader}>
          <Image
            source={{ uri: 'https://via.placeholder.com/60' }}
            style={styles.profileImage}
          />
          
          <View style={styles.profileInfo}>
            <Text style={styles.username}>Carlitos09</Text>
            <Text style={styles.bio}>soy la mera verga .</Text>
          </View>
        </View>

        <Postuser />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  content: {
    paddingBottom: 100,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#0d2a54',
    marginHorizontal: 15,
    marginTop: 15,
    borderRadius: 12,
    gap: 15,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ccc',
  },
  profileInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  username: {
    color: '#67c5ff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  bio: {
    color: '#fff',
    fontSize: 13,
    lineHeight: 18,
  },
});

export default Perfil;