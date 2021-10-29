import mongoose from 'mongoose'

export function connect(uri){
    if(process.env.NODE_END === "production"){
        uri = process.env.MONGODB_URI
    }

    mongoose.connect(uri)

    mongoose.connection.on("connected", () => {
        console.log(`Conncted to ${uri}`)
    })

    mongoose.connection.on("error", (err) => {
        console.log(`Connction error ${err}`)
    })

    mongoose.connection.on("disconnected", () => {
        console.log(`Disconnected from ${uri}`)
    })
}