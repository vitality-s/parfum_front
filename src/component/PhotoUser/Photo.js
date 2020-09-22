import React from "react";
import {generateColor} from "../../helpers/generateColor";
import s from './Photo.module.css'

const Photo = (props) => {
    const {color, colorLighten} = generateColor(props.hash);
    const firstChar = props.char[0].toUpperCase()
    return (
        <div style={{background: `linear-gradient(135deg, ${color} 0%, ${colorLighten} 96.52%)`}}
        className={s.photo}>
            {firstChar}
        </div>
    )
}
export default Photo