import React from "react";
import "./SplashScreen.css";

const SplashScreen: React.FC = () => {
    return (
        <div className="splash-screen" role="presentation">
            <div className="splash-content">
                <span className="splash-emoji" data-testid="splash-emoji">🎲</span>
            </div>
        </div>
    );
};

export default React.memo(SplashScreen);