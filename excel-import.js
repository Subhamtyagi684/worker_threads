const hotelList = require("./hotellist");
const fetchData = require("./location-search");
const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

console.log(hotelList.results.length)

let results = hotelList.results;  //10

async function main() {
    let data = [];
    
    try {
        const workerPromises = [];
        for(let i=0;i<results.length;i+=5){
            let promise=  new Promise((resolve, reject) => {
                const worker = new Worker("./child_thread.js",{
                    workerData: results.slice(i,i+5),
                });
                worker.on('message', (message) => {
                    data.push(...message);
                    resolve();
                });
                worker.on("error",()=>{
                    reject();
                })
                worker.postMessage("start");
            });
            workerPromises.push(promise);
        }
        await Promise.all(workerPromises);
        return data;
    } catch (error) {
      console.error('Error:', error);
      throw new Error(error);
    }
  }
  
module.exports = main;
  