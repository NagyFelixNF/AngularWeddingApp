import { GuestResponse } from "./guest";

export interface Invitation {
    id: string;
    guestid: string;
    comment: string;
    firstname: string| null;
    lastname: string | null;
    diet: string;
    response : GuestResponse;
}