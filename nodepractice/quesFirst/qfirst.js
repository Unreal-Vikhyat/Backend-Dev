const fs = require('fs')
var WordCount=0;

fs.readFile('./file.txt' ,'utf-8',(err,data)=>
{
    if(err) 
    {
        console.log("error while reading data");
        return;
    }

const words=data.trim().split(/\s+/);
const ans =words.length;

fs.writeFile('./Answer.txt',`Answer:${ans}`,(err)=>
{
    if(err) 
    {
        console.log("error while writing");
        return;
    }

    console.log("done")
})

})