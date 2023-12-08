import React, { useState, useRef } from 'react';
import * as StompJS from '@stomp/stompjs';

function WebSocketControlButtonGroup({ step, moveToNextStep }) {
    const [player, setPlayer] = useState({ empNo: '', name: '' });

    const client = useRef(null);
    const subscription = useRef(null);

    const connect = () => {
        client.current = new StompJS.Client({
            brokerURL: process.env.REACT_APP_WEBSOCKET_ENDPOINT,
        });

        client.current.activate();

        client.current.onConnect = (frame) => {
            console.log("Connected");

            const player = createRandomPlayer();
            setPlayer(player);
            registerPlayer(player);

            subscription.current = client.current.subscribe('/topic/set-ready', (message) => {
                if (message.body === "true") {
                    alert("Received Message : Ready " + message.body);
                    moveToNextStep(step);
                    step = step + 1;
                }
            });

            subscription.current = client.current.subscribe('/topic/select-item', (message) => {
                alert(" Received Message : Item " + message.body);
            });


            subscription.current = client.current.subscribe('/topic/shout-bingo', (message) => {
                alert(" Received Message : Bingo " + message.body);

                moveToNextStep(step);
                step = step + 1;
                client.current.deactivate();
            });
        };

        client.current.onStompError = (frame) => {
            console.log("Error");
        }

        client.current.onDisconnect = (frame) => {
            console.log("Disconnected");
        }

        client.current.onWebSocketClose = (event) => {
            console.log("WebSocket Closed");
        }

        moveToNextStep(step);
        step = step + 1;
    };

    const createRandomPlayer = () => {
        const empNo = Math.round(Math.random() * 10000).toString();
        const name = Math.random().toString(36).substring(2, 10);

        console.log("Random Player : " + empNo + " / " + name);

        return { empNo, name };
    };

    const registerPlayer = (player) => {
        console.log("Register", player);
        client.current.publish({
            destination: '/app/register-player',
            body: JSON.stringify(player),
            headers: { 'contentType': 'application/json' }
        });
    };

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
    };

    return (
        <div className='web-socket-control-button-group'>
            {step === 0 ? <button onClick={connect}>접속</button>
                : step === 1 ? <button onClick={sendReady}>준비</button>
                    : step === 2 ? <>
                        <button onClick={sendItem}>선택</button>
                        <button onClick={sendBingo}>빙고</button>
                    </>
                        : step === 3 ? '' : ''}
        </div>
    );
}

export default WebSocketControlButtonGroup;