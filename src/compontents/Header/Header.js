import classNames from 'classnames/bind'
import styles from './Header.module.scss'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faPause, faRandom, faRedo, faStepBackward, faStepForward } from '@fortawesome/free-solid-svg-icons'
import {song }from '../../data/dataSong/dataSong'

const cx = classNames.bind(styles)

function Header () {
    return(
        <div className={cx('wrapper')}>
            <header className={cx('header')}>
                <h4 className={cx('title')}>Now playing:</h4>
                <h2 className={cx('title-song')}>Head In The Clouds</h2>
            </header>
            <div className={cx('cd')}>
                <div className={cx('cd-thumb')}>
                    <img src={song.image} alt="anh" />
                </div>
            </div>
            <div className={cx('control')}>
                <div className={cx('btn btn-repeat')}>
                    <FontAwesomeIcon className={cx('btn-icon')} icon={faRedo} />
                </div>
                <div className={cx('btn btn-prev')}>
                    <FontAwesomeIcon className={cx('btn-icon')} icon={faStepBackward} />
                </div>
                <div className={cx('btn btn-toggle-play')}>
                    <FontAwesomeIcon className={cx('btn-icon')} icon={faPause} />
                    {/* <FontAwesomeIcon className={cx('btn-icon')} icon={faPlay} /> */}
                </div>
                <div className={cx('btn btn-next')}>
                    <FontAwesomeIcon className={cx('btn-icon')} icon={faStepForward} />
                </div>
                <div className={cx('btn btn-random')}>
                    <FontAwesomeIcon className={cx('btn-icon')} icon={faRandom} />
                </div>
            </div>
            <div className={cx('progress')}>
                <input
                    className={cx('progress-bar')}
                    type="range"
                    value="0"
                    step="1"
                    min="0"
                    max="100"
                />
            </div>
        </div>
    )
}

export default Header