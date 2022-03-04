import  {Schema,connect,PaginateModel,model,Document} from "mongoose";
require('dotenv').config();

const { DATABASE_URI } = process.env;

connect(`${DATABASE_URI}`, (err) => {
  if(err) throw new Error("Database Connection Error")
  console.log('Database Connection Established');
});

interface ICharater extends Document {
  name: String;
  alternate_names: [String];
  species: String;
  gender: String;
  house: String;
  dateOfBirth: Date;
  yearOfBirth: Number;
  wizard: Boolean;
  ancestry: String;
  eyeColour: String;
  hairColour: String;
  wand: Object;
  patronus: String;
  hogwartsStudent: Boolean;
  hogwartsStaff: Boolean;
  actor: String;
  alternate_actors: [String];
  alive: Boolean;
  image: String;
}


const CharacterSchema = new Schema({
  name: String,
  alternate_names: [String],
  species: String,
  gender: String,
  house: String,
  dateOfBirth: Date,
  yearOfBirth: Number,
  wizard: Boolean,
  ancestry: String,
  eyeColour: String,
  hairColour: String,
  wand: Object,
  patronus: String,
  hogwartsStudent: Boolean,
  hogwartsStaff: Boolean,
  actor: String,
  alternate_actors: [String],
  alive: Boolean,
  image: String,
});

CharacterSchema.plugin(require("mongoose-paginate-v2"));

interface CharacterModel<T extends Document> extends PaginateModel<T> { }


export const CharacterModel:CharacterModel<ICharater> = model<ICharater>(
  'Character',
  CharacterSchema
) as CharacterModel<ICharater>;
