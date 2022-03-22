export interface Guest {
    id: string;
    name: string;
    category: string;
    response: GuestResponse;
    diet: string;
    editdiet: boolean;
    comment: string;
    editcomment: boolean;
}
export enum GuestResponse
{
    Unknown = "UNKOWN",
    Pending = "PENDING",
    OnlyCeremony = "ONLYCEREMONY",
    OnlyReception = "ONLYRECEPTION",
    Canceled = "CANCELED",
    AcceptedBoth = "ACCEPTEDBOTH"

}