import style from './ChatForm.module.css';
import FormImage from '../FormImage';
import ResizeableTextarea from '../ResizeableTextarea';
export default function ChatForm({
    text,
    setText,
    images,
    user,
    isEditing,
    onSubmit,
    cancelEdit,
    onFileChange,
    deleteImage,
    deleteAllImages,
}) {
    return (
        <form
            className={style.form}
            style={{
                position: 'relative',
            }}
            onSubmit={onSubmit}
        >
            {images.length != 0 && (
                <section className={style.files}>
                    <header>
                        <h2>Files</h2>
                        <div className="flex-container">
                            <button
                                onClick={deleteAllImages}
                                title="Close and remove all files selected"
                                aria-label="Close and remove all files selected"
                                className="primary wrap-container only-svg red"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 384 512"
                                >
                                    <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                                </svg>
                            </button>
                        </div>
                    </header>
                    <div className={style.fileContainer}>
                        {images?.map((image, i) => (
                            <FormImage
                                key={i}
                                url={image.url || image.dataUrl}
                                className={style.formImage}
                                deleteImage={deleteImage}
                            />
                        ))}
                    </div>
                </section>
            )}
            <div className={style.container}>
                <div className={style.wrapper}>
                    {isEditing && (
                        <label className={style.label}>
                            Edit message...
                            <button onClick={cancelEdit}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 384 512"
                                >
                                    <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"></path>
                                </svg>
                            </button>
                        </label>
                    )}
                    <ResizeableTextarea
                        className={`primary`}
                        value={text}
                        ariaLabel={`Enter message to ${user?.username}`}
                        name={text}
                        id={'text'}
                        placeholder={`Enter message`}
                        maxRows={5}
                        onChangeHandler={(e) => {
                            setText(e.target.value);
                        }}
                    />
                </div>

                <label
                    htmlFor="images"
                    className={style.button}
                    title="Upload files"
                    aria-label="Click here to upload files"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        fill="currentColor"
                    >
                        <path d="M288 109.3L288 352c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-242.7-73.4 73.4c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l128-128c12.5-12.5 32.8-12.5 45.3 0l128 128c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L288 109.3zM64 352l128 0c0 35.3 28.7 64 64 64s64-28.7 64-64l128 0c35.3 0 64 28.7 64 64l0 32c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64l0-32c0-35.3 28.7-64 64-64zM432 456a24 24 0 1 0 0-48 24 24 0 1 0 0 48z" />
                    </svg>
                    <input
                        className={style.imgsInput}
                        name="images"
                        type="file"
                        id="images"
                        multiple={true}
                        onChange={onFileChange}
                    />
                </label>

                <button
                    className={style.sendButton}
                    title="Send message button"
                    aria-label="Send message"
                >
                    <svg
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g id="Paper_Plane" data-name="Paper Plane">
                            <path d="M21.061,11.077,3.741,4.157a.994.994,0,0,0-1.17.32,1,1,0,0,0-.01,1.22l4.49,6a.525.525,0,0,1-.01.62L2.511,18.3a1.02,1.02,0,0,0,0,1.22,1,1,0,0,0,.8.4,1.021,1.021,0,0,0,.38-.07l17.36-6.9a1.006,1.006,0,0,0,.01-1.87ZM3.371,5.087l16.06,6.42H8.061a1.329,1.329,0,0,0-.21-.41Zm-.06,13.82,4.53-5.98a1.212,1.212,0,0,0,.22-.42h11.38Z" />
                        </g>
                    </svg>
                </button>
            </div>
        </form>
    );
}
