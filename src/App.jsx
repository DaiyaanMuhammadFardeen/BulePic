import { Routes, Route } from 'react-router-dom';
import CameraApp from './CameraApp.jsx';

function App() {
    return (
        <Routes>
            <Route path="/camera" element={<CameraApp />} />
            {/* Add a default or home route if needed */}
            <Route
                path="/"
                element={
                    <div className="min-h-screen flex items-center justify-center text-xl">
                        Welcome! Go to <a href="/camera" className="text-blue-500 underline">/camera</a>
                    </div>
                }
            />
        </Routes>
    );
}

export default App;
