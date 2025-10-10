type Product = {
    id: number;
    name: string;
    description: string;
}

type BuyingGroup = {
    id: number;
    created_at: string;
    active: boolean;
    location: string;
    product: Product;
}

type BuyingGroupInfo = {
    id: number;
    location: string;
    active: boolean;
    memberCount: number;
    offerCount: number;
    productName: string;
    productDescription: string;
    expiryDate: EpochTimeStamp; // Can change
}

type User = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
}

type Offer = {
    id: number;
    group: BuyingGroup;
    seller: User;
    status: 'pending' | 'accepted' | 'rejected';
    price: number;
    expiryDate: EpochTimeStamp; // Can change
    minThreshold: number;
}

export type { Product, BuyingGroup, User, Offer, BuyingGroupInfo };