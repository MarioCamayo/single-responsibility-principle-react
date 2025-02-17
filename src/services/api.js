export const fetchPosts = async()=>{

    try{
      const response = await fetch('https://jsonplaceholder.typicode.com/posts')
      if(!response.ok){// ✅ Verificamos si la respuesta es incorrecta
        throw new Error(`Error:${response.status}`)
      }
      return response.json() // ✅ Esperamos los datos correctamente


    }catch(err){
      console.error('Error:', err)
      return [] // ✅ Retornamos un array vacío si hay un error
    }
  }


