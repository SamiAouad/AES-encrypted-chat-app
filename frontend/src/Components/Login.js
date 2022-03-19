import React, {useState} from 'react';
import axios from "axios";
import * as yup from 'yup';
import {useFormik} from "formik"
import {useNavigate} from "react-router";

const api = axios.create({
    baseURL: `http://localhost:5000/user`
})


function Login(props) {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const validationSchema = yup.object({
        username: yup.string('firstname must be as string').required('username is required'),
        password: yup.string().required("Password is required"),
    })

    const onSubmit = async () => {
        let item = new URLSearchParams();
        item.append('username', formik.values.username)
        item.append('password', formik.values.password)
        api.post("/login", item).then(res => {
            if (res.data === false){
                setError("username or password incorrect")
            }
            else{
                localStorage.setItem("username", formik.values.username)
                navigate("/")
            }
        })
    }

    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        onSubmit,
        validationSchema
    })
    return (
        <div>
            <section className="login-clean">
                <form method="post" onSubmit={formik.handleSubmit}>
                    <h2 className="visually-hidden">Login Form</h2>
                    <div className="illustration">
                        <i className="icon ion-ios-navigate flash animated"/>
                    </div>
                    <div className="mb-3">
                        <input className="form-control" type="text" name="username" placeholder="Username"
                            value={formik.values.username} onChange={formik.handleChange}/>
                        {formik.errors.username ? <div className="text-danger">{formik.errors.username}</div> : null}
                    </div>
                    <div className="mb-3">
                        <input className="form-control" type="password" name="password" placeholder="Password"
                               value={formik.values.password} onChange={formik.handleChange}/>
                        {formik.errors.password ? <div className="text-danger">{formik.errors.password}</div> : null}
                    </div>
                    <div className="mb-3">
                        <button className="btn btn-primary d-block w-100" type="submit">Log In</button>
                    </div>
                    <div className={"text-danger"}>{error}</div>
                    <a className="forgot" href="#">Forgot your email or password?</a>
                </form>
            </section>
        </div>
    );
}

export default Login;