import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../actions/actions';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import routes from '../../config/routes';

import classNames from 'classnames/bind';
import styles from './ModalLogin.module.scss';
// import App from '../../App';

const cx = classNames.bind(styles);

function ModalLogin() {
    const dispatch = useDispatch();
    const error = useSelector((state) => state.error);
    const history = useHistory();

    const [username, setUsername] = useState(localStorage.getItem('name') || '');
    const [password, setPassword] = useState(localStorage.getItem('pass') || '');

    // useEffect(() => {
    //     if (username && password) {
    //         dispatch(login({ username, password }));
    //         // chuyen den trang music
    //         history.push('/');
    //     }
    // }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(login({ username, password }));

        // chuyen den trang music
        history.push(`${routes.home}`);
    };

    const handleUsername = (e) => {
        localStorage.setItem('name', e.target.value);
    };

    const handlePass = (e) => {
        localStorage.setItem('pass', e.target.value);
    };

    return (
        <div className={cx('wrapper')}>
            <section className={cx('container')}>
                <div className={cx('container__content')}>
                    <div className={cx('box')}>
                        <span className={cx('box__close')}>
                            {/* x */}
                            <Link to={routes.home}>X</Link>
                        </span>
                        <h2 className={cx('box__title')}>Log In</h2>
                        <form className={cx('form')} action="" onSubmit={handleLogin}>
                            <div className={cx('form__input')}>
                                <span className={cx('form__input__text')}>Username</span>
                                <input
                                    className={cx('form__input__userpass')}
                                    type="text"
                                    required
                                    name=""
                                    value={username}
                                    placeholder="username..."
                                    onChange={(e) => {
                                        setUsername(e.target.value);
                                        handleUsername(e);
                                    }}
                                />
                            </div>
                            <div className={cx('form__input')}>
                                <span className={cx('form__input__text')}>Password</span>
                                <input
                                    className={cx('form__input__userpass')}
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
                            <div className={cx('form__remember')}>
                                <label>
                                    <input type="checkbox" name="" /> Nhớ Đăng Nhập
                                </label>
                            </div>
                            <div className={cx('form__input')}>
                                <input className={cx('form__input__userpass')} type="submit" value="Log In" />
                            </div>
                            <div className={cx('form__input')}>
                                <p className={cx('form__input__register')}>
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
