const MongoClient = require('mongodb');
var ObjectId = require('mongodb').ObjectID;
const uri = 'mongodb+srv://aditya:NeuralNet@1@cluster0.tbopk.mongodb.net/playground?retryWrites=true&w=majority'
MongoClient.connect(uri, function(err, db) {
        if (err) throw err;
        var dbo = db.db("playground");
        dbo.collection('userdata').updateOne({ "name": "adityasreeram99-gmail-com", "projects.name": "webdesign one" }, {
            $pull: {

                "projects.$.modules": { name: "module" }

            },
            function(err, res) {
                console.log("1 updated")
            }

        })

    })
    //     MongoClient.connect(uri, function(err, db) {
    //         if (err) throw err;
    //         var dbo = db.db("playground");
    //         dbo.collection('userdata').updateOne({ "name": "adityasreeram99-gmail-com", "projects.name": "webdesign one" }, {
    //             $push: {

//             "projects.$.modules": {
//                 "name": "module",
//                 "pin": "task1"
//             }

//         },
//         function(err, re) {
//             console.log("1 updated")

//         }

//     })


// });