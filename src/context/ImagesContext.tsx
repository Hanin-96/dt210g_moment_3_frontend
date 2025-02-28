import { createContext, useState, useContext, ReactNode } from "react";
import { Image, ImageContextType } from "../types/fetch.types";


const ImagesContext = createContext<ImageContextType | null>(null);

interface ImagesProviderProps {
    children: ReactNode
}

export const ImagesProvider: React.FC<ImagesProviderProps> = ({ children }) => {
    const [images, setImages] = useState<Image[]>([]);
    const [oneImage, setOneImage] = useState<Image | null>(null);

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


    return (
        <ImagesContext.Provider value={{ images, getImages, getOneImage, oneImage }}>
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