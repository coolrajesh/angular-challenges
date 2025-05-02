export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    images: string[];
    stock: number;
    rating: number;
    category: {
        id: number;
        name: string;
        imageUrl: string;
    };
}
