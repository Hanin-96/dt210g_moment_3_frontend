import { useEffect, useState } from 'react'
import { useImage } from '../context/ImagesContext';
import { Image } from '../types/fetch.types';
function HomePage() {
  const [error, setError] = useState('');

  const { images, getImages } = useImage();

  //useEffect för att hämta in poster
  useEffect(() => {
    const fetchImages = async () => {
      try {
        await getImages()

      } catch (error) {
        setError("Det gick inte att hämta in bilder")

      }
    };
    fetchImages();
  }, []);

  console.log("Images in HomePage:", images); 

  const imageWrap : object= {
    maxHeight: "20rem"
  }

  const imageContainer : object= {
    display: "flex",
    flexWrap: "wrap",
    gap: "2rem",
    justifyContent: "center"
  }



  return (
    <>
      <h1>PinCollage</h1>
      <h2>Startsida</h2>

      <div style={imageContainer}>
        {images && images.length > 0 ? (
          images.map((image: Image) => (
            <div key={image._id}>
              <h2>{image.title}</h2>
              <p>{image.description}</p>
              <img src={`http://localhost:3000/image/${image.fileName}`} alt={image.title} style={imageWrap} />
            </div>
          ))
        ) : (
          <p>{error}</p>
        )}

      </div>
    </>
  )
}

export default HomePage