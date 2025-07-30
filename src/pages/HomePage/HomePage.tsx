import { useEffect, useState } from 'react'
import { useImage } from '../../context/ImagesContext';
import { Image } from '../../types/fetch.types';
import { Link } from 'react-router-dom';
import HomeStyle from "../HomePage/HomeStyle.module.css";
import '../../components/Loading/LoadingSpinner.css';
function HomePage() {
  const [error, setError] = useState('');
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const { images, getImages } = useImage();
  //Loading
  const [loadingSpinner, setLoadingSpinner] = useState(false);

  //useEffect för att hämta in poster
  useEffect(() => {
    const fetchImages = async () => {
      setLoadingSpinner(true);
      try {
        await getImages()
        
        setImagesLoaded(true);
        setLoadingSpinner(false);

      } catch (error) {
        setLoadingSpinner(false);
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
    objectFit: "cover",
    boxShadow: "0px 2.5px 5px -3px rgba(30, 30, 30, 0.2)"
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
      <div style={{ maxWidth: "100rem", width: "100%", margin: "0 auto", padding: "0 1rem" }}>
        <h1 style={{ marginTop: "10rem", marginBottom: "5rem", textAlign: "center" }}>Bildsamling</h1>
        {loadingSpinner && <div className="loadingSpinner"></div>}
        <div style={imageContainer} className={HomeStyle.responsiveImg}>
          {images && images.length > 0 ? (
            images.map((image: Image) => (
              <div key={image._id} style={{ position: "relative" }} className={HomeStyle.container}>
                <Link to={`/${image._id}`}>
                  <img src={image.imageUrl} alt={image.title} style={imageWrap} />

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