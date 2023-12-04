import React, { useState, useEffect } from 'react';
import BingoItem from './BingoItem.js';
import { getBingoItemChoices } from '../api/api.js';

function ItemChoices () {
    const [itemChoices, setItemChoices] = useState([]);

    useEffect(() => {
        getBingoItemChoices().then((response) => {
            setItemChoices(response.data);
        }).catch(() => {
            console.log("INTERNAL ERROR");
        });
    }, []);

    return (
        <>
            <div className='item-choices'>{itemChoices.map(item => <div>{item.empNo}</div>)}</div>
        </>
    )
}

export default ItemChoices;