const mongoose=require('mongoose');

const dbConnection=async()=>{
    try {
      
       await mongoose.connect(process.env.DB_CNN);

       console.log('DB ONLINE')

    } catch (error) {
        console.log(error);
        throw new error('Error a la hora de inicializar base de datos')
        
    }
}

module.exports={
    dbConnection
}