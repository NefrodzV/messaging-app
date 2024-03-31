import useUpdateImage from "../hooks/useUpdateImage";
import Input from "./Input";
import Error from "../components/Error"
import style from '../stylesheets/dialog.module.css'

export default function ImageForm({ show, close }) {
    const { status, upload, errors } = useUpdateImage()

    function submitHandler(e) {
        e.preventDefault()
        // console.log(e.target["image"].files[0])
        upload(e)
    }
    return(
        <dialog open={show === "image"} >
            <form onSubmit={submitHandler} encType="multipart/form-data">
                <h2>Select new image: </h2>
                <button type="button" onClick={close}>Close</button>
                <div className="group">
                    <Input type={"file"} name={"image"} />
                    <Error name={"image"} errors={errors} />
                </div>
            <button className="bg-top-margin">submit</button>
            <button type='button' onClick={close} style={
                    {
                        marginLeft: 8
                    }
                }>cancel</button>
            </form>
        </dialog>
    )
}