import { Field, ObjectType, ID } from 'type-graphql';
import { User } from './user';

@ObjectType()
export class Task {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  status: string;

  @Field()
  user: User;
}
