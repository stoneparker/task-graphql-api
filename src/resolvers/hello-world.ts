import { Query, Resolver } from 'type-graphql';

@Resolver(() => String)
export class HelloWorldResolver {
  @Query(() => String)
  async helloWorld() {
    return 'Hello World :)'
  }
}
