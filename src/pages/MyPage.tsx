
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext"
import { useImage } from "../context/ImagesContext";
import { Image } from '../types/fetch.types';
import MyPageImages from "../components/MyPageImages";


function MyPage() {
  const { user } = useAuth();
  const [error, setError] = useState('');
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const { images, getImages } = useImage();

  //useEffect för att hämta in poster
  useEffect(() => {
    const fetchImages = async () => {
      try {
        getImages();

        setImagesLoaded(true);


      } catch (error) {
        setError("Det gick inte att hämta in bilder")

      }
    };
    fetchImages();
  }, []);

  return (
    <>
      <div style={{ opacity: imagesLoaded ? 1 : 0, transition: "opacity 0.5s", maxWidth: "100rem", width: "100%", margin: "4rem auto 20rem auto", padding: "0 1rem" }}>
        <h1>Min sida</h1>
        <h2>Inloggad</h2>
        <p>Välkommen {user?.firstname ? user.firstname : ""}</p>

        <p>Formulär</p>
        <p></p>
        <br />
        <br />
        <br />

        <p>Skriv ut som lista</p>


        <div style={{ maxWidth: "100rem", width: "100%", margin: "0 auto" }}>
          <h1 style={{ marginBottom: "2rem", marginTop: "4rem" }}>Bildsamling</h1>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}>
            {images && images.length > 0 ? (
              images.filter((image: Image) => image.userId?._id === user?._id)
                .map((image: Image) => (
                  <MyPageImages myPageImagesProp = {image} key={image._id} />

                ))
            ) :
              <p>{error}</p>
            }

          </div>


        </div >
      </div>
    </>
  )
}

export default MyPage