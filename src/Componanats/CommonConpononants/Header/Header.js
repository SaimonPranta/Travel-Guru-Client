import './Header.css';
import logo from '../../../images/logo/logo.png';
import { NavLink, useNavigate } from 'react-router-dom';
import { userContext } from '../../../App';
import { useContext, useRef, useState } from 'react';
import darkMenu from '../../../images/icons/blackMenu.png'
import whiteMenu from '../../../images/icons/whiteMenu.png'


const Header = ({ styles }) => {
    const userIcon = <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-person-circle me-1" viewBox="0 0 16 16"><path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" /><path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" /></svg>
    const searchIcon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" /></svg>
    const [user, setUser] = useContext(userContext)
    const [input, setInput] = useState("")
    const [condition, setCondition] = useState({})
    const srcItemDiv = useRef()
    const navigate = useNavigate()

    const searchInput = async (e) => {
        srcItemDiv.current.style.display = "block"
        setInput(e.target.value)
        const inputValue = e.target.value
        const text = inputValue.toLowerCase()
        const arr = text.split(" ")
        if (inputValue === " ") {
            srcItemDiv.current.style.display = "none"
        }
        let word

        const loopFunction = () => {
            for (let i = 0; i < arr.length; i++) {
                if (i === 0) {
                    word = arr[0]
                }
                if (0 < i) {
                    word = word + arr[i];
                }
            }
        }
        await loopFunction()
        const currentCondition = { ...condition }
        const cox = "cox'sbazar"
        const cox1 = "coxsbazar"
        const sundorban = "sundorbans"
        const sundorban1 = "sundorbons"
        const sremangal = "sreemangal"
        const sremangal1 = "sreemongol"
        if (word === "") {
            srcItemDiv.current.style.display = "none"
        }
        else if (word !== "" && cox.includes(word)) {
            currentCondition.coxsBazar = true
            currentCondition.sremangal = false
            currentCondition.sundorban = false
            currentCondition.notFindPlace = false

            setCondition(currentCondition)
        }
        else if (word !== "" && cox1.includes(word)) {
            currentCondition.coxsBazar = true
            currentCondition.sremangal = false
            currentCondition.sundorban = false
            currentCondition.notFindPlace = false

            setCondition(currentCondition)
        }
        else if (word !== "" && sundorban.includes(word)) {
            currentCondition.sundorban = true
            currentCondition.sremangal = false
            currentCondition.coxsBazar = false
            currentCondition.notFindPlace = false

            setCondition(currentCondition)
        }
        else if (word !== "" && sundorban1.includes(word)) {
            currentCondition.sundorban = true
            currentCondition.sremangal = false
            currentCondition.coxsBazar = false
            currentCondition.notFindPlace = false

            setCondition(currentCondition)
        }
        else if (word !== "" && sremangal.includes(word)) {
            currentCondition.sremangal = true
            currentCondition.sundorban = false
            currentCondition.coxsBazar = false
            currentCondition.notFindPlace = false

            setCondition(currentCondition)
        }
        else if (word !== "" && sremangal1.includes(word)) {
            currentCondition.sremangal = true
            currentCondition.sundorban = false
            currentCondition.coxsBazar = false
            currentCondition.notFindPlace = false

            setCondition(currentCondition)
        }
        else if (word !== "") {
            currentCondition.notFindPlace = true
            currentCondition.sundorban = false
            currentCondition.coxsBazar = false
            currentCondition.sremangal = false

            setCondition(currentCondition)
        }
    }

    const handleSearch = (e) => {
        e.preventDefault()

    }
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
        <>
            <style type="text/css">
                {`
                     input::placeholder{color: ${styles.fontColor}};
                `}
            </style>

            <div className='header py-3 ' >
                <div className='hearder-main' >
                    <nav className="navbar navbar-expand-lg navbar-light">
                        <div className="container-fluid">
                            <img src={logo} alt="Logo" style={{ filter: styles.filter, cursor: "pointer" }} onClick={() => navigate("/")} />
                            <form className="d-flex  justify-content-end ms-md-5 ps-md-5 search" style={{ color: styles.fontColor }} onSubmit={handleSearch} >
                                {searchIcon}
                                <input type="search" name="search" placeholder='Search your Destination...' autocomplete="off" style={{ color: styles.fontColor, border: `1px solid ${styles.fontColor}` }} value={input} onChange={searchInput} />
                                <div className='searchItems' ref={srcItemDiv}>
                                    <ul>
                                        {
                                            condition.coxsBazar && <li onClick={coxsBookingHandle}><NavLink to="/rooms">Cox's Bazar</NavLink></li>
                                        }
                                        {
                                            condition.sundorban && <li onClick={sundorbansBookingHandle}><NavLink to="/rooms">Sundorbans</NavLink></li>
                                        }
                                        {
                                            condition.sremangal && <li onClick={sreemangalBookingHandle}><NavLink to="/rooms">Sreemangal</NavLink></li>
                                        }
                                        {
                                            condition.notFindPlace && <li><NavLink to="/">Not Found</NavLink></li>
                                        }
                                    </ul>
                                </div>


                            </form>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                {
                                    styles.fontColor === "#fff" ? <img src={whiteMenu} alt="" className="navbar-toggler-icon" /> : <img src={darkMenu} alt="" className="navbar-toggler-icon" />
                                }
                            </button>
                            <div className="collapse navbar-collapse justify-content-end " id="navbarSupportedContent" >
                                <ul className="navbar-nav  mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <NavLink to="/" style={(isActive) => { return { backgroundColor: "red" } }} > <a className="nav-link " aria-current="page" style={{ color: styles.fontColor }} >Home</a></NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/rooms" > <a className="nav-link" style={{ color: styles.fontColor }}>Destination</a></NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/contact" >  <a className="nav-link" style={{ color: styles.fontColor }}>Contact</a></NavLink>
                                    </li>
                                    {
                                        user.uid && <li className="nav-item">
                                            <NavLink to="/profile" > <a className="nav-link" style={{ color: styles.fontColor, display: "flex", justifyContent: "spaceBetween", alignItems: "center" }}>{userIcon} {user.name ? user.name.split(" ")[0] : "Profile"}</a></NavLink>
                                        </li>
                                    }
                                    {
                                        !user.uid && <li className="nav-item">
                                            <NavLink to="/profile" > <a className="nav-link" style={{ color: styles.fontColor }}>Login</a></NavLink>
                                        </li>
                                    }
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            </div >
        </>
    );
};

export default Header;