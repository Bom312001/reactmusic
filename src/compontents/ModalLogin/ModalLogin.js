import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../actions/actions';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from './ModalLogin.module.scss';
// import App from '../../App';

const cx = classNames.bind(styles);

function ModalLogin() {
    const dispatch = useDispatch();
    const error = useSelector((state) => state.error);
    const history = useHistory();

    const [username, setUsername] = useState(localStorage.getItem('name') || undefined);
    const [password, setPassword] = useState(localStorage.getItem('pass') || undefined);

    useEffect(() => {
        if (username && password) {
            dispatch(login({ username, password }));
            // chuyen den trang music
            history.push('/music');
        }
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(login({ username, password }));

        // chuyen den trang music
        history.push('/music');
    };

    const handleFormChange = (e) => {
        localStorage.setItem('name', e.target.value);
    };

    const handlePass = (e) => {
        localStorage.setItem('pass', e.target.value);
    };

    return (
        <div className={cx('wrapper-login')}>
            <section>
                <div className={cx('noi-dung')}>
                    <div className={cx('form')}>
                        <span className={cx('close')}>
                            {/* x */}
                            <Link to="/">X</Link>
                        </span>
                        <h2>Log In</h2>
                        <form action="" onSubmit={handleLogin}>
                            <div className={cx('input-form')}>
                                <span>Username</span>
                                <input
                                    type="text"
                                    required
                                    name=""
                                    value={username}
                                    placeholder="username..."
                                    onChange={(e) => {
                                        setUsername(e.target.value);
                                        handleFormChange(e);
                                    }}
                                />
                            </div>
                            <div className={cx('input-form')}>
                                <span>Password</span>
                                <input
                                    type="password"
                                    required
                                    name=""
                                    value={password}
                                    placeholder="password..."
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        handlePass(e);
                                    }}
                                />
                            </div>
                            <div className={cx('nho-dang-nhap')}>
                                <label>
                                    <input type="checkbox" name="" /> Nhớ Đăng Nhập
                                </label>
                            </div>
                            <div className={cx('input-form')}>
                                <input type="submit" value="Log In" />
                            </div>
                            <div className={cx('input-form')}>
                                <p>
                                    Bạn Chưa Có Tài Khoản? <a href="#">Đăng Ký</a>
                                </p>
                            </div>
                        </form>

                        {error && <div>{error}</div>}
                    </div>
                </div>
            </section>
            {/* <Routes>
                <Route path='/' element={<App />} />
            </Routes> */}
        </div>
    );
}

export default ModalLogin;
