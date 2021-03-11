require('dotenv').config();
const mongoose = require("mongoose");
const mongodb = require("mongodb");

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String],
});

let Person = mongoose.model("Person", personSchema);
const createAndSavePerson = (done) => {
  const person = new Person({
    name: "omer",
    age: "23",
    favoriteFoods: ["hamburger", "pizza"],
  });
  person.save((err, data) => {
    done(null, data);
  });
};
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople).then(data =>{
  done(null , data);
  })
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}).then(data => done(null , data))
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}).then(data => done(null , data))
};

const findPersonById = (personId, done) => {
  Person.findById({_id: personId}).then(data => done(null , data))
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById({_id: personId}).then(person => {
    person.favoriteFoods.push(foodToAdd);
    person.save((err, data) => {
    done(null, data);
  });
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}).then(data =>{
    done(null, data);
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove({_id: personId}).then(data =>done(null, data))
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({ name: nameToRemove }).then((data) => {
    done(null, data);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: 1 })
    .limit(2)
    .select("-age")
    .exec((err, data) => {
      done(null, data);
    });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
