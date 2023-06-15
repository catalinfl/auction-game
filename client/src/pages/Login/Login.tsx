import { LightTheme, ThemeProvider } from 'baseui'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { Error } from '../Register/Register'
import { useStyletron } from 'styletron-react'
import { Button } from 'baseui/button'
import { Input } from 'baseui/input'
import axios from 'axios'
import { CustomError } from '../Register/Register'
import Image2 from '../../assets/photos/icons8-auction.svg'
import Treasure from '../../assets/photos/icons8-treasure.svg'
import Cloud1 from '../../assets/photos/icons8-cloud.svg'
import { Link } from 'react-router-dom'

type SendLoginType = {
  username: string,
  password: string,
}

const Login = () => {


  const [css] = useStyletron();

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
      }).then(() => setRedirecting(true));
    }
    catch(err: any) {
      console.log(err)
      const error = JSON.stringify(err?.response?.data['Error: ']).replace(/"/g, '');
      setError(error)
    }
  }

  useEffect(() => {
    if (setError) {
      setError(false);
    } 
  }, [sendLogin])
  

  return (
    <ThemeProvider theme={LightTheme}>
    <div className="register">
        <div className="register__container">
            <h1 className={css({
              marginBottom: '1rem'
            })}>
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
                      style: ({ $theme }) => ({
                        fontFamily: 'DosisBold',
                        backgroundColor: $theme.colors.primary700,
                        width: '100%',
                        ':hover': {
                          backgroundColor: $theme.colors.primary,
                        },
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
    <img className="cloud" src={Cloud1} alt="cloud" />
    <img className="cloud" src={Cloud1} alt="cloud" />
    <img className="cloud" src={Cloud1} alt="cloud" />
    <img className="cloud" src={Cloud1} alt="cloud" />
    <img className="cloud" src={Cloud1} alt="cloud" />
    <img className="cloud" src={Cloud1} alt="cloud" />
    <img className="cloud" src={Cloud1} alt="cloud" />
    
    </ThemeProvider>
  )
}

export default Login