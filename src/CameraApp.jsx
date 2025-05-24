import React, { useRef, useState, useEffect } from "react";

const CameraApp = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [photo, setPhoto] = useState(null);

    useEffect(() => {
        const getVideo = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                videoRef.current.srcObject = stream;
                videoRef.current.play();
            } catch (err) {
                console.error("Error accessing camera:", err);
            }
        };

        getVideo();
    }, []);

    const takePhoto = () => {
        const width = 640;
        const height = 480;

        const context = canvasRef.current.getContext("2d");
        canvasRef.current.width = width;
        canvasRef.current.height = height;

        context.drawImage(videoRef.current, 0, 0, width, height);
        const imageData = canvasRef.current.toDataURL("image/png");
        setPhoto(imageData);
    };

    const downloadPhoto = () => {
        const link = document.createElement("a");
        link.href = photo;
        link.download = "photo.png";
        link.click();
    };

    return (
        <div className="flex flex-col items-center p-4">
            <video ref={videoRef} className="rounded-lg shadow-lg" />
            <button onClick={takePhoto} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
                📸 Take Photo
            </button>

            <canvas ref={canvasRef} style={{ display: "none" }} />

            {photo && (
                <div className="mt-4 text-center">
                    <img src={photo} alt="Captured" className="rounded-lg border shadow-md" />
                    <button onClick={downloadPhoto} className="mt-2 px-4 py-2 bg-green-600 text-white rounded">
                        ⬇️ Download Photo
                    </button>
                </div>
            )}
        </div>
    );
};

export default CameraApp;
