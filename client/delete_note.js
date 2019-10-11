const client = require('./client');
client.delete({id: '1'},(error, note)=>{
    if(error){
        console.log(error.message);
        return;
    }
    console.log(note);
});