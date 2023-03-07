import classNames from 'classnames/bind';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import styles from './Edit.module.scss';
import useLocalStorage from '../../../useLocalStorage/useLocalStorage';
import { useHistory } from 'react-router-dom';
import routes from '../../../config/routes';

const cx = classNames.bind(styles);

function Edit() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const history = useHistory();
    const { getStorage, setStorage } = useLocalStorage();

    const listSong = getStorage('listSong');

    const { id } = useParams();
    const currentSong = listSong[id];
    console.log(currentSong);

    const [name, setName] = useState(currentSong.name);
    const [singer, setSinger] = useState(currentSong.singer);

    const handleEdit = (data) => {
        currentSong.name = data.name;
        currentSong.singer = data.singer;
        setStorage('listSong', listSong);
        alert('Edit thanh cong');
        history.push(routes.home);
    };

    return (
        <div className={cx('wrapper')}>
            <form onSubmit={handleSubmit(handleEdit)}>
                <h2 className={cx('title')}>Edit Song</h2>
                <div className={cx('upload')}>
                    <div>
                        <label htmlFor="songName" className={cx('upload__label')}>
                            Upload SongName:
                        </label>
                        <input
                            type="text"
                            className={cx('upload__input')}
                            name="name"
                            id="songName"
                            placeholder="songName..."
                            // value={name}
                            // required
                            // onChange={(e) => setName(e.target.value)}
                            defaultValue={name}
                            {...register('name', { required: true })}
                        />
                        <div className={cx('upload__errors')}>
                            {errors.name?.type === 'required' && <li>Name không được để trống</li>}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="singer" className={cx('upload__label')}>
                            Upload Singer:
                        </label>
                        <input
                            type="text"
                            className={cx('upload__input')}
                            name="singer"
                            id="singer"
                            placeholder="singer..."
                            // value={singer}
                            // required
                            // onChange={(e) => setSinger(e.target.value)}
                            defaultValue={singer}
                            {...register('singer', { required: true })}
                        />
                        <div className={cx('upload__errors')}>
                            {errors.singer?.type === 'required' && <li>Singer không được để trống</li>}
                        </div>
                    </div>
                </div>
                <button
                    className={cx('btn-upload')}
                    // onClick={handleEdit}
                    type="submit"
                >
                    Save
                </button>
            </form>
        </div>
    );
}

export default Edit;
