import axios from 'axios'
import { ActressSearchParams } from './dmmconfig'

export function getActressItem (params) {
  const url = 'https://api.dmm.com/affiliate/v3/ActressSearch?'

  const data = Object.assign({}, ActressSearchParams, params)
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}