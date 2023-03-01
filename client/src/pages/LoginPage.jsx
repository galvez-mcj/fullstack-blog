import { useContext, useState } from "react"
import { Navigate } from "react-router-dom"
import { UserContext } from "../UserContext"

export default function LoginPage() {
    const [redirect, setRedirect] = useState(false)
    const { setUserInfo } = useContext(UserContext)

    const [formData, setFormData] = useState({
        username: "",
        password: ""
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
        const response = await fetch('http://localhost:5000/login', {
            method: 'POST',
            body: JSON.stringify({formData}),
            headers: {'Content-Type':'application/json'},
            credentials: 'include'
         })
         if (response.ok) {
            response.json().then(userInfo => {
                setUserInfo(userInfo)
                setRedirect(prevState => !prevState)
            })
         } else {
            alert('Wrong Login Details')
         }
    }

    if (redirect) {
        return <Navigate to={'/'} />
    }

    return (
        <div className="loginPage">
            <h1>Login Account</h1>
            <form className="login" onSubmit={handleSubmit}>
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
                <button>LOGIN</button>
            </form>
        </div>

    )
}