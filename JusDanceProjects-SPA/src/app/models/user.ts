import { Photo } from './photo';

export interface User {
    id: number;
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    dateofbirth: Date;
    address: string;
    created: Date;
    lastActive: Date;
    profilepicture?: Photo;
    age?: number;
}
