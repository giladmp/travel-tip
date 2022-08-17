export const locService = {
    getLocs,
    getLocInfo,
}

const gLoc = { 
    currentLocIdx: 0,
    locs:
        [
            // {
            // id,
            // name,
            // lat,
            // lng,
            // weather,
            // createdAt,
            // updatedAt
            // },
        ]
} 

// const locs = [
//     { name: 'Greatplace', lat: 32.047104, lng: 34.832384 },
//     { name: 'Neveragain', lat: 32.047201, lng: 34.832581 }
// ]

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs)
        }, 2000)
    })
}


function getLocInfo(lat, lng) {
    const API_KEY = 'AIzaSyDUB5h052OFUAh1JfgvpFiMZ5k69QYaCvg'
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`)
    .then(res => res.data)
    .then(res => createLoc(lat, lng, res.results[0].formatted_address, res.results[0].place_id))
        // console.log({lat, lng}, res.results[0].formatted_address, res.results[0].place_id)) 
}

function createLoc(lat, lng, address, id){
   const location = {
        id, 
        address,
        lat,
        lng,
        createdAt: Date.now()
    }
    console.log('location:', location)
    
    gLoc.locs.push(location)
    gLoc.currentLocIdx++
}
