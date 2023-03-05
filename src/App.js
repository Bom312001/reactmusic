import { Route, useHistory } from 'react-router-dom';
import routes from './config/routes';

// import {song} from '../src/data/dataSong/dataSong'
// import {  useState, useRef, useEffect } from "react";
// import SongItem from './compontents/SongItem/SongItem';
// import ControlMusic from './compontents/ControlMusic/ControlMusic';
// import Login from './compontents/Login/Login/Login';
import ModalLogin from './compontents/ModalLogin/ModalLogin';
import Music from './compontents/Music/Music';

// import { loginApi } from './api/api';
import { useEffect } from 'react';
import Upload from './compontents/Upload/Upload';
import Edit from './compontents/Music/Edit/Edit';
// import { useSelector } from 'react-redux';
// import { Redirect } from 'react-router-dom'; // cách 2

function App() {
    const history = useHistory();
    // console.log(loginApi())

    // const username = localStorage.getItem('name'); // cách 2:  khi sd Rediret

    useEffect(() => {
        const username = localStorage.getItem('name'); // cách 1 nếu ko dùng redirect ở dưới
        // history là một đối tượng trong JavaScript được sử dụng để quản lý lịch sử của trình duyệt.
        // push là để người dùng có thể quay lại trang trước khi đến
        history.push(username ? `${routes.home}` : `${routes.login}`);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // if (!username) <Redirect exact to={routes.login} />; // cách 2:  khi sd Rediret

    return (
        <div className="app">
            {/* {loggedIn && <Music />}
            {!loggedIn && <ModalLogin />} */}
            <Route exact path={routes.home} component={Music} />

            <Route exact path={routes.login} component={ModalLogin} />
            <Route exact path={routes.upload} component={Upload} />
            <Route exact path={routes.edit + '/:id'} component={Edit} />
        </div>
    );
}

export default App;
