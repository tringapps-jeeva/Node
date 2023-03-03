import userservice from "./user.service";
import express from 'express';
import conn from "../config/database";
import { QueryResult } from "pg";
export default class usercontroller {
    public static createuser(req: express.Request, res: express.Response) {
        const body: any = req.body;
        // console.log(body);
        conn.query(`select * from data where mail=$1`, [body.mail], (err: Error, result: QueryResult<any>) => {
            if (result.rows.length > 0) {
                // console.log(result.rows[0].name);
                return res.status(400).send("User already exist").end();
            }
            else {
                return userservice.create(body, (err: any, results: any) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({
                            sucess: 0,
                            message: "Database connection error"
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "inserted successfully"
                        // data: results
                    });
                });
            }
        });

    }
    public static updateuser(req: express.Request, res: express.Response) {
        const body: any = req.body;
        conn.query(`select * from data where id=$1`, [body.id], (err: any, result: QueryResult<any>) => {
            let name = result.rows[0].name;
            if (result.rows.length == 0) {
                return res.status(400).send("id does not exist");
            }
            else if (body.name && body.id) {
                return userservice.update(body, name, (err: any, results: any) => {
                    if (err) {
                        return res.status(500).json({
                            sucess: 0,
                            message: "Database connection error"
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "name updated successfully"
                    });
                })
            }
            else if (body.mail && body.id) {
                conn.query(`select * from data where mail=$1`, [body.mail], (err: any, result: QueryResult<any>) => {
                    if (err) {
                        throw err;
                    }
                    if (result.rows.length > 0) {
                        return res.status(400).send("Mail exist");
                    }
                    else {
                        conn.query(`select * from data where id=$1`, [body.id], (err: any, result: QueryResult<any>) => {
                            let name = result.rows[0].name;
                            return userservice.update(body, name, (err: any, results: any) => {
                                if (err) {
                                    return res.status(500).json({
                                        sucess: 0,
                                        message: "Database connection error"
                                    });
                                }
                                return res.status(200).json({
                                    success: 1,
                                    message: "New record inserted successfully"
                                });
                            })
                        })

                    }
                })
            }
        })

    }
}
// usercontroller.getuserbyid = (req, res) => {
//     const id = req.params.id;
//     return userservice.getuserById(id, (err, result) => {
//         if (err) {
//             console.log(err);
//             return;
//         }
//         if (!result) {
//             return res.json({
//                 success: 0,
//                 message: "Record not found"
//             });
//         }
//         return res.json({
//             success: 1,
//             data: result
//         })
//     });
// }

// usercontroller.getuser = (req, res) => {
//     // const id = req.params.id;
//     return userservice.getuser((err, result) => {
//         if (err) {
//             console.log(err);
//             return;
//         }

//         return res.json({
//             success: 1,
//             data: result
//         })
//     });
// }

// usercontroller.update = (req, res) => {
//     const body = req.body;
//     return userservice.update(body, (err, result) => {
//         if (err) {
//             console.log(err);
//             return;
//         }
//         if (!result) {
//             return res.json({
//                 success: 0,
//                 message: "Failed to update user"
//             });
//         }

//         return res.json({
//             success: 1,
//             data: "update successfully"
//         });
//     });
// }

// usercontroller.delete = (req, res) => {
//     const data = req.body;
//     return userservice.delete(data, (err, result) => {
//         if (err) {
//             console.log(err);
//             return;

//         }
//         if (!result) {
//             return res.json({
//                 success: 0,
//                 message: "record not found"
//             })
//         }
//         return res.json({
//             success: 1,
//             data: "deleted successfully"
//         });
//     });
// }

// usercontroller.createTable = async (req, res) => {
//     const body = req.body;
//     return userservice.createTable(body, (err, result) => {
//         if (err) {
//             return res.status(500).json({
//                 sucess: 0,
//                 message: "could not create table"
//             });
//         }
//         return res.status(200).json({
//             sucess: 1,
//             message: result
//         })
//     });
// }


// export default usercontroller;