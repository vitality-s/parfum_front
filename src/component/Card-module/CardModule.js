import FilterBar from "../Filter-bar/FilterBar";
import CardBox from "../Card-box/CardBox";
import React from "react";

class CardModule extends React.Component {
    render() {
        return (
            <div>
                <FilterBar {...this.props}/>
                <CardBox {...this.props}/>
            </div>
        )
    }


}
export default CardModule