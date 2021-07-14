import axios from 'axios'
import { Spin } from '../models/Spin'
import { Symbol } from '../models/Symbol'

// const API_ROOT = 'https://dreamcatcher.spike-realtime-api.eu/api'

const API_ROOT = 'http://localhost:5004/api'


export const pushRows = async (rows : Spin[]) => {
    // console.log(rows)
    const write = await axios.post(`${API_ROOT}/write-spins`, rows)

    // console.log(write.data)

    // console.log(results.map(r => r.data))
}

