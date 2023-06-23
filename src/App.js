import './App.css';
import CameraComponent from './components/Camera/Camera';
import EmotionRing from './components/EmotionRing/EmotionRing';


function App() {
  return (
    <div className='container'>
      <div className='header'>
        <h1>Check your mood!</h1>
      </div>
      <div className='components-container'>
        <div>
          <CameraComponent />
        </div>
        <div className="emotion-ring">
          <EmotionRing />
        </div>
      </div>
    </div>
  );
}

export default App;
