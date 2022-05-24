import React, { useEffect, useState } from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';


const containerStyle = {
  width: '100%',
  height: '700px',
}


function MyComponent({location}) {
  const [mapInfo, setMapInfo] = useState({
    lat: 21.433920,
    lng: 91.987030
  })

  useEffect(()=> {
    const currentInfo = {...location}
    currentInfo.lat = location.lat
    currentInfo.lng = location.lng
    setMapInfo(currentInfo)
  }, [location])

  console.log(location)
  
  const center = {
    lat: mapInfo.lat,
    lng: mapInfo.lng
  };
  const loadMaker = () => {
    const currentInfo = {...location}
    currentInfo.loadfunction = true
    setMapInfo(currentInfo)
  }
  setTimeout(loadMaker, 1000);

  return (
    <LoadScript
    googleMapsApiKey= {process.env.REACT_APP_MAP_API}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={11}
      >
        {
          mapInfo.loadfunction && <Marker position={{ lat: mapInfo.lat, lng: mapInfo.lng }}/>
        }
      </GoogleMap>
    </LoadScript>
  )
}

export default React.memo(MyComponent)