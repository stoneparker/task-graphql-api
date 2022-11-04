import { Field, ObjectType, ID } from 'type-graphql';

@ObjectType()
export class Task {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  // transformar em enum
  @Field()
  status: string;

  user_id: string;
}
