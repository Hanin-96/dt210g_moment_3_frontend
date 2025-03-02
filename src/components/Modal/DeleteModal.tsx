import { X } from 'lucide-react';
import ModalStyle from "../Modal/ModalStyle.module.css";

function DeleteModal({ onCloseProp }: { onCloseProp: () => void }) {

    return (
        <>
            <div className={ModalStyle.pageBody}>
                <div className={ModalStyle.textBoxStyle}>
                    <button onClick={onCloseProp} style={{ background: "none", color: "#1e1e1e" }}><X /></button>
                    <h1 style={{ marginBottom: "1rem" }}>Bekräfta radering</h1>
                    <p>Är du säker på att du vill ta bort bilden?</p>
                    <div className={ModalStyle.modalBtn}>
                        <button onClick={onCloseProp}>Ångra</button>
                        <button>Ta bort</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DeleteModal