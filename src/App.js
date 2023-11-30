import React, {useRef, useEffect} from 'react';
import * as StompJS from '@stomp/stompjs';

function App() {
  
  const client = useRef(null);
  
  useEffect(() => {
    client.current = new StompJS.Client({
      brokerURL: 'wss://8080-yoonchaejin-websocketbi-e6fvsf7vzi8.ws-us106.gitpod.io/connect-websocket',
    });
    
    client.current.activate();
    
    client.current.onConnect = (frame) => {
      console.log("Connected");
      console.log(frame);
    };

    client.current.onStompError = (frame) => {
      console.log("Error");
      console.log(frame);
    }

    // const receiveMessage = client.current.subscribe('/topic/bingo', () => {

    // });
  }, []);

  const sendReady = () => {
    console.log("Send Ready");
    client.current.publish({
      destination: '/app/ready'
    });
  };

  const sendItem = () => {
    const item = {
      // empNo: "00000",
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
      destination: '/app/shout-bingo'
    });
  };


  return (
    <div className="App">
        <h1>Bingo</h1>
        <button onClick={sendReady}>준비</button>
        <button onClick={sendItem}>선택</button>
        <button onClick={sendBingo}>빙고</button>
    </div>
  );
}

export default App;
