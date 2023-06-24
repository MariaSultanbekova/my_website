import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCoordinates, setEmotion } from '../../slices/emoSet';
import axios from 'axios';
import CameraWarning from './CameraWarning';

const CameraComponent = () => {
        const dispatch = useDispatch();
        const videoRef = useRef(null);
        const [cameraAvailable, setCameraAvailable] = useState(true);

        useEffect(() => {
                let intervalId;

                const getCameraVideo = async () => {
                        try {
                                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                                videoRef.current.srcObject = stream;
                                videoRef.current.play();

                                // Установка интервала для получения кадров каждые 5 секунд
                                intervalId = setInterval(captureFrame, 1000);
                        } catch (error) {
                                console.error('Ошибка получения видео с камеры:', error);
                                setCameraAvailable(false);
                        }
                };

                const captureFrame = async () => {
                        if (!cameraAvailable) return;

                        const canvas = document.createElement('canvas');
                        const context = canvas.getContext('2d');
                        const video = videoRef.current;

                        canvas.width = video.videoWidth;
                        canvas.height = video.videoHeight;

                        context.drawImage(video, 0, 0, canvas.width, canvas.height);

                        const blob = await new Promise((resolve) => {
                                canvas.toBlob(resolve, 'image/jpeg');
                        });

                        // Получение данных кадра в формате Blob
                        uploadFrame(blob);

                        // Очистка canvas после использования
                        context.clearRect(0, 0, canvas.width, canvas.height);
                        canvas.remove();
                };

                const uploadFrame = async (blob) => {
                        const formData = new FormData();
                        formData.append('file', blob, 'frame.jpg');

                        try {
                                const response = await axios.post('http://127.0.0.1:8000/predict_emotion', formData);

                                if (response.status === 200) {
                                        const result = response.data;

                                        dispatch(setEmotion(result.emotion));
                                        dispatch(setCoordinates(result.coordinates))
                                } else {
                                        console.error('Ошибка при загрузке кадра на сервер:', response.status);
                                }
                        } catch (error) {
                                console.error('Ошибка при загрузке кадра на сервер:', error);
                        }
                };

                getCameraVideo();

                // Очистка интервала при размонтировании компонента
                return () => {
                        clearInterval(intervalId);
                        const stream = videoRef.current.srcObject;
                        if (stream) {
                                const tracks = stream.getTracks();
                                tracks.forEach((track) => track.stop());
                        }
                };
        }, []);

        return (
                <>
                        {cameraAvailable ? (
                                <video className="video-container" ref={videoRef} />
                        ) : (
                                <CameraWarning />
                        )}
                </>
        );
};

export default CameraComponent;
