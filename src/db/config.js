
//importando biblioteca conpleta sqlite3
const sqlite3 = require("sqlite3");
//importando apenas o modulo "open" do sqlite
const { open } = require("sqlite");

module.exports = () => 
    //chamando modulo do sqlite
    open({
        filename: "./database.sqlite",
        driver: sqlite3.Database,
    });

