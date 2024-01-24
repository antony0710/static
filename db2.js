const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';
const dbName = "iotDB";
let lastId = 0;
//Function to putting data into the database
async function addData(data) {
    console.log("Connected to the database");
    console.log(data); // Add this line
    const client = new MongoClient(url);

    try {
        await client.connect();
        console.log("Connected correctly to server");

        const db = client.db(dbName);

        data._id = ++lastId;
        // Insert a single document
        const dataDB = await db.collection('data').insertOne(data);
        console.log(dataDB);
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}



modules.export = {  
    addData 
};