import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Provider} from "react-redux";
import { store } from './api'
import {BrowserRouter} from "react-router-dom";
const root = document.getElementById('root')
root.style.width = '100%';
createRoot(root).render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
)