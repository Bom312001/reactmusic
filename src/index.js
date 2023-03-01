import React from 'react';
import ReactDOM from 'react-dom/client';
// import { Router, Route } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import GlobalStyles from './compontents/GlobalStyles/GlobalStyles';
import { Provider } from 'react-redux';
import store from './store/store';

// import ModalLogin from './compontents/ModalLogin/ModalLogin';
// import Music from './compontents/Music/Music';

// import { createBrowserHistory } from 'history';

// const history = createBrowserHistory();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>
    <GlobalStyles>
        <Provider store={store}>
            {/* <Router history={history}>
                <Switch>
                    <Route path="/">
                        <App />
                    </Route>
                </Switch>
            </Router> */}
            <Router>
                <App />,
            </Router>
        </Provider>
    </GlobalStyles>,
    // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
