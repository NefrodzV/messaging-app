import userIcon from '../assets/user.svg'
import useUser from '../hooks/useUser'
export default function Profile() {
    const { user , loading } = useUser()
    return(
        <>
            {
                loading ? <div>Loading...</div> :
                <div>
                    <h3>My profile</h3>
                    {/* Remove this later */}
                    <img style={{
                        width: '200px',
                        height: '200px'
                    }}
                        src={userIcon} 
                        alt="My profile image" />
                    <h3>{user?.username}</h3>
                    <button>Change password</button>
                    <button>Change profile image</button>
                </div>
            }
        </>
    )
}