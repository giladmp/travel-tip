import {storageService} from './storage.service.js'
export const locService = {
    getLocs,
    getLocInfo,
}

const gLoc = { 
    currentLocIdx: -1,
    locs: []
} 

const STORAGE_KEY = 'locationsDB'

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(gLoc.locs)
        }, 2000)
    })
}


function getLocInfo(lat, lng) {
    const API_KEY = 'AIzaSyDUB5h052OFUAh1JfgvpFiMZ5k69QYaCvg'
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`)
    .then(res => res.data)
    .then(res => createLoc(lat, lng, res.results[0].formatted_address, res.results[0].place_id))
}

function createLoc(lat, lng, address, id){
   const location = {
        id, 
        address,
        lat,
        lng,
        createdAt: Date.now()
    }
    gLoc.locs.push(location)
    storageService.saveToStorage(STORAGE_KEY, gLoc.locs)
    gLoc.currentLocIdx++
}

// function deleteLoc
