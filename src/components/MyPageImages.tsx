import DeleteModal from "./Modal/DeleteModal";
import { Image } from "../types/fetch.types"
import { useState } from "react";

//Importera authcontext
import { useImage } from "../context/ImagesContext";

function MyPageImages({ myPageImagesProp }: { myPageImagesProp: Image }) {
    //State för att visa modal
    const [showModal, setShowModal] = useState(false);
    const { deleteImage } = useImage();



    const imgBtnWrap: object = {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        maxWidth: "30rem",
        marginBottom: "2rem",
        maxHeight: "30rem",
        height: "100%"
    }

    const btnStyle: object = {
        width: "100%",
        maxWidth: "30rem",
        backgroundColor: "#1e1e1e",
        color: "white",
        padding: "1rem",
        border: "none",
        borderRadius: "0.5rem",
        cursor: "pointer",
        marginBottom: "4rem"
    }

    const titleText: object = {
        fontWeight: "bold",
        margin: "0"
    }




    return (
        <>
            <div key={myPageImagesProp._id} style={{ position: "relative", width: "100%", maxWidth: "30rem"}}>
                <p>Titel: <span style={titleText}>{myPageImagesProp.title}</span></p>
                <br />
                <div style={imgBtnWrap}>
                    <img src={`http://localhost:3000/file/${myPageImagesProp.fileName}`} alt={myPageImagesProp.title} style={{ maxHeight: "30rem", objectFit: "cover", height: "100%", width: "100%" }} />
                </div>

                <div style={{ display: "flex", gap: "2rem", justifyContent: "space-between" }}>
                    <button onClick={() => setShowModal(true)} style={btnStyle}>Ta bort</button>
                    {showModal && <DeleteModal onCloseProp={
                        (confirmDelete: boolean) => {
                            if (confirmDelete) {
                                //Delete funktion ska kallas här
                                deleteImage(myPageImagesProp._id)
                            }
                            setShowModal(false)
                        }
                    } />}

                    <button style={{ ...btnStyle, backgroundColor: "white", color: "#1e1e1e" }}>Ändra</button>
                </div>
            </div>
        </>
    )
}

export default MyPageImages