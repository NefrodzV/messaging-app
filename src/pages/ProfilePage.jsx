import style from '../stylesheets/ProfilePage.module.css';
import Header from '../components/Header';
import ChatList from '../components/ChatList';
import userSvg from '../assets/svgs/user.svg';
import useMediaQuery from '../hooks/useMediaQuery';
import { Link } from 'react-router-dom';
import { useState } from 'react';
export default function ProfilePage() {
    const { queryIsActive } = useMediaQuery('(max-width: 768px)');
    const [userImage, setUserImage] = useState('');
    return (
        <div className={style.page}>
            <Header />
            <main className={style.main}>
                {!queryIsActive && <ChatList />}
                <section className={style.profile}>
                    <div className={style.hero}></div>

                    <article className={style.user}>
                        <h1>My profile</h1>

                        <img
                            className={style.userImg}
                            src={userImage || userSvg}
                            alt="User profile image"
                        />

                        <h2>Rose Vargas Hernandez</h2>
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
            </main>
        </div>
    );
}
