import style from '../stylesheets/ProfilePage.module.css';
import userSvg from '../assets/svgs/user.svg';
import { Link } from 'react-router-dom';
import useUser from '../hooks/useUser';
import { Image } from '.';
import useUpdateImage from '../hooks/useUpdateImage';
export default function Profile() {
    const { user } = useUser();
    const { upload } = useUpdateImage();
    return (
        <section className={style.profile}>
            <div className={style.hero}></div>

            <article className={style.user}>
                <h1>My profile</h1>

                <Image
                    url={user?.image?.w150 || userSvg}
                    className={style.userImg}
                    alt={'My profile image'}
                />

                <h2>{user?.username}</h2>
                <label className={style.imgLabel} htmlFor="image">
                    update image
                </label>
                <input
                    onChange={(e) => {
                        const image = e.target.files[0];
                        upload(image);
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
