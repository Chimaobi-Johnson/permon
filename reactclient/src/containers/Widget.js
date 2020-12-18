import React from 'react';
import Cpu from './Cpu';
import Info from './Info';
import Memory from './Mem';


const Widget = props => {
    const { 
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
    } = props.data

    const cpu = {cpuLoad}
    const mem = {totalMem, usedMem, memUseage, freeMem}
    const info = {macAddress, osType, upTime, cpuModel, numCores, cpuSpeed}

    return (
        <div>
            <h1>Widget</h1>
            <Cpu cpuData={cpu} />
            <Memory memData={mem} />
            <Info infoData={info} />
        </div>
    )
}

export default Widget