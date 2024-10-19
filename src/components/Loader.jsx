import style from '../stylesheets/loader.module.css';

export default function Loader({ covers, height }) {
    // If covers the wrapper will take up the whole parent space
    // else use the default height
    return (
        <div
            className={style.wrapper}
            style={
                covers
                    ? {
                          position: 'absolute',
                          inset: 0,
                          backgroundColor: 'rgba(255,255,255,1)',
                          boxShadow: '0 0 3px rgba(0,0,0,.3) inset',
                      }
                    : {
                          height: height || '2.8rem',
                      }
            }
        >
            <div
                className={style.loader}
                style={
                    !covers
                        ? {
                              height: height || '50%',
                          }
                        : null
                }
            ></div>
        </div>
    );
}
