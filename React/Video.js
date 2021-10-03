import React, { useEffect, useRef } from 'react'
import { withRouter } from 'react-router';
import SocketIOClient from './socketIo';




const Video = () => {
    const socket = useRef(SocketIOClient.connect("http://localhost:3010"));
    const localVideo = useRef()


    useEffect(() => {
        const { RTCPeerConnection, RTCSessionDescription } = window;

        const peerConnection = new RTCPeerConnection();

        navigator.getUserMedia({ video: true, audio: true },
            (stream) => { if (localVideo.current) localVideo.current.srcObject = stream },
            (error) => { console.log(error.message) });


        return () => {
            window.location.reload()
        }
    }, [])


    return (
        <div className="div-video pb-5">
            <div className="content-container pb-5">
                <div className="video-chat-container">
                    <div className="video-container">
                        <video autoPlay className="remote-video" id="remote-video" />
                        <video ref={localVideo} autoPlay muted className="local-video" id="local-video" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Video)

