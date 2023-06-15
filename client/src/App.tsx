import { Button } from "baseui/button"
import axios from "axios"
import { useEffect } from "react"


function App() {

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('http://localhost:3000/api/tiomka', {
        withCredentials: true,
      })
      console.log(result);
    }
    fetchData();
  }, [])

  return (
    <>
      <Button > Click </Button>
    </>
  )
}

export default App
