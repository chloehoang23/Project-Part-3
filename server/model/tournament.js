// MVC --> Model, View, Controller (Routers)
let mongoose = require('mongoose')
// create a model class
let tournamentModel = mongoose.Schema({
    Name:String,
    Location:String,
    Start:String,
    End:String
},
{
    collection:"Bio_books"
}
)
module.exports = mongoose.model('Tournament', tournamentModel)