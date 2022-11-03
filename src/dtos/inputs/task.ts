import { Field, InputType, ID } from 'type-graphql';
import { User } from '../models/user';

@InputType()
export class GetUserTasks {
  @Field()
  user_id: string;
}

@InputType()
export class CreateTask {
  @Field()
  name: string;

  @Field()
  user_id: string;
}

@InputType()
export class UpdateTaskStatus {
  @Field(() => ID)
  id: string;

  @Field()
  status: string;
}

@InputType()
export class DeleteTask {
  @Field(() => ID)
  id: string;
}
