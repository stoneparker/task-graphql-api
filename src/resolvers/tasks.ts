import { randomUUID } from 'node:crypto';
import { Arg, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';

import { CreateTask, DeleteTask, GetUserTasks, UpdateTaskStatus } from '../dtos/inputs/task';
import { Task } from '../dtos/models/task';
import { User } from '../dtos/models/user';

let tasks: Task[] = [];

@Resolver(() => Task)
export class TasksResolver {
  @Query(() => [Task])
  async get(@Arg('data') data: GetUserTasks) {
    console.log(data);
    return tasks;
  }

  @FieldResolver(() => User)
  async user(@Root() task: Task) {
    console.log(task);

    return {
      name: 'Viv',
    };
  }

  @Mutation(() => String)
  async create(@Arg('data') data: CreateTask) {
    const user = {} as User; // pesquisar user de acordo com id recebido

    const task: Task = {
      id: randomUUID(),
      name: data.name,
      status: 'to do',
      user,
    }

    tasks.push(task);

    return task.id;
  }


  @Mutation(() => String)
  async updateStatus(@Arg('data') data: UpdateTaskStatus) {
    const task = tasks.find((task) => task.id === data.id);

    if (task) {
      task.status = data.status;

      const updatedTasks = tasks.filter((task) => task.id !== data.id);

      tasks = [...updatedTasks, task];
    }

    console.log(task);
    return task?.id;
  }

  @Mutation(() => String)
  async delete(@Arg('data') data: DeleteTask) {
    const updatedTasks = tasks.filter((task) => task.id !== data.id);
  
    tasks = updatedTasks;

    return data.id;
  }
}

