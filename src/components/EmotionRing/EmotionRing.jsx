import './EmotionRing.css';
import { useSelector } from 'react-redux';


const EmotionRing = () => {

        const selectedEmotion = useSelector((state) => state.setEmotionReducer.emotion)

        const emotions = ['angry', 'disgust', 'fear', 'happy', 'neutral', 'sad', 'surprise'];
        const selectedEmotionIndex = emotions.indexOf(selectedEmotion)

        return (
                <div className="emotion-ring">
                        <svg viewBox="0 0 200 200" className="emotion-svg">
                                {emotions.map((emotion, index) => {
                                        const angle = (360 / emotions.length) * index;
                                        const radius = 60;

                                        const x = 100 + Math.cos((angle - 90) * Math.PI / 180) * radius;
                                        const y = 100 + Math.sin((angle - 90) * Math.PI / 180) * radius;

                                        const isSelected = index === selectedEmotionIndex;

                                        return (
                                                <g key={index}>
                                                        <circle
                                                                cx={x}
                                                                cy={y}
                                                                r={3}
                                                                fill={isSelected ? 'orange' : 'transparent'}
                                                                stroke="gray"
                                                                strokeWidth={isSelected ? 1.5 : 1}
                                                        />
                                                        <text x={x} y={y} textAnchor="middle" alignmentBaseline="middle" className="emotion-label">
                                                                <tspan style={{ fontSize: '10px', fill: isSelected ? 'orange' : '#FFFFCC' }}>{emotion}</tspan>
                                                        </text>
                                                </g>
                                        );
                                })}
                        </svg>
                </div>
        );
};

export default EmotionRing;
