import { Link } from "react-router-dom"

const Register = () => {
  return (
    <div>
        <h1>Register</h1>

        <p>Already have an account<Link to='/login'>login</Link></p>      
    </div>
  )
}

export default Register