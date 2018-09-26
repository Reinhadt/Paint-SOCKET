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

if(process.env.NODE_ENV === 'dev'){
    callbackURL = 'http://localhost:3000/auth/google/callback'
}else{
    callbackURL = process.env.CALLBACK_URL
}

process.env.URLDB = urlDB

process.env.CALLBACK = callbackURL

//=====================
//GOOGLE CLIENT ID
//=====================
process.env.CLIENT_ID = process.env.CLIENT_ID