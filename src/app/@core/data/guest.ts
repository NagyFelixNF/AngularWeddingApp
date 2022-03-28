import { Invitation } from "./invitation";

export interface Guest {
    id: string;
    name: string;
    category: string;
    response: GuestResponse;
    diet: string;
    editdiet: boolean;
    side: string;
    comment: string;
    editcomment: boolean;
    invitations: Invitation[];
}
export enum GuestResponse
{
    Unknown,
    Pending,
    OnlyCeremony,
    OnlyReception,
    Canceled,
    AcceptedBoth
}