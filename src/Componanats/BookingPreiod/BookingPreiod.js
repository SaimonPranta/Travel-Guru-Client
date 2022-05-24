import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../../App';
import Header from '../CommonConpononants/Header/Header';
import './BookingPreiod.css';

const BookingPreiod = () => {
    const [user, setUser] = useContext(userContext)
    const [bookingInfo, setBookingInfo] = useState({})
    const [condition, setCondition] = useState({})
    const destinationInputRef = useRef()
    const navigate = useNavigate()
    const styles = {
        fontColor: "#fff",
        filter: "invert(96%) sepia(0%) saturate(17%) hue-rotate(344deg) brightness(105%) contrast(104%)"
    }
    useEffect(() => {
        if (!user.currentRoomName) {
            navigate("/rooms")
        }
        if (user.currentDestination) {
            destinationInputRef.current.value = user.currentDestination
        }
    }, [user])
    useEffect(() => {
        fetch('', {
            method: "PUT",
            body: JSON.stringify(),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
            .then(res => res.json())
            .then(data => console.log(data))
    }, [])


    const handleInput = (e) => {
        const currentInfo = { ...bookingInfo }
        const inputName = e.target.name
        const inputValue = e.target.value
        currentInfo[inputName] = inputValue
        setBookingInfo(currentInfo)

    }
    const handleFormSubmit = async (e) => {
        e.preventDefault()
        const currentCondition = { ...condition }
        await !bookingInfo.destination ? bookingInfo.destination = user.currentDestination : bookingInfo.destination = bookingInfo.destination
        await !bookingInfo.currentDestination ? bookingInfo.roomName = user.currentRoomName : navigate("/rooms")

        const handleBooking = () => {
            fetch('https://sheltered-wildwood-92466.herokuapp.com/addBookingInfo', {
                method: "PUT",
                body: JSON.stringify({ ...bookingInfo, uid: user.uid }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (data) {
                        currentCondition.isRoomAdd = true
                        currentCondition.isNotAddRoom = false
                        setCondition(currentCondition)
                        navigate("/profile")
                    }
                })
        }

        if (bookingInfo.origin && bookingInfo.destination && bookingInfo.form && bookingInfo.to) {
            handleBooking()
        } else {
            currentCondition.isRoomAdd = false
            currentCondition.isNotAddRoom = true
            setCondition(currentCondition)
        }
    }

    return (
        <section className=" bookingPreiod ">
            <div className=' m-auto'>
                <Header styles={styles}></Header>
            </div>
            <div className='container row mt-5 m-auto'>
                <div className="col-6 text-white previousBookingText">
                    {
                        user.currentDestination && <h4 className='p-2'>{user.currentDestination}</h4>
                    }
                    {
                        user.currentDestination === "Cox's Bazar" && <p >
                            Cox’s Bazar is a town on the southeast coast of Bangladesh. It’s known for its very long, sandy beachfront, stretching from Sea Beach in the north to Kolatoli Beach in the south. Aggameda Khyang monastery is home to bronze statues and centuries-old Buddhist manuscripts. South of town, the tropical rainforest of Himchari National Park has waterfalls and many birds. North, sea turtles breed on nearby Sonadia Island.
                        </p>
                    }
                    {
                        user.currentDestination === "Sundorban" && <p>
                            Sundarbans is a mangrove area in the delta formed by the confluence of the Padma, Brahmaputra and Meghna Rivers in the Bay of Bengal. It spans the area from the Baleswar River in Bangladesh's division of Khulna to the Hooghly River in India's state of West Bengal. It comprises closed and open mangrove forests, land used for agricultural purpose, mudflats and barren land, and is intersected by multiple tidal streams and channels.
                        </p>
                    }
                    {
                        user.currentDestination === "Sreemangal" && <p>
                            Sreemangal is a hilly area covered with tea estates. There are 47 tea gardens in
                            Sreemangal. A large portion of world’s highest quality tea is grown here. It is also called the city of ‘two leaves and a bud. Sreemangal is famous for nature,
                            forests and wildlife.
                        </p>
                    }
                </div>

                <div className="col-6">
                    <form className='row booking-form' onSubmit={handleFormSubmit}>
                        <label className='col-12'>Origin</label>
                        <input type="text" placeholder='Origin' name="origin" className='col-12' onChange={handleInput} required />
                        <label className='col-12'>Destination</label>
                        <input type="text" name="destination" placeholder="Destination" ref={destinationInputRef} className='col-12' onChange={handleInput} required />
                        <div className='col-12 d-sm-flex justify-content-between date-piker p-0'>
                            <div className=''>
                                <label className='col-12'>Form</label>
                                <input type="date" name='form' className='col-12' onChange={handleInput} required />
                            </div>
                            <div>
                                <label className='col-12'>To</label>
                                <input type="date" name="to" className='col-12' onChange={handleInput} required />
                            </div>
                        </div>
                        {
                            condition.isRoomAdd && <p className='sucess mt-3'>Congratulation! your booking are Sucessfully confirmed.</p>
                        }
                        {
                            condition.isNotAddRoom && <p className='warning mt-3'>Note: your are failed to add booking</p>
                        }
                        <button type="submit">Start Booking</button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default BookingPreiod;