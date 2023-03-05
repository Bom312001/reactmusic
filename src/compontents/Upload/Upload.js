import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Upload.module.scss';
import useLocalStorage from '../../useLocalStorage/useLocalStorage';
import { useHistory } from 'react-router-dom';
import routes from '../../config/routes';

const cx = classNames.bind(styles);

function Upload() {
    const history = useHistory();

    const { getStorage, setStorage } = useLocalStorage();
    const listSong = getStorage('listSong');

    const [name, setName] = useState('');
    const [singer, setSinger] = useState('');
    const [path, setPath] = useState('');
    const [image, setImage] = useState(null);

    const handleSave = (e) => {
        const newSong = {
            name: name,
            singer: singer,
            path: path,
            image: image,
            // image: image ? URL.createObjectURL(image) : null,
        };

        listSong.push(newSong);
        setStorage('listSong', listSong);
        alert('Upload thanh cong');
        history.push(routes.home);
    };

    // console.log(song);

    const handleImg = (e) => {
        const file = e.target.files[0];
        // file.preview = URL.createOjectURL(file);
        // setImage(file);
        if (file) {
            setImage(URL.createObjectURL(file));
        }
    };

    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('title')}>Upload Music</h2>
            <div className={cx('upload')}>
                <label htmlFor="songName" className={cx('upload__label')}>
                    Upload SongName:
                </label>
                <input
                    type="text"
                    value={name}
                    className={cx('upload__input')}
                    name="songName"
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
                    value={singer}
                    className={cx('upload__input')}
                    name="singer"
                    id="singer"
                    placeholder="singer..."
                    required
                    onChange={(e) => setSinger(e.target.value)}
                />

                <label htmlFor="link" className={cx('upload__label')}>
                    Upload Path:
                </label>
                <input
                    type="url"
                    value={path}
                    className={cx('upload__input')}
                    name="link"
                    id="link"
                    placeholder="path..."
                    required
                    onChange={(e) => setPath(e.target.value)}
                />

                <label htmlFor="img" className={cx('upload__label')}>
                    Upload Image:
                </label>
                <input
                    type="file"
                    required
                    className={cx('upload__input')}
                    name="img"
                    id="img"
                    placeholder="image..."
                    onChange={handleImg}
                />
            </div>
            <button className={cx('btn-upload')} onClick={handleSave}>
                Save
            </button>
        </div>
    );
}

export default Upload;
