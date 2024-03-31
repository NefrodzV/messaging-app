import { useEffect } from 'react'
import Input from '../components/Input'
import useUpdatePassword from '../hooks/useUpdatePassword'
import Error from '../components/Error'
import style from '../stylesheets/dialog.module.css'
export default function PasswordForm ({show, close}) {

    const { updatePassword, status, errors } = useUpdatePassword()

    useEffect(() => {
        if(status === "success") {
            console.log("Update password done")
        } else if(status === "error") {
            console.log("Some error happened")
        } else {
            console.log("Status is pending")
        }
    }, [status])

    function submitHandler(e) {
        e.preventDefault()
        updatePassword(e)
    }
    return (
        <dialog open={show === "password"}>
            <form method="POST" onSubmit={submitHandler} >
                <div className={style.head}>
                    <h3>Change password</h3>
                    {/* <button type ="button" onClick={close} >close</button> */}
                </div>
                <div className={style.content}>
                    <div className="group">
                        <Input type={"password"} 
                            name={"password"} 
                            placeholder={'Password'}
                            />
                        <Error name={"password"} errors={errors} />
                        <Error name={"auth"} errors={errors} />
                    </div>
                    <div className="group">
                        <Input
                            type={"password"}
                            name={"newPassword"}
                            placeholder={"New password"}
                            style={'m-top-margin'} />
                        <Error name={"newPassword"} errors={errors} />
                    </div>
                    <div className="group">
                        <Input
                            type={"password"}
                            name={"confirmPassword"}
                            placeholder={"Confirm password"}
                            style={'l-top-margin'} />
                        <Error name={"confirmPassword"} errors={errors} />
                    </div>
                </div>
            
            <div className={style.controls}>
                <button>Update</button> 
                <button type='button' onClick={close} style={
                    {
                        marginLeft: 8
                    }
                }>cancel</button>
            </div>
           
        </form>

        </dialog>
        
    )
}
