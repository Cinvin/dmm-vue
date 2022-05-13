import axios from 'axios'

export function getSampleVideoURL(cid) {
    let urls = []
    
    let items=[]
    items.push(cid)
    let suffix=cid.match(/\d+$/g)
    if(suffix.length){
        items.push(cid.replace(suffix,'00'+suffix))
    }
    for (let item of items){
        urls.push(`https://cc3001.dmm.co.jp/litevideo/freepv/${item[0]}/${item.substring(0, 3)}/${item}/${item}_mhb_w.mp4`)
    }
    for (let item of items){
        urls.push(`https://cc3001.dmm.co.jp/litevideo/freepv/${item[0]}/${item.substring(0, 3)}/${item}/${item}_dmb_w.mp4`)
    }
    for (let item of items){
        urls.push(`https://cc3001.dmm.co.jp/litevideo/freepv/${item[0]}/${item.substring(0, 3)}/${item}/${item}_dm_w.mp4`)
    }
    for (let item of items){
        urls.push(`https://cc3001.dmm.co.jp/litevideo/freepv/${item[0]}/${item.substring(0, 3)}/${item}/${item}_sm_w.mp4`)
    }
    let promises = []
    for (let url of urls) {
        promises.push(axios.head(url).then(() => {
            return url
        }))
    }
    return Promise.allSettled(promises).then(
        (arr) => {
            for (let res of arr) {
                if (res.status == 'fulfilled') {
                    return res.value
                }
            }
        });
}