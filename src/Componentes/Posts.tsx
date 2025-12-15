import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';

interface PostsProps {
  username?: string;
  text?: string;
  avatar?: string;
}

const Posts: React.FC<PostsProps> = ({ 
  username = 'Carlitos09', 
  text = 'blah blah blah blah blah blah blah blah blah blah blah blah',
  avatar = 'https://via.placeholder.com/55'
}) => {
  const [showReplies, setShowReplies] = useState(false);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [replies, setReplies] = useState([
    {
      id: 1,
      username: 'EteSech',
      text: 'blah blah blah blah blah blah blah blah blah blah blah blah',
      avatar: 'https://via.placeholder.com/55'
    }
  ]);

  const handleAddComment = () => {
    if (commentText.trim()) {
      const newReply = {
        id: replies.length + 1,
        username: 'Usuario',
        text: commentText,
        avatar: 'https://via.placeholder.com/55'
      };
      setReplies([...replies, newReply]);
      setCommentText('');
      setShowCommentBox(false);
      setShowReplies(true);
    }
  };

  return (
    <View style={styles.postContainer}>
      {/* Post principal */}
      <View style={styles.postCard}>
        <Image
          source={{ uri: avatar }}
          style={styles.avatar}
        />

        <View style={styles.postContent}>
          <Text style={styles.username}>{username}</Text>
          <Text style={styles.text}>{text}</Text>
        </View>

        <View style={styles.votes}>
          <TouchableOpacity>
            <Text style={styles.up}>▲</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.down}>▼</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Botones de acción */}
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => setShowReplies(!showReplies)}
        >
          <Text style={styles.actionBtnText}>Ver respuestas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => setShowCommentBox(!showCommentBox)}
        >
          <Text style={styles.actionBtnText}>Comentar</Text>
        </TouchableOpacity>
      </View>

      {/* Caja de comentario */}
      {showCommentBox && (
        <View style={styles.commentBox}>
          <TextInput
            value={commentText}
            onChangeText={setCommentText}
            placeholder="Escribe tu comentario..."
            placeholderTextColor="#999"
            multiline
            style={styles.commentInput}
          />
          <View style={styles.commentActions}>
            <TouchableOpacity
              onPress={handleAddComment}
              style={styles.submitBtn}
            >
              <Text style={styles.btnText}>Enviar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setShowCommentBox(false);
                setCommentText('');
              }}
              style={styles.cancelBtn}
            >
              <Text style={styles.btnText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Respuestas */}
      {showReplies && (
        <View style={styles.repliesSection}>
          {replies.map((reply) => (
            <View key={reply.id} style={styles.replyWrapper}>
              <View style={styles.replyLine} />

              <View style={styles.replyCard}>
                <Image 
                  source={{ uri: reply.avatar }} 
                  style={styles.avatar} 
                />

                <View style={styles.postContent}>
                  <Text style={styles.username}>{reply.username}</Text>
                  <Text style={styles.text}>{reply.text}</Text>
                </View>

                <View style={styles.votes}>
                  <TouchableOpacity>
                    <Text style={styles.up}>▲</Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Text style={styles.down}>▼</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    width: '90%',
    alignSelf: 'center',
    marginVertical: 20,
  },
  postCard: {
    backgroundColor: '#0d2a54',
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderLeftWidth: 8,
    borderLeftColor: '#0098ff',
  },
  avatar: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    marginRight: 10,
    backgroundColor: '#ccc',
  },
  postContent: {
    backgroundColor: '#ffffff',
    padding: 10,
    flex: 1,
    borderRadius: 8,
  },
  username: {
    color: '#67c5ff',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    color: '#000',
    fontSize: 14,
  },
  votes: {
    justifyContent: 'center',
    marginLeft: 10,
  },
  up: {
    color: 'red',
    fontSize: 22,
    marginBottom: 5,
  },
  down: {
    color: 'cyan',
    fontSize: 22,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  actionBtn: {
    backgroundColor: '#006bff',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
  },
  actionBtnText: {
    color: 'white',
    fontWeight: '600',
  },
  commentBox: {
    backgroundColor: '#0d2a54',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderLeftWidth: 8,
    borderLeftColor: '#0098ff',
  },
  commentInput: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 10,
    minHeight: 80,
    color: '#000',
    fontSize: 14,
    textAlignVertical: 'top',
    marginBottom: 10,
  },
  commentActions: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'flex-end',
  },
  submitBtn: {
    backgroundColor: '#27ae60',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  cancelBtn: {
    backgroundColor: '#95a5a6',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  btnText: {
    color: 'white',
    fontWeight: '600',
  },
  repliesSection: {
    marginTop: 10,
  },
  replyWrapper: {
    marginLeft: 40,
    position: 'relative',
  },
  replyLine: {
    width: 2,
    height: 80,
    backgroundColor: 'white',
    position: 'absolute',
    left: -20,
    top: 15,
  },
  replyCard: {
    backgroundColor: '#0d2a54',
    borderLeftWidth: 8,
    borderLeftColor: '#0098ff',
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    flexDirection: 'row',
  },
});

export default Posts;