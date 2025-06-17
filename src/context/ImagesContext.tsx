import { createContext, useState, useContext, ReactNode } from "react";
import { Image, ImageContextType, PostImage, UpdateImage } from "../types/fetch.types";


const ImagesContext = createContext<ImageContextType | null>(null);

interface ImagesProviderProps {
    children: ReactNode
}

export const ImagesProvider: React.FC<ImagesProviderProps> = ({ children }) => {
    const [images, setImages] = useState<Image[]>([]);
    const [oneImage, setOneImage] = useState<Image | null>(null);
    //const [error, setError] = useState("");

    //Hämta alla bilder publikt
    const getImages = async (): Promise<void> => {
        try {
            const response = await fetch("http://localhost:3000/images", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })

            if (response.ok) {
                const data = await response.json();
                setImages(data.images);

            } else {
                setImages([]);
            }

        } catch (error) {
            console.error("Det gick inte att hämta bilderna:", error);
            setImages([]);
        }
    }

    //Hämta specifik bild publikt
    async function getOneImage(imageId: string) {
        try {
            const response = await fetch(`http://localhost:3000/image/${imageId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })

            if (response.ok) {
                const data = await response.json();
                setOneImage(data);

            } else {
                setOneImage(null);
            }

        } catch (error) {
            console.error("Det gick inte att hämta bilderna:", error);
            setOneImage(null);
        }

    }

    //Ta bort bild
    async function deleteImage(imageId: string) {
        try {
            const token = localStorage.getItem("token");

            const response = await fetch(`http://localhost:3000/image/${imageId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                }
            })

            if (response.ok) {
                await getImages();
            }

        } catch (error) {
            console.error("Det gick inte att radera bilden:", error);
        }
    }
    //Ladda upp ny bild
    async function postImage(image: PostImage, userId: string) {
        try {

            if (userId == "") {
                //setError("Du har inget användarId");
                return;
            }
            //Skapar ny formdata för att kunna skicka fil
            const formData = new FormData();
            formData.append("title", image.title);
            formData.append("description", image.description);

            if (image.file) {
                formData.append("file", image.file);
            }
            //Hämtar token för kontrollera användare behörighet
            const token = localStorage.getItem("token");

            const response = await fetch(`http://localhost:3000/upload/${userId}`, {
                method: "POST",
                body: formData,
                headers: {
                    "Authorization": "Bearer " + token
                }
            });

            if (response.ok) {
                await getImages();
            }

        } catch (error) {
            console.error("Det gick inte att lägga till bilden:", error);
        }
    }
    //Uppdatera bildinformation
    async function putImage(image: UpdateImage, imageId: string) {
        try {

            if (imageId == "") {
                //setError("Du har inget bild Id");
                return;
            }
            const token = localStorage.getItem("token");

            const response = await fetch(`http://localhost:3000/image/${imageId}`, {
                method: "PUT",
                body: JSON.stringify(image),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                }
            });

            if (response.ok) {
                await getImages();
            }

        } catch (error) {
            console.error("Det gick inte att ändra bildinformationen:", error);
        }
    }


    return (
        <ImagesContext.Provider value={{ images, getImages, getOneImage, deleteImage, postImage, putImage, oneImage }}>
            {children}
        </ImagesContext.Provider>
    )
}

export const useImage = (): ImageContextType => {
    const context = useContext(ImagesContext);

    if (!context) {
        throw new Error("useImage måste användas inom en ImagesProvider")
    }

    return context;
}