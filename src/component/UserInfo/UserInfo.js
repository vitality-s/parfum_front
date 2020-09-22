import React from "react";
import {generateColor} from "../../helpers/generateColor";
import s from "../Menu/Menu-slider/Menu-slider.module.css"

const UserInfo = ({authData}) => {
    const {color, colorLighten} = generateColor(authData.email);
    const firstChar = authData.fullname[0].toUpperCase()
    return (
        <div className={s.photoUserBox}>
            <div style={{background: `linear-gradient(135deg, ${color} 0%, ${colorLighten} 96.52%)`}}
                 className={s.photo}>
                {firstChar}
            </div>
            <div className={s.fullname}>
                {authData.fullname}
            </div>
        </div>
    )
}
export default UserInfo