import {connect} from './src/javascripts/config/db/connect'
import { FlashCard } from './src/javascripts/models/flashcard'

connect("mongodb://localhost:27017/flashcards")

FlashCard.find().exec((err,  flashcards) => {
    if(err){
        console.log(err)
    } else {
        console.log(flashcards)
    }
})