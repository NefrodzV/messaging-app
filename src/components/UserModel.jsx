import Proptypes from 'prop-types'
import modalStyle from '../stylesheets/modal.module.css'
// import UserList from './UserList'
export default function UsersModal({ show ,showHandler }) {
    console.log("show modal" + show)
    return(
        <dialog open={show} className={modalStyle.wrapper}>
            <button 
                className={`secondary-button ${modalStyle.close}`}
                onClick={showHandler}
                >X</button>
            {/* <UserList /> */}
        </dialog>
    )
}

UsersModal.propTypes = {
    show: Proptypes.bool,
    showHandler: Proptypes.func
}