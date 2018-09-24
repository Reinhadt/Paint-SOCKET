//=====================
//PUERTO
//=====================
process.env.PORT = process.env.PORT || 3000

//=====================
//ENTORNO
//=====================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//=====================
//BASES DE DATOS
//=====================
if(process.env.NODE_ENV === 'dev'){
    urlDB = 'mongodb://localhost:27017/googlelogin'
}else{
    urlDB = process.env.MONGO_URI
}

process.env.URLDB = urlDB

//=====================
//GOOGLE CLIENT ID
//=====================
process.env.CLIENT_ID = process.env.CLIENT_ID || '257544919474-ujoetd1hg0vmruq7ia1sn6o69fu74m7p.apps.googleusercontent.com'