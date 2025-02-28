import { useEffect, useState } from "react";
import { useImage } from "../context/ImagesContext";
import { useNavigate, useParams } from "react-router-dom";


function ImagePage() {
    const [error, setError] = useState('');

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

            } catch (error) {
                setError("Det gick inte att hämta in bilder")

            }
        };
        fetchImage();
    }, []);


    return (
        <>

            <div>
                {oneImage ? (

                    <div key={oneImage._id}>
                        <h1>{oneImage.title}</h1>
                        <p>{oneImage.description}</p>
                        <p>{oneImage.userId}</p>
                        <img src={`http://localhost:3000/file/${oneImage.fileName}`} alt={oneImage.title} style={{ maxWidth: "20rem" }} />
                        <p>&copy; {oneImage.firstname} {oneImage.lastname}</p>

                    </div>
                ) : (
                    <p>{error}</p>
                )}
            </div>
            <button onClick={() => navigate("/")} style={{ cursor: "pointer" }}>Tillbaka</button>
        </>
    );
}

export default ImagePage

