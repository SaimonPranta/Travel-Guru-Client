import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../CommonConpononants/Header/Header';
import './AddRooms.css';

const AddRooms = () => {
    const [formRoomInfo, setFormRoomInfo] = useState({})
    const styles = {
        fontColor: "#000",
        filter: ""
    }
    const navigate = useNavigate()

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
        const currentRoom = {...formRoomInfo}

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
            
            fetch('https://sheltered-wildwood-92466.herokuapp.com/addRooms', {
                method: 'POST',
                body: formData
            })
                .then(res => res.json())
                .then(data => {
                    if (data) {
                        currentRoom.addRoom = true
                        currentRoom.fildToAddRoom = false
                        setFormRoomInfo(currentRoom)
                        navigate("/rooms")

                    }else{
                        currentRoom.addRoom = false
                        currentRoom.fildToAddRoom = true
                        setFormRoomInfo(currentRoom)
                        
                    }
                })
        }
    }

    return (
        <main className='container'>
            <Header styles={styles}></Header>

            <div className='m-auto'>
                <div className='add-user-conter'>

                    <form className='row' onSubmit={handleSubmit}>
                        <div className='col-12 row'>
                            <label className='col-6'>Room Name</label>
                            <input type="text" name="name" className='col-6' onChange={handleInput} required />
                        </div>
                        <div className='col-12 row'>
                            <label className='col-6'>Number of Bedrooms</label>
                            <input type="number" name="bedRoom" className='col-6' onChange={handleInput} required />
                        </div>
                        <div className='col-12 row'>
                            <label className='col-6'>Number of Beds</label>
                            <input type="number" name="bed" className='col-6' onChange={handleInput} required />
                        </div>
                        <div className='col-12 row'>
                            <label className='col-6'>Number of Rating</label>
                            <input type="number" name="rating" className='col-6' onChange={handleInput} required />
                        </div>
                        <div className='col-12 row'>
                            <label className='col-6'>Price</label>
                            <input type="number" name="price" className='col-6' onChange={handleInput} required />
                        </div>
                        <div className='col-12 row'>
                            <label className='col-6'>Wifi</label>
                            <div className='col-6 row'>
                                <div className='col-6'>
                                    <label>Yes</label>
                                    <input type="radio" name="wifi" onChange={handleInput} required />
                                </div>
                                <div className='col-6'>
                                    <label>No</label>
                                    <input type="radio" name="wifi" onChange={handleInput} required />
                                </div>
                            </div>
                        </div>
                        <div className='col-12 row'>
                            <label className='col-6'>Air condition</label>
                            <div className='col-6 row'>
                                <div className='col-6'>
                                    <label>Yes</label>
                                    <input type="radio" name="airCondition" onChange={handleInput} required />
                                </div>
                                <div className='col-6'>
                                    <label>No</label>
                                    <input type="radio" name="airCondition" onChange={handleInput} required />
                                </div>
                            </div>
                        </div>
                        <div className='col-12 row'>
                            <label className='col-6'>Kitchen</label>
                            <div className='col-6 row'>
                                <div className='col-6'>
                                    <label>Yes</label>
                                    <input type="radio" name="Kitchen" onChange={handleInput} required />
                                </div>
                                <div className='col-6'>
                                    <label>No</label>
                                    <input type="radio" name="Kitchen" onChange={handleInput} required />
                                </div>
                            </div>
                        </div>
                        <div className='col-12 row'>
                            <label className='col-6'>Cancellation</label>
                            <div className='col-6 row'>
                                <div className='col-6'>
                                    <label>Yes</label>
                                    <input type="radio" name="Cancellation" onChange={handleInput} required />
                                </div>
                                <div className='col-6'>
                                    <label>No</label>
                                    <input type="radio" name="Cancellation" onChange={handleInput} required />
                                </div>
                            </div>
                        </div>
                        <div className='col-12 row'>
                            <label className='col-6'>Location</label>
                            <div className='col-6 row'>
                                <div className='col-12'>
                                    <label>Cox's Bazar</label>
                                    <input type="radio" name="location" onChange={handleInput} required />
                                </div>
                                <div className='col-12'>
                                    <label>Sundorban</label>
                                    <input type="radio" name="location" onChange={handleInput} required />
                                </div>
                                <div className='col-12'>
                                    <label>Sreemangal</label>
                                    <input type="radio" name="location" onChange={handleInput} required />
                                </div>
                            </div>
                        </div>
                        <div className='col-12 row'>
                            <label className='col-6'>Room Image</label>
                            <input type="file" name="image" className='col-6' onChange={handleInput} required />
                        </div>
                        {
                            formRoomInfo.fildToAddRoom && <p className='warning mt-3 text-center'>Note: Failed to add room</p>
                        }
                        {
                            formRoomInfo.currentRoom && <p className='sucess mt-3 text-center'>Sucessfully added Room </p>
                        }
                        <input type="submit" value="Add Room" required />
                    </form>
                </div>

            </div>
        </main>
    );
};

export default AddRooms;