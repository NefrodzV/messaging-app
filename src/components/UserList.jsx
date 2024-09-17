import style from '../stylesheets/UserList.module.css';
import useUsers from '../hooks/useUsers';
import CenteredWrapper from './CenteredWrapper';
import Loader from './Loader';
import UserItem from './UserItem';
export default function UserList() {
    const { users, status } = useUsers();
    return (
        <section className={style.section}>
            <header className={style.header}>
                <h1>Chat with a user</h1>
                <div className={style.buttons}>
                    <button
                        title="Search for a user"
                        aria-label="Press here to open search for user"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                        >
                            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                        </svg>
                    </button>
                </div>
            </header>
            <hr className={style.line} />
            <div className={style.container}>
                {status === 'pending' ? (
                    <Loader />
                ) : users.length != 0 ? (
                    users?.map((user) => (
                        <UserItem key={user._id} user={user} />
                    ))
                ) : (
                    <CenteredWrapper text={'No users in list'} />
                )}
            </div>
        </section>
    );
}
