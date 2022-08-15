"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const Pool = require('pg').Pool;
exports.pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'assessment',
    password: 'postgres',
    port: 5432,
});
