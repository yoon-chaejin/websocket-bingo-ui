import React from 'react';

const BingoItem = (props) => {

    return (
        <div className="bingo-item">
            {props.data.empNo}
        </div>
    )
}

export default BingoItem;