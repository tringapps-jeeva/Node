// import { createConnection} from 'mysql';
import {Client} from 'pg';
const conn = new Client(
    {
        host: "localhost",
        user:"postgres",
        password: "1902",
        database:"user_db",
        port:3000
    }
)
conn.connect();
export default conn;