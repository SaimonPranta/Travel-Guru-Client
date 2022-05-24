import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { userContext } from '../../../App';
import Destination from '../Destination/Destination';
import './Rooms.css';


const Rooms = ({ room }) => {
    const star = <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#FFAF38" className="bi bi-star-fill" viewBox="0 0 16 16"><path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" /></svg>
    const [user, setUser] = useContext(userContext)
    const handleDestination = (roomName, Destination) => {
        const currentUser = {...user}
        currentUser.currentRoomName = roomName
        currentUser.currentDestination = Destination
        setUser(currentUser)
    }

    return (
        <section className='rooms row'>
            <div className='col-sm-4  my-3'>
                <img src={`data:${room.image.contentType};base64,${room.image.data}`}/>
            </div>

            <div className='col-sm-8 rooms-text  my-sm-3'>
                <h3 className=''>{room.name}</h3>
                <p>{room.bedRoom} bedrooms {room.bed} beds {room.bed} baths</p>
                <p>wifi: {room.wifi}</p>
                <p>Air Condition: {room.airCondition}</p>
                <p>Kitchen: {room.Kitchen}</p>
                {
                    room.Cancellation === "Yes" ? <p>Cancellation fexibility availiable</p> :
                                                <p>Cancellation fexibility is not availiable</p>
                }
                
                <div className='star d-sm-flex justify-content-between'>
                    <p>{star} {room.rating}</p>
                    <p>{room.price}tk/night</p>
                    <p>13300tk total</p>
                </div>
                <Link to="/booking" onClick={ () => handleDestination(room.name, room.location)}> <button className='btn-control my-4'>Book now</button></Link>
            </div>
        </section>
    );
};

export default Rooms;