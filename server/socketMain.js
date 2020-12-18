const mongoose = require("mongoose");

const Machine = require("./models/Machine");

mongoose.connect("mongodb+srv://CharlieJohnson:Chimaobi1995@cluster0.y684j.mongodb.net/permon", { useNewUrlParser: true })
.then(connect => {
    console.log("Database connected")
}).catch(err => {
    console.log(err)
})

function socketMain (io, socket) {
    // console.log("A socket connected. ", socket.id )
    let macAddress;

    socket.on("clientAuth", (key) => {
        if(key === 'sd41sdksjndsdf4sfsd45') {
            // valid node client
            socket.join("client");
        } else if(key === '5dfss25df1fskjdk484e8') {
            // UI client
            socket.join("UI");
            console.log("A react client has joined")
        } else {
            // invalid client
            socket.disconnect(true)
        }
    })

    // a machine has connected check to see if its new
    // if it is, add it

    // data comes in once
    socket.on("initPerfData", async (data) => {
        // update socket connect function scoped variable
        macAddress = data.macAddress;
        // check mongodb
        const mongooseResponse = await checkAndAdd(data);
        console.log(mongooseResponse);
    })

    // data comes in per second
    socket.on("perfData", (data) => {
        console.log("Ticking...");
        io.to("UI").emit("data", data)
    })

}

function checkAndAdd(data) {
    // a promise is used here because js cant wait for the db to complete
    return new Promise((resolve, reject) => {
        Machine.findOne(
            { macAddress: data.macAddress },
            (err, doc) => {
                if(err) {
                    throw err;
                    reject(err);
                } else if(doc === null) {
                    // this means the record does not exist in the db
                    let newMachine = new Machine(data);
                    newMachine.save();
                    resolve('added')
                } else {
                    resolve('found')
                }
            }
        )
    })
}

module.exports = socketMain;