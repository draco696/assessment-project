import { ApolloServer } from 'apollo-server-express';
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} from 'apollo-server-core';
import express from 'express';
import http from 'http';

import {GlobalSchema} from './graphql/typedefs/global-schema';
import {GlobalResolver} from './graphql/resolver/global-resolver';

async function main() {
    const app = express()

    const httpServer = http.createServer(app)

    const server = new ApolloServer({ 
        typeDefs: [GlobalSchema],
        resolvers: [GlobalResolver],
        csrfPrevention: true,
        cache: 'bounded',
        plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer }),
        ApolloServerPluginLandingPageLocalDefault({ embed: true }),
        ],
    })

    await server.start()

    server. applyMiddleware({app, path: '/graphql'})

    await new Promise<void>(res=>httpServer.listen({port: 4000}, res))
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);

}

main()