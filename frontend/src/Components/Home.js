import React, {useEffect, useState} from 'react';
import axios from "axios";
import io from "socket.io-client"
import {useNavigate} from "react-router";

const socket = io.connect("http://localhost:5000")

const api = axios.create({
    baseURL: `http://localhost:5000/user`
})

function Home() {
    const username = localStorage.getItem("username")
    const [room, setRoom] = useState('')
    const navigate = useNavigate()

    const joinRoom = (chatWith) => {
        const room = username.toString()
        room.concat(chatWith)
        setRoom(room.toString)
        if (username !== "" && room !== "") {
            socket.emit("join_room", 1);
            navigate('chat/1');
        }
    }

    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {

        api.get('/getAll').then(res => {
            setUsers(res.data)
            setLoading(false)
        })
    }, [])

    if (loading){
        return <div>Loading</div>
    }
    return (
        <div>
            {users.map(user => {
                return (
                    <div key={user.username}>
                        <a onClick={() => joinRoom(user.username)}>{user.username}</a>
                    </div>
                )
            })}
        </div>
    );
}

export default Home;