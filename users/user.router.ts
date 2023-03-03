import usercontroller from "./user.controller";
import express from "express";
const router = express.Router();
router.post("/",usercontroller.createuser);
router.patch("/",usercontroller.updateuser);
// router.get("/:id/input",usercontroller.getuserbyid);
// router.get("/",usercontroller.getuser);
// router.patch("/",usercontroller.update);
// // router.delete("/",usercontroller.delete);
// router.get("/create",usercontroller.createTable);

export default  router;