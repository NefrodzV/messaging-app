import style from '../stylesheets/loader.module.css'
// NOTE: Right now we are representing 
// this as a full page with the loader in the middle
export default function Loader({  width, height, marginTop, containerHeight }) {
    return (
        <div className={style.wrapper} style={
            {
                height: containerHeight
            }
        }>
            <div className={style.loader} style={{
                width: width,
                height: height,
                marginTop:marginTop
            }}>
            </div>
        </div>
    )
}