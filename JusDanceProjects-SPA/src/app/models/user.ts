import { Photo } from './photo';

export interface User {
    id: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    address: string;
    created: Date;
    lastActive: Date;
    profilePicture?: Photo;
    age?: number;
}
