import { GuestResponse } from "./guest";

export interface Invitation {
    id: string;
    guestid: string;
    weddingid:string;
    comment: string;
    name: string;
    diet: string;
    response : GuestResponse;
}