import DeleteModal from "./Modal/DeleteModal";
import { Image } from "../types/fetch.types"
import { useState } from "react";
import { useEffect } from "react";

function MyPageImages({ myPageImagesProp }: { myPageImagesProp: Image }) {
    //State för att visa modal
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (showModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [showModal]);

    const imgBtnWrap: object = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        maxHeight: "50rem",
        width: "100%",
        height: "100%",
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
        marginBottom: "5rem"
    }




    return (
        <>
            <div key={myPageImagesProp._id} style={{ position: "relative" }}>
                <p>imageId: {myPageImagesProp._id}</p>
                <div style={imgBtnWrap}>
                    <img src={`http://localhost:3000/file/${myPageImagesProp.fileName}`} alt={myPageImagesProp.title} style={{ maxHeight: "40rem", objectFit: "cover", height: "100%", width: "100%" }} />
                    <div style={{ display: "flex", gap: "2rem", justifyContent: "space-between" }}>
                        <button onClick={() => setShowModal(true)} style={btnStyle}>Radera</button>
                        {showModal && <DeleteModal onCloseProp={() => setShowModal(false)} />}

                        <button style={{ ...btnStyle, backgroundColor: "white", color: "#1e1e1e" }}>Ändra</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MyPageImages