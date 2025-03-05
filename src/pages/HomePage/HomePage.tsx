import { useEffect, useState } from 'react'
import { useImage } from '../../context/ImagesContext';
import { Image } from '../../types/fetch.types';
import { Link } from 'react-router-dom';
import HomeStyle from "../HomePage/HomeStyle.module.css";
function HomePage() {
  const [error, setError] = useState('');
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const { images, getImages } = useImage();

  //useEffect för att hämta in poster
  useEffect(() => {
    const fetchImages = async () => {
      try {
        await getImages()
        setImagesLoaded(true);

      } catch (error) {
        setError("Det gick inte att hämta in bilder")

      }
    };
    fetchImages();
  }, []);

  console.log("Images in HomePage:", images);

  const imageWrap: object = {
    maxHeight: "30rem",
    width: "100%",
    display: "block",
    objectFit: "cover"
  }

  const imageContainer: object = {
    display: "flex",
    flexWrap: "wrap",
    gap: "4rem",
    justifyContent: "flex-start",
    width: "100%",
    marginBottom: "20rem"
  }

  return (
    <>
      <div style={{ maxWidth: "100rem", width: "100%", margin: "0 auto", opacity: imagesLoaded ? 1 : 0, transition: "opacity 0.5s", padding: "0 1rem"}}>
        <h1 style={{ marginBottom: "2rem", marginTop: "4rem" }}  className={HomeStyle.headerH1}>PinCollect</h1>

        <div style={imageContainer} className={HomeStyle.responsiveImg}>
          {images && images.length > 0 ? (
            images.map((image: Image) => (
              <div key={image._id} style={{ position: "relative"}} className={HomeStyle.container}>
                <Link to={`/${image._id}`}>
                  <img src={`http://localhost:3000/file/${image.fileName}`} alt={image.title} style={imageWrap} />

                  <div className={HomeStyle.overlay}>

                  </div>
                  <h2 className={HomeStyle.text}>{image.title}</h2>
                </Link>
              </div>

            ))
          ) :
            <p>{error}</p>
          }

        </div>
      </div >
    </>
  )
}

export default HomePage