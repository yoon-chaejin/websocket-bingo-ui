import React, { useState, useEffect } from 'react';
import BingoItem from './BingoItem';

const Bingo = (props) => {
    const [bingo, setBingo] = useState([[]]);
    const [editable, setEditable] = useState(true);

    useEffect(() => {
        let emptyBingo = [];
        for (let i = 0; i < props.size; i++) {
            let emptyRow = [];
            for (let j = 0; j < props.size; j++) {
                emptyRow.push({ empNo: i+','+j });
            }
            emptyBingo.push(emptyRow);
        }
        console.log(emptyBingo);
        setBingo(emptyBingo);
    }, [props.size]);


    const renderBingo = () => {
        return bingo.map(row => <div className="bingo-row" style={{ width: `${props.size * 30}px`, height: '30px', block: 'block' }}>{renderRow(row)}</div>);
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