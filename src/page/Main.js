import React, { useState } from 'react';
import Bingo from '../component/Bingo.js';
import ItemChoices from '../component/ItemChoices.js';
import WebSocketControlButtonGroup from '../component/WebSocketControlButtonGroup.js';

function Main() {

  const [step, setStep] = useState(0); // 진행 단계를 의미 (0: 접속 전, 1: 빙고판 제작, 2: 게임 진행, 3: 게임 종료)

  const moveToNextStep = (current) => {
    setStep(current + 1);
  };

  return (
    <div className="App">
      <h1>Bingo by SongChuWe</h1>
      <WebSocketControlButtonGroup step={step} moveToNextStep={moveToNextStep} />
      {step === 1 ? <Bingo editable={true} />
        : step === 2 ? <Bingo editable={false} />
          : step === 3 ? <p>게임 종료</p> : ''}
    </div>
  );
}

export default Main;
