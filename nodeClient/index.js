// this node program captures local machine data and sends it to the socket.io server
const os = require("os");
const io = require("socket.io-client");

let socket = io("http://127.0.0.1:8181");

socket.on("connect", () => {
    console.log("Connection to the socket server successful");
    // A way to identify this device to whomever is concerned
    const nI = os.networkInterfaces();
    let macAddress;
    // loop through all the nI for this machine and find a non-internal one
    for(let key in nI) {
        //check if internal is false
        if(!nI[key][0].internal) {
            if(nI[key][0].mac === "00:00:00:00:00:00") {
                macAddress = Math.floor().toString(36).substr(2, 15);
            } else {
                macAddress = nI[key][0].mac;
            }
            break;
        }
    }

    socket.emit("clientAuth", "sd41sdksjndsdf4sfsd45");

    performanceData().then(allPerformanceData => {
        allPerformanceData.macAddress = macAddress;
        socket.emit("initPerfData", allPerformanceData)
    })


    let perfDataInterval = setInterval(() => {
        performanceData().then(allPerformanceData => {
            // console.log(allData)
            allPerformanceData.macAddress = macAddress;
            socket.emit("perfData", allPerformanceData)
        })
    }, 1000);

    socket.on('disconnect', () => {
        clearInterval(perfDataInterval)
    })
})


function performanceData () {
    return new Promise(async (resolve, reject) => {
        const cpus = os.cpus();
        // Free Memory
        const freeMem = os.freemem();
        // Total Memory
        const totalMem = os.totalmem();
        // Memory Useage
        const usedMem = totalMem - freeMem;
        const memUseage = Math.floor(usedMem/totalMem*100)/100;
        // OS Type
        const osType = 'Darwin' ? 'Mac' : os.type();
        //Uptime
        const upTime = os.uptime();
        // CPU Info
        //type
        const cpuModel = cpus[0].model;
        // number of cores
        const numCores = cpus.length;
        // clock speed
        const cpuSpeed = cpus[0].speed;

        const cpuLoad = await getCpuLoad();
        resolve({
            freeMem,
            usedMem,
            totalMem,
            memUseage,
            numCores,
            osType,
            upTime,
            cpuSpeed,
            cpuLoad,
            cpuModel
        })
    })
}

function cpuAverage() {
    // get ms in each node, but this number is since reboot
    // so get it now and get it 100ms since reboot
    const cpus = os.cpus();
    let idleMs = 0;
    let totalMs = 0;
    // loop through each core
    cpus.forEach((aCore) => {
        //loop through each property of the current core
        for(type in aCore.times) {
            totalMs += aCore.times[type];
        }
        idleMs += aCore.times.idle;
    })
    return {
        idle: idleMs / cpus.length,
        total: totalMs / cpus.length
    }
}

// const x = cpuAverage();
// console.log(x)

// because the times property is times since boot we will get
// now times, and milliseconds from now times, compare them, that will
// give us the current load

function getCpuLoad() {
    return new Promise((resolve, reject) => {
        const start = cpuAverage();
        setTimeout(() => {
            const end = cpuAverage();
            const idleDifference = end.idle - start.idle;
            const totalDifference = end.total - start.total;
            // calc percentage of used cpu
            const percentageCpu = 100 - Math.floor(100 * idleDifference / totalDifference);
            resolve(percentageCpu);
        }, 100);
    })
}
