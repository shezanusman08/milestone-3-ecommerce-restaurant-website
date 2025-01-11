export interface SimplifiedProduct {
    _id: string;
    price: number;
    name: string;
    description: string;
    slug: string;
    imageUrl: string;
    price_id: string;
}

export interface fullProduct {
    _id: string;
    price: number;
    name: string;
    description: string;
    slug: string;
    image: { asset: { url: string } }[];
    
}