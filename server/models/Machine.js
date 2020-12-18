const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Machine = new Schema({
    macAddress: String,
    cpuLoad: String,
    freeMem: Number,
    usedMem: Number,
    totalMem: Number,
    memUseage: Number,
    numCores: Number,
    osType: String,
    upTime: Number,
    cpuSpeed: Number,
    cpuModel: String
})

module.exports = mongoose.model("Machine", Machine);
