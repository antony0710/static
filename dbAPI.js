//using mongoose to connect to the database and have
//a save funtion that will save the note to the database
//and a get function that will get the note from the database
//and display it on the page
let lastId = 0;
const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';
const dbName = 'notesDB';

//Get notes with same name
async function getNotes() {
    const client = new MongoClient(url);
    let myDocs = null;

    try {
        await client.connect();
        console.log("Connected correctly to server");

        const db = client.db(dbName);

        // Find all documents
        myDocs = await db.collection('notes').find().toArray();
        if(myDocs)
            console.log("Data retrived from database and pass to the web");
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }

    return myDocs;
}

//Add notes to the database
// Add notes to the database
async function addNotes(note) {
    console.log(note); // Add this line
    const client = new MongoClient(url);

    try {
        await client.connect();
        console.log("Connected correctly to server");

        const db = client.db(dbName);

        // Get the last document with the same name
        const lastNote = await db.collection('notes').find({ title: 'From_MCU_ESP32' }).sort({ _id: -1 }).limit(1).toArray();

        // If a note with the same name exists, increment its id
        if (lastNote.length > 0) {
            note._id = parseInt(lastNote[0]._id) + 1;
        } else {
            note._id = 1;
        }

        // Insert a single document
        const noteDB = await db.collection('notes').insertOne(note);
        console.log(note._id);
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}

// Get a specific note by ID
async function getNoteById(id) {
    const client = new MongoClient(url);
    let myDoc = null;

    try {
        await client.connect();
        console.log("Connected correctly to server");

        const db = client.db(dbName);

        // Find the document with the specified ID
        const objectId = new require('mongodb').ObjectID(id);
        myDoc = await db.collection('notes').findOne({ _id: objectId });
        if(myDoc)
            console.log("Data retrieved from database and passed to the web");
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }

    return myDoc;
}

// Get a specific note by parameters
async function getNoteByParams(params) {
    const client = new MongoClient(url);
    let myDoc = null;

    try {
        await client.connect();
        console.log("Connected correctly to server");

        const db = client.db(dbName);

        // Find the document with the specified parameters
        myDoc = await db.collection('notes').findOne(params);
        console.log(myDoc);
        if(myDoc)
            console.log("Data retrieved from database and passed to the web");
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }

    return myDoc;
}

async function find(id,name){
    console.log("LOG: find");
    const client = new MongoClient(url);
    console.log(name);
    try {
        await client.connect();
        const db = client.db(dbName);
        const note = await db.collection('notes').find({ title: name }).sort({ _id: -1 }).limit(1).toArray();
        console.log(note);
        return note[0];
    } catch (err) {
        throw err;
    } finally {
        await client.close();
    }
}
module.exports = { getNotes, addNotes,getNoteById,getNoteByParams,find };