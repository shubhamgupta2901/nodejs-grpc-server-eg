const client = require('./client');
client.insert({title: 'Song', content: 'Constellations'},(error,note)=>{
    if(error){
        console.log(error);
        return;
    }
    console.log(note);
})