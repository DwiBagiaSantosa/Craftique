import { useEffect } from 'react'
import FormAuth from '../../components/FormAuth'

const Login = () => {
  useEffect(() => {
    document.title = "Craftique | Login"
  }, [])

  return (
    <>
      <main>
        <FormAuth />
      </main>
    </>
  )
}

export default Login
