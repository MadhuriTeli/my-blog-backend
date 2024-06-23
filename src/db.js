import { MongoClient } from "mongodb";


let db;
 const dbUrl = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0.vnuwshw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0?directConnection=true`;

 async function connectToDB(cb) {
    const client = new MongoClient(dbUrl);
    await client.connect();
    db = client.db('bolg_db');
     cb();
}

export { db, connectToDB };

