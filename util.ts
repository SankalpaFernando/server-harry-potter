const fs = require("fs");
const { CharacterModel } = require("./db")

const rawBuffer = fs.readFileSync("./characters.json");
const docs = JSON.parse(rawBuffer);

CharacterModel.collection.insertMany(docs)
  .then((entries:any) => {
  console.log(`${entries.insertedCount} of Entries Has been Successfully Imported`);
}).catch(() => {
  console.log("Error Occurred");
}).finally(() => {
  process.exit(0);
})