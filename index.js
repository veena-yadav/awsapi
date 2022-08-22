
var express = require('express')
var jwt = require('jsonwebtoken')
const secret = require('./secret')
var app = express()

// app.set("view engine","jade")
// app.get("/", function(req,res){
//     res.render('sample.jade')
// })
app.set("view engine","vash")
app.get("/", function(req,res){
    res.render('sample',{title:"My home page",content:"weclome user"})
})
function getToken(obj) {

    return jwt.sign(obj, secret)

}

function validate(obj, seckey) {
    return jwt.verify(obj, seckey)
}

app.use(express.json())

app.post("/register", (req, res) => {
    var userdetails = req.body

    res.send({ "token": getToken(userdetails), "secret": secret })

})

app.post("/login", (req, res) => {

    var authconf = validate(req.body.token, req.body.secret)
    console.log(authconf)

    if (authconf) {
        res.send("user validated")
    }

})

app.listen(5600, function() {
    console.log("server started")
})

