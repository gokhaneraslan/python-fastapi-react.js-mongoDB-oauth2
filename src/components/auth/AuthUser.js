import { useState } from 'react';

export default function AuthUser(){

    const getUser = () =>{
        const userString = localStorage.getItem('user');
        const user_detail = JSON.parse(userString);
        return user_detail;
    }

    const [user,setUser] = useState(getUser());

    const saveUser = (user) =>{
        localStorage.setItem('user',JSON.stringify(user));

        setUser(user);
    } 

    const logout = () => {
        localStorage.clear();
    }


    return { setUser:saveUser, user, logout }
}