/**
 * To call our gRPC Server method and see the response, we will create a gRPC node.js Client. 
 * We import the gRPC module, then load the notes.proto file and instantiate the Client using the NoteService object 
 * passing the localhost and the port of our gRPC server. 
 * We also pass insecure credentials for our development testing. 
 * At last we exports the client object in this module so it can be imported by other Client method we will implement.
 */
const grpc = require('grpc');

const PROTO_PATH = './notes.proto';
const NoteService = grpc.load(PROTO_PATH).NoteService;
const client = new NoteService('localhost:50051',grpc.credentials.createInsecure());

module.exports = client;