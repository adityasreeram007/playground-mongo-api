const MongoClient = require('mongodb');
var ObjectId = require('mongodb').ObjectID;
const uri = 'mongodb+srv://aditya:NeuralNet@1@cluster0.tbopk.mongodb.net/playground?retryWrites=true&w=majority'
MongoClient.connect(uri, function(err, db) {
        if (err) throw err;
        var dbo = db.db("playground");
        var ind = -1;
        dbo.collection('userdata').find({ "projects.name": "webdesign one" }).toArray(function(err, result) {

            var projects = result[0].projects
            for (var x in projects) {
                if (projects[x].name === "webdesign one") {
                    for (var j in projects[x].modules) {
                        if (projects[x].modules[j].name === "web tests") {
                            ind = j
                            break
                        }
                    }
                }
            }
            console.log(ind)

            var q = "projects.$.modules." + ind + ".submodules"
            var $pull = {}
            $pull[q] = { "val": "redeo" }
            console.log(q)

            var obj = {
                $pull,
                function(err, re) {
                    console.log("1 updated")

                }

            }
            console.log(obj)
            dbo.collection('userdata').updateOne({ "name": "adityasreeram99-gmail-com", "projects.name": "webdesign one", "projects.modules.name": "vale" }, obj)

        })
    })
    //     dbo.collection('userdata').updateOne({ "name": "adityasreeram99-gmail-com" }, {
    //         $pull: {

//             "projects": { name: req.body.del }

//         },
//         function(err, res) {
//             console.log("1 updated")
//         }

//     })
//     return res.send({ status: true })
// })
// MongoClient.connect(uri, function(err, db) {
//     if (err) throw err;
//     var dbo = db.db("playground");
//     var ind = -1;
//     dbo.collection('userdata').find({ "projects.name": "webdesign one" }).toArray(function(err, result) {

//         var projects = result[0].projects
//         for (var x in projects) {
//             if (projects[x].name === "webdesign one") {
//                 for (var j in projects[x].modules) {
//                     if (projects[x].modules[j].name === "web tests") {
//                         ind = j
//                         break
//                     }
//                 }
//             }
//         }
//         console.log(ind)

//         var q = "projects.$.modules." + ind + ".submodules"
//         var $push = {}
//         $push[q] = { "val": "redeo" }
//         console.log(q)

//         var obj = {
//             $push,
//             function(err, re) {
//                 console.log("1 updated")

//             }

//         }
//         console.log(obj)
//         dbo.collection('userdata').updateOne({ "name": "adityasreeram99-gmail-com", "projects.name": "webdesign one", "projects.modules.name": "vale" }, obj)

//     })



// });