const axios = require('axios');

async function getDataById(id){
    const options = {
        method: 'GET',
        url: 'https://moviesdatabase.p.rapidapi.com/titles/'+id,
        headers: {
          'X-RapidAPI-Key': process.env.RAPID_KEY,
          'X-RapidAPI-Host': process.env.RAPID_HOST
        }
      };
      
      try {
          const response = await axios.request(options)
          if (response && response.data) {
            return response.data; // Return the response data
          } 
          return;
      } catch (error) {
        throw new Error('No data found');
      }
}

module.exports = getDataById;