import mongoose from 'mongoose'

const Schema = mongoose.Schema

let wordsSchema = new Schema({
    englishWord: String,
    germanWord: String
})

let flashcardSchema = new Schema({
    group: String,
    words: [ wordsSchema ]
})

export let FlashCard = mongoose.model("FlashCard", flashcardSchema)

