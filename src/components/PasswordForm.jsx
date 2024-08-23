import { useEffect, useRef } from 'react'
import Input from '../components/Input'
import useUpdatePassword from '../hooks/useUpdatePassword'
import ErrorMessage from '../components/ErrorMessage'
import style from '../stylesheets/dialog.module.css'
import Notification from './Notification'
import Loader from '../components/Loader'
export default function PasswordForm({ show, close }) {
    const formRef = useRef()
    const { updatePassword, status, errors, reset } = useUpdatePassword()
    useEffect(() => {
        // let id;
        if (status === 'success') {
            reset()
            const form = formRef.current
            form.reset()
        }
    }, [status])

    useEffect(() => {
        if (close !== 'password') {
            const form = formRef.current
            form.reset()
        }
    }, [close])
    function submitHandler(e) {
        e.preventDefault()
        updatePassword(e)
    }
    return (
        <dialog open={show === 'password'}>
            <form ref={formRef} method="POST" onSubmit={submitHandler}>
                <div className={style.head}>
                    <h3>Change password</h3>
                    {/* <button type ="button" onClick={close} >close</button> */}
                </div>
                <div className={style.content}>
                    <div className="group">
                        <Input
                            type={'password'}
                            name={'password'}
                            placeholder={'Password'}
                        />
                        <ErrorMessage name={'password'} errors={errors} />
                        <ErrorMessage name={'auth'} errors={errors} />
                    </div>
                    <div className="group">
                        <Input
                            type={'password'}
                            name={'newPassword'}
                            placeholder={'New password'}
                            style={'m-top-margin'}
                        />
                        <ErrorMessage name={'newPassword'} errors={errors} />
                    </div>
                    <div className="group">
                        <Input
                            type={'password'}
                            name={'confirmPassword'}
                            placeholder={'Confirm password'}
                            style={'l-top-margin'}
                        />
                        <ErrorMessage
                            name={'confirmPassword'}
                            errors={errors}
                        />
                    </div>
                </div>

                <div className={style.controls}>
                    <button disabled={status === 'pending'}>Update</button>
                    <button
                        disabled={status === 'pending'}
                        type="button"
                        onClick={close}
                        style={{
                            marginLeft: 8,
                        }}
                    >
                        cancel
                    </button>
                </div>
                {status === 'pending' ? (
                    <Loader width={10} height={10} marginTop={12} />
                ) : null}
                <Notification
                    text={'Password updated!'}
                    notify={status === 'success'}
                />
            </form>
        </dialog>
    )
}
