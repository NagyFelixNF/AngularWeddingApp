export interface Budget {
    id: string;
    budget: number;
    categories: Category[];
}
export interface Category
{
    id:string;
    title: string;
    total: number;
    spendings: Spending[];

}
export interface Spending
{
    id:string;
    title: string;
    cost: number;
}
