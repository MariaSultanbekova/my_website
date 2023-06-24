import React from 'react';
import { useSelector } from 'react-redux';

const BoundingBox = () => {
        const coordinatesList = useSelector((state) => state.setEmotionReducer.coordinates);

        if (coordinatesList) {

                return (
                        <>
                                {coordinatesList.map((coordinates, index) => {
                                        const x1 = coordinates[0];
                                        const y1 = coordinates[1];
                                        const x2 = coordinates[2];
                                        const y2 = coordinates[3];

                                        const width = x2 - x1 - 350;
                                        const height = y2 - y1 - 350;

                                        return (
                                                <div
                                                        key={index}
                                                        style={{
                                                                position: 'absolute',
                                                                top: y1,
                                                                left: x1,
                                                                width: width,
                                                                height: height,
                                                                border: '4px solid red',
                                                                boxSizing: 'border-box',
                                                        }}
                                                ></div>
                                        );
                                })}
                        </>
                );
        }
};

export default BoundingBox;
