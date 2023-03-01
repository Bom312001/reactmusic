import classNames from 'classnames/bind'
import styles from './BtnLogIn.module.scss'

const cx = classNames.bind(styles)


function BtnLogIn () {
    return(
        <div className={cx('wrapper')}>
            <div className={cx('login-box')}>
            <h2 className={cx('login-box__title')}>Button Login</h2>
            <button className={cx('login-box__button')}>Login</button>
            </div>
        </div>
    )
}

export default BtnLogIn