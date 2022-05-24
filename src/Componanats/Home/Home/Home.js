import { Route, Routes } from 'react-router-dom';
import Login from '../../Login/Login';
import SliderSection from '../SliderSection/SliderSection';
import './Home.css';
import Destination from '../../RoomsBooking/Destination/Destination';
import BookingPreiod from '../../BookingPreiod/BookingPreiod';
import PrivetRoute from '../../PrivetRoute/PrivetRoute';
import UserProfile from '../../UserProfile/UserProfile';
import AddRooms from '../../AdminDashbord/AddRooms/AddRooms';
import EditRooms from '../../AdminDashbord/EditRoom/EditRooms';
import EditSingleRooms from '../../AdminDashbord/EditRoom/EditSingleRoom/EditSingleRooms';
import { useContext } from 'react';
import { userContext } from '../../../App';
import Contact from '../../Contact/Contact';

const Home = () => {
    const [user, setUser] = useContext(userContext)
    return (
        <div className='home'>
            <Routes>
                <Route path='/' element={<SliderSection></SliderSection>}></Route>
                <Route path='/login' element={<Login></Login>}></Route>
                <Route path='/profile' element={<PrivetRoute><UserProfile></UserProfile></PrivetRoute>}></Route>
                <Route path='/rooms' element={<Destination></Destination>}></Route>
                <Route path='/booking' element={<PrivetRoute><BookingPreiod></BookingPreiod></PrivetRoute>}></Route>
                <Route path='/contact' element={<Contact></Contact>}></Route>
                {
                    user.email === "gtravel637@gmail.com" && <Route path='/addRooms' element={<PrivetRoute><AddRooms></AddRooms></PrivetRoute>}></Route>
                }
                 {
                    user.email === "gtravel637@gmail.com" && <Route path='/editRoom' element={<EditRooms></EditRooms>}></Route>
                }
                 {
                    user.email === "gtravel637@gmail.com" && <Route path='/editRoom/:id' element={<PrivetRoute><EditSingleRooms></EditSingleRooms></PrivetRoute>}></Route>
                }
            </Routes>
        </div>
    );
};

export default Home;