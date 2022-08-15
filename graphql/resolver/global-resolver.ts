import GraphQLJSON from "graphql-type-json"
import {pool} from "../../db"
import { v4 as uuidv4 } from 'uuid';


export const GlobalResolver = {
  JSON: GraphQLJSON,

  Query: {
    getFormBySessionId: async(_: any, args: any) => {       
      pool.query(`SELECT * FROM form WHERE session_id = $1`, [args.sessionId], (err: any, res: any)=>{
        if (err) {
          throw new Error('Failed to find data')
        }
        else {
          console.log(res.rows)
          return res.rows
        }
      })  

    },

    getFormByEmail: async(_: any, args: any) =>{
      var mailFormat = /\S+@\S+\.\S+/
      if (mailFormat.test(args.email)){
        pool.query(`SELECT * FROM form WHERE email = $1`, [args.email], (err: any, res: any)=>{
          if (err) {
            throw new Error(`Failed to find data: ${err}`)
          }
          else {
            console.log(res.rows)
            return res.rows
          }
        })
      }else {
        throw new Error('Invalid Email')
      }     
    }
  }, 
    
  

  Mutation: {  
    submitForm: async (_: any, args: any) => {
      // createForm(args)
      pool.query(
            `INSERT INTO form(id, email, session_id, form_data) VALUES ($1, $2, $3, $4)`,
            [uuidv4(), args.email, args.sessionId, JSON.stringify(args.formData)], (err:any, res: any)=>{
              if (err){
                return false
              }
              else {
                return true
              }
            }
          )
      return true
    }
  },
}