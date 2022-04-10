export interface Vendor {
    id: string;
    name: string;
    description: string;
    category: string;
    email: string;
    telnumber: string;
}
export interface VendorPage
{
    vendor: Vendor[];
}