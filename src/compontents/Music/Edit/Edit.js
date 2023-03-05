import classNames from 'classnames/bind';
import { useState } from 'react';
import styles from './Edit.module.scss';
import { useParams } from 'react-router-dom';
import useLocalStorage from '../../../useLocalStorage/useLocalStorage';
import { useHistory } from 'react-router-dom';
import routes from '../../../config/routes';

const cx = classNames.bind(styles);

function Edit() {
    const history = useHistory();
    const { getStorage, setStorage } = useLocalStorage();

    const listSong = getStorage('listSong');

    const { id } = useParams();
    const currentSong = listSong[id];
    console.log(currentSong);

    const [name, setName] = useState(currentSong.name);
    const [singer, setSinger] = useState(currentSong.singer);

    const handleEdit = () => {
        currentSong.name = name;
        currentSong.singer = singer;
        setStorage('listSong', listSong);
        alert('Edit thanh cong');
        history.push(routes.home);
    };

    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('title')}>Edit Song</h2>
            {/* <div className={cx('current-song')}>
                <div>
                    Tên bài hát:
                    {currentSong.name}
                </div>
                <div>
                    Tên ca sĩ:
                    {currentSong.singer}
                </div>
            </div> */}
            <div className={cx('upload')}>
                <label htmlFor="songName" className={cx('upload__label')}>
                    Upload SongName:
                </label>
                <input
                    type="text"
                    className={cx('upload__input')}
                    name="songName"
                    value={name}
                    id="songName"
                    placeholder="songName..."
                    required
                    onChange={(e) => setName(e.target.value)}
                />

                <label htmlFor="singer" className={cx('upload__label')}>
                    Upload Singer:
                </label>
                <input
                    type="text"
                    className={cx('upload__input')}
                    name="singer"
                    value={singer}
                    id="singer"
                    placeholder="singer..."
                    required
                    onChange={(e) => setSinger(e.target.value)}
                />
            </div>
            <button className={cx('btn-upload')} onClick={handleEdit}>
                Save
            </button>
        </div>
    );
}

export default Edit;
