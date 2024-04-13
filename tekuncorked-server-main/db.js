const mongoose = require('mongoose');


const createDbConnection= async()=> {
	try{
		const DB_USERNAME  = process.env.DB_USERNAME; 
		const DB_PASSWORD  = process.env.DB_PASSWORD;
		const mongoURI =  `mongodb+srv://dhruvtyagi619:dhruv@cluster0.r9sixtl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

		const connectionOptions = { useNewUrlParser: true, useUnifiedTopology: true };
		await mongoose.connect(mongoURI , connectionOptions); 

		console.log('database connected');
	}catch (error){
		console.log('database me erroe aagya',error);
	}
}



module.exports = createDbConnection;
