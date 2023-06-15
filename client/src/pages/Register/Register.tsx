import './__register.scss';
import { Input } from 'baseui/input';
import { Button } from 'baseui/button';
import { ThemeProvider, useStyletron } from 'baseui/styles';
import Image from '../../assets/photos/img.png'
import Image2 from '../../assets/photos/chest.svg'
import { LightTheme } from 'baseui';
import Cloud1 from '../../assets/photos/icons8-cloud.svg'
import { ChangeEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

type SendRegisterType = {
  username: string,
  email: string,
  password: string,
  confirmPassword?: string
}

export type CustomError = string | false;

export type ErrorType = {
  error: CustomError
}

const Register = () => {

  const [css] = useStyletron();

  const [sendRegister, setSendRegister] = useState<SendRegisterType>({
    username: '',
    email: '',
    password: '',
  })

  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<CustomError>(false);
  const [redirecting, setRedirecting] = useState<boolean>(false);

  const changeForm = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, type: keyof SendRegisterType) => {
    e.preventDefault();
    switch(type) {
      case "username":
        setSendRegister({
          ...sendRegister,
          username: e.target.value
          })
        break;
      case "email":
        setSendRegister({
          ...sendRegister,
          email: e.target.value
        })
        break;
      case "password":
        setPassword(e.target.value);
        setSendRegister({
          ...sendRegister,
          password: e.target.value
        })
        break;
      case "confirmPassword":
        setConfirmPassword(e.target.value);
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    setError(false);
  }, [sendRegister, confirmPassword])

  useEffect(() => {
    if (redirecting) {
      window.location.href = '/login'
    }
  }, [redirecting])

  const handleSubmit = async (e: React.SyntheticEvent<HTMLButtonElement, Event>) => {
    e.preventDefault();
    if (sendRegister.email.length < 8 || sendRegister.email.length > 40) {
      return setError("Email must be between 8 and 40 characters long");
    }
    if (sendRegister.username.length < 3 || sendRegister.username.length > 40) {
      return setError("Username must be between 8 and 40 characters long");
    }
    if (password.length < 8 || password.length > 40) {
      return setError("Password must be at least 8 characters long");
    }
    if (!(sendRegister.password === confirmPassword)) {
      return setError("Passwords do not match");
    }
    else {
      try {
        await axios.post('http://localhost:3000/api/register', sendRegister)
        .then(() => setRedirecting(true))
      } catch (error: any) {
        setError(error.response.data.message);
      }
    }
  }

  return (
    <ThemeProvider theme={LightTheme}>
    <div className="register">
        <div className="register__container">
            <h1 className={css({
              marginBottom: '1rem'
            })}>
              Create an account
            </h1>
            <form className="register__container__form">
                <p> Username </p>
                <Input maxLength={30} type="text" onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => changeForm(e, "username")}/>
                <p> Email </p>
                <Input maxLength={30} type="text" onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => changeForm(e, "email")}/>
                <p> Password </p>
                <Input maxLength={30} type="password" onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => changeForm(e, "password")}/>
                <p> Confirm Password </p>
                <Input maxLength={30} type="password" onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => changeForm(e, "confirmPassword")}/>
                <Button 
                  onClick={(e: React.SyntheticEvent<HTMLButtonElement, Event>) => handleSubmit(e)}
                  style={{marginTop: '1rem'}}
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
> Register </Button>
            </form>

        {
          error && <Error error={error} />
        }
        <div className="info">
          <p> Already have an account? </p>
          <Link to="/login" style={{color: 'white'}}> Login </Link>
        </div>
        </div>
        <div className="imageContainer">
          <img className="image" src={Image} alt="auction" />
          <img className="image" src={Image2} alt="auction" />
        </div>
    </div>
    
    {/* clouds */}
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

export function Error({ error }: ErrorType): JSX.Element {
  
  return (
    <div className="error">  
      <p className="errorTitle"> Error: {error} </p>
    </div>
  )
}

export default Register