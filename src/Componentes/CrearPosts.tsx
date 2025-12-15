import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface CrearPostProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (text: string) => void;
}

const CrearPost: React.FC<CrearPostProps> = ({ visible, onClose, onSubmit }) => {
  const [postText, setPostText] = useState('');

  const handleSubmit = () => {
    if (postText.trim()) {
      onSubmit(postText);
      setPostText('');
      onClose();
    } else {
      Alert.alert('Error', 'Escribe algo antes de publicar');
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <LinearGradient
            colors={['#0098ff', '#0052cc']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.modalContent}
          >
            <Text style={styles.modalTitle}>Crear Publicación</Text>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textArea}
                placeholder="¿Qué quieres compartir?"
                placeholderTextColor="rgba(0, 0, 0, 0.5)"
                value={postText}
                onChangeText={setPostText}
                multiline
                maxLength={500}
              />
              <Text style={styles.charCount}>{postText.length}/500</Text>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.publishBtn}
                onPress={handleSubmit}
                activeOpacity={0.8}
              >
                <Text style={styles.publishBtnText}>Publicar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => {
                  setPostText('');
                  onClose();
                }}
                activeOpacity={0.8}
              >
                <Text style={styles.cancelBtnText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    maxWidth: 500,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 20,
    shadowColor: '#0098ff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
  },
  modalContent: {
    padding: 25,
  },
  modalTitle: {
    color: 'white',
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  textArea: {
    color: '#000',
    fontSize: 16,
    minHeight: 150,
    textAlignVertical: 'top',
    marginBottom: 10,
  },
  charCount: {
    color: '#666',
    fontSize: 12,
    textAlign: 'right',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 15,
  },
  publishBtn: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  publishBtnText: {
    color: '#0052cc',
    fontWeight: '700',
    fontSize: 16,
  },
  cancelBtn: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  cancelBtnText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
});

export default CrearPost;