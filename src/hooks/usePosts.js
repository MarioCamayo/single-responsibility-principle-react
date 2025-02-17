import {useState, useEffect} from 'react'
import {fetchPosts}from '../services/api'

export const usePosts = ()=>{
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

    
    useEffect(()=>{
      const getPosts = async()=>{
        setLoading(true)
        try{
          const data = await fetchPosts()
          setPosts(data)
        }catch(err){
          setError(err.message)
    
        }finally{
          setLoading(false)
        }
        
      }
      getPosts()
    }, [])

  return {posts, loading, error}

}