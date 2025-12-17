import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  Modal,
  RefreshControl,
  FlatList
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HeaderMenu from '../Componentes/HeaderMenu';
import styles from '../Styles/Styles';

// ==================== DEFINICIÓN DE TIPOS ====================
interface UsuarioType {
  id: string;
  Usuario: string;
  Correo: string;
  Rol?: string;
}

interface PublicacionType {
  _id: string;
  usuario: string;
  correo: string;
  texto: string;
  fecha: string;
  comentarios?: ComentarioType[];
}

interface ComentarioType {
  _id: string;
  usuario: string;
  correo: string;
  texto: string;
  fecha: string;
}

// ==================== COMPONENTE PRINCIPAL ====================
const Principal: React.FC = () => {
  // ==================== ESTADOS ====================
  const [usuario, setUsuario] = useState<UsuarioType | null>(null);
  const [publicaciones, setPublicaciones] = useState<PublicacionType[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [modalComentarioVisible, setModalComentarioVisible] = useState<boolean>(false);
  const [publicacionSeleccionada, setPublicacionSeleccionada] = useState<PublicacionType | null>(null);
  const [nuevoComentario, setNuevoComentario] = useState<string>('');
  const [comentarios, setComentarios] = useState<ComentarioType[]>([]);
  const [modalNuevaPublicacion, setModalNuevaPublicacion] = useState<boolean>(false);
  const [textoNuevaPublicacion, setTextoNuevaPublicacion] = useState<string>('');

  // ==================== EFFECTS ====================
  useEffect(() => {
    cargarUsuario();
    cargarPublicaciones();
  }, []);

  // ==================== FUNCIONES ====================
  const cargarUsuario = async (): Promise<void> => {
    try {
      const usuarioGuardado = await AsyncStorage.getItem('usuario');
      if (usuarioGuardado) {
        const userData: UsuarioType = JSON.parse(usuarioGuardado);
        setUsuario(userData);
      }
    } catch (error) {
      console.error('Error cargando usuario:', error);
    }
  };

  const cargarPublicaciones = async (): Promise<void> => {
    try {
      const usuarioData = await AsyncStorage.getItem('usuario');
      if (!usuarioData) return;
      
      const user: UsuarioType = JSON.parse(usuarioData);
      
      
      const API_URL = 'http://10.0.2.2:3000'; 
      // const API_URL = 'http://192.168.1.100:3000'; // Para dispositivo físico
      
      const response = await fetch(`${API_URL}/publicaciones`);
      
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      
      const data: PublicacionType[] = await response.json();
      
      // Filtrar para EXCLUIR las publicaciones del usuario actual
      const publicacionesOtros = data.filter(pub => 
        pub.correo !== user.Correo && pub.usuario !== user.Usuario
      );
      
     
      publicacionesOtros.sort((a, b) => 
        new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
      );
      
      // Cargar comentarios para cada publicación
      const publicacionesConComentarios = await Promise.all(
        publicacionesOtros.map(async (pub) => {
          try {
            const comentariosResponse = await fetch(`${API_URL}/comentarios/${pub._id}`);
            if (comentariosResponse.ok) {
              const comentariosData: ComentarioType[] = await comentariosResponse.json();
              return { ...pub, comentarios: comentariosData };
            }
          } catch (error) {
            console.error(`Error cargando comentarios para ${pub._id}:`, error);
          }
          return { ...pub, comentarios: [] };
        })
      );
      
      setPublicaciones(publicacionesConComentarios);
      
    } catch (error) {
      console.error('Error cargando publicaciones:', error);
      Alert.alert('Error', 'No se pudieron cargar las publicaciones');
    }
  };

  const cargarComentarios = async (postId: string): Promise<void> => {
    try {
      
      const API_URL = 'http://10.0.2.2:3000'; 
      // const API_URL = 'http://192.168.1.100:3000'; // Para dispositivo físico
      
      const response = await fetch(`${API_URL}/comentarios/${postId}`);
      
      if (response.ok) {
        const data: ComentarioType[] = await response.json();
        setComentarios(data);
      }
    } catch (error) {
      console.error('Error cargando comentarios:', error);
    }
  };

  const onRefresh = (): void => {
    setRefreshing(true);
    cargarPublicaciones().finally(() => setRefreshing(false));
  };

  const crearComentario = async (): Promise<void> => {
    if (!nuevoComentario.trim() || !publicacionSeleccionada || !usuario) {
      Alert.alert('Error', 'Escribe un comentario');
      return;
    }

    try {
      
      const API_URL = 'http://10.0.2.2:3000'; 
      // const API_URL = 'http://192.168.1.100:3000'; // Para dispositivo físico
      
      const response = await fetch(`${API_URL}/comentarios`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          postId: publicacionSeleccionada._id,
          usuario: usuario.Usuario,
          correo: usuario.Correo,
          texto: nuevoComentario
        }),
      });

      if (response.ok) {
        Alert.alert(' Éxito', 'Comentario agregado');
        setNuevoComentario('');
        setModalComentarioVisible(false);
        
        // Recargar comentarios
        await cargarComentarios(publicacionSeleccionada._id);
        
        // Actualizar la publicación localmente
        const nuevoComentarioLocal: ComentarioType = {
          _id: `temp-${Date.now()}`,
          usuario: usuario.Usuario,
          correo: usuario.Correo,
          texto: nuevoComentario,
          fecha: new Date().toISOString()
        };
        
        setPublicaciones(prev => prev.map(pub => 
          pub._id === publicacionSeleccionada._id 
            ? { 
                ...pub, 
                comentarios: [...(pub.comentarios || []), nuevoComentarioLocal] 
              }
            : pub
        ));
        
      } else {
        const errorText = await response.text();
        Alert.alert('Error', errorText);
      }
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  const crearPublicacion = async (): Promise<void> => {
    if (!textoNuevaPublicacion.trim() || !usuario) {
      Alert.alert('Error', 'Escribe algo para publicar');
      return;
    }

    try {
      
      const API_URL = 'http://10.0.2.2:3000'; 
      // const API_URL = 'http://192.168.1.100:3000'; // Para dispositivo físico
      
      const response = await fetch(`${API_URL}/publicaciones`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          usuario: usuario.Usuario,
          correo: usuario.Correo,
          texto: textoNuevaPublicacion
        }),
      });

      if (response.ok) {
        Alert.alert(' Éxito', 'Publicación creada');
        setTextoNuevaPublicacion('');
        setModalNuevaPublicacion(false);
        
        // Recargar publicaciones
        cargarPublicaciones();
      } else {
        const errorText = await response.text();
        Alert.alert('Error', errorText);
      }
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  const abrirModalComentarios = (pub: PublicacionType): void => {
    setPublicacionSeleccionada(pub);
    setComentarios(pub.comentarios || []);
    setModalComentarioVisible(true);
  };

  const darLike = (pubId: string): void => {
    Alert.alert('Like', 'Función de like próximamente');
    
  };

  
  if (!usuario) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Cargando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <HeaderMenu />
      
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
       
        {/* Botón Nueva Publicación */}
        <TouchableOpacity
          style={styles.newPostButton}
          onPress={() => setModalNuevaPublicacion(true)}
        >
          <Text style={styles.newPostButtonText}> Crear Publicación</Text>
        </TouchableOpacity>

        
      
        <View style={styles.publicacionesContainer}>
          <Text style={styles.sectionTitle}>
             Publicaciones de la Comunidad ({publicaciones.length})
          </Text>
          
          {publicaciones.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}> No hay publicaciones aún</Text>
              <Text style={styles.emptyText}>
                Sé el primero en compartir algo
              </Text>
            </View>
          ) : (
            publicaciones.map((pub) => (
              <View key={pub._id} style={styles.publicacionCard}>
              
                <View style={styles.publicacionHeader}>
                  <View style={styles.userInfo}>
                    <Image 
                      source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' }} 
                      style={styles.userAvatar}
                    />
                    <View style={styles.userDetails}>
                      <Text style={styles.publicacionUsuario}>@{pub.usuario}</Text>
                      <Text style={styles.publicacionCorreo}>{pub.correo}</Text>
                    </View>
                  </View>
                  <Text style={styles.publicacionFecha}>
                    {new Date(pub.fecha).toLocaleDateString('es-ES', {
                      day: 'numeric',
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </Text>
                </View>

             
                <Text style={styles.publicacionTexto}>{pub.texto}</Text>

              
                <View style={styles.publicacionActions}>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => darLike(pub._id)}
                  >
                    <Text style={styles.actionButtonText}>❤️ Like</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => abrirModalComentarios(pub)}
                  >
                    <Text style={styles.actionButtonText}>
                       Comentarios ({pub.comentarios?.length || 0})
                    </Text>
                  </TouchableOpacity>
                </View>

              
                {pub.comentarios && pub.comentarios.length > 0 && (
                  <View style={styles.comentariosPreview}>
                    <Text style={styles.comentariosTitle}>Comentarios recientes:</Text>
                    {pub.comentarios.slice(0, 2).map((com, index) => (
                      <View key={com._id || index} style={styles.comentarioPreview}>
                        <Text style={styles.comentarioUsuario}>@{com.usuario}:</Text>
                        <Text style={styles.comentarioTexto} numberOfLines={1}>
                          {com.texto}
                        </Text>
                      </View>
                    ))}
                    {pub.comentarios.length > 2 && (
                      <Text style={styles.moreComentarios}>
                        ...y {pub.comentarios.length - 2} más
                      </Text>
                    )}
                  </View>
                )}
              </View>
            ))
          )}
        </View>
      </ScrollView>

     
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalNuevaPublicacion}
        onRequestClose={() => setModalNuevaPublicacion(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Nueva Publicación</Text>
            
            <TextInput
              style={styles.modalInput}
              placeholder="¿Qué quieres compartir con la comunidad?"
              multiline
              numberOfLines={4}
              value={textoNuevaPublicacion}
              onChangeText={setTextoNuevaPublicacion}
            />
            
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalNuevaPublicacion(false)}
              >
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={crearPublicacion}
              >
                <Text style={[styles.modalButtonText, { color: 'white' }]}>
                  Publicar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal para Comentarios */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalComentarioVisible}
        onRequestClose={() => setModalComentarioVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { maxHeight: '80%' }]}>
            <Text style={styles.modalTitle}>
               Comentarios de @{publicacionSeleccionada?.usuario}
            </Text>
            
            {/* Lista de Comentarios */}
            <ScrollView style={styles.comentariosList}>
              {comentarios.length === 0 ? (
                <Text style={styles.emptyComentarios}>
                  No hay comentarios aún. ¡Sé el primero!
                </Text>
              ) : (
                comentarios.map((com) => (
                  <View key={com._id} style={styles.comentarioItem}>
                    <View style={styles.comentarioHeader}>
                      <Text style={styles.comentarioUsuario}>@{com.usuario}</Text>
                      <Text style={styles.comentarioFecha}>
                        {new Date(com.fecha).toLocaleDateString()}
                      </Text>
                    </View>
                    <Text style={styles.comentarioTexto}>{com.texto}</Text>
                  </View>
                ))
              )}
            </ScrollView>
            
        
            <View style={styles.nuevoComentarioContainer}>
              <TextInput
                style={styles.comentarioInput}
                placeholder="Escribe un comentario..."
                value={nuevoComentario}
                onChangeText={setNuevoComentario}
              />
              
              <View style={styles.comentarioButtons}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => setModalComentarioVisible(false)}
                >
                  <Text style={styles.modalButtonText}>Cerrar</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[styles.modalButton, styles.confirmButton]}
                  onPress={crearComentario}
                >
                  <Text style={[styles.modalButtonText, { color: 'white' }]}>
                    Comentar
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};


export default Principal;