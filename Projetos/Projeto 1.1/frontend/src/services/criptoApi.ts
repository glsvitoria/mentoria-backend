import axios from "axios";

const criptoApi = axios.create({
   'baseURL': 'https://www.mercadobitcoin.net/api'
})

export default criptoApi