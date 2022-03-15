export interface Budget {
    id: string;
    budget: number;
    categories: Category[];
}
export interface Category
{
    id:string;
    title: string;
    spendings: Spending[];

}
export interface Spending
{
    id:string;
    title: string;
    cost: number;
}
