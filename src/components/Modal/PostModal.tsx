import { X } from 'lucide-react';
import { Upload } from 'lucide-react';
import ModalStyle from "../Modal/ModalStyle.module.css";
import { useState } from "react";
import { PostImage } from "../../types/fetch.types";



function PostModal({ onCloseProp }: { onCloseProp: (newImage: PostImage) => void }) {
    //State för formulär
    const [formData, setFormData] = useState<PostImage>({ title: "", description: "", file: undefined })
    const [file, setFile] = useState<File>();

    const [error, setError] = useState("");


    const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError('');

        if (typeof (file) === "undefined") {
            setError("Bildfilen saknas");
            return;
        } else if (file.size > 1000000) {
            setError("Bildfilen får max vara 1mb");
            return;
        }
        console.log('file', file);

        onCloseProp({ title: formData.title, description: formData.description, file: file });

    }

    const handleOnChangeImage = (event: React.FormEvent<HTMLInputElement>) => {
        setError("");
        const target = event.target as HTMLInputElement & {
            files: FileList;
        }
        setFile(target.files[0]);

    }

    return (
        <>
            <div className={ModalStyle.pageBody}>
                <div className={ModalStyle.textBoxStyle}>
                    <button className={ModalStyle.btnCancel} onClick={() => onCloseProp({ title: "", description: "", file: undefined })} style={{ background: "none", color: "#1e1e1e" }}><X /></button>
                    <h1 style={{ marginBottom: "1rem" }}>Lägg till ny bild</h1>

                    <form onSubmit={handleOnSubmit}>
                        <div className='formBox'>
                            <label htmlFor="title">Titel:</label>
                            <input
                                type="text"
                                required
                                value={formData.title}
                                onChange={(event) => setFormData({ ...formData, title: event.target.value })} />
                        </div>

                        <div className='formBox'>
                            <label htmlFor="description">Beskrivning:</label>

                            <textarea name="description" id="description" required
                                value={formData.description}
                                onChange={(event) => setFormData({ ...formData, description: event.target.value })}>

                            </textarea>

                        </div>

                        <div className='formBox' style={{display: "flex"}}>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <Upload />
                            </div>
                            <input
                                type="file"
                                accept='image/png, image/jpg, image/JPG'
                                value={formData.file}
                                onChange={handleOnChangeImage}
                            />
                            <span>Max 1mb</span>

                            {
                                error && <span style={{ fontSize: "1.5rem", color: "red" }}>{error}</span>
                            }

                        </div>
                        <div className={ModalStyle.modalBtn}>
                            <button onClick={() => onCloseProp({ title: "", description: "", file: undefined })}>Ångra</button>
                            <button type="submit">Lägg till</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default PostModal