import { Link } from "react-router-dom"
import React, { useState } from 'react'
import { useHistory } from "react-router"
import { useDispatch } from "react-redux"
import { signInGoogleThunk, signInThunk, signInVkThunk} from "../../redux/action-creators/user"
import '../Signin/signin.css'

const Signin = () => {
  const history = useHistory()
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  const [ inputValue, setInputValue ] = useState()

  const inputHandler = (event) => {
    setInputValue(prev => {
      return {...prev, [event.target.name]: event.target.value}
    })
  }

  const submitHandler = async (event) => {
    event.preventDefault()
    dispatch(signInThunk(inputValue, history, setError))
  }
  const googleHandler = () => {
    dispatch(signInGoogleThunk(history))
  }
  const vkHandler = () => {
    dispatch(signInVkThunk(history))
  }

  return (
    <div className='wrapper'>
      <div className='container'>
        <form className='d-flex flex-column'>
          <div className="col-md-4 offset-md-4 mb-3">
            <label htmlFor="exampleInputEmail12" className="form-label text-white">Эл.почта</label>
            <input onChange={inputHandler} name='email' type="email" className="form-control" id="exampleInputEmail12" aria-describedby="emailHelp" />
          </div>
          <div className="col-md-4 offset-md-4 mb-3">
            <label htmlFor="exampleInputPassword13" className="form-label text-white">Пароль</label>
            <input onChange={inputHandler} name='password' type="password" className="form-control" id="exampleInputPassword13" />
          </div>
          {error ? <p className='text-error'>{error}</p> : null}
          <button onClick={submitHandler} type="submit" className="btn btn-primary btn-sm  col-md-2 offset-md-5 mb-2">Войти</button>
          <a href='http://localhost:3001/user/google' className="btn btn-primary btn-sm  google form-text col-md-2 offset-md-5 mb-2">Войти <i
            className="fab fa-google"/></a>
          <a href='http://localhost:3001/user/auth/vkontakte' className="btn btn-sm btn-primary vk form-text col-md-2 offset-md-5 mb-2">Войти <i
            className="fab fa-vk"/></a>
          <Link to='/signup' className="create form-text col-md-2 offset-md-5 mb-2">Создать аккаунт</Link>
        </form>
      </div>
    </div>
  )
}

export default Signin
