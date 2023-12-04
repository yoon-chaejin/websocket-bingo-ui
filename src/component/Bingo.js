import React, { useState, useEffect } from 'react';
import BingoItem from './BingoItem.js';

const Bingo = ({size = 4}) => {
    const [bingo, setBingo] = useState([[]]);
    const [editable, setEditable] = useState(true);

    useEffect(() => {
        let emptyBingo = [];
        for (let i = 0; i < size; i++) {
            let emptyRow = [];
            for (let j = 0; j < size; j++) {
                emptyRow.push({ empNo: i+','+j });
            }
            emptyBingo.push(emptyRow);
        }
        console.log(emptyBingo);
        setBingo(emptyBingo);
    }, [size]);


    const renderBingo = () => {
        return bingo.map(row => <div className="bingo-row" style={{ width: `${size * 30}px`, height: '30px', block: 'block' }}>{renderRow(row)}</div>);
    }

    const renderRow = (row) => {
        return row.map(item => <BingoItem key={item.empNo} data={item} />);
    }
    return (
        <>
            <div className='bingo'>{renderBingo()}</div>
        </>
    )
}

export default Bingo;