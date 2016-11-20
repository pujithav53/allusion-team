var express    = require("express");
var mysql      = require('mysql');
var bodyParser = require('body-parser');
var fs=require('fs');
var app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
var connection = mysql.createConnection
({
  host     : 'localhost',
  user     : 'root',
  password : 'pujasai1353',
  database : 'node'
});
connection.connect(function(err){
if(!err) {
    console.log("Database is connected ... nn");    
} else {
    console.log("Error connecting database ... nn"+err);    
}
});

app.all('/*.html', function (req, res) {
       console.log(req.url);
       var out = fs.readFileSync("temp" + req.url);
       res.set('content-type', 'text/html');
       res.send(out);
   });

    

app.post("/login",function(req,res)
{
var userid=req.body.userid;
var password=req.body.password;
var values=[userid,password];
connection.query('select * from register where userid=? and password=?',values,function(err, rows, fields) {
if (!err)
    {
      console.log('The solution is: ', rows);
      
  
              if(rows.length==1)
               {
                  console.log('login successfully');
                  
                   app.set('views','./temp');
                    app.set('view engine','jade'); 
                  res.redirect('index',{list:[userid]});
                   
               }
                    else{
                      console.log('error');
                     res.write('you are not a valid user');
                     }
  
}

  else{
    console.log('error while performing query.'+err);
     res.write("error");
  }
  res.end();
  });
});
app.listen(5000);





    
              