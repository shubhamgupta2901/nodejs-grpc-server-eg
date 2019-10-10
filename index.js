/**
 * implementing node.js gRPC Server in the entry point of application
 * Inside we import the grpc module
 * then we use the grpc load method passing the path of our notes.proto so it can be loaded by the grpc module.
 * Then we instantiate grpc Server object and bind it to our localhost with the port of 50051
 * For development testing, passing Server Credential insecure object for our current . 
 * Finally invoke the start method of the server to start our gRPC server.
 */

const grpc = require('grpc');
const notesProto = grpc.load('notes.proto');

const server = new grpc.Server();
server.bind('127.0.0.1:50051',grpc.ServerCredentials.createInsecure());
console.log('Server running at 127.0.0.1:50051');
server.start();