import { Route, Routes } from 'react-router-dom';
import './App.css'
import Login from './Login';
import Register from './register';
import WeatherApp from './WeatherApp';
import LoggedInUsersProtector from "./protectors/LoggedInUsersProtector"
import LoggedOutUsersProtector from "./protectors/LoggedOutUsersProtector"

function App () {

  return (
    <>
      <Routes>
        <Route path="/login" element={ <LoggedOutUsersProtector><Login /></LoggedOutUsersProtector> } />
        <Route path="/register" element={ <LoggedOutUsersProtector><Register /></LoggedOutUsersProtector> } />
        <Route path="/" element={ <LoggedInUsersProtector><WeatherApp /></LoggedInUsersProtector> } />
      </Routes>
    </>
  )
}

export default App
