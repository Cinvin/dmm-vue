import axios from 'axios'
import { ItemListParams } from './dmmconfig'

export function getItemList (params) {
  const url = 'https://api.dmm.com/affiliate/v3/ItemList?'

  const data = Object.assign({}, ItemListParams, params)
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getItem (cid) {
  const url = 'https://api.dmm.com/affiliate/v3/ItemList?'

  const data = Object.assign({}, ItemListParams, {
    cid: cid
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}