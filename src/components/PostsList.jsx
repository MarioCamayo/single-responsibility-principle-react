import { usePosts }from '../hooks/usePosts'

export const PostsList = ()=>{

  const { posts, loading, error } = usePosts()

  if(loading) return <p>Cargando...</p>
  if(error) return <p>Error:{error}</p>

  return(
    <>
      <h2>Lista de Posts</h2>
      <ul>
       
          {posts.map(post=>(
             <li key={post.id}>
               {post.title}

             </li>
          ))
        }
       
      </ul>

    </>

  )
}