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
  RefreshControl
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HeaderMenu from '../Componentes/HeaderMenu';
import styles from '../Styles/Styles.tsx';

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
}

// ==================== COMPONENTE PRINCIPAL ====================
const Perfil: React.FC = () => {
  // ==================== ESTADOS ====================
  const [usuario, setUsuario] = useState<UsuarioType | null>(null);
  const [publicaciones, setPublicaciones] = useState<PublicacionType[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalEditVisible, setModalEditVisible] = useState<boolean>(false);
  const [nuevaPublicacion, setNuevaPublicacion] = useState<string>('');
  const [publicacionEditando, setPublicacionEditando] = useState<PublicacionType | null>(null);
  const [textoEditando, setTextoEditando] = useState<string>('');

  // ==================== EFFECTS ====================
  useEffect(() => {
    cargarUsuario();
    cargarPublicaciones();
  }, []);

  useEffect(() => {
    console.log('Publicaciones actualizadas:', publicaciones.length);
  }, [publicaciones]);

  // ==================== FUNCIONES ====================
  const cargarUsuario = async (): Promise<void> => {
    try {
      const usuarioGuardado = await AsyncStorage.getItem('usuario');
      if (usuarioGuardado) {
        const userData: UsuarioType = JSON.parse(usuarioGuardado);
        setUsuario(userData);
        console.log('Usuario cargado:', userData);
      } else {
        console.log('No se encontró usuario en AsyncStorage');
      }
    } catch (error) {
      console.error('Error cargando usuario:', error);
    }
  };

  const cargarPublicaciones = async (): Promise<void> => {
    try {
      const usuarioData = await AsyncStorage.getItem('usuario');
      if (!usuarioData) {
        console.log('No hay usuario para cargar publicaciones');
        return;
      }
      
      const user: UsuarioType = JSON.parse(usuarioData);
      console.log('Cargando publicaciones para:', user.Correo);
      
      
      const API_URL = 'http://10.0.2.2:3000'; 
      // const API_URL = 'http://192.168.1.100:3000'; 
      
      const response = await fetch(`${API_URL}/publicaciones`);
      
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      
      const data: PublicacionType[] = await response.json();
      console.log('Total publicaciones API:', data.length);
      
      // Filtrar solo las del usuario actual
      const misPublicaciones = data.filter(pub => 
        pub.correo === user.Correo || pub.usuario === user.Usuario
      );
      
      console.log('Publicaciones del usuario:', misPublicaciones.length);
      
      // Ordenar por fecha (más reciente primero)
      misPublicaciones.sort((a, b) => 
        new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
      );
      
      setPublicaciones(misPublicaciones);
      
    } catch (error) {
      console.error('Error cargando publicaciones:', error);
      Alert.alert('Error', 'No se pudieron cargar las publicaciones');
    }
  };

  const onRefresh = (): void => {
    console.log('Refrescando...');
    setRefreshing(true);
    cargarPublicaciones().finally(() => setRefreshing(false));
  };

  const crearPublicacion = async (): Promise<void> => {
    console.log('=== Creando publicación ===');
    
    if (!nuevaPublicacion.trim()) {
      Alert.alert('Error', 'Escribe algo para publicar');
      return;
    }

    if (!usuario) {
      Alert.alert('Error', 'Usuario no encontrado');
      return;
    }

    try {
      console.log('Usuario para publicación:', usuario);
      
      // IMPORTANTE: Cambia esta URL por tu IP real
      const API_URL = 'http://10.0.2.2:3000'; // Para emulador
      // const API_URL = 'http://192.168.1.100:3000'; // Para dispositivo físico
      
      const response = await fetch(`${API_URL}/publicaciones`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          usuario: usuario.Usuario,
          correo: usuario.Correo,
          texto: nuevaPublicacion
        }),
      });

      console.log('Respuesta API:', response.status);

      if (response.ok) {
        // Crear publicación local inmediatamente
        const nuevaPubLocal: PublicacionType = {
          _id: `temp-${Date.now()}`,
          usuario: usuario.Usuario,
          correo: usuario.Correo,
          texto: nuevaPublicacion,
          fecha: new Date().toISOString()
        };
        
        console.log('Publicación local creada:', nuevaPubLocal);
        
        // Actualizar estado INMEDIATAMENTE
        setPublicaciones(prev => [nuevaPubLocal, ...prev]);
        
        Alert.alert(' Éxito', 'Publicación creada');
        setNuevaPublicacion('');
        setModalVisible(false);
        
        // Refrescar desde API después de 1 segundo
        setTimeout(() => {
          cargarPublicaciones();
        }, 1000);
        
      } else {
        const errorText = await response.text();
        Alert.alert('Error del servidor', errorText);
      }
      
    } catch (error: any) {
      console.error('Error completo:', error);
      Alert.alert('Error de conexión', error.message);
    }
  };

  const editarPublicacion = async (): Promise<void> => {
    if (!textoEditando.trim() || !publicacionEditando) {
      Alert.alert('Error', 'El texto no puede estar vacío');
      return;
    }

    if (!usuario) {
      Alert.alert('Error', 'Usuario no encontrado');
      return;
    }

    try {
    
      const API_URL = 'http://10.0.2.2:3000'; 
      // const API_URL = 'http://192.168.1.100:3000'; 
      
      const response = await fetch(`${API_URL}/publicaciones/${publicacionEditando._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          texto: textoEditando,
          correo: usuario.Correo
        }),
      });

      if (response.ok) {
        Alert.alert(' Éxito', 'Publicación actualizada');
        setModalEditVisible(false);
        setPublicacionEditando(null);
        setTextoEditando('');
        
        // Actualizar la lista
        cargarPublicaciones();
      } else {
        const errorText = await response.text();
        Alert.alert('Error', errorText);
      }
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  const eliminarPublicacion = async (publicacion: PublicacionType): Promise<void> => {
    Alert.alert(
      'Confirmar',
      '¿Seguro que quieres eliminar esta publicación?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              if (!usuario) {
                Alert.alert('Error', 'Usuario no encontrado');
                return;
              }

             
              const API_URL = 'http://10.0.2.2:3000'; 
              // const API_URL = 'http://192.168.1.100:3000'; 
              
              const response = await fetch(`${API_URL}/publicaciones/${publicacion._id}`, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  correo: usuario.Correo,
                  rol: usuario.Rol || 'user'
                }),
              });

              if (response.ok) {
                Alert.alert(' Éxito', 'Publicación eliminada');
                // Remover del estado local
                setPublicaciones(prev => 
                  prev.filter(p => p._id !== publicacion._id)
                );
              } else {
                const errorText = await response.text();
                Alert.alert('Error', errorText);
              }
            } catch (error: any) {
              Alert.alert('Error', error.message);
            }
          }
        }
      ]
    );
  };

  const abrirModalEditar = (pub: PublicacionType): void => {
    setPublicacionEditando(pub);
    setTextoEditando(pub.texto);
    setModalEditVisible(true);
  };

  // ==================== RENDER ====================
  if (!usuario) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Cargando perfil...</Text>
      </View>
    );
  }

  const avatarUrl = 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png';

  return (
    <View style={styles.container}>
      <HeaderMenu />
      
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Encabezado del Perfil */}
        <View style={styles.profileHeader}>
          <Image source={{ uri: avatarUrl }} style={styles.avatar} />
          <View style={styles.userInfo}>
            <Text style={styles.username}>@{usuario.Usuario}</Text>
            <Text style={styles.email}>{usuario.Correo}</Text>
            <Text style={styles.role}>Rol: {usuario.Rol || 'user'}</Text>
          </View>
        </View>

        {/* Estadísticas */}
        <View style={styles.statsCard}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{publicaciones.length}</Text>
            <Text style={styles.statLabel}>Publicaciones</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Seguidores</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Siguiendo</Text>
          </View>
        </View>

        {/* Botón Nueva Publicación */}
        <TouchableOpacity
          style={styles.newPostButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.newPostButtonText}>+ Nueva Publicación</Text>
        </TouchableOpacity>

        {/* Lista de Publicaciones */}
        <View style={styles.publicacionesContainer}>
          <Text style={styles.sectionTitle}>Mis Publicaciones ({publicaciones.length})</Text>
          
          {publicaciones.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}> No tienes publicaciones aún</Text>
              <Text style={styles.emptySubtext}>Crea tu primera publicación</Text>
            </View>
          ) : (
            publicaciones.map((pub) => (
              <View key={pub._id} style={styles.publicacionCard}>
                <View style={styles.publicacionHeader}>
                  <View style={styles.userInfoRow}>
                    <Text style={styles.publicacionUsuario}>@{pub.usuario}</Text>
                    <Text style={styles.publicacionCorreo}>{pub.correo}</Text>
                  </View>
                  <Text style={styles.publicacionFecha}>
                    {new Date(pub.fecha).toLocaleDateString('es-ES')}
                  </Text>
                </View>
                
                <Text style={styles.publicacionTexto}>{pub.texto}</Text>
                
                <View style={styles.publicacionActions}>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => abrirModalEditar(pub)}
                  >
                    <Text style={styles.actionButtonText}> Editar</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={[styles.actionButton, styles.deleteButton]}
                    onPress={() => eliminarPublicacion(pub)}
                  >
                    <Text style={styles.actionButtonText}> Eliminar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>

      {/* Modal para Nueva Publicación */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Nueva Publicación</Text>
            
            <TextInput
              style={styles.modalInput}
              placeholder="¿Qué quieres compartir?"
              multiline
              numberOfLines={4}
              value={nuevaPublicacion}
              onChangeText={setNuevaPublicacion}
            />
            
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={crearPublicacion}
              >
                <Text style={[styles.modalButtonText, styles.confirmButtonText]}>
                  Publicar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal para Editar Publicación */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalEditVisible}
        onRequestClose={() => setModalEditVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Editar Publicación</Text>
            
            <TextInput
              style={styles.modalInput}
              placeholder="Edita tu publicación"
              multiline
              numberOfLines={4}
              value={textoEditando}
              onChangeText={setTextoEditando}
            />
            
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalEditVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={editarPublicacion}
              >
                <Text style={[styles.modalButtonText, styles.confirmButtonText]}>
                  Guardar Cambios
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};


export default Perfil;