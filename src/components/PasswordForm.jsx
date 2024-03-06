import { useEffect } from 'react'
import Input from '../components/Input'
import useUpdatePassword from '../hooks/useUpdatePassword'
import Error from '../components/Error'
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
            <h2>Change password</h2>
             <button type ="button" onClick={close} >Close</button>
            <div className="group">
                <Input type={"password"} 
                    name={"password"} 
                    placeholder={'password'} />
                    <Error name={"password"} errors={errors} />
                    <Error name={"auth"} errors={errors} />
            </div>
            <div className="group">
                <Input
                    type={"password"}
                    name={"newPassword"}
                    placeholder={"New password"} />
                    <Error name={"newPassword"} errors={errors} />
            </div>
            <div className="group">
                <Input
                    type={"password"}
                    name={"confirmPassword"}
                    placeholder={"Confirm password"} />
                    <Error name={"confirmPassword"} errors={errors} />
            </div>
            <button >update password</button>
        </form>

        </dialog>
        
    )
}
