// Importing external dependencies
const mongoose = require('mongoose');
const fs = require('fs')
const dotenv = require('dotenv');
const Tour = require('./../../models/tourModels');
// Importing config options
dotenv.config({ path: './config.env' });

// Connecting to DB
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
// Starting Mongoose
mongoose
  .connect(DB)
  .then(() => console.log('DB connection successful'));



// Read json file
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'));

// Import data into db
const importData = async function(){
    try{
        await Tour.create(tours);
        console.log('Data successfully Loaded!🎉');
        process.exit();
    }catch(err){
        console.log();
        
    }
}

// Delete all data from collection
const deleteData = async () => {
    try{
        await Tour.deleteMany()
        console.log('Data successfully deleted');
        process.exit()
    }catch(err){
        console.log(err);
        
    }
}


if(process.argv[2] === '--import'){
    importData();
} 
else if(process.argv[2] === '--delete'){
    deleteData();
}

console.log(process.argv);
