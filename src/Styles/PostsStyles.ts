import { StyleSheet } from 'react-native';

const PostsStyles = StyleSheet.create({
  card: {
  backgroundColor: '#000',
  borderRadius: 14,
  padding: 16,
  marginVertical: 10,
  marginHorizontal: 16,
  borderWidth: 1,
  borderColor: '#222',
},


  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },

  usuario: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0052cc',
  },

  fecha: {
    fontSize: 12,
    color: '#777',
  },

  texto: {
 fontSize: 15,
  color: '#fff',
  },

  comentariosContainer: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#000000ff',
    paddingTop: 10,
  },

  comentario: {
    fontSize: 15,
  color: '#fff',
  },

  comentarioUsuario: {
    fontWeight: '600',
    color: '#0052cc',
  },

  input: {
       backgroundColor: '#000',
    color: '#fff', 
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 10,
    padding: 12,
    marginTop: 10,
    fontSize: 15,
  },

  boton: {
    backgroundColor: '#0052cc',
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 8,
    alignItems: 'center',
  },

  botonTexto: {
    color: '#000000ff',
    fontWeight: '700',
    fontSize: 14,
  },
});

export default PostsStyles;
