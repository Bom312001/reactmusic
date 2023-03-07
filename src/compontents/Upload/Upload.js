import { useState } from 'react';
import { useForm } from 'react-hook-form';

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

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        clearErrors,
    } = useForm({
        defaultValues: {
            image: null,
        },
    });

    // const handleSave = (data) => {
    //     console.log(data);

    //     const formData = new FormData();
    //     formData.append('name', data.name);
    //     formData.append('singer', data.singer);
    //     formData.append('path', data.path);
    //     formData.append('image', image);

    //     fetch('listSong', {
    //         method: 'POST',
    //         body: formData,
    //     })
    //         .then((data) => {
    //             console.log(data);
    //             const newSong = {
    //                 name: data.name,
    //                 singer: data.singer,
    //                 path: data.path,
    //                 image: data.image,
    //             };

    //             listSong.push(newSong);
    //             setStorage('listSong', listSong);
    //             alert('Upload thành công');
    //             history.push(routes.home);
    //         })
    //         .catch((error) => console.log(error));
    // };

    const handleSave = (data) => {
        const newSong = {
            name: data.name,
            singer: data.singer,
            path,
            image,
        };

        listSong.push(newSong);
        setStorage('listSong', listSong);
        alert('Upload thanh cong');
        history.push(routes.home);
    };

    // const handleSave = (e) => {
    //     const newSong = {
    //         name: name,
    //         singer: singer,
    //         path: path,
    //         image: image,
    //     };

    //     listSong.push(newSong);
    //     setStorage('listSong', listSong);
    //     alert('Upload thanh cong');
    //     history.push(routes.home);
    // };

    // console.log(song);

    // const handleImg = (e) => {
    //     const file = e.target.files[0];
    //     // file.preview = URL.createOjectURL(file);
    //     // setImage(file);
    //     if (file) {
    //         setImage(URL.createObjectURL(file));
    //     }
    // };

    return (
        <div className={cx('wrapper')}>
            <form onSubmit={handleSubmit(handleSave)}>
                <h2 className={cx('title')}>Upload Music</h2>
                <div className={cx('upload')}>
                    <div>
                        <label htmlFor="songName" className={cx('upload__label')}>
                            Upload SongName:
                        </label>
                        <input
                            type="text"
                            id="songName"
                            className={cx('upload__input')}
                            name="name"
                            placeholder="name..."
                            // value={name}
                            // required
                            // onChange={(e) => setName(e.target.value)}
                            defaultValue={name}
                            {...register('name', { required: true, minLength: 3 })}
                        />
                        <div className={cx('upload__errors')}>
                            {errors.name?.type === 'required' && <li>Name không được để trống</li>}
                            {errors.name?.type === 'minLength' && <li>Name phải trên 3 ký tự</li>}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="singer" className={cx('upload__label')}>
                            Upload Singer:
                        </label>
                        <input
                            type="text"
                            id="singer"
                            className={cx('upload__input')}
                            name="singer"
                            placeholder="singer..."
                            // value={singer}
                            // required
                            // onChange={(e) => setSinger(e.target.value)}
                            defaultValue={singer}
                            {...register('singer', { required: true, minLength: 3 })}
                        />
                        <div className={cx('upload__errors')}>
                            {errors.singer?.type === 'required' && <li>Singer không được để trống</li>}
                            {errors.singer?.type === 'minLength' && <li>Singer phải trên 3 ký tự</li>}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="link" className={cx('upload__label')}>
                            Upload Path:
                        </label>
                        <input
                            type="file"
                            className={cx('upload__input')}
                            name="path"
                            id="link"
                            placeholder="path..."
                            // required
                            // onChange={(e) => setPath(e.target.value)}
                            defaultValue={path}
                            {...register('path', { required: true })}
                            onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                    console.log(URL.createObjectURL(file));
                                    setPath(URL.createObjectURL(file));
                                    clearErrors('path');
                                } else {
                                    setError('path', { type: 'required' });
                                }
                            }}
                        />
                        {errors.path && (
                            <div className={cx('upload__errors')}>
                                <li>Please select a file</li>
                            </div>
                        )}
                    </div>

                    <div>
                        <label htmlFor="img" className={cx('upload__label')}>
                            Upload Image:
                        </label>
                        <input
                            type="file"
                            id="img"
                            className={cx('upload__input')}
                            name="image"
                            // required
                            // onChange={handleImg}
                            defaultValue={image}
                            {...register('image', { required: true })}
                            onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                    console.log(URL.createObjectURL(file));
                                    setImage(URL.createObjectURL(file));
                                    clearErrors('image');
                                } else {
                                    setError('image', { type: 'required' });
                                }
                            }}
                        />
                        {errors.image && (
                            <div className={cx('upload__errors')}>
                                <li>Please select a file</li>
                            </div>
                        )}
                    </div>
                </div>

                <button
                    type="submit"
                    className={cx('btn-upload')}
                    // onClick={handleSave}
                >
                    Save
                </button>
            </form>
        </div>
    );
}

export default Upload;
