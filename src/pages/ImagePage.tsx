import { useEffect, useState } from "react";
import { useImage } from "../context/ImagesContext";
import { useNavigate, useParams } from "react-router-dom";


function ImagePage() {
    const [error, setError] = useState('');
    const [imageLoaded, setImageLoaded] = useState(false);
    const { oneImage, getOneImage } = useImage();
    const { id } = useParams();
    const navigate = useNavigate();


    //useEffect för att hämta in poster
    useEffect(() => {
        const fetchImage = async () => {
            if (!id) {
                setError("Finns ingen bild");
                return;
            }

            try {
                await getOneImage(id);
                setImageLoaded(true);

            } catch (error) {
                setError("Det gick inte att hämta in bilder")

            }
        };
        fetchImage();
    }, []);

    const buttonStyle: object = {
        cursor: "pointer",
        padding: "1rem",
        backgroundColor: "#1e1e1e",
        color: "white",
        width: "100%",
        marginTop: "2rem",
        border: "none"
    }

    const articleStyle: object = {
        display: "flex",
        marginTop: "5rem",
        gap: "5rem"
    }


    return (
        <>

            <div style={{ maxWidth: "100rem", width: "100%", margin: "0 auto 20rem auto" }}>
                {oneImage &&
                    <article key={oneImage._id} style={{...articleStyle, opacity: imageLoaded ? 1 : 0, transition: "opacity 0.3s ease-in-out"}}>
                        <div>
                            <img src={`http://localhost:3000/file/${oneImage.fileName}`} alt={oneImage.title} style={{ maxWidth: "50rem"}} />
                            <p>&copy; {oneImage.firstname} {oneImage.lastname}</p>
                        </div>

                        <div style={{width: "100%"}}>
                            <h1>{oneImage.title}</h1>
                            <p>{oneImage.description}</p>
                            <p>{oneImage.username}</p>
                        </div>

                    </article>
                }

                {!oneImage && (
                    <p>{error}</p>
                )}


                <button onClick={() => navigate("/")} style={buttonStyle}>Tillbaka</button>
            </div>



        </>
    );
}

export default ImagePage

