import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const Postuser = () => {
  const [postuser] = useState([
    
    {
      id: 1,
      text: 'blah blah blah blah blah blah blah blah blah blah blah blah',
      avatar: 'https://via.placeholder.com/50'
    }

  ]);

  return (
    <View style={styles.container}>
      <View style={styles.postsWrapper}>
        {postuser.map((post) => (
          <View key={post.id} style={styles.postCard}>
            {/* Avatar a la izquierda */}
            <Image
              source={{ uri: post.avatar }}
              style={styles.avatar}
            />
            
            {/* Contenido del post */}
            <View style={styles.postContent}>
              <Text style={styles.postText}>{post.text}</Text>
              
              {/* Botón de ver respuestas */}
              <TouchableOpacity 
                style={styles.viewRepliesBtn}
              >
                <Text style={styles.btnText}>Ver respuestas</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  postsWrapper: {
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  postCard: {
    backgroundColor: '#0d2a54',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 15,
    // Sombra para darle profundidad
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ccc',
  },
  postContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  postText: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  viewRepliesBtn: {
    backgroundColor: '#0098ff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  btnText: {
    color: 'white',
    fontSize: 13,
    fontWeight: '600',
  },
});

export default Postuser;