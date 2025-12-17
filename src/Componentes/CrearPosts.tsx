import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { crearPublicacion } from './api';
import { obtenerUsuario } from './session';
interface Props {
  visible: boolean;
  onClose: () => void;
  onPostCreated: () => void;
}

const CrearPost: React.FC<Props> = ({ onClose, onPostCreated }) => {
  const [texto, setTexto] = useState('');

  const handleSubmit = async () => {
    if (!texto.trim()) {
      Alert.alert('Error', 'Escribe algo');
      return;
    }

    const user = await obtenerUsuario();
    if (!user) return;

    await crearPublicacion(texto, user.Usuario, user.Correo);

    setTexto('');
    onPostCreated();
    onClose();
  };

  return (
    <View>
      <TextInput
        placeholder="¿Qué estás pensando?"
        value={texto}
        onChangeText={setTexto}
      />
      <Button title="Publicar" onPress={handleSubmit} />
    </View>
  );
};

export default CrearPost;
