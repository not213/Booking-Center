const mongoose = require("mongoose");

function connect() {
    const { DB_HOST, DB_PORT, DB_NAME } = process.env;
    const databaseURI = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;

    mongoose.set("strictQuery", true);

    mongoose.connect(databaseURI);

    const db = mongoose.connection;
    db.on("open", function () {
        console.log("connected to DB", databaseURI);
    });

    db.on("error", function (err) {
        console.log("connected to DB error: " + err);
    });
}

connect();
