const API_URL = 'http://10.0.2.2:3000';

// PUBLICACIONES
export const obtenerPublicaciones = async () => {
  const res = await fetch(`${API_URL}/publicaciones`);
  if (!res.ok) throw new Error('Error al cargar publicaciones');
  return res.json();
};

export const crearPublicacion = async (
  texto: string,
  usuario: string,
  correo: string
) => {
  const res = await fetch(`${API_URL}/publicaciones`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ texto, usuario, correo }),
  });

  if (!res.ok) throw new Error('Error al crear publicación');
};

// COMENTARIOS
export const crearComentario = async (
  postId: string,
  texto: string,
  usuario: string,
  correo: string
) => {
  await fetch(`${API_URL}/comentarios`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ postId, texto, usuario, correo }),
  });
};
