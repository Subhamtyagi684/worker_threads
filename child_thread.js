const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');
const fetchData = require("./location-search");

parentPort.on('message', async (message) => {
    if(message=="start"){
        
        let data = [];
        try{
            for(let i of workerData){
                const movieData = await fetchData(i.id);
                if(movieData?.results){
                    data.push(movieData.results)
                }
            }
            parentPort.postMessage(data);
        }catch(err){
            parentPort.postMessage(null);
        }
    }
});