export interface Todo {
    id: string;
    title: string;
    completed: boolean;
    editing: boolean;
    subPreparations: SubTask[];
}
export interface SubTask
{
    id:string;
    title: string;
    completed: boolean;
    subEditing: boolean;
}
