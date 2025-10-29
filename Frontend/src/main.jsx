import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import UserContext from './context/UserContext.jsx'
import UtilityContext from './context/UtilityContext.jsx'

createRoot(document.getElementById('root')).render(
   <BrowserRouter>
   <UtilityContext>
   <UserContext>
    <App />
  </UserContext>
  </UtilityContext>
  </BrowserRouter>
)
