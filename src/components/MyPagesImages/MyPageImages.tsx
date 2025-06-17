import DeleteModal from "../Modal/DeleteModal";
import PutModal from "../Modal/PutModal";
import { Image, UpdateImage } from "../../types/fetch.types"
import { useState } from "react";

//Importera authcontext
import { useImage } from "../../context/ImagesContext";
import { Link } from "react-router-dom";

function MyPageImages({ myPageImagesProp }: { myPageImagesProp: Image }) {
    //State för att visa modal
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showPutModal, setShowPutModal] = useState(false);
    const { deleteImage, putImage } = useImage();



    const imgBtnWrap: object = {
        display: "flex",
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
            <div key={myPageImagesProp._id} style={{ position: "relative", width: "100%", maxWidth: "30rem" }}>

                <p>Titel: <span style={titleText}>{myPageImagesProp.title}</span></p>
                <br />
                <div style={imgBtnWrap}>
                    <Link to={`/${myPageImagesProp._id}`}>
                        <img src={myPageImagesProp.imageUrl} alt={myPageImagesProp.title} style={{ maxHeight: "30rem", objectFit: "cover", height: "100%", width: "100%", minWidth:"30rem", maxWidth: "30rem" }} />
                    </Link>
                </div>


                <div style={{ display: "flex", gap: "2rem", justifyContent: "space-between" }}>
                    <button onClick={() => setShowDeleteModal(true)} style={btnStyle}>Ta bort</button>
                    {showDeleteModal && <DeleteModal onCloseProp={
                        //Om användare klickar på ta bort i modalen då blir confirmDelete true
                        (confirmDelete: boolean) => {
                            if (confirmDelete) {
                                //Delete funktion ska kallas här
                                deleteImage(myPageImagesProp._id)
                            }
                            setShowDeleteModal(false)
                        }
                    } />}

                    <button onClick={() => setShowPutModal(true)} style={{ ...btnStyle, backgroundColor: "white", color: "#1e1e1e" }}>Ändra</button>

                    {showPutModal && <PutModal putImage={{ title: myPageImagesProp.title, description: myPageImagesProp.description }} onCloseProp={
                        (updateImage: UpdateImage) => {
                            if (updateImage && updateImage.title != "" && updateImage.description != "") {
                                //Delete funktion ska kallas här
                                putImage(updateImage, myPageImagesProp._id)
                            }
                            setShowPutModal(false)
                        }
                    } />}


                </div>
            </div>
        </>
    )
}

export default MyPageImages