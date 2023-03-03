import { QueryResult } from "pg";
import conn from "../config/database";
export default class userservice {
    public static create(data: any, callBack: Function): any {
        conn.query(`insert into data(name,mail) values($1,$2) `,
            [
                data.name,
                data.mail
            ],
            (err: Error, result: QueryResult<any>) => {
                if (err) {
                    return callBack(err);
                }
                return callBack(null, result)
            });
    }
    public static update(data: any,name:any, callBack: Function): any {
        if (data.name) {
            conn.query(`update data set name=$1 where id=$2`, [data.name, data.id], (err: any, result: QueryResult<any>) => {
                if (err) {
                    return callBack(err)
                }
                return callBack(null, result)
            })
        }
        else if(data.mail)
        {
          conn.query(`insert into data(name,mail) values($1,$2)`,[name,data.mail],(err:Error,result:QueryResult<any>)=>
          {
            if (err) {
                return callBack(err);
            }
            return callBack(null, result)
          })   
        }
    }
}
// userservice.getuserById = (id, callBack) => {
//     conn.query(`select id,name from data where id=?`, [id],
//         (err, result, fields) => {
//             if (err) {
//                 return callBack(err);
//             }
//             return callBack(null, result[0]);
//         }
//     );
// }
// userservice.getuser = (callBack) => {
//     conn.query(`select * from data `, [],
//         (err, result, fields) => {
//             if (err) {
//                 return callBack(err);
//             }
//             return callBack(null, result);
//         }
//     );
// }

// userservice.update = (data, callBack) => {
//     conn.query(`update data set name=? where id=?`, [data.name,
//     data.id
//     ],
//         (err, result, fields) => {
//             if (err) {
//                 return callBack(err);
//             }
//             return callBack(null, result);
//         }
//     );
// }
// userservice.delete = (data, callBack) => {
//     conn.query(`delete  from data where id=?`, [data.id],
//         (err, result, fields) => {
//             if (err) {
//                 return callBack(err);
//             }
//             return callBack(null, result[0]);
//         }
//     );
// }
// userservice.createTable = (data, callBack) => {
//     conn.query(`create table students1 (name varchar(25) , mark int(3))`,
//         [],
//         (err, result, fields) => {
//             if (err) {
//                 return callBack(err);
//             }
//             return callBack(null, result);
//         })
// }


// export default userservice;
