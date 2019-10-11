/**
 * implementing node.js gRPC Server in the entry point of application
 * Inside we import the grpc module
 * then we use the grpc load method passing the path of our notes.proto so it can be loaded by the grpc module.
 * Then we instantiate grpc Server object and bind it to our localhost with the port of 50051
 * For development testing, passing Server Credential insecure object for our current . 
 * Finally invoke the start method of the server to start our gRPC server.
 */

const grpc = require('grpc');
const uuidv1 = require('uuid/v1');
const notesProto = grpc.load('notes.proto');
const dataStore = require('./dataStore');

const server = new grpc.Server();

/**
 * Adding NoteService to our gRPC server.
 * We invoke the server's addService method passing the NoteService service from the notesProto object 
 * The second parameter accepts an object that we will assign the list key with the value of function handler 
 * This will be invoked when the client calls the List method. 
 * It has 2 parameters, call and callback. 
 * The call is the request from the Client while the callback is a function we will invoke to return the response to the Client.
 * Inside the list function handler we just call the completion callback passing the notes as the second argument. 
 * The first argument accepts an error object to indicate if there is an error to the client, in our case we just pass null.
 */
server.addService(notesProto.NoteService.service,{
    list: (call,callback) => {
        callback(null, dataStore.notes);
    },
    insert: (call, callback) =>{
        let note = call.request;
        note.id = uuidv1();
        dataStore.notes.push(note);
        callback(null, note);
    },
    delete: (call, callback) => {
        let noteId = call.request.id;
        debugger;
        const noteIndex = dataStore.notes.findIndex(note => note.id === noteId);
        if(noteIndex===-1){
            callback(new Error('Note not found!'), null);
            return;
        }
        const deletedNote = dataStore.notes[noteIndex];
        dataStore.notes.splice(noteIndex,1);
        callback(null, deletedNote);
    }
})


server.bind('127.0.0.1:50051',grpc.ServerCredentials.createInsecure());
console.log('Server running at 127.0.0.1:50051');
server.start();