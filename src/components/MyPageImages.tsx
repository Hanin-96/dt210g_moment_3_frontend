
import { Image } from "../types/fetch.types"
function MyPageImages({ myPageImagesProp }: { myPageImagesProp: Image}) {
    return (
        <>
            <div key={myPageImagesProp._id} style={{ position: "relative" }}>
                <p>imageId: {myPageImagesProp._id}</p>
                <img src={`http://localhost:3000/file/${myPageImagesProp.fileName}`} alt={myPageImagesProp.title} style={{ maxWidth: "30rem" }} />
                <div>
                    <button>Radera</button>
                    <button>Ändra</button>
                </div>
            </div>
        </>
    )
}

export default MyPageImages