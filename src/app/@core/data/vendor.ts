export interface Vendor {
    id: string;
    name: string;
    description: string;
    category: string;
    email: string;
    telnumber: string;
    editable: boolean;
    customid?:string;
}
export interface VendorPage
{
    vendor: Vendor[];
}