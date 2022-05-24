import React, { useContext, useState } from 'react';
import coxBazar from '../../../images/Rectangle 6 .png';
import sajek from '../../../images/Sajek.png';
import sundorbon from '../../../images/sundorbon.png';
import sreemongol from '../../../images/Sreemongol.png';
import './SliderSection.css';
import Header from '../../CommonConpononants/Header/Header';
import { Link } from 'react-router-dom';
import { userContext } from '../../../App';

const SliderSection = () => {
    const [user, setUser] = useContext(userContext)
    const [slider, SetSlider] = useState({
        count: 0
    })
    const styles = {
        fontColor: "#fff",
        filter: "invert(96%) sepia(0%) saturate(17%) hue-rotate(344deg) brightness(105%) contrast(104%)"
    }
    const nextIcon = <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" class="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16"><path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" /></svg>
    const previousIcon = <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" class="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16"><path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" /></svg>
    const bookingIcon = <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" /></svg>

    const nextSliderBtnHandle = () => {
        const currentCount = { ...slider }
        if (slider.count === 0) {
            currentCount.count = 1
        }
        if (slider.count === 1) {
            currentCount.count = 2
        }
        if (slider.count === 2) {
            currentCount.count = 0
        }
        SetSlider(currentCount)

    }

    const prediousSliderBtnHandle = () => {
        const currentCount = { ...slider }
        if (slider.count === 2) {
            currentCount.count = 1
        }
        if (slider.count === 1) {
            currentCount.count = 0
        }
        if (slider.count === 0) {
            currentCount.count = 2
        }
        SetSlider(currentCount)
    }
    // setInterval(() => {
    //     autoSlider()
    // }, 1000);

    const coxsBookingHandle = () => {
        const currntUser = { ...user }
        currntUser.location = "Cox's Bazar"
        currntUser.lat = 21.433920
        currntUser.lng = 91.987030
        setUser(currntUser)
    }
    const sundorbansBookingHandle = () => {
        const currntUser = { ...user }
        currntUser.location = "Sundorban"
        currntUser.lat = 22.659060
        currntUser.lng = 89.807007
        setUser(currntUser)
    }
    const sreemangalBookingHandle = () => {
        const currntUser = { ...user }
        currntUser.location = "Sreemangal"
        currntUser.lat = 24.310577
        currntUser.lng = 91.725136
        setUser(currntUser)
    }

    return (
        <main className='slider-section'>
            <section>
                <Header styles={styles}></Header>
            </section>
            <section className='slider mt-xl-5 mt-md-3'>
                <div className='container container-row '>
                    <div className='slider-text-section d-block'>
                        {
                            slider.count === 0 && <div>
                                <h2 className='ms-1'>COX'S BAZAR</h2>
                                <p>Cox's Bazar is a city, fishing port, tourism centre and district headquarters in southeastern Bangladesh. It is famous mostly for its long natural sandy beach, and it ...</p>
                                <button onClick={coxsBookingHandle}><Link to="/rooms">Booking {bookingIcon}</Link></button>
                            </div>
                        }
                        {
                            slider.count === 1 && <div>
                                <h2 className='ms-1'>SUNDORBANS</h2>
                                <p>Cox's Bazar is a city, fishing port, tourism centre and district headquarters in southeastern Bangladesh. It is famous mostly for its long natural sandy beach, and it ...</p>
                                <button onClick={sundorbansBookingHandle}><Link to="/rooms">Booking {bookingIcon}</Link></button>
                            </div>
                        }
                        {
                            slider.count === 2 && <div>
                                <h2 className='ms-1'>SREEMANGAL</h2>
                                <p>Cox's Bazar is a city, fishing port, tourism centre and district headquarters in southeastern Bangladesh. It is famous mostly for its long natural sandy beach, and it ...</p>
                                <button onClick={sreemangalBookingHandle}><Link to="/rooms">Booking {bookingIcon}</Link></button>
                            </div>
                        }
                    </div>
                    <div className='empty'>
                    </div>
                </div>
                <div className='img-section'>
                    <div className='first-img-container'>
                        {
                            slider.count === 0 && <img src={coxBazar} alt="" />
                        }
                        {
                            slider.count === 1 && <img src={sundorbon} alt="" />
                        }
                        {
                            slider.count === 2 && <img src={sreemongol} alt="" />
                        }
                    </div>
                    <div>
                        {
                            slider.count === 0 && <img src={sreemongol} alt="" />
                        }
                        {
                            slider.count === 1 && <img src={sajek} alt="" />
                        }
                        {
                            slider.count === 2 && <img src={sundorbon} alt="" />
                        }
                    </div>
                    <div>
                        {
                            slider.count === 0 && <img src={sundorbon} alt="" />
                        }
                        {
                            slider.count === 1 && <img src={sreemongol} alt="" />
                        }
                        {
                            slider.count === 2 && <img src={sajek} alt="" />
                        }
                    </div>
                </div>
                <div className='slider-icon pb-5 mb-5'>
                    <div onClick={prediousSliderBtnHandle}>{previousIcon}</div>
                    <div onClick={nextSliderBtnHandle}>{nextIcon}</div>
                </div>
            </section>
        </main>
    );
};

export default SliderSection;