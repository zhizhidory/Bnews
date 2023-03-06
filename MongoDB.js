const { MongoClient } = require("mongodb");
require("dotenv").config()
// Replace the uri string with your connection string.
const uri = process.env.DBURI;

// const client = new MongoClient(uri);
// const database = client.db('bignews');
// const crawlerdata = database.collection('crawlerdata');
const result = {MongoClient, uri}


// async function run() {
//   try {
//     // Query for a movie that has the title 'Back to the Future'
//     const doc = { title: 'test' };
//     const result = await crawlerdata.insertOne(doc);

//     console.log(result);
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);
module.exports = result