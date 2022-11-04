import { GraphQLError } from 'graphql';
import { randomUUID } from 'node:crypto';
import { Arg, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';

import { CreateTask, DeleteTask, GetUserTasks, UpdateTaskStatus } from '../dtos/inputs/task';
import { Task } from '../dtos/models/task';
import { User } from '../dtos/models/user';
import { Storage } from '../storage';

@Resolver(() => Task)
export class TasksResolver {
  @Query(() => [Task])
  async listTasks() {
    return Storage.getTasks();
  }

  @FieldResolver(() => User)
  async user(@Root() task: Task) {
    return Storage.getUsers().find((user) => user.id === task.user_id);
  }

  @Query(() => [Task])
  async listUserTasks(@Arg('data') data: GetUserTasks) {
    return Storage.getTasks().filter((task) => task.user_id === data.user_id);
  }

  @Mutation(() => String)
  async createTask(@Arg('data') data: CreateTask) {
    const userExists = Storage.getUsers().some((user) => user.id === data.user_id); // pesquisar user de acordo com id recebido

    if (!userExists) {
      throw new GraphQLError('Invalid user');
    }

    const task: Task = {
      id: randomUUID(),
      name: data.name,
      user_id: data.user_id,
      status: 'to do',
    }

    Storage.setTasks([...Storage.getTasks(), task]);

    return task.id;
  }

  @Mutation(() => String)
  async updateTaskStatus(@Arg('data') data: UpdateTaskStatus) {
    const task = Storage.getTasks().find((task) => task.id === data.id);

    if (!task) {
      throw new GraphQLError('Invalid task');
    }

    task.status = data.status;

    const updatedTasks = Storage.getTasks().filter((task) => task.id !== data.id);

    Storage.setTasks([...updatedTasks]);

    return task?.id;
  }

  @Mutation(() => String)
  async deleteTask(@Arg('data') data: DeleteTask) {
    const updatedTasks = Storage.getTasks().filter((task) => task.id !== data.id);

    Storage.setTasks([...updatedTasks]);

    return data.id;
  }
}

