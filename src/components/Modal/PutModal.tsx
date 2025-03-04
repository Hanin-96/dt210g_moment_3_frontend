import { X } from 'lucide-react';
import ModalStyle from "../Modal/ModalStyle.module.css";
import { useState } from "react";
import { UpdateImage } from "../../types/fetch.types";

function PutModal({ putImage, onCloseProp }: { putImage: UpdateImage, onCloseProp: (updatedImage: UpdateImage ) => void }) {
    const [formData, setFormData] = useState<UpdateImage>(putImage)
    const [error, setError] = useState("");

    const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError("");

        if(formData.title ==="" && formData.description ==="")
        {
            setError("Fyll i titel och beskrivning");
            return;
        }
        onCloseProp({title: formData.title, description: formData.description})
    }

    return (
        <div className={ModalStyle.pageBody}>
                <div className={ModalStyle.textBoxStyle}>
                    <button className={ModalStyle.btnCancel} onClick={() => onCloseProp({ title: "", description: "" })} style={{ background: "none", color: "#1e1e1e" }}><X /></button>
                    <h1 style={{ marginBottom: "1rem" }}>Ändra bildinformation</h1>

                    <form onSubmit={handleOnSubmit}>
                        <div className='formBox'>
                            <label htmlFor="title">Titel:</label>
                            <input
                                type="text"
                                required
                                value={formData.title} 
                                onChange={(event) => setFormData({...formData, title: event.target.value})}/>
                        </div>

                        <div className='formBox'>
                            <label htmlFor="description">Beskrivning:</label>
                            <input 
                            type="text"
                            required
                            value={formData.description} 
                            onChange={(event) => setFormData({...formData, description: event.target.value})}/>
                        </div>

                        {error && <p>{error}</p>}

                        <div className={ModalStyle.modalBtn}>
                        <button onClick={() => onCloseProp({title: "", description: ""})}>Ångra</button>
                        <button type="submit">Ändra</button>
                    </div>
                    </form>
                </div>
            </div>
    )
}

export default PutModal