import useUpdateImage from "../hooks/useUpdateImage";
import Input from "./Input";
import Error from "../components/Error"
import style from '../stylesheets/dialog.module.css'
import Notification from  '../components/Notification'
import { useEffect } from "react";
import Loader from "./Loader";
export default function ImageForm({ show, close }) {
    const { status, upload, errors, reset } = useUpdateImage()

    useEffect(() => {
        if(status === 'success') reset()
        console.log('status changed')
    },[status])

    function submitHandler(e) {
        e.preventDefault()
        upload(e)
    }
    return(
        <dialog open={show === "image"} >
            <form className={style.content}onSubmit={submitHandler} encType="multipart/form-data">
                <h2>Select new image: </h2>
               
                <div className="group bg-top-margin">
                    <Input type={"file"} name={"image"} />
                    <Error name={"image"} errors={errors} />
                </div>
                <button 
                    disabled={status === 'pending'}
                    className="bg-top-margin">submit
                </button>
                <button  
                    disabled={status === 'pending'}
                    type='button' onClick={close} style={
                        {
                            marginLeft: 8
                        }
                    }>cancel</button>
            {status === 'pending' ? <Loader  width={10} height={10} marginTop={12}/> : null }
            <Notification 
                text={'Profile image updated!'} 
                notify={status === 'success'} />
            </form>
        </dialog>
    )
}