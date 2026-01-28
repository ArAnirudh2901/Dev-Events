import mongoose, { mongo } from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI

let cached = global.mongoose

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

async function connectToDB() {
    if (cached.conn) {
        return cached.conn
    }

    if (!cached.promise) {
        if (!MONGODB_URI) {
            throw new Error(
                "Please define the MONGODB_URI environment variable inside the .env.local"
            )
        }

        const options = {
            bufferCommands: false,
        }

        cached.promise = mongoose.connect(MONGODB_URI, options).then((mongoose) => {
            return mongoose
        })
    }

    try {
        cached.conn = await cached.promise
    }

    catch (error) {
        cached.promise = null
        throw error
    }

    return cached.conn
}

export default connectToDB