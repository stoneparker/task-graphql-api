import 'reflect-metadata';

import path from 'node:path';

import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import { HelloWorldResolver } from './resolvers/hello-world';
import { TasksResolver } from './resolvers/tasks';

async function bootstrap() {
  const schema = await buildSchema({
    resolvers: [HelloWorldResolver, TasksResolver],
    emitSchemaFile: path.resolve(__dirname, 'schema.gql'),
  });

  const server = new ApolloServer({ schema });

  const { url } = await server.listen();

  console.log('Server running on', url); 
}

bootstrap();
