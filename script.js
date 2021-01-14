var ex = require('express')
var cors = require('cors')
var app = ex();
app.use(cors())
var bodyParser = require('body-parser');
const MongoClient = require('mongodb');
const uri = 'mongodb+srv://aditya:NeuralNet@1@cluster0.tbopk.mongodb.net/playground?retryWrites=true&w=majority'
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(process.env.PORT || 5000, function() {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
app.post('/fetch', function(req, res) {


    MongoClient.connect(uri, function(err, db) {
        if (err) throw err;
        var dbo = db.db("playground");
        var query = { "name": "adityasreeram99-gmail-com" };
        dbo.collection("userdata").find(query).toArray(function(err, result) {
            console.log(result)
            return res.send({ data: result[0] })
            db.close();
        });

    });

})
app.post("/addProject", function(req, res) {
    MongoClient.connect(uri, function(err, db) {
        if (err) throw err;
        var dbo = db.db("playground");
        dbo.collection('userdata').updateOne({ "name": "adityasreeram99-gmail-com" }, {
            $push: {

                "projects": {
                    "name": req.body.name,
                    "date": req.body.date,
                    "progress": "0%",
                    "left": req.body.days,
                    "desc": req.body.desc,
                    "modules": []

                }

            },
            function(err, re) {
                console.log("1 updated")

            }

        })

        return res.send({ status: true })
    });
})


app.post("/delProject", function(req, res) {
    MongoClient.connect(uri, function(err, db) {
        if (err) throw err;
        var dbo = db.db("playground");
        dbo.collection('userdata').updateOne({ "name": "adityasreeram99-gmail-com" }, {
            $pull: {

                "projects": { name: req.body.del }

            },
            function(err, res) {
                console.log("1 updated")
            }

        })
        return res.send({ status: true })
    })
})
app.post("/addModule", function(req, res) {
    console.log(req.body)
    MongoClient.connect(uri, function(err, db) {
        if (err) throw err;
        var dbo = db.db("playground");
        dbo.collection('userdata').updateOne({ "name": "adityasreeram99-gmail-com", "projects.name": req.body.project }, {
            $push: {

                "projects.$.modules": {
                    "name": req.body.name,
                    "submodules": [{ "val": req.body.pin }]
                }

            },
            function(err, re) {
                console.log("1 updated")

            }

        })

        return res.send({ status: true })
    });
})
app.post("/delModule", function(req, res) {
    console.log(req.body)
    MongoClient.connect(uri, function(err, db) {
        if (err) throw err;
        var dbo = db.db("playground");
        dbo.collection('userdata').updateOne({ "name": "adityasreeram99-gmail-com", "projects.name": req.body.project }, {
            $pull: {

                "projects.$.modules": { name: req.body.del }

            },
            function(err, res) {
                console.log("1 updated")
            }

        })
        return res.send({ status: true })
    })
})

app.post("/addPin", function(req, res) {
    console.log(req.body)
    MongoClient.connect(uri, function(err, db) {
        if (err) throw err;
        var dbo = db.db("playground");
        var ind = -1;
        dbo.collection('userdata').find({ "projects.name": req.body.project }).toArray(function(err, result) {

            var projects = result[0].projects
            for (var x in projects) {
                if (projects[x].name === req.body.project) {
                    for (var j in projects[x].modules) {
                        if (projects[x].modules[j].name === req.body.module) {
                            ind = j
                            break
                        }
                    }
                }
            }
            console.log(ind)

            var q = "projects.$.modules." + ind + ".submodules"
            var $push = {}
            $push[q] = { "val": req.body.pin }
            console.log(q)

            var obj = {
                $push,
                function(err, re) {
                    console.log("1 updated")

                }

            }
            console.log(obj)
            dbo.collection('userdata').updateOne({ "name": "adityasreeram99-gmail-com", "projects.name": req.body.project, "projects.modules.name": req.body.module }, obj)
            return res.send({ status: true })

        })



    });

})

app.post("/delPin", function(req, res) {
    console.log(req.body)
    MongoClient.connect(uri, function(err, db) {
        if (err) throw err;
        var dbo = db.db("playground");
        var ind = -1;
        dbo.collection('userdata').find({ "projects.name": req.body.project }).toArray(function(err, result) {

            var projects = result[0].projects
            for (var x in projects) {
                if (projects[x].name === req.body.project) {
                    for (var j in projects[x].modules) {
                        if (projects[x].modules[j].name === req.body.module) {
                            ind = j
                            break
                        }
                    }
                }
            }
            console.log(ind)

            var q = "projects.$.modules." + ind + ".submodules"
            var $pull = {}
            $pull[q] = { "val": req.body.pin }
            console.log(q)

            var obj = {
                $pull,
                function(err, re) {
                    console.log("1 updated")

                }

            }
            console.log(obj)
            dbo.collection('userdata').updateOne({ "name": "adityasreeram99-gmail-com", "projects.name": req.body.project, "projects.modules.name": req.body.module }, obj)
            return res.send({ status: true })
        })
    })

})