export interface Vendor {
    id: string;
    name: string;
    description: string;
    category: string;
    email: string;
    telnumber: string;
    editable: boolean;
}
export interface VendorPage
{
    vendor: Vendor[];
}