import {gql} from "apollo-server-express"

export const GlobalSchema = gql`
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
` 