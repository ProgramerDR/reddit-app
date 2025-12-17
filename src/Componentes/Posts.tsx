import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import PostsStyles from '../Styles/PostsStyles';
import { crearComentario } from '../Componentes/api';
import { obtenerUsuario } from './session';

interface Props {
  postId: string;
  username: string;
  text: string;
  fecha?: string;
}

const Posts: React.FC<Props> = ({ postId, username, text, fecha }) => {
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState<any[]>([]);

  const handleAddComment = async () => {
    if (!commentText.trim()) return;

    const user = await obtenerUsuario();
    if (!user) return;

    await crearComentario(postId, commentText, user.Usuario, user.Correo);

    setComments([
      ...comments,
      { usuario: user.Usuario, texto: commentText },
    ]);

    setCommentText('');
  };

  return (
    <View style={PostsStyles.card}>
      {/* HEADER */}
      <View style={PostsStyles.header}>
        <Text style={PostsStyles.usuario}>@{username}</Text>
        {fecha && <Text style={PostsStyles.fecha}>{fecha}</Text>}
      </View>

      {/* TEXTO */}
      <Text style={PostsStyles.texto}>{text}</Text>

      {/* COMENTARIOS */}
      <View style={PostsStyles.comentariosContainer}>
        {comments.map((c, i) => (
          <Text key={i} style={PostsStyles.comentario}>
            <Text style={PostsStyles.comentarioUsuario}>
              @{c.usuario}:{' '}
            </Text>
            {c.texto}
          </Text>
        ))}

        <TextInput
          style={PostsStyles.input}
          placeholder="Escribe un comentario..."
          value={commentText}
          onChangeText={setCommentText}
        />

        <TouchableOpacity
          style={PostsStyles.boton}
          onPress={handleAddComment}
        >
          <Text style={PostsStyles.botonTexto}>Comentar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Posts;
