import axios from 'axios';

const getData = (endpoint: string, isDetail: boolean = false) => {
    return axios.get(`${process.env.REACT_APP_API_ENDPOINT}/${endpoint}`)
    .then((res) => {
      if (!isDetail) {
        return res.data.results
      }
      return res.data;
    })
    .catch((ex) => {
      console.error(`Error in api get for the endpoint => ${endpoint}, ${ex}`)
    })
}

export default getData;