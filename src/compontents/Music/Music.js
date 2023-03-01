import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from './Music.module.scss';

import { song } from '../../data/dataSong/dataSong';
import SongItem from './SongItem/SongItem';
import ControlMusic from './ControlMusic/ControlMusic';
import { login } from '../../actions/actions';

const cx = classNames.bind(styles);

function Music() {
    //ve redux
    const loggedIn = useSelector((state) => state.loggedIn);

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        const username = localStorage.getItem('name');
        const password = localStorage.getItem('pass');

        if (username) {
            dispatch(login({ username, password }));
            // chuyen den trang music
            history.push('/music');
        }
    }, []);

    const [audioIndex, setAudioIndex] = useState(0); // curentIndex
    const [isPlaying, setIsPlaying] = useState(false);
    // useRef
    const audioRef = useRef();
    const cdRef = useRef();
    const cdThumbRef = useRef();
    const progressBarRef = useRef();
    const cdThumbAnimateRef = useRef(); // lưu trữ trạng thái của cd animate

    console.log(audioRef.current);

    // Get current song and set path for audio
    const currentSong = song[audioIndex];

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
    }, []);

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
        <div>
            {loggedIn && (
                <div className="wrapper">
                    {/* Header */}
                    <div className={cx('wrapper-header')}>
                        <header className={cx('header')}>
                            <h4 className={cx('title-header')}>Now playing:</h4>
                            <h2 className={cx('title-header_song')}>{currentSong.name}</h2>
                        </header>
                        <div className={cx('cd')} ref={cdRef}>
                            <div
                                className={cx('cd-thumb')}
                                ref={cdThumbRef}
                                style={{ backgroundImage: `url('${currentSong.image}')` }}
                            ></div>
                        </div>

                        {/* audio */}
                        <audio
                            id="audio"
                            ref={audioRef}
                            src={currentSong.path}
                            onTimeUpdate={handleTimeUpdate} // theo dõi thanh progressbar chạy
                        ></audio>
                        {console.log(audioRef)}

                        {/* Music control */}
                        <ControlMusic
                            song={song}
                            currentSong={currentSong}
                            audioCurrent={audioRef.current}
                            isPlaying={isPlaying}
                            setIsPlaying={setIsPlaying}
                            setAudioIndex={setAudioIndex}
                        />
                        <div className={cx('progress')}>
                            <input
                                ref={progressBarRef}
                                className={cx('progress-bar')}
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
                    <div className="content">
                        <div className={cx('wrapper-container')}>
                            <div className={cx('wrapper-song ')}>
                                {song.map((songItem, index) => (
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
            )}
            {!loggedIn && <div>Please login music player</div>}
        </div>
    );
}

export default Music;
