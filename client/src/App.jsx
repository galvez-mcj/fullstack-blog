import Header from "./Header";
import {Outlet} from 'react-router-dom'
import './App.css'


export default function App() {
  return (
    <main>
        <Header />
        <Outlet />
    </main>
  )
}