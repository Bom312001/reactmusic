import { useEffect, useState } from "react";

import classNames from 'classnames/bind'
import styles from './ControlMusic.module.scss'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faPause,faPlay, faRandom, faRedo, faStepBackward, faStepForward } from '@fortawesome/free-solid-svg-icons'


const cx = classNames.bind(styles)

function ControlMusic ({song,isPlaying, setIsPlaying, audioCurrent, setAudioIndex}) {
  const storageRandom = JSON.parse(localStorage.getItem('isRandom'))
  const storageRepeat = JSON.parse(localStorage.getItem('isRepeat'))

  console.log(storageRandom)

    const [isRandom, setIsRanDom] = useState(storageRandom ?? false)
    const [isRepeat, setIsRepeat] = useState(storageRepeat ?? false)


    console.log(isRandom)


    // next song khi hat xong kết hợp với repeat
    useEffect(() => {
      const handleEnded = () => {
        if(isRepeat) {
          // audio.loop = true // lần sau mới có tác dụng vì (lần đầu audio dừng rùi nó mới xét lại loop)
          audioCurrent.play()
        } else {
          handleNext()
        }
      }
      if(audioCurrent) {
        audioCurrent.addEventListener('ended',handleEnded )
      }
      return () =>{
        if(audioCurrent) {
          audioCurrent.removeEventListener('ended',handleEnded )
        }
      }
    })


    //xử lý random
    const handleRandom = () => {
      setAudioIndex((prev) => {
        let randomIndex
        do {
          randomIndex = Math.floor(Math.random() * song.length)
        } while (randomIndex === prev) // prev index hiện tại

        return randomIndex
      })
    }
   

    // // xử lý nút btn
    const togglePlay = () => {
      setIsPlaying(!isPlaying)
    }

    const handleNext = () => {
      if(isRandom === true) {
        handleRandom()
        return
      }

      setAudioIndex((prev) => {
        const nextIndex = prev + 1
        return nextIndex > song.length - 1 ? 0 : nextIndex
      })
    }

    const handlePrev = () => {
      if(isRandom) { // dkien nút random active(true)
        handleRandom()
        return
      }

      setAudioIndex((prev) => {
        const prevIndex = prev - 1
        return prevIndex < 0 ? song.length - 1 : prevIndex
      })
    }



    return (
        <div>
            <div className={cx('control')}>
                <div className={cx('btn', { active: isRepeat === true})} 
                  onClick={() => 
                    {setIsRepeat(!isRepeat) 
                      JSON.stringify(localStorage.setItem('isRepeat', !isRepeat))
                    }}
                >
                    <FontAwesomeIcon className={cx('btn-icon')} icon={faRedo} />
                </div>
                <div className={cx('btn')}>
                    <FontAwesomeIcon className={cx('btn-icon')} icon={faStepBackward}  onClick={handlePrev}/>
                </div>
                <div className={cx('btn', 'btn-toggle-play')} onClick={togglePlay} >
                    {isPlaying ? <FontAwesomeIcon className={cx('btn-icon')} icon={faPause} />:<FontAwesomeIcon className={cx('btn-icon btn-toggle')} icon={faPlay} />}
                </div>
                <div className={cx('btn')}>
                    <FontAwesomeIcon className={cx('btn-icon')} icon={faStepForward}  onClick={handleNext} />
                </div>
                <div className={cx('btn', { active: isRandom === true} )} 
                  onClick={() => 
                    {setIsRanDom(!isRandom)
                      JSON.stringify(localStorage.setItem('isRandom', !isRandom))
                    }}
                >
                    <FontAwesomeIcon className={cx('btn-icon')} icon={faRandom}/>
                </div>
            </div> 
        </div>
    )
}

export default ControlMusic