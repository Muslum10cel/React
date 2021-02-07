import React from 'react'
import { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from "axios"
import { SERVER_URL } from './constant';
import CarList from './CarList';


const Login = () => {

    const [user, setUser] = useState({ username: '', password: '' })
    const [isAuthenticated, setisAuthenticated] = useState(false)


    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const login = () => {
        axios.post(SERVER_URL + "login", user)
        .then(response => {
            console.log(response)
            const jwtToken = response.headers.authorization;
            if(jwtToken !== null){
                sessionStorage.setItem("jwt", jwtToken)
                setisAuthenticated(true)
            }
        })
        .catch(error => console.log(error))
    }


    if (isAuthenticated === true) {
        return <CarList />
    }
    return (
        <div>
            <TextField name="username" label="Username" onChange={handleChange} />
            <TextField type="password" name="password"
                label="Password" onChange={handleChange} /><br /><br />
            <Button variant="outlined" color="primary"
                onClick={login}>
                Login
    </Button>
        </div>
    )

}

export default Login
