const mongoose = require('mongoose')

const MovieModelSchema = new mongoose.Schema({
  title: String,
  director: String
})
const MovieModel = mongoose.model('movies', MovieModelSchema)
module.exports = MovieModel