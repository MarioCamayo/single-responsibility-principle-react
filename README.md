📌 Aplicación del Principio de Responsabilidad Única (SRP) en React
🎯 Principio de Responsabilidad Única (SRP)
El Principio de Responsabilidad Única (Single Responsibility Principle - SRP) establece que cada módulo o componente debe tener una única razón para cambiar. En otras palabras, cada archivo debe cumplir solo una función específica.

En este proyecto, aplicamos SRP separando las responsabilidades en tres archivos distintos:

🗂 Estructura del código
bash
Copiar
Editar
/src
 ├── /services
 │    ├── api.js           # 📡 Encargado de obtener datos desde la API
 ├── /hooks
 │    ├── usePosts.js      # 🎣 Hook que maneja la lógica de estado y llamadas a la API
 ├── /components
 │    ├── PostsList.js     # 🖥 Componente de UI que muestra la lista de posts
 ├── App.js
📡 1. Servicio para obtener datos de la API (services/api.js)
Este archivo se encarga exclusivamente de la obtención de datos desde la API.
Aquí no se maneja estado ni renderizado, solo la comunicación con el servidor.

js
Copiar
Editar
export const fetchPosts = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Error al obtener posts:", error);
    return [];
  }
};
✅ Beneficio: Se puede reutilizar en cualquier parte del proyecto sin depender de React.

🎣 2. Custom Hook para manejar estado y lógica de datos (hooks/usePosts.js)
Este hook se encarga de manejar la lógica de estado, realizar la solicitud a la API y gestionar los errores.

js
Copiar
Editar
import { useState, useEffect } from "react";
import { fetchPosts } from "../services/api";

export const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPosts = async () => {
      setLoading(true);
      try {
        const data = await fetchPosts();
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getPosts();
  }, []);

  return { posts, loading, error };
};
✅ Beneficio: Separa la lógica de obtención de datos de la UI, facilitando pruebas y mantenimiento.

🖥 3. Componente de UI para mostrar los posts (components/PostsList.js)
Este componente solo se encarga de mostrar la lista de posts en la interfaz de usuario.
No contiene lógica de estado ni llamadas a la API.

js
Copiar
Editar
import { usePosts } from "../hooks/usePosts";

export const PostsList = () => {
  const { posts, loading, error } = usePosts();

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <h2>Lista de Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </>
  );
};
✅ Beneficio: Se enfoca solo en la presentación y facilita la reutilización del componente en otras partes de la aplicación.

🚀 Beneficios de aplicar SRP
✔ Código más limpio y organizado
✔ Facilita el mantenimiento y escalabilidad
✔ Reutilización de código en diferentes partes del proyecto
✔ Mejor separación entre lógica de negocio y presentación

🏁 Conclusión
Este enfoque basado en SRP permite que cada archivo tenga una única responsabilidad, lo que mejora la modularidad, reutilización y mantenibilidad del código en React. 🎯🚀

