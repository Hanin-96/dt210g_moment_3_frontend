//Typer för contextfil för Fetch anrop

export interface Image {
    _id: string,
    title: string,
    description: string,
    fileName: string,
    userId: { _id: string; firstname: string; lastname: string; username: string },
    username: string,
    firstname: string,
    lastname: string
}


export interface ImageContextType {
    images: Image[] | null,
    oneImage: Image | null,
    getOneImage: (imageId: string) => Promise<void>,
    //postImage: () => void;
    getImages: () => void;
    deleteImage: (imageId: string) => Promise<void>
}