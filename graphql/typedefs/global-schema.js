"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalSchema = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.GlobalSchema = (0, apollo_server_express_1.gql) `
scalar JSON
schema{
        query: Query
        mutation: Mutation
    }

    type Query {
    getFormBySessionId(sessionId: String!): [FormType!] 
    getFormByEmail(email: String!): [FormType]
  }

  type Mutation {
    submitForm(email: String!, sessionId: String!, formData: FormDataInput!): Boolean!
  }

  type FormType {
    id: String
    name: String
    session_id: String
    form_data: String
  }

  input FormDataInput {
    question_id: String
    reply: [String]
  }
`;
