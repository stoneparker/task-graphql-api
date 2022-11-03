import { randomUUID } from 'node:crypto';
import { GraphQLError } from 'graphql';
import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { CreateUser, LoginUser } from '../dtos/inputs/user';
import { LoginReturn, User } from '../dtos/models/user';
import { Storage } from '../storage';
import envConfig from '../config/env';

@Resolver(() => User)
export class UsersResolver {
  @Query(() => LoginReturn)
  async login(@Arg('data') data: LoginUser) {
    const user = Storage.getUsers().find((user) => user.email);

    if (!user) {
      throw new GraphQLError('Wrong email or password');
    }

    const passwordCheck = bcrypt.compareSync(data.password, user.password);
    
    if (!passwordCheck) {
      throw new GraphQLError('Wrong email or password');
    }

    return {
      name: user.name,
      token: jwt.sign({ ...user }, envConfig.secret, { expiresIn: '2w' }),
    };
  }

  @Mutation(() => LoginReturn)
  async create(@Arg('data') data: CreateUser) {
    const user = Storage.getUsers().some((user) => user.email);

    if (user) {
      throw new GraphQLError('User already exists');
    }

    const salt = bcrypt.genSaltSync(10);
    data.password = bcrypt.hashSync(data.password, salt);

    const newUser = { id: randomUUID(), ...data }

    Storage.setUsers([...Storage.getUsers(), newUser]);

    return {
      name: newUser.name,
      token: jwt.sign({ ...newUser }, envConfig.secret, { expiresIn: '2w' }),
    };
  }
}
