// email:gtravel637@gmail.com

import React, { useContext, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { userContext } from '../../App';
import { loginWithFaceBook, loginWithGoogle, logOut, singUp, singIn, resetPassword, verifyAuthToken } from '../../Hooks/FirebaseAuthFunction';
import Header from '../CommonConpononants/Header/Header';
import './Login.css';

const Login = () => {
    const [user, setUser] = useContext(userContext)
    const [validInput, setValidInput] = useState({})
    const [condition, setCondition] = useState({
        logIn: false,
        rememberMe: false,
        forgotPassword: false
    })
    const EmailRef = useRef()
    const PassRef = useRef()
    const CheckBoxRef = useRef()
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state.from.pathname ? location.state.from.pathname : "/"

    const styles = {
        fontColor: "#000",
        filter: ""
    }
    const googleIcon = <img src="https://img.icons8.com/fluency/48/000000/google-logo.png" />
    const fbIcon = <img src="https://img.icons8.com/fluency/48/000000/facebook-new.png" />

    useEffect(() => {
        const currnetUser = { ...condition }
        currnetUser.userEmail = localStorage.getItem("user")
        currnetUser.userPass = localStorage.getItem("pass")
        setCondition(currnetUser)
    }, [])

    useEffect(() => {
        user.uid && navigate(from, { replace: true })
    }, [user])

    const addUserInDatabase = (user) => {
        fetch("https://sheltered-wildwood-92466.herokuapp.com/addUser", {
            method: "POST",
            body: JSON.stringify({ user }),
            headers: {
                'content-type': 'application/json; charset=UTF-8'
            }
        })
            .then(res => res.json())
            .then(data => console.log(data))
    }

    const inputValidation = event => {
        const inputValue = event.target.value
        const inputName = event.target.name

        if (inputName === "email") {
            if (/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,20}$/.test(inputValue)) {
                let lowerCaseEmail = inputValue.toLowerCase()
                validInput[inputName] = lowerCaseEmail
            } else {
                validInput[inputName] = ''
            }
        }
        if (inputName === "password") {
            if (/^.{5,16}$/.test(inputValue)) {
                validInput[inputName] = inputValue
            } else {
                validInput[inputName] = ''
            }
        }
        if (inputName === "confirmPassword") {
            if (validInput.password === inputValue) {
                validInput[inputName] = inputValue
            } else (
                validInput[inputName] = ''
            )
        }
        if (inputName === "firstName") {
            validInput[inputName] = inputValue
        }
        if (inputName === "lastName") {
            validInput[inputName] = inputValue
        }

        // Reset Email validation 

        if (inputName === "resetEmail") {
            const currnetUser = { ...condition }
            currnetUser.userEmail = condition.userEmail + inputValue
            setCondition(currnetUser)
            if (/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,20}$/.test(inputValue)) {
                let lowerCaseEmail = inputValue.toLowerCase()
                validInput[inputName] = lowerCaseEmail
            } else {
                validInput[inputName] = ''
            }
        }
    }


    const googleLogin = () => {
        loginWithGoogle()
            .then(data => {
                console.log(data)
                const currentUser = { ...user }
                currentUser.name = data._tokenResponse.displayName
                currentUser.email = data._tokenResponse.email
                currentUser.uid = data.user.uid
                setUser(currentUser)

                if (data.user.accessToken) {
                    verifyAuthToken()
                }
                // add user to database
                if (currentUser) {
                    addUserInDatabase(currentUser)
                }
                navigate(from, { replace: true })
            })
            .then(err => console.log(err))


    }
    const facebookLogin = () => {
        loginWithFaceBook()
            .then(data => {
                const currentUser = { ...user }
                currentUser.name = data._tokenResponse.displayName
                currentUser.email = data._tokenResponse.email
                currentUser.uid = data.user.uid
                setUser(currentUser)
                // add user to database
                if (data.auth.accessToken) {
                    verifyAuthToken()
                }
                if (data) {
                    addUserInDatabase(currentUser)
                }

                navigate(from, { replace: true })
            })
            .then(err => console.log(err))
    }

    const handelSingUp = (event) => {
        const currentUser = {}
        const currentCondition = { ...condition }
        event.preventDefault()
        if (validInput.firstName && validInput.lastName && validInput.email && validInput.password && validInput.confirmPassword) {
            singUp(validInput.email, validInput.confirmPassword)
                .then(data => {
                    currentUser.name = `${validInput.firstName} ${validInput.lastName}`
                    currentUser.email = data.email
                    currentUser.password = validInput.confirmPassword
                    currentUser.uid = data.uid
                    setUser(currentUser)
                    if (data.accessToken) {
                        verifyAuthToken()
                    }
                    if (data) {
                        currentCondition.confirmPass = false
                        currentCondition.createUserExist = false
                        setCondition(currentCondition)
                    }

                    // add user to database
                    if (currentUser) {
                        addUserInDatabase(currentUser)
                    }

                    navigate(from, { replace: true })
                })
                .catch(err => {
                    console.log('errorr')
                    if (err) {
                        currentCondition.createUserExist = true
                        setCondition(currentCondition)
                    }
                })
        }
        if (validInput.password !== validInput.confirmPassword) {
            currentCondition.confirmPass = true
            currentCondition.createUserExist = false
            setCondition(currentCondition)
        }
    }

    // Navigate Create Form to LogIn Form and also Handel Input remember value

    const logInPage = () => {
        const currentCondition = { ...condition }
        currentCondition.logIn = currentCondition.logIn ? false : true
        currentCondition.forgotPassword = false
        setCondition(currentCondition)

        setTimeout(() => {
            if (condition.userEmail) {
                EmailRef.current.value = condition.userEmail
                CheckBoxRef.current.checked = true
            }
            if (condition.userPass) {
                PassRef.current.value = condition.userPass
                CheckBoxRef.current.checked = true
            }
        }, 10)
    }
    const rememberMeHandel = (e) => {
        const userEmail = e.target.parentNode.parentNode.children[1].value
        const userPass = e.target.parentNode.parentNode.children[2].value

        if (CheckBoxRef.current.checked) {
            localStorage.setItem("user", userEmail)
            localStorage.setItem("pass", userPass)
        }
        if (!CheckBoxRef.current.checked) {
            localStorage.removeItem("user")
            localStorage.removeItem("pass")
        }
    }
    const handelSignIn = (event) => {
        event.preventDefault()
        const EmailInputValue = EmailRef.current.value
        const PassInputValue = PassRef.current.value
        const EmailInputName = EmailRef.current.name
        const PassInputName = PassRef.current.name

        if (EmailInputName === "signInEmail") {
            const currnetUser = { ...condition }
            currnetUser.userEmail = condition.userEmail + EmailInputValue
            setCondition(currnetUser)

            if (/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,20}$/.test(EmailInputValue)) {
                let lowerCaseEmail = EmailInputValue.toLowerCase()
                validInput[EmailInputName] = lowerCaseEmail
            } else {
                validInput[EmailInputName] = ''
            }
        }
        if (PassInputName === "signInPassword") {
            if (/^.{5,16}$/.test(PassInputValue)) {
                validInput[PassInputName] = PassInputValue
            } else {
                validInput[PassInputName] = ''
            }
        }
        if (validInput.signInEmail && validInput.signInPassword) {
            singIn(validInput.signInEmail, validInput.signInPassword)
                .then(data => {
                    if (data.accessToken) {
                        const currentUser = { ...user }
                        currentUser.email = data.email
                        currentUser.uid = data.uid
                        setUser(currentUser)
                        verifyAuthToken()
                    }
                    navigate(from, { replace: true })
                })
                .then(res => console.log(res))
        }
    }
    const forgotPassword = () => {
        const currentCondition = { ...condition }
        currentCondition.forgotPassword = !currentCondition.forgotPassword ? true : false
        setCondition(currentCondition)
    }
    const resetPasswordHandel = (e) => {
        const currentCondition = { ...condition }
        e.preventDefault()
        if (validInput.resetEmail) {
            resetPassword(validInput.resetEmail)
                .then((res) => {
                    if (res.code || res.message) {
                        currentCondition.resetError = true
                        currentCondition.resetSucess = false
                        setCondition(currentCondition)
                    } else {
                        currentCondition.resetError = false
                        currentCondition.resetSucess = true
                        setCondition(currentCondition)
                    }
                })
        }
    }

    return (
        <main className='container'>
            <div>
                <Header styles={styles}></Header>
                {
                    <h1>{user.email}</h1>
                }
            </div>
            <section className='authentication m-auto'>
                {
                    condition.logIn && !condition.forgotPassword && <form onSubmit={handelSignIn}>
                        <h6>Login</h6>
                        <input type="email" name="signInEmail" ref={EmailRef} placeholder="Email" required onChange={inputValidation} />
                        <input type="password" name="signInPassword" ref={PassRef} placeholder="Password" required onChange={inputValidation} />
                        <div>
                            <input type="checkbox" ref={CheckBoxRef} onClick={rememberMeHandel}/>
                            <label  className='remember-me'>Remember Me</label>
                            <p className='forgot-password' onClick={forgotPassword}>Forgot Password</p>
                        </div>
                        <input type="submit" value="Login" required />
                        <div className='form-navigation d-flex'><p>Don't have an account? <span onClick={logInPage} style={{ color: "blue", cursor: "pointer" }}>Create an account</span></p></div>
                    </form>
                }

                {
                    !condition.logIn && <form onSubmit={handelSingUp}>
                        <h6>Create an account</h6>
                        <input type="text" placeholder="First Name" name="firstName" required onChange={inputValidation} />
                        <input type="text" placeholder="Last Name" name="lastName" required onChange={inputValidation} />
                        <input type="email" placeholder="Email" name="email" required onChange={inputValidation} />
                        <input type="password" placeholder="Password" name="password" required onChange={inputValidation} />
                        <input type="password" placeholder="Confirm Password" name="confirmPassword" required onChange={inputValidation} />
                        {
                            condition.confirmPass && <p className='warning'>Note: Does not match confirmpassword</p>
                        }
                        {
                            condition.createUserExist && <p className='warning'>Note: User/Email already exist.</p>
                        }
                        <input type="submit" value="Create account" />
                        <div className='form-navigation d-flex'><p>Already have an account? <span onClick={logInPage} style={{ color: "blue", cursor: "pointer" }}>Login</span></p></div>

                    </form>
                }
                {
                    condition.forgotPassword && <form onSubmit={resetPasswordHandel}>
                        <h6>{condition.resetSucess ? "Re-set password sucessfully" : "Re-set your account Password"}</h6>
                        {
                            !condition.resetSucess && <>
                                <p className='forgot-p'>Please enter your valid email address to re-set your account's password.</p>
                                <input type="email" placeholder="Email" name="resetEmail" required onChange={inputValidation} />
                            </>
                        }
                        {
                            condition.resetError && <p className='warning'>User/Email not found.</p>
                        }
                        {
                            !condition.resetError && condition.resetSucess && <p className='sucess'>Email sucessfully submited, check your Gmail/Email you will get a link to change password.</p>
                        }
                        {
                            !condition.resetSucess && <input type="submit" value="Submit" />
                        }
                        <div className='form-navigation d-flex'><p>Already have an account? <span onClick={logInPage} style={{ color: "blue", cursor: "pointer" }}>Login</span></p></div>

                    </form>
                }

                <div className='socil-container m-auto'>
                    <p className='slocil-after'>Or</p>
                    <div onClick={facebookLogin}>{fbIcon} <p>Continue with Facebook</p></div>
                    <div onClick={googleLogin}>{googleIcon} <p>Continue with Google</p></div>
                </div>
            </section>
        </main>
    );
};

export default Login;