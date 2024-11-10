// MVC --> Model, View, Controller (Routers)
let mongoose = require('mongoose')
// create a model class
let tournamentModel = mongoose.Schema({
    Name:String,
    Author:String,
    StartDate:String,
    EndDate:String
},
{
    collection:"Bio_books"
}
)
module.exports = mongoose.model('Tournament', tournamentModel)