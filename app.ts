import router from "./users/user.router";

import express from "express";
const app = express();
app.use(express.json());
app.use("/user",router);

app.listen(6000, () => {
    console.log("server up and running");
}
);