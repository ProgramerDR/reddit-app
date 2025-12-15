import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import Menu from '../Componentes/Menu';
import Posts from '../Componentes/Posts';
import ChatBoth from '../Componentes/ChatBoth';
import CrearPost from '../Componentes/CrearPosts';

const Principal = ({ navigation }: any) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [publicaciones, setPublicaciones] = useState([
    {
      id: 1,
      username: 'Carlitos09',
      text: 'blah blah blah blah blah blah blah blah blah blah blah blah',
      avatar: 'https://via.placeholder.com/55'
    }
  ]);

  const handleCreatePost = (text: string) => {
    const newPost = {
      id: publicaciones.length + 1,
      username: 'Usuario', // Aquí después pondrás el nombre del usuario logueado
      text: text,
      avatar: 'https://via.placeholder.com/55'
    };
    setPublicaciones([newPost, ...publicaciones]);
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Menu navigation={navigation} />
        
        {/* Renderiza todas las publicaciones */}
        {publicaciones.map((post) => (
          <Posts 
            key={post.id}
            username={post.username}
            text={post.text}
            avatar={post.avatar}
          />
        ))}
      </ScrollView>
      
      {/* Botón flotante para crear publicación */}
      <TouchableOpacity
        style={styles.createButton}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.8}
      >
        <Text style={styles.createButtonText}>+</Text>
      </TouchableOpacity>

      {/* Modal para crear publicación */}
      <CrearPost
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleCreatePost}
      />
      
      <ChatBoth />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingBottom: 100,
  },
  createButton: {
    position: 'absolute',
    bottom: 20, // ← Mismo bottom que el ChatBot
    left: 20,   // ← A la izquierda
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#0098ff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#0098ff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
  },
  createButtonText: {
    color: 'white',
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 36,
  },
});

export default Principal;