import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import UserContext from './context/UserContext.jsx'
import UtilityContext from './context/UtilityContext.jsx'
import { showToast } from './utils/toast.js'

// Only override console in development
if (import.meta.env.DEV) {
  const originalLog = console.log;
  const originalError = console.error;
  
  console.log = (...args) => {
    const message = args.join(' ');
    if (message.includes('localhost') || message.includes('Profile saved') || message.includes('API Response') || message.includes('successfully')) {
      showToast(message, 'success');
    }
    originalLog.apply(console, args);
  };
  
  console.error = (...args) => {
    const message = args.join(' ');
    if (message.includes('failed') || message.includes('error') || message.includes('Database save failed')) {
      showToast(message, 'error');
    }
    originalError.apply(console, args);
  };
}

window.showToast = showToast;

createRoot(document.getElementById('root')).render(
   <BrowserRouter>
   <UtilityContext>
   <UserContext>
    <App />
  </UserContext>
  </UtilityContext>
  </BrowserRouter>
)
