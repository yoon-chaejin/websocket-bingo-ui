import React, {useState, useRef} from 'react';
import * as StompJS from '@stomp/stompjs';

function App() {
  
  const [step, setStep] = useState(0); // 진행 단계를 의미 (0: 접속 전, 1: 빙고판 제작, 2: 게임 진행, 3: 게임 종료)
  const [player, setPlayer] = useState({empNo : '', name : ''});

  const client = useRef(null);
  const subscription = useRef(null);

  const connect = () => {
    client.current = new StompJS.Client({
      brokerURL: 'wss://8080-yoonchaejin-websocketbi-e6fvsf7vzi8.ws-us106.gitpod.io/connect-websocket',
    });
    
    client.current.activate();
    
    client.current.onConnect = (frame) => {
      console.log("Connected");
      console.log(frame);

      const player = createRandomPlayer();
      setPlayer(player);
      registerPlayer(player);

      subscription.current = client.current.subscribe('/topic/set-ready', (message) => {
        if (message.body === "true") {
          alert("Received Message : Ready " + message.body);
          setStep(2);
        }
      });

      subscription.current = client.current.subscribe('/topic/select-item', (message) => {
        alert(" Received Message : Item " + message.body);
      });


      subscription.current = client.current.subscribe('/topic/shout-bingo', (message) => {
        alert(" Received Message : Bingo " + message.body);
      });
    };

    client.current.onStompError = (frame) => {
      console.log("Error");
      console.log(frame);
    }

    setStep(1);
  };

  const createRandomPlayer = () => {
    const empNo = Math.round(Math.random() * 10000).toString();
    const name = Math.random().toString(36).substring(2, 10);

    console.log("Random Player : " + empNo + " / " + name);

    return {empNo, name};
  }

  const registerPlayer = (player) => {
    console.log("Register", player);
    client.current.publish({
      destination: '/app/register-player',
      body: JSON.stringify(player),
      headers: { 'contentType': 'application/json' }
    });
  }
  const sendReady = () => {
    console.log("Send Ready", player);
    client.current.publish({
      destination: '/app/set-ready',
      body: JSON.stringify(player),
      headers: { 'contentType': 'application/json' }
    });
  };

  const sendItem = () => {
    const item = {
      empNo: "00000",
      name: "홍길동"
    };

    console.log("Send Bingo Item");
    client.current.publish({
      destination: '/app/select-item',
      body: JSON.stringify(item),
      headers: { 'contentType': 'application/json' }
    });
  };

  const sendBingo = () => {
    console.log("Send Bingo");
    client.current.publish({
      destination: '/app/shout-bingo',
      body: "우승자"
    });

    setStep(3);
  };

  return (
    <div className="App">
        <h1>Bingo by SongChuWe</h1>
        {step === 0 ? <button onClick={connect}>접속</button> : ''}
        {step === 1 ? <button onClick={sendReady}>준비</button> : ''}
        {step === 2 ? 
          <>
            <button onClick={sendItem}>선택</button>
            <button onClick={sendBingo}>빙고</button>
          </>
        : ''}
        {step === 3 ? "게임이 종료되었습니다." : ''}
    </div>
  );
}

export default App;
