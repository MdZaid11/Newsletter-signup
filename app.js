const express = require("express")
const bodyParser = require("body-parser")
const request = require("request")
const https = require("https")
const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(express.static("public"))
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");

})
app.post("/", function(req, res) {


  const FName = req.body.first;
  const Lname = req.body.last;
  const Email = req.body.email;
  const data = {
    members: [{
      email_address: Email,
      status: "subscribed",
      merge_fields: {
        FNAME: FName,
        LNAME: Lname

      }
    }]
  };
  //   const data = {
  //      email_address: Email,
  //      status: "subscribed",
  //      merge_fields: {
  //          FNAME: FName,
  //          LNAME: Lname
  //     }
  // }
  const JsonData = JSON.stringify(data);
  const url = "https://us18.api.mailchimp.com/3.0/lists/32d1f94f98";
  const option = {
    method: "POST",
    auth: "Zaidmd:e38258a3d527d2e00ac7ea75bfec81aa-us18"
  }
  const request = https.request(url, option, function(response) {
    response.on("data", function(data) {
      console.log(JSON.parse(data));
    })
    const code = (response.statusCode)
    if (code === 200) {
      res.sendFile(__dirname + "/success.html")
    } else {
      res.sendFile(__dirname + "/failure.html")
    }
  })
  request.write(JsonData);
  request.end();
});
app.post("/failure", function(req, res) {
  res.redirect("/");
})
app.listen(process.env.PORT || 5000, function() {
  console.log("server is running on port 3000")
})
