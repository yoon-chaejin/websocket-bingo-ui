import React, { useState, useEffect } from 'react';
import BingoItem from './BingoItem.js';
import { getBingoItemChoices } from '../api/api.js';

function ItemChoices () {

    return (
        <>
            <div className='item-choices'>{itemChoices.map((item, idx) => <div key={idx}>{item.empNo}</div>)}</div>
        </>
    )
}

export default ItemChoices;