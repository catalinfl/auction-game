import { DarkTheme, LightTheme, ThemeProvider } from 'baseui'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { Error } from '../Register/Register'
import { Button } from 'baseui/button'
import { Input } from 'baseui/input'
import axios from 'axios'
import { CustomError } from '../Register/Register'
import Image2 from '../../assets/photos/icons8-auction.svg'
import Treasure from '../../assets/photos/icons8-treasure.svg'
import Cloud1 from '../../assets/photos/icons8-cloud.svg'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import Moon from '../../assets/photos/moon.png'
import getCookie from '../../utils/getCookie'


type SendLoginType = {
  username: string,
  password: string,
}

const Login = () => {

  const dispatch = useDispatch();

  const loggedCookie = getCookie("isLoggedIn");
  if (loggedCookie === "logged") {
    window.location.href = '/'
  }

  const [error, setError] = useState<CustomError>(false);

  const [sendLogin, setSendLogin] = useState<SendLoginType>({
    username: '',
    password: '',
  })
  const [redirecting, setRedirecting] = useState<boolean>(false);
  
  const changeForm = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, type: keyof SendLoginType) => {
    switch (type) {
      case "username":
        setSendLogin({
          ...sendLogin,
          username: e.target.value
        })
        break;
      case "password":
        setSendLogin({
          ...sendLogin,
          password: e.target.value
        })
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    if (redirecting) {
      window.location.href = '/'
    }
  }, [redirecting])

  
  const handleSubmit = async (e: React.SyntheticEvent<HTMLButtonElement, Event>) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/login', sendLogin, {
        withCredentials: true
      })
      .then((res) => { console.log(res.data), dispatch({ type: "auth/login", 
      payload: { connected: true, 
                 username: res.data.username, 
                 xp: res.data.xp,
                 _id: res.data._id,
                 level: res.data.level,
                 admin: res.data.admin,                  
                 money: res.data.money,
                 premium: res.data.premium,
                 crates: res.data.crates,
                 cratesOpened: res.data.cratesOpened,
                }}
                )})
      .then(() => setRedirecting(true));
    }
    catch(err: any) {
      console.log(err)
      const error = JSON.stringify(err?.response?.data['Error: ']).replace(/"/g, '');
      dispatch({ type: "auth/disconnect", payload: {} })
      setError(error)
    }
  }

  useEffect(() => {
    if (setError) {
      setError(false);
    } 
  }, [sendLogin])


  const theme = useSelector((state: RootState) => state.themeSlice.theme)

  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark");
    }
    else {
      document.body.classList.remove("dark");
    }
  }, [theme])
  

  return (
    <ThemeProvider theme={theme === "dark" ? DarkTheme : LightTheme}>
    <div className="register">
        <div className="register__container">
            <h1 style={{marginBottom: "1rem"}}>
              Log in your account
            </h1>
            <form className="register__container__form">
                <p> Username </p>
                <Input maxLength={30} type="text" onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => changeForm(e, "username")}/>
                <p> Password </p>
                <Input maxLength={30} type="password" onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => changeForm(e, "password")}/>
                <Button 
                  style={{
                    marginTop: '2rem',
                  }}
                  onClick={(e: React.SyntheticEvent<HTMLButtonElement, Event>) => handleSubmit(e)}
                  overrides={{
                    BaseButton: {
                      style: () => ({
                        fontFamily: 'DosisBold',
                        width: '100%',
                      }),
                    },
                  }}
> Login </Button>
            </form>
            <div className="info">
          <p> Don't have an account? </p>
          <Link to="/register" style={{color: 'white'}}> Register </Link>
        </div>
        {
          error && <Error error={error} />
        }
        </div>
        <div className="imageContainer">
          <img className="image" src={Image2} alt="auction" />
          <img className="image" src={Treasure} alt="auction" />
        </div>
    </div>
    {
      theme === "dark" ?
      <img className="cloud" src={Moon} alt="cloud" />
      :
      <> 
    <img className="cloud" src={Cloud1} alt="cloud" />
    <img className="cloud" src={Cloud1} alt="cloud" />
    <img className="cloud" src={Cloud1} alt="cloud" />
    <img className="cloud" src={Cloud1} alt="cloud" />
    <img className="cloud" src={Cloud1} alt="cloud" />
    <img className="cloud" src={Cloud1} alt="cloud" />
    <img className="cloud" src={Cloud1} alt="cloud" />
    </>
    }
    
    </ThemeProvider>
  )
}

export default Login