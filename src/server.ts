import mongoose from 'mongoose';
import app from './app';
import config from './config/index'

const port = config.port || 5000;

(async function main() {
    try{
        await mongoose.connect(config.database_url as string);
        console.log("Database connected successfully");
        app.listen(port,()=>{
            console.log("Server is listening on port", port)
        })
    }catch(err){
        console.log("Couldn't connect to database",err)
    }
})();