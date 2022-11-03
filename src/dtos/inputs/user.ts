import { Field, InputType } from 'type-graphql';

@InputType()
export class LoginUser {
  @Field()
  email: string;

  @Field()
  password: string;
}

@InputType()
export class CreateUser {
  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  name: string;
}
