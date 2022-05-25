import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { userContext } from '../../../App';
import Header from '../../CommonConpononants/Header/Header';

const EditRooms = () => {
    const star = <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#FFAF38" className="bi bi-star-fill" viewBox="0 0 16 16"><path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" /></svg>

    const [user, setUser] = useContext(userContext)
    const [roomsInfo, setRoomsInfo] = useState({});
    const getRoomsInfoApi = 'https://sheltered-wildwood-92466.herokuapp.com/getRoomsInfo';

    useEffect(() => {
        fetch(getRoomsInfoApi)
            .then(res => res.json())
            .then(data => {
                setRoomsInfo(data)
            })
    }, [getRoomsInfoApi])
    const styles = {
        fontColor: "#000",
        filter: ""
    }

    const handleDelate = (id) => {
        const rooms = roomsInfo.filter(room => room._id !== id)

        fetch('https://sheltered-wildwood-92466.herokuapp.com/deleteItem', {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                roomId: id
            },
        })
        .then(res => res.json())
        .then(data => {
            if (data) {
                setRoomsInfo(rooms)
            }
        })
    }


    return (
        <div className='container'>
            <div className='m-auto row'>
                <div className='container m-auto'>
                    <Header styles={styles}></Header>
                </div>
                <div className='col-12 row'>
                    {
                        roomsInfo.length > 0 && roomsInfo.map(room => <section className='rooms row' key={room._id}>
                            <div className='col-sm-4  my-3'>
                                <img src={`data:${room.image.contentType};base64,${room.image.data}`} />
                            </div>

                            <div className='col-sm8 rooms-text  my-3'>
                                <h3>{room.name}</h3>
                                <p>{room.bedRoom} bedrooms</p>
                                <p>{room.bed} beds</p>
                                <p>{room.bed} baths</p>
                                <p>wifi: {room.wifi}</p>
                                <p>Air Condition: {room.airCondition}</p>
                                <p>Kitchen: {room.Kitchen}</p>
                                {
                                    room.Cancellation === "Yes" ? <p>Cancellation fexibility availiable</p> :
                                        <p>Cancellation fexibility is not availiable</p>
                                }

                                <div className='star d-flex justify-content-between'>
                                    <p>{star} {room.rating}</p>
                                    <p>{room.price}tk/night</p>
                                    <p>13300tk total</p>
                                </div>
                                {
                                    user.editRoom === 1 && <Link to={`/editRoom/${room._id}`}> <button className='btn-control my-4'> Edit Room </button> </Link>
                                }
                                {
                                    user.deleteRoom === 1 && <button className='btn-control my-4' onClick={() => handleDelate(room._id)}> Delate Room</button>
                                }
                                {
                                    !user.editRoom && !user.deleteRoom && <Link to={`/editRoom/${room._id}`}> <button className='btn-control my-4'> Edit Room</button></Link>
                                }
                                {
                                    !user.editRoom && !user.deleteRoom && <button className='btn-control my-4 ms-5' onClick={() => handleDelate(room._id)}> Delate Room</button>
                                }
                            </div>
                        </section>)
                    }
                </div>
            </div>
        </div >
    );
};

export default EditRooms;