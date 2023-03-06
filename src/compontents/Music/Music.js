import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from './Music.module.scss';

import { song } from '../../data/dataSong/dataSong';
import SongItem from './SongItem/SongItem';
import ControlMusic from './ControlMusic/ControlMusic';
// import { login } from '../../actions/actions';
import routes from '../../config/routes';
import useLocalStorage from '../../useLocalStorage/useLocalStorage';

const cx = classNames.bind(styles);

function Music() {
    const { getStorage, setStorage } = useLocalStorage();

    const songs = getStorage('listSong') || setStorage('listSong', song);

    ////ve redux
    const loggedIn = useSelector((state) => state.loggedIn);

    const btnLogoutRef = useRef();

    //xét để khi từ trang app gõ /music cũng có thể đến luôn page music đc
    // const dispatch = useDispatch();
    const history = useHistory();

    const handleRemoveLocal = () => {
        localStorage.removeItem('name');

        history.push(`${routes.login}`);
    };

    /////====phần UI ko
    const [audioIndex, setAudioIndex] = useState(0); // curentIndex
    const [isPlaying, setIsPlaying] = useState(false);
    // useRef
    const audioRef = useRef();
    const cdRef = useRef();
    const cdThumbRef = useRef();
    const progressBarRef = useRef();
    const cdThumbAnimateRef = useRef(); // lưu trữ trạng thái của cd animate

    // console.log(audioRef.current);
    // console.log(cdRef);

    // Get current song and set path for audio
    const currentSong = songs[audioIndex];

    // xử lý thumb quay
    useEffect(() => {
        cdThumbAnimateRef.current = cdThumbRef?.current?.animate([{ transform: 'rotate(360deg)' }], {
            duration: 10000,
            iterations: Infinity,
        });
    }, []);

    ////
    useEffect(() => {
        if (!isPlaying) {
            audioRef?.current?.pause();
            cdThumbAnimateRef?.current?.pause();
        } else {
            audioRef.current?.play();
            cdThumbAnimateRef?.current?.play();
        }
    });

    // xử lý scroll
    useEffect(() => {
        const cdWidth = cdRef.current?.offsetWidth;
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const newCdWidth = cdWidth - scrollTop;
            if (cdRef.current) {
                cdRef.current.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0;
                cdRef.current.style.opacity = (newCdWidth > 0 ? newCdWidth : 0) / cdWidth;
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, [loggedIn]);

    // xử lý tua
    const handleSeekTime = (e) => {
        const seekTime = (e.target.value * audioRef.current?.duration) / 100;
        if (audioRef?.current) audioRef.current.currentTime = seekTime;
    };

    const handleTimeUpdate = () => {
        if (audioRef.current?.duration) {
            const progressPercent = Math.floor((audioRef.current?.currentTime * 100) / audioRef.current?.duration);
            if (progressBarRef.current) {
                progressBarRef.current.value = progressPercent;
                progressBarRef.current.style.background = `linear-gradient(to right, #ff2a5f ${progressPercent}%, #ccc 0%)`;
            }
        }
    };

    return (
        <div className="wrapper">
            {/* Header */}
            <div className={cx('wrapper__header')}>
                <header className={cx('header')}>
                    <h4 className={cx('header__title')}>Now playing:</h4>
                    <h2 className={cx('header__song')}>{currentSong.name}</h2>
                </header>
                <div className={cx('cd')} ref={cdRef}>
                    <div
                        className={cx('cd__thumb')}
                        ref={cdThumbRef}
                        style={{ backgroundImage: `url('${currentSong.image}')` }}
                    ></div>
                </div>

                <button className={cx('btn-logout')} ref={btnLogoutRef} onClick={handleRemoveLocal}>
                    {/* <Redirect push to="/login" /> */}
                    Logout
                </button>

                <button className={cx('btn-upload')}>
                    <Link className={cx('btn-upload__link')} to={routes.upload}>
                        UpLoad
                    </Link>
                </button>

                {/* audio */}
                <audio
                    id="audio"
                    ref={audioRef}
                    src={currentSong.path}
                    onTimeUpdate={handleTimeUpdate} // theo dõi thanh progressbar chạy
                ></audio>
                {/* {console.log(audioRef)} */}

                {/* Music control */}
                <ControlMusic
                    song={songs}
                    currentSong={currentSong}
                    audioCurrent={audioRef.current}
                    isPlaying={isPlaying}
                    setIsPlaying={setIsPlaying}
                    setAudioIndex={setAudioIndex}
                />
                <div className={cx('progress')}>
                    <input
                        ref={progressBarRef}
                        className={cx('progress__bar')}
                        type="range"
                        value="0"
                        step="1"
                        min="0"
                        max="100"
                        onInput={handleSeekTime}
                    />
                </div>
            </div>

            {/* Song list */}
            <div className="wrapper__content">
                <div className={cx('wrapper__content-container')}>
                    <div className={cx('wrapper__content-container-song ')}>
                        {songs.map((songItem, index) => (
                            <SongItem
                                key={index}
                                index={index}
                                currentIndex={audioIndex}
                                listSong={songItem}
                                handleClick={() => setAudioIndex(index)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Music;
