import { X } from 'lucide-react';
import { Upload } from 'lucide-react';
import ModalStyle from "../Modal/ModalStyle.module.css";



function PostModal({ onCloseProp }: { onCloseProp: () => void }) {
    return (
        <>
            <div className={ModalStyle.pageBody}>
                <div className={ModalStyle.textBoxStyle}>
                    <button onClick={onCloseProp} style={{ background: "none", color: "#1e1e1e" }}><X /></button>
                    <h1 style={{ marginBottom: "1rem" }}>Lägg till ny bild</h1>

                    <form>
                        <div className='formBox'>
                            <label htmlFor="title">Titel:</label>
                            <input type="text" />
                        </div>

                        <div className='formBox'>
                            <label htmlFor="description">Beskrivning:</label>
                            <input type="text" />
                        </div>

                        <div className='formBox'>
                            <div style={{ display: "flex", alignItems: "center"}}>
                                <Upload />
                            </div>
                            <input type="file" />
                            <span>Max 1mb</span>
                        </div>

                    </form>
                    <div className={ModalStyle.modalBtn}>
                        <button onClick={onCloseProp}>Ångra</button>
                        <button>Lägg till</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PostModal