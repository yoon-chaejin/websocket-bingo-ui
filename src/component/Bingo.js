import React, { useState, useEffect } from 'react';
import BingoItem from './BingoItem.js';
import { getBingoItemChoices } from '../api/api.js';

const Bingo = ({size = 4}) => {
    const [bingo, setBingo] = useState([[]]);
    const [editable, setEditable] = useState(true);
    const [itemChoices, setItemChoices] = useState([]);

    useEffect(() => {
        getBingoItemChoices().then((response) => {
            setItemChoices(response.data);
        }).catch(() => {
            console.log("INTERNAL ERROR");
        });
    }, []);


    useEffect(() => {
        let emptyBingo = [];
        for (let i = 0; i < size; i++) {
            let emptyRow = [];
            for (let j = 0; j < size; j++) {
                emptyRow.push({ empNo: i+','+j });
            }
            emptyBingo.push(emptyRow);
        }
        setBingo(emptyBingo);
    }, [size]);


    const renderBingo = () => {
        return bingo.map((row, idx) => <div className="bingo-row" key={idx} style={{ width: `${size * 30}px`, height: '30px', block: 'block' }}>{renderRow(row)}</div>);
    }

    const renderRow = (row) => {
        return row.map(item => <BingoItem key={item.empNo} data={""} />);
    }
    return (
        <>
            <div className='bingo'>{renderBingo()}</div>
        </>
    )
}

export default Bingo;