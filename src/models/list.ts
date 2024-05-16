export interface ListModel {
  id: string;
  title: string;
  users: string[];
  tasks: TaskListModel[];
}

export interface TaskListModel {
  text: string;
  completed: boolean;
}
