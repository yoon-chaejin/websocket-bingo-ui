import React, { useState, useEffect } from 'react';
import BingoItem from './BingoItem.js';
import { getBingoItemChoices } from '../api/mock-api.js';

const Bingo = ({ size = 4 }) => {
    const [bingo, setBingo] = useState([[]]);
    const [editable, setEditable] = useState(true);
    const [itemChoices, setItemChoices] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [currentBingoItem, setCurrentBingoItem] = useState({ row: '', col: '' });

    useEffect(() => {
        getBingoItemChoices().then((response) => {
            setItemChoices(response.data.map(item => ({ clickable: true, ...item })));
        }).catch(() => {
            console.log("INTERNAL ERROR");
        });
    }, []);


    useEffect(() => {
        let emptyBingo = [];
        for (let i = 0; i < size; i++) {
            let emptyRow = [];
            for (let j = 0; j < size; j++) {
                emptyRow.push({ row: i, col: j, empNo: '', name: '' });
            }
            emptyBingo.push(emptyRow);
        }
        setBingo(emptyBingo);
    }, [size]);


    const renderBingo = () => {
        return bingo.map((item, idx) => <div className="bingo-row" key={idx} style={{ width: `${size * 50}px`, height: '50px', block: 'block' }}>{renderRow(item)}</div>);
    }

    const renderRow = (row) => {
        return row.map(item => <BingoItem key={item.row + ',' + item.col} data={item} onClick={() => showItemChoices(item)} />);
    }

    const showItemChoices = (item) => {
        setIsOpen(true);
        setCurrentBingoItem(item);
    }

    const hideItemChoices = (choice) => {
        if (!choice.clickable) {
            return;
        }
        setIsOpen(false);
        const nextBingo = bingo;
        nextBingo[currentBingoItem.row][currentBingoItem.col] = {
            row: currentBingoItem.row,
            col: currentBingoItem.col,
            empNo: choice.empNo,
            name: choice.name
        };
        setBingo(nextBingo);
        const nextItemChoices = itemChoices.map(item => item.empNo === choice.empNo && item.name === choice.name ? { ...item, clickable: false } : item);
        setItemChoices(nextItemChoices);
    }

    const setRandomBingo = () => {
        const randomItemChoices = itemChoices.slice();
        let newItemChoices = itemChoices.slice();

        randomItemChoices.sort(() => Math.random() - 0.5);

        console.log(randomItemChoices);

        let randomBingo = [];
        for (let i = 0; i < size; i++) {
            let row = [];
            for (let j = 0; j < size; j++) {
                const choice = randomItemChoices[i*size + j];
                row.push({ row: i, col: j, empNo: choice.empNo, name: choice.name });
                newItemChoices = newItemChoices.map(item => item.empNo === choice.empNo && item.name === choice.name ? {...item, clickable: false} : item);
            }
            randomBingo.push(row);
        }

        console.log(newItemChoices);
        console.log(randomBingo);

        setItemChoices(newItemChoices);
        setBingo(randomBingo);
    }
    return (
        <>
            <div className='bingo'>{renderBingo()}</div>
            <div onClick={setRandomBingo}>자동설정</div>
            {
                isOpen
                    ?
                    <div className='item-choices'>
                        {itemChoices.map(item =>
                            <div key={item.empNo} style={{ textDecoration: item.clickable ? '' : 'line-through' }} onClick={() => hideItemChoices(item)}>{item.name}</div>)}
                    </div>
                    : ''
            }
        </>
    )
}

export default Bingo;