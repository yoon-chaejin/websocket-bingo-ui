import React from 'react';

const BingoItem = (props) => {

    return (
        <div className="bingo-item" style={{ height: '50px', width: '50px' }} onClick={props.onClick}>
            {props.data.name}
        </div>
    )
}

export default BingoItem;