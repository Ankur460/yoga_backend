const express=require('express');
const cors=require('cors');
//const userrouter=require('./routes/userRegistration');
//const userRegistration = require('./routes/userRegistration');
const userrouter=require('./routes/userRegistration');
const path = require('path')
const app=express();

app.use(express.json());

app.use(cors({
    origin:'*'
}))

// app.use(express.static(path.join(__dirname, "./build")));
// app.get("*", function (_, res) {
//     var filePath = "./build/index.html";
//     var resolvedPath = path.resolve(filePath);
//     res.sendFile(
//         resolvedPath,
//         function (err) {
//             res.status(500).send(err);
//         }
//     );
// });

app.use('/api',userrouter);

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})