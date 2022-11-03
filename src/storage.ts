import { Task } from './dtos/models/task';
import { User } from './dtos/models/user';

export class Storage {
  static users: User[] = [];
  static tasks: Task[] = [];

  static getUsers() { return Storage.users };
  static setUsers(users: User[]) { Storage.users = users };

  static getTasks() { return Storage.tasks };
  static setTasks(tasks: Task[]) { Storage.tasks = tasks };
}
