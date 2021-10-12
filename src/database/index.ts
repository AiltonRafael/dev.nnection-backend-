import mongoose from "mongoose";
import 'dotenv/config'

const mongoURI = process.env.MONGO_URI
export default function connectToMongoDB(): void {

    if (mongoURI) {
        mongoose.connect(
            mongoURI, 
            () => console.log(`Connected to mongoBD`)
        );
    } else {
        console.log('Failed to connect')
    }
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error: "));
    db.once("open", function () {
    console.log("Connected successfully");
});
}