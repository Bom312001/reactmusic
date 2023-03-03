import { useEffect, useRef } from "react";

import classNames from 'classnames/bind'
import styles from './SongItem.module.scss'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons'

const cx = classNames.bind(styles)


function SongItem({index, currentIndex, listSong, handleClick }) {
    const itemRef = useRef();
	useEffect(() => {
		if (index === currentIndex) {
			itemRef.current.scrollIntoView({
				behavior: 'smooth',
                block: 'end',
                inline: 'nearest',
			});
		}
	}, [index, currentIndex]);

    return (
        <div className={cx('wrapper-song')}>
            <div 
                ref={itemRef}
                className={cx('song',{active: currentIndex === index})} 
                onClick={handleClick}
            >
                <div className={cx('thumb')}>
                    <img className={cx('img')} src={listSong.image} alt="ảnh"/>
                </div>
                <div className={cx('body')}>
                    <h3 className={cx('title-song')}>{listSong.name}</h3>
                    <p className={cx('author')}>{listSong.singer}</p>
                </div>
                <div className="option">
                    <FontAwesomeIcon className={cx('icon-option')} icon={faEllipsisH} />
                </div>
            </div>
        </div>
    )
} 

export default SongItem