import { useEffect, useState } from 'react'
import { PostImageInterface } from '../interfaces/image.interface';
function HomePage() {
     const [storedPosts, setStoredPosts] = useState<PostImageInterface[]>([]);
    
      //useEffect för att hämta in poster
      useEffect(() => {
        getTodos();
      }, []);
    
      const getTodos = async () => {
        try {
          const response = await fetch("https://dt210g-moment-3-api.onrender.com/images", {
            method: "GET",
            headers: {
              "Content-type": "application/json"
            }
          });
    
          if (!response.ok) {
            throw Error("Misslyckades hämtning av poster" + response.status);
          } else {
            const postData = await response.json();
            const storedPosts = postData.images;
            setStoredPosts(storedPosts);
            return storedPosts;
          }
    
        }
        catch (error) {
          throw error;
        }
      }

  return (
    <>
    <h1>PinCollage</h1>
    <h2>Startsida</h2>

    <div>
            {storedPosts.map((post: PostImageInterface) => (
              <div key={post._id}>
                <h2>{post.title}</h2>
                <p>{post.description}</p>
                <img src={`http://localhost:3000/image/${post.fileName}`} alt={post.title} style={{maxWidth: "300px"}}/>
              </div>
            ))}
    
          </div>
    </>
  )
}

export default HomePage