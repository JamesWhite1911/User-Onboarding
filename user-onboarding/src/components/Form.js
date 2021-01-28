//imports
import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";
import User from "./User";

//formSchema
const formSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup
        .string()
        .email("Must be a valid email address")
        .required("Must include an email"),
    password: yup.string().required("Please set a password"),
    tos: yup.boolean().oneOf([true], "Must agree to proceed")
})

//component
export default function Form() {
    const initialData = {
        name: "",
        email: "",
        password: "",
        tos: false
    }

    const [users, setUsers] = useState([initialData]);

    //formState
    const [formState, setFormState] = useState(initialData);

    const [buttonDisabled, setButtonDisabled] = useState(true);
    useEffect(() => {
        formSchema.isValid(formState).then(valid => {
            setButtonDisabled(!valid);
        });
    }, [formState]);

    //errorState
    const [errorState, setErrorState] = useState({
        name: "",
        email: "",
        password: "",
        tos: ""
    });

    //formSubmit
    const formSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted!");
        axios
            .post("https://reqres.in/api/users", formState)
            .then(res => {
                console.log([res.data]);
                setUsers([res.data, ...users]);
            })
            .catch(err => console.log(err))
    }

    //validation
    const validate = e => {
        let value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        yup
            .reach(formSchema, e.target.name)
            .validate(value)
            .then(valid => {
                setErrorState({ ...errorState, [e.target.name]: "" })
            })
            .catch(err => {
                setErrorState({
                    ...errorState,
                    [e.target.name]: err.errors[0]
                })
            })
    }

    //inputChange
    const inputChange = (e) => {
        e.persist();
        validate(e);

        let value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setFormState({ ...formState, [e.target.name]: value });
    }

    //JSX
    return (
        <div classname="container">
            <form onSubmit={formSubmit}>
                <label htmlFor="email">
                    Email
                <input type="text" name="email" id="email" value={formState.email} onChange={inputChange} />
                    {errorState.email ? <span className="error">{errorState.email}</span> : null}
                </label>
                <label htmlFor="name">
                    Name
                <input type="text" name="name" id="name" value={formState.name} onChange={inputChange} />
                    {errorState.name ? <span className="error">{errorState.name}</span> : null}
                </label>
                <label htmlFor="password">
                    Password
                <input type="password" name="password" id="password" value={formState.password} onChange={inputChange} />
                    {errorState.password ? <span className="error">{errorState.password}</span> : null}
                </label>
                <span>I accept the Terms and Conditions</span>
                <label htmlFor="tos">
                    <input type="checkbox" name="tos" id="tos" checked={formState.tos} onChange={inputChange} />
                </label>
                {errorState.tos ? <span className="error">{errorState.tos}</span> : null}
                <button disabled={buttonDisabled}>Submit</button>
            </form>
            {
                users.map((user, id) => {
                    if (user.name != "") {
                        return (
                            <User key={id} currentUser={user} />
                        )
                    }
                })
            }
        </div>
    )
}