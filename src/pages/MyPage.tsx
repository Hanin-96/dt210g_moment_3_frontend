
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext"
import { useImage } from "../context/ImagesContext";
import { Image, PostImage } from '../types/fetch.types';
import MyPageImages from "../components/MyPagesImages/MyPageImages";
import PostModal from "../components/Modal/PostModal";
import ModalStyle from "../components/Modal/ModalStyle.module.css";


function MyPage() {
  const { user } = useAuth();
  const [error, setError] = useState('');
  const { images, getImages, postImage } = useImage();
  const [isLoading, setIsLoading] = useState(true);

  //State för att visa modal
  const [showModal, setShowModal] = useState(false);

  if (!user) {
    return <div className={ModalStyle.loadingSpinner}></div>;
  }

  //useEffect för att hämta in poster
  useEffect(() => {
    const fetchImages = async () => {
      try {
        setIsLoading(true);
        if (user) {
          await getImages();
        }

        setIsLoading(false);


      } catch (error) {
        setError("Det gick inte att hämta in bilder")

      } finally {
        setIsLoading(false);
      }
    };
    fetchImages();

  }, [user]);

  const addBtn: object = {
    backgroundColor: "#1e1e1e",
    color: "white",
    padding: "1rem",
    border: "none",
    borderRadius: "0.5rem",
    cursor: "pointer",
    width: "100%",
    maxWidth: "30rem",
    marginBottom: "5rem"
  }


  return (
    <>
      {user &&
        <div style={{ maxWidth: "100rem", width: "100%", margin: "4rem auto 20rem auto", padding: "0 1rem" }}>
          <h1>Min sida</h1>
          <h2>Inloggad, {user?.username ? user.username : ""}</h2>

          <div style={{ maxWidth: "100rem", width: "100%", margin: "0 auto" }}>
            <h1 style={{ marginBottom: "2rem", marginTop: "4rem" }}>Bildsamling</h1>

            <div>
              <button onClick={() => setShowModal(true)} style={addBtn}>Lägg till</button>
              {showModal && <PostModal onCloseProp={
                (newImage: PostImage) => {
                  if (newImage.file != undefined && user?._id) {
                    console.log("Image to post: ", newImage);
                    //Delete funktion ska kallas här
                    postImage(newImage, user?._id);
                  }
                  setShowModal(false)
                }
              } />}
            </div>
            {isLoading &&
              <div className={ModalStyle.loadingSpinner}></div>
            }

            <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}>

              {images && images.length > 0 && !isLoading ? (
                images
                  .filter((image: Image) => image.userId?._id === user?._id)
                  .map((image: Image) => (
                    <MyPageImages myPageImagesProp={image} key={image._id} />
                  ))
              ) : (
                <p>{error}</p>
              )}
            </div>


          </div >
        </div>
      }
    </>
  )
}

export default MyPage