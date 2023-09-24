import axios from "axios"

async function fetchdata(setData, offset) {
  try {
    const response= await axios.get(`https://api.slingacademy.com/v1/sample-data/photos?offset=${offset}&limit=32`);
    setData(response.data)
  }catch (error){
    console.error('error fetching data: ',error);
  }
}

export default fetchdata