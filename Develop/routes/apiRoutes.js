var db = require("../db/db.json");

module.exports = app => {
    app.get("/api/notes", (req,res)=>{
        console.log(db[0]);
        
            res.json(db[0]);
    })
};
