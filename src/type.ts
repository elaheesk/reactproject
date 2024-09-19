export interface ProductInfo {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    availabilityStatus: string;
    shippingInformation: string;
    brand: string;
    returnPolicy: string;
    image: string[];
    thumbnail: string;
    rating: number;
    tags: string[];
    liked?: boolean;
    reviews?: ProductReview[];
}

export interface ProductReview {
    comment?: string;
    date?: string;
    rating?: number;
    reviewerEmail?: string;
    reviewerName?: string;
}
export interface ISearchBarProps {
    suggestions: ProductInfo[];
    hideSuggestions: boolean;
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>
    findResult: (title:string) => void;
}
export interface FormProps {
    product: ProductInfo;
}