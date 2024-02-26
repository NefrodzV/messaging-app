import Proptypes from 'prop-types'
import modalStyle from '../stylesheets/modal.module.css'
export default function UsersModal({show ,showHandler}) {
    
    return(
        <dialog open={show} className={modalStyle.wrapper}>
            <button 
            className='secondary-button'
            onClick={showHandler}
            >X</button>
            <UsersList />
        </dialog>
    )
}

UsersModal.propTypes = {
    show: Proptypes.bool,
    showHandler: Proptypes.func
}