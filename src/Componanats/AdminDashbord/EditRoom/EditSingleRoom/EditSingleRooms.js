import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../../CommonConpononants/Header/Header';
import "./EditSingleRoom.css";

const EditSingleRooms = () => {
    const [room, setRoom] = useState({})
    const [formRoomInfo, setFormRoomInfo] = useState({})
    const navigate = useNavigate()
    const styles = {
        fontColor: "#000",
        filter: ""
    }

    const perams = useParams()
    const roomID = perams.id
    const nameRaf = useRef()
    const bedRoomRaf = useRef()
    const bedRaf = useRef()
    const ratingRaf = useRef()
    const priceRaf = useRef()
    const wifiYesRaf = useRef()
    const wifiNoRaf = useRef()
    const airconditionYesRaf = useRef()
    const airconditionNoRaf = useRef()
    const kitchenYesRaf = useRef()
    const kitchenNoRaf = useRef()
    const cancellationYesRaf = useRef()
    const cancellationNoRaf = useRef()
    const locationCoxRaf = useRef()
    const locationSundorbanRaf = useRef()
    const locationSreemangalRaf = useRef()



    const editRoomApi = "https://sheltered-wildwood-92466.herokuapp.com/editRoom"

    useEffect(() => {
        fetch(editRoomApi, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                roomId: roomID
            },
        })
            .then(res => res.json())
            .then(data => setRoom(data))
    }, [editRoomApi])

    useEffect(() => {

        if (room.name) {
            const currentRoomInfo = { ...room }
            setFormRoomInfo(currentRoomInfo)

            nameRaf.current.value = room.name
            bedRoomRaf.current.value = room.bedRoom
            bedRaf.current.value = room.bed
            ratingRaf.current.value = room.rating
            priceRaf.current.value = room.price
            if (room.wifi === "Yes") {
                wifiYesRaf.current.checked = true
            } else if (room.wifi === "No") {
                wifiNoRaf.current.checked = true
            }

            if (room.airCondition === "Yes") {
                airconditionYesRaf.current.checked = true
            } else if (room.airCondition === "No") {
                airconditionNoRaf.current.checked = true
            }

            if (room.Kitchen === "Yes") {
                kitchenYesRaf.current.checked = true
            } else if (room.Kitchen === "No") {
                kitchenNoRaf.current.checked = true
            }

            if (room.Cancellation === "Yes") {
                cancellationYesRaf.current.checked = true
            } else if (room.Cancellation === "No") {
                cancellationNoRaf.current.checked = true
            }

            if (room.location === "Cox's Bazar") {
                locationCoxRaf.current.checked = true
            } else if (room.location === "Sundorban") {
                locationSundorbanRaf.current.checked = true
            } else if (room.location === "Sreemangal") {
                locationSreemangalRaf.current.checked = true
            }
        }
    }, [room])

    const handleInput = (e) => {
        const inputName = e.target.name
        const inputValue = e.target.value
        const inputType = e.target.type
        const radioInpurName = e.target.parentNode.firstChild.innerText

        if (inputType === "radio") {
            formRoomInfo[inputName] = radioInpurName
        } else if (inputType === "file") {
            formRoomInfo[inputName] = e.target.files[0]
        }
        else {
            formRoomInfo[inputName] = inputValue
        }

    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const inputChacking = formRoomInfo.name && formRoomInfo.bedRoom && formRoomInfo.bed && formRoomInfo.rating && formRoomInfo.price && formRoomInfo.wifi && formRoomInfo.airCondition && formRoomInfo.Kitchen && formRoomInfo.Cancellation && formRoomInfo.location && formRoomInfo.image

        if (inputChacking) {
            const formData = new FormData()
            const currentInfo = { ...formRoomInfo }

            delete currentInfo.image
            formData.append('image', formRoomInfo.image)
            formData.append('name', formRoomInfo.name)
            formData.append('bedRoom', formRoomInfo.bedRoom)
            formData.append('bed', formRoomInfo.bed)
            formData.append('rating', formRoomInfo.rating)
            formData.append('price', formRoomInfo.price)
            formData.append('wifi', formRoomInfo.wifi)
            formData.append('airCondition', formRoomInfo.airCondition)
            formData.append('Kitchen', formRoomInfo.Kitchen)
            formData.append('Cancellation', formRoomInfo.Cancellation)
            formData.append('location', formRoomInfo.location)
            formData.append('_id', formRoomInfo._id)

            fetch('https://sheltered-wildwood-92466.herokuapp.com/updateRoom', {
                method: 'POST',
                body: formData
            })
                .then(res => res.json())
                .then(data => {
                    if (data) {
                        navigate("/editRoom")
                    } else {
                        const curentInfo = { ...formRoomInfo }
                        curentInfo.faildToAddRoom = true
                        setFormRoomInfo(curentInfo)
                    }
                })
        }
    }




    return (
        <main className='container'>
            <Header styles={styles}></Header>

            <div className='m-auto'>
                {
                    room.name && <div className='editRoom '>
                        <div className='m-auto'>
                            <form className='row' onSubmit={handleSubmit}>
                                <div className='col-4  my-3'>
                                    <img src={`data:${room.image.contentType};base64,${room.image.data}`} className="m-auto d-block" />
                                    <div className='col-12 row'>
                                        <label className='col-6'>Room Image</label>
                                        <input type="file" name="image" className='col-6' onChange={handleInput} required />
                                    </div>
                                </div>
                                <div className='col-12 row'>
                                    <label className='col-6'>Room Name</label>
                                    <input type="text" name="name" className='col-6' onChange={handleInput} ref={nameRaf} required />
                                </div>
                                <div className='col-12 row'>
                                    <label className='col-6'>Number of Bedrooms</label>
                                    <input type="number" name="bedRoom" className='col-6' onChange={handleInput} ref={bedRoomRaf} required />
                                </div>
                                <div className='col-12 row'>
                                    <label className='col-6'>Number of Beds</label>
                                    <input type="number" name="bed" className='col-6' onChange={handleInput} ref={bedRaf} required />
                                </div>
                                <div className='col-12 row'>
                                    <label className='col-6'>Number of Rating</label>
                                    <input type="number" name="rating" className='col-6' onChange={handleInput} ref={ratingRaf} required />
                                </div>
                                <div className='col-12 row '>
                                    <label className='col-6'>Price</label>
                                    <input type="number" name="price" className='col-6' onChange={handleInput} ref={priceRaf} required />
                                </div>
                                <div className='col-12 row'>
                                    <label className='col-6'>Wifi</label>
                                    <div className='col row'>
                                        <div className='col-6'>
                                            <label>Yes</label>
                                            <input type="radio" name="wifi" onChange={handleInput} ref={wifiYesRaf} required />
                                        </div>
                                        <div className='col-6'>
                                            <label>No</label>
                                            <input type="radio" name="wifi" onChange={handleInput} ref={wifiNoRaf} required />
                                        </div>
                                    </div>
                                </div>
                                <div className='col-12 row'>
                                    <label className='col-6'>Air condition</label>
                                    <div className='col row'>
                                        <div className='col-6'>
                                            <label>Yes</label>
                                            <input type="radio" name="airCondition" onChange={handleInput} ref={airconditionYesRaf} required />
                                        </div>
                                        <div className='col-6'>
                                            <label>No</label>
                                            <input type="radio" name="airCondition" onChange={handleInput} ref={airconditionNoRaf} required />
                                        </div>
                                    </div>
                                </div>
                                <div className='col-12 row'>
                                    <label className='col-6'>Kitchen</label>
                                    <div className='col row'>
                                        <div className='col-6'>
                                            <label>Yes</label>
                                            <input type="radio" name="Kitchen" onChange={handleInput} ref={kitchenYesRaf} required />
                                        </div>
                                        <div className='col-6'>
                                            <label>No</label>
                                            <input type="radio" name="Kitchen" onChange={handleInput} ref={kitchenNoRaf} required />
                                        </div>
                                    </div>
                                </div>
                                <div className='col-12 row'>
                                    <label className='col-6'>Cancellation</label>
                                    <div className='col row'>
                                        <div className='col-6'>
                                            <label>Yes</label>
                                            <input type="radio" name="Cancellation" onChange={handleInput} ref={cancellationYesRaf} required />
                                        </div>
                                        <div className='col-6'>
                                            <label>No</label>
                                            <input type="radio" name="Cancellation" onChange={handleInput} ref={cancellationNoRaf} required />
                                        </div>
                                    </div>
                                </div>
                                <div className='col-12 row'>
                                    <label className='col-6'>Location</label>
                                    <div className='col row'>
                                        <div className='col-12'>
                                            <label>Cox's Bazar</label>
                                            <input type="radio" name="location" onChange={handleInput} ref={locationCoxRaf} required />
                                        </div>
                                        <div className='col-12'>
                                            <label>Sundorban</label>
                                            <input type="radio" name="location" onChange={handleInput} ref={locationSundorbanRaf} required />
                                        </div>
                                        <div className='col-12'>
                                            <label>Sreemangal</label>
                                            <input type="radio" name="location" onChange={handleInput} ref={locationSreemangalRaf} required />
                                        </div>
                                    </div>
                                </div>
                                {
                                    formRoomInfo.faildToAddRoom && <p className='warning mt-3 text-center'>Note: Faild to update room information</p>
                                }
                                <input type="submit" value="Update Room Information" required />
                            </form>
                        </div>
                    </div>
                }
            </div>
        </main>
    );
};

export default EditSingleRooms;