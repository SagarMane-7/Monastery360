import React, { useState, useEffect } from 'react';

const bannerStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 9999,
    background: 'linear-gradient(135deg, #d35400, #e74c3c)',
    color: '#ffffff',
    textAlign: 'center',
    padding: '10px 20px',
    fontSize: '15px',
    fontWeight: '600',
    fontFamily: "'Karla', sans-serif",
    letterSpacing: '0.3px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.25)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    animation: 'slideDown 0.4s ease-out',
};

const OfflineBanner = () => {
    const [isOffline, setIsOffline] = useState(!navigator.onLine);

    useEffect(() => {
        const handleOffline = () => setIsOffline(true);
        const handleOnline = () => setIsOffline(false);

        window.addEventListener('offline', handleOffline);
        window.addEventListener('online', handleOnline);

        return () => {
            window.removeEventListener('offline', handleOffline);
            window.removeEventListener('online', handleOnline);
        };
    }, []);

    if (!isOffline) return null;

    return (
        <>
            <style>{`
                @keyframes slideDown {
                    from { transform: translateY(-100%); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
            `}</style>
            <div style={bannerStyle} role="alert" aria-live="polite" id="offline-banner">
                <span style={{ fontSize: '18px' }}>⚡</span>
                <span>You are offline — showing cached data</span>
            </div>
        </>
    );
};

export default OfflineBanner;
