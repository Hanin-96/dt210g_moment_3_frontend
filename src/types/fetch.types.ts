//Typer för contextfil för Fetch anrop

export interface Image {
    _id: string,
    title: string,
    description: string,
    fileName: string,
    userId: string,
}

export interface ImageContextType {
    images: Image[] | null,
    //postImage: () => void;
    getImages: () => void;
}