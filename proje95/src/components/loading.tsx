// src/components/LoadingScreen.tsx

import React from 'react';
import Lottie from 'lottie-react';
import loadingAnimation from '../loading.json'; // <<-- Kendi dosya yolun

const LoadingScreen = () => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: '#f5f5f5' // Arkaplan rengi
        }}>
            <Lottie
                animationData={loadingAnimation}
                style={{ height: 200, width: 200 }}
            />
        </div>
    );
};

export default LoadingScreen;