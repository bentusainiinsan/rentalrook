
export interface User {
    name: string;
    email: string;
    isAdmin: boolean;
}

export enum PropertyType {
    Room = 'कमरा',
    Shop = 'दुकान',
    House = 'मकान',
    Factory = 'फैक्ट्री',
    Godown = 'गोडाउन',
    Kothi = 'कोठी',
}

export interface Property {
    id: string;
    title: string;
    type: PropertyType;
    location: {
        block: string;
        area: string;
    };
    address: string;
    rent: number;
    images: string[];
    owner: {
        name: string;
        phone: string;
    };
    description: string;
    isVerified: boolean;
}

export interface BookingDetails {
    customerName: string;
    mobileNumber: string;
    email: string;
    fullAddress: string;
    landmark: string;
    pincode: string;
}