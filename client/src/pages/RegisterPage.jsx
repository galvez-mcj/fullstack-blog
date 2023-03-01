import { useState } from "react"

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        confirmPass: ""
    })

    function handleChange(event) {
        const {name, value} = event.target
        setFormData( prevFormData => ({
            ...prevFormData,
            [name]: value
        }))
    }

    async function handleSubmit(event) {
        event.preventDefault()
        if (formData.password === formData.confirmPass) {
            const response = await fetch('http://localhost:5000/register', {
                method: 'POST',
                body: JSON.stringify({formData}),
                headers: {'Content-Type':'application/json'}
            })
            if(response.status === 200) {
                alert('Registration successful. You may now login.')
            } else {
                alert('Registration failed. Username already exists.')
            }
        } else {
            alert("Passwords do not match.")
        }
        
    }

    return (
        <div className="registerPage">
            <h1>Register Account</h1>
            <form className="register" onSubmit={handleSubmit}>
                <input 
                    type="text"
                    placeholder="username"
                    name="username"
                    onChange={handleChange}
                    value={formData.username}/>
                <input
                    type="password" 
                    placeholder="password"
                    name="password"
                    onChange={handleChange}
                    value={formData.password}/>
                <input
                    type="password" 
                    placeholder="confirm password"
                    name="confirmPass"
                    onChange={handleChange}
                    value={formData.confirmPass}/>
                <button>REGISTER</button>
            </form>
        </div>
    )
}