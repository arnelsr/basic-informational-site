//flow
//create server
//build path name with url dirname
// read relevant page
//run server and listen port

//require
const http=require('http');
const path=require('path');
const fs=require('fs');

//create server

const server=http.createServer((req,res)=>{
    let filePath='';
    //join path
    filePath = path.join(__dirname, req.url==='/' ?
    'index.html' : req.url+'.html');
    
    // Read relevant file
  
   fs.readFile(filePath,(err, content)=>{
    if(err){
        if(err.code=='ENOENT'){
            //page not found
            fs.readFile(path.join(__dirname,'404.html'),
            (err,content)=>{
                res.writeHead(200,{'Content-Type':'text/html'});
                res.end(content,'utf8');
           
            })
        }else{
            //some server error
            res.writeHead(500);
            res.end(`Server Error: ${err.code}`);
        }
    }else{
        //success
        res.writeHead(200,{'Content-Type':'text/html'});
        res.end(content,'utf8');
    }
   });

});
const PORT=8080;
server.listen(PORT,()=>console.log(`Server running on port ${PORT}`));