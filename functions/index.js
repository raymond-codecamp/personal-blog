const admin = require("firebase-admin");
const functions = require("firebase-functions");
const {Storage} = require('@google-cloud/storage');
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path');
const os = require('os');
const fs = require('fs');
const Busboy = require('busboy');



var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ origin: true }));

var serviceAccount = require("./permission.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://pipapi-c5ccc.firebaseio.com",
  storageBucket: "gs://pipapi-c5ccc.appspot.com",
});

const db = admin.firestore();
const storage = new Storage();

 //get requests
 
app.get("/home", (request, response) => {
  var data;
  db.collection("signup")
    .get()
    .then((doc) => {
      data = doc;
      console.log(doc);
    });
  response.json(data);
});

app.get('/fetchPosts/:user',function(request,response){
  let user = request.params.user;
  let build = db.collection('blogposts');
  build = build.where('postBy','==',user); 
  build = build.where('postStatus','==',true);
  build.get()
  .then(function(snapshot){
    if(snapshot.empty)
    {
      return response
      .status(300)
      .json(
        {
          "isSuccess": false,
          "message": "No entry found for the given data."
        });
    }
    let contents = [];
    snapshot.forEach(doc=>{
      contents.push(doc.data());
    });
    return response
    .status(200)
    .json(
      {
        "isSuccess": true,
        "message": "Fetched successfully.",
        "data" : contents,
      });
  })
  .catch(function(error){
    return response.status(error.statusCode).json({"error":error});
  });
});

app.get('/getUserProfile/:email',async function(request,response){

  var email = request.params.email;
  await db.collection('signup')
  .where('email','==',email)
  .get()
  .then(function(snapshot){
    var docs=[];
    var docIds=[];
    snapshot.forEach(function(doc){
      docs.push(doc.data());
      docIds.push(doc.id);
    });
    if(docs.length > 0)
    {
      return response.json({"status":200,"docid":docIds,"user":docs});
    }
    else
    {
      return response.json({"status":404,"message":`No data found for ${email}`});
    }
    
  })
  .catch(function(error){
    return response.json({"status":error.statusCode,"message":error.message});
  });
});

//post requests

app.get('/getProfile',function(request,response){
  
});
app.post("/saveInfo", async (request, response) => {
  var email = request.body.email;
  var fullName = request.body.fullName;
  var data = {
    fullName: fullName,
    email: email,
  };
  try{
      await db.collection("signup").doc().set(data)
      .then((res)=>{
        response
        .status(200)
        .json({
          createMessage: "User "+email+" successfully created.", 
          status : 200, 
          isSuccess:true
        });
      })
      .catch(error=>
        response
        .status(500)
        .json(
          {
            status : error.statusCode, 
            errorMessage: error.errorMessage, 
            isSuccess:false
          }
        ))      
    }
    catch(error)
    {
      return response
      .status(error.statusCode)
      .json(
        {
          status : error.statusCode, 
          errorMessage: error.errorMessage, 
          isSuccess:false
        }
      );
    }    
});
app.post('/saveFile', (request,response)=>{
  const busboy = new Busboy({headers: request.headers});
  const tmpdir = os.tmpdir();

  // This object will accumulate all the fields, keyed by their name
  const fields = {};

  // This object will accumulate all the uploaded files, keyed by their name.
  const uploads = {};

  // This code will process each non-file field in the form.
  busboy.on('field', (fieldname, val) => {
    // TODO(developer): Process submitted field values here
    console.log(`Processed field ${fieldname}: ${val}.`);
    fields[fieldname] = val;
  });

  const fileWrites = [];

  // This code will process each file uploaded.
  busboy.on('file', (fieldname, file, filename) => {
    // Note: os.tmpdir() points to an in-memory file system on GCF
    // Thus, any files in it must fit in the instance's memory.
    console.log(`Processed file ${filename}`);
    const filepath = path.join(tmpdir, filename);
    uploads[fieldname] = filepath;

    const writeStream = fs.createWriteStream(filepath);
    file.pipe(writeStream);

    // File was processed by Busboy; wait for it to be written.
    // Note: GCF may not persist saved files across invocations.
    // Persistent files must be kept in other locations
    // (such as Cloud Storage buckets).
    const promise = new Promise((resolve, reject) => {
      file.on('end', () => {
        writeStream.end();
      });
      writeStream.on('finish', resolve);
      writeStream.on('error', reject);
    });
    fileWrites.push(promise);
  });

  // Triggered once all uploaded files are processed by Busboy.
  // We still need to wait for the disk writes (saves) to complete.
  busboy.on('finish', async () => {
    await Promise.all(fileWrites);

    // TODO(developer): Process saved files here
    for (const file in uploads) {
      await admin.storage().bucket().upload(uploads[file])
      .then(async function(success){
        var pieces =uploads[file].split('/');
        var fileUploaded = pieces[pieces.length-1];
        admin.storage().bucket().file(fileUploaded).makePublic()
        .then(function(){
          response.json({"url": `https://storage.cloud.google.com/pipapi-c5ccc.appspot.com/${fileUploaded}`});
        })
        .catch(function(error){
          response.json({"error":error.message});
        });
      })
      .catch(function(error){
        response.send(error.message);
      });
      fs.unlinkSync(uploads[file]);
    }
  });

  busboy.end(request.rawBody);
});

app.post('/publishPost',async function(request,response){
  var d = new Date();
  var currentTime =d.toISOString();
  var postData = {
    postTitle: request.body.postTitle,
    postTags: request.body.postTags,
    postContent: request.body.postContent,
    postBy: request.body.postBy,
    postOn: currentTime,
    postLikes: request.body.postLikes,
    postComments: request.body.postComments,
    postStatus: true,
  }
  try{
    await db.collection("blogposts").doc().set(postData)
    .then((res)=>{
      response
      .status(200)
      .json({
        createMessage: `The blog post ${postData.postTitle} published.`, 
        status : 200, 
        isSuccess:true
      });
    })
    .catch(error=>
      response
      .status(500)
      .json(
        {
          status : error.statusCode, 
          errorMessage: error.errorMessage, 
          isSuccess:false
        }
      ))      
  }
  catch(error)
  {
    return response
    .status(error.statusCode)
    .json(
      {
        status : error.statusCode, 
        errorMessage: error.errorMessage, 
        isSuccess:false
      }
    );
  }    
});
exports.app = functions.https.onRequest(app);
