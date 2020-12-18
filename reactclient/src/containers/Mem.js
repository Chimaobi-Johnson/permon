import React from 'react';
import drawCircle from '../utilities/canvasLoadAnimation';


const Memory = props => {

    const {totalMem, usedMem, memUseage, freeMem} = props.memData;
    const canvas = document.querySelector('.memCanvas');
    drawCircle(canvas, memUseage*100);
    const totalMemInGB = Math.floor(totalMem/1073741824*100)/100; // converting to Gigabyte
    const freeMemInGB = Math.floor(freeMem/1073741824*100)/100; // converting to Gigabyte
    return (
        <div className="col-sm-3 mem">
            <h3>Memory Useage</h3>
            <div className="canvas-wrapper">
                <canvas className="memCanvas" width="200" height="200"></canvas>
                <div className="mem-text">{memUseage*100}%</div>
            </div>
            <div>
                Total Memory: {totalMemInGB}GB
            </div>
            <div>
                Free Memory: {freeMemInGB}GB
            </div>
        </div>
    )
}

export default Memory