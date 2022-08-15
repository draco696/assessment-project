"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalResolver = void 0;
const graphql_type_json_1 = __importDefault(require("graphql-type-json"));
const db_1 = require("../../db");
const uuid_1 = require("uuid");
exports.GlobalResolver = {
    JSON: graphql_type_json_1.default,
    Query: {
        getFormBySessionId: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            db_1.pool.query(`SELECT * FROM form WHERE session_id = $1`, [args.sessionId], (err, res) => {
                if (err) {
                    throw new Error('Failed to find data');
                }
                else {
                    console.log(res.rows);
                    return res.rows;
                }
            });
        }),
        getFormByEmail: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            var mailFormat = /\S+@\S+\.\S+/;
            if (mailFormat.test(args.email)) {
                db_1.pool.query(`SELECT * FROM form WHERE email = $1`, [args.email], (err, res) => {
                    if (err) {
                        throw new Error(`Failed to find data: ${err}`);
                    }
                    else {
                        console.log(res.rows);
                        return res.rows;
                    }
                });
            }
            else {
                throw new Error('Invalid Email');
            }
        })
    },
    Mutation: {
        submitForm: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            // createForm(args)
            db_1.pool.query(`INSERT INTO form(id, email, session_id, form_data) VALUES ($1, $2, $3, $4)`, [(0, uuid_1.v4)(), args.email, args.sessionId, JSON.stringify(args.formData)], (err, res) => {
                if (err) {
                    return false;
                }
                else {
                    return true;
                }
            });
            return true;
        })
    },
};
