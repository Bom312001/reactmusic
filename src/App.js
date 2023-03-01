import classNames from 'classnames/bind';
import styles from './compontents/GlobalStyles/GlobalStyles';
// import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

// import {song} from '../src/data/dataSong/dataSong'
// import {  useState, useRef, useEffect } from "react";
// import SongItem from './compontents/SongItem/SongItem';
// import ControlMusic from './compontents/ControlMusic/ControlMusic';
// import Login from './compontents/Login/Login/Login';
import ModalLogin from './compontents/ModalLogin/ModalLogin';
import Music from './compontents/Music/Music';
import BtnLogIn from './btnLogIn/BtnLogIn';

// import { loginApi } from './api/api';

const cx = classNames.bind(styles);

function App() {
    // console.log(loginApi())

    return (
        <div className="app">
            <Link to="/login">
                <button className="app_btn-login">Login</button>
            </Link>

            <Route path="/login" component={ModalLogin} />
            <Route path="/music" component={Music} />
        </div>
    );
}

export default App;

{
    /* Header */
}
{
    /* <div className={cx('wrapper-header')}>
<header className={cx('header')}>
    <h4 className={cx('title-header')}>Now playing:</h4>
    <h2 className={cx('title-header_song')}>{currentSong.name}</h2>
</header>
<div className={cx('cd')} ref={cdRef}>
    <div className={cx('cd-thumb')}
      ref={cdThumbRef}
      style={{ backgroundImage: `url('${currentSong.image}')` }}
    > 
    </div>

</div> */
}

{
    /* Log In
<Login /> */
}
{
    /* <div>
<Link to='/logIn'>Log In</Link>
</div>

<Routes>
<Route path='/logIn' element={<ModalLogin/>} />
</Routes> */
}

{
    /* audio */
}
{
    /* <audio 
  id="audio" 
  ref={audioRef}
  src={currentSong.path}
  onTimeUpdate={handleTimeUpdate} // theo dõi thanh progressbar chạy
  // loop = {setIsLoop} // cho bát hát lặp lại khi hát xong(loop = true)
>
</audio>
{console.log(audioRef)} */
}

{
    /* Music control */
}
{
    /* <ControlMusic 
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
</div> */
}

{
    /* Song list */
}
{
    /* <div className="content">
<div className={cx('wrapper-container')}>
    <div className={cx('wrapper-song ')}>
      {song.map((songItem,index) => (
        <SongItem
          key={index} 
          index={index}
          currentIndex={audioIndex}
          listSong={songItem}
          handleClick={() => setAudioIndex(index)}
        /> */
}

// <div className={cx('song',{ active: audioIndex === index}) }
// key={index}
// onClick={() => setAudioIndex(index) }
// // ref={songItemRef}
// >

//     <div className={cx('thumb')}>
//         <img className={cx('img')} src={songItem.image}alt="ảnh"/>
//     </div>
//     <div className={cx('body')}>
//         <h3 className={cx('title-song')}>{songItem.name}</h3>
//         <p className={cx('author')}>{songItem.singer}</p>
//     </div>
//     <div className="option">
//         <FontAwesomeIcon className={cx('icon-option')} icon={faEllipsisH} />
//     </div>
// </div>

//       ))}
//   </div>
// </div>
// </div>
