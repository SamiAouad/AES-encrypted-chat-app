import React, {useState} from 'react';
import * as yup from "yup";
import {useFormik} from "formik";
import axios from "axios";

const api = axios.create({
    baseURL: `http://localhost:5000/user`
})


function Signup() {
    const [error, setError] = useState("")
    const validationSchema = yup.object({
        username: yup.string('firstname must be as string').required('username is required'),
        password: yup.string().required("Password is required"),
        passwordConf: yup.string().oneOf([yup.ref('password'), null], 'passwords do not match').required()
    })

    const onSubmit = async () => {
        let item = new URLSearchParams();
        item.append('username', formik.values.username)
        item.append('password', formik.values.password)
        api.post("/signup", item).then(res => {
            if (res.data === false){
                setError("error while creating user")
            }
            else{
                console.log("user created successful")
            }
        })
    }

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            passwordConf: ''
        },
        onSubmit,
        validationSchema
    })
    return (
        <div>
            <section className="register-photo">
                <div className="form-container">
                    <div className="image-holder"/>
                    <form method="post" onSubmit={formik.handleSubmit}>
                        <h2 className="text-center"><strong>Create</strong> an account.</h2>
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
                            <input className="form-control" type="password" name="passwordConf" placeholder="Password (repeat)"
                            value={formik.values.passwordConf} onChange={formik.handleChange}/>
                            {formik.errors.passwordConf ? <div className="text-danger">{formik.errors.passwordConf}</div> : null}
                        </div>
                        <div className="mb-3">
                            <div className="form-check">
                                <label className="form-check-label">
                                    <input className="form-check-input" type="checkbox"/>
                                    I agree to the license terms.
                                </label>
                            </div>
                        </div>
                        <div className="mb-3">
                            <button className="btn btn-primary d-block w-100" type="submit"
                                    >Sign Up
                            </button>
                        </div>
                        <div className={"text-danger"}>{error}</div>
                        <a className="already" href="#">You already have an account? Login here.</a>
                    </form>
                </div>
            </section>
        </div>
    );
}

export default Signup;