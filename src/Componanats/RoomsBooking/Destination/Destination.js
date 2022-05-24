import React, { useContext, useEffect, useState } from 'react'
import { userContext } from '../../../App';
import Header from '../../CommonConpononants/Header/Header';
import Map from '../Map/Map';
import Rooms from '../Rooms/Rooms';
import './Destination.css';


function Destination() {
  const [user, setUser] = useContext(userContext)
  const [roomsInfo, setRoomsInfo] = useState({});
  const [loadRoomsCondition, setLoadRoomsCondition] = useState({
    locationName: "Cox's Bazar",
    lat: 21.433920,
    lng: 91.987030
  });
  const getRoomsInfoApi = 'https://sheltered-wildwood-92466.herokuapp.com/getRooms';
  
  useEffect(() => {
    fetch(getRoomsInfoApi, {
      headers: { location: loadRoomsCondition.locationName }
    })
      .then(res => res.json())
      .then(data => {
        setRoomsInfo(data)
      })
  }, [getRoomsInfoApi, loadRoomsCondition])
  useEffect(() => {
    const curreRoomCondition = { ...loadRoomsCondition }
    if (user.location) {
      if (user.location === "Cox's Bazar") {
        curreRoomCondition.locationName = "Cox's Bazar"
        curreRoomCondition.lat = 21.433920
        curreRoomCondition.lng = 91.987030
        setLoadRoomsCondition(curreRoomCondition)
      } if (user.location === "Sundorban") {
        curreRoomCondition.locationName = "Sundorban"
        curreRoomCondition.lat = 23.634510
        curreRoomCondition.lng = 91.987030
        setLoadRoomsCondition(curreRoomCondition)
      } if (user.location === "Sreemangal") {
        curreRoomCondition.locationName = "Sreemangal"
        curreRoomCondition.lat = 24.310577
        curreRoomCondition.lng = 91.725136
        setLoadRoomsCondition(curreRoomCondition)
      }
    }
  }, [user.location])

  const handleTap = (e) => {
    const currentCondition = { ...loadRoomsCondition }
    const tapName = e.target.innerText
    currentCondition.locationName = tapName
    setLoadRoomsCondition(currentCondition)
    if (tapName === "Cox's Bazar") {
      currentCondition.lat = 21.433920
      currentCondition.lng = 91.987030
      setLoadRoomsCondition(currentCondition)
    } if (tapName === "Sundorban") {
      currentCondition.lat = 22.659060
      currentCondition.lng = 89.807007
      setLoadRoomsCondition(currentCondition)
    } if (tapName === "Sreemangal") {
      currentCondition.lat = 24.310577
      currentCondition.lng = 91.725136
      setLoadRoomsCondition(currentCondition)
    }
  }

  const styles = {
    fontColor: "#000",
    filter: ""
  }



  return (
    <section className='destination container '>
      <Header styles={styles}></Header>
      <div className='row sub-destination pt-4'>
        <div className='sub-manu'>
          <nav>
            <div class="nav nav-tabs" role="tablist">
              <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true" onClick={handleTap}>Cox's Bazar</button>
              <button class="nav-link" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false" onClick={handleTap}>Sundorban</button>
              <button class="nav-link" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false" onClick={handleTap}>Sreemangal</button>
            </div>
          </nav>
        </div>
        <div className='col-7 rooms-section'>
          <p>252 stays Apr 13-17 3 guests</p>
          <h5>Stay in {loadRoomsCondition.locationName}</h5>
          <div className='row'>
            {
              roomsInfo.length && roomsInfo.map(room => <Rooms room={room} key={room._id}></Rooms>)
            }
            <div col-12>
            </div>
          </div>

        </div>
        <div className='col-5 map-section pt-5'>
          <Map location={loadRoomsCondition}></Map>
        </div>
      </div>
    </section>
  )
}

export default Destination;