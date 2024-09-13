import style from '../stylesheets/ProfilePage.module.css';
import userSvg from '../assets/svgs/user.svg';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import useUser from '../hooks/useUser';
export default function Profile() {
    const { user } = useUser();
    const [userImage, setUserImage] = useState('');
    return (
        <section className={style.profile}>
            <div className={style.hero}></div>

            <article className={style.user}>
                <h1>My profile</h1>

                <img
                    className={style.userImg}
                    src={user?.image || userSvg}
                    alt="User profile image"
                />

                <h2>{user?.username}</h2>
                <label className={style.imgLabel} htmlFor="image">
                    update image
                </label>
                <input
                    onLoad={() => {
                        console.log('load has been called');
                    }}
                    onChange={(e) => {
                        const file = e.target.files[0];
                        const reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.addEventListener('load', () => {
                            console.log('a load has been perfomed');
                            console.log(reader.result);
                            setUserImage(reader.result);
                        });
                    }}
                    id="image"
                    type="file"
                    className={style.imgInput}
                ></input>
                <Link>Sign Out</Link>
            </article>
        </section>
    );
}
