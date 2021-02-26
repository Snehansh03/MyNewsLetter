const express=require ("express");
const bodyparser=require("body-parser");
const request=require("request");
const https=require("https");

const app=express();

app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
    const fname=req.body.firstname;
    const lname=req.body.lastname;
    const email=req.body.email;

    const data={
        members:[
            {
                email_address : email,
                status: "subscribed",
                merge_fields:{
                    FNAME:fname,
                    LNAME:lname,
            }

            }
        ]
    }

    const jsonData=JSON.stringify(data);
    const url="https://usX.api.mailchimp.com/3.0/lists/904ec3f988";
    const options={
        method:"POST",
        auth:"sid:----------------Api Key--------------",
    }

    const request=https.request(url,options,function(response){
        
        if (response.statusCode===200){
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/faliure.html");

        }

        response.on("data",function(data){
            console.log(JSON.parse(data));
        });
    });
    request.write(jsonData);
    request.end();
});

app.post("/faliure",function(req,res){
    res.redirect("/");
});

app.listen(3000,function(){
    console.log("Server Running On 3000");
});
