import classNames from 'classnames/bind'
import styles from './Login.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import ModalLogin from '../../ModalLogin/ModalLogin'

const cx = classNames.bind(styles)


function Login () {

    const [showModal, setShowModal] = useState(false)
    
    const handleShowModal = () => {
        setShowModal(!showModal)
    }

    return(
        <div className={cx('wrapper')}>
            <button className={cx('btn')} onClick={handleShowModal}  >
                <FontAwesomeIcon className={cx('icon')} icon={faUser}/>
                <span className={cx('text')}>Sign In</span>
            </button>
            {showModal && <ModalLogin handleShowModal={handleShowModal} />}
        </div>
    )
}

export default Login