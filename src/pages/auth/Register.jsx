import  { useEffect } from 'react'
import FormAuth from '../../components/FormAuth'



const Register = () => {
  useEffect(() => {
    document.title = "Craftique | Register"
  }, [])

  return (
    <main>
      <FormAuth isRegister/>
    </main>
  )
}

export default Register
