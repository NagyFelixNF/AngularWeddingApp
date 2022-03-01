export interface Todo {
    Id: string;
    MainTitle: string;
    Completed: boolean;
    Editing: boolean;
    SubTasks: SubTask[];
}
export interface SubTask
{
    Id:string;
    SubTitle: string;
    SubCompleted: boolean;
    SubEditing: boolean;
}
