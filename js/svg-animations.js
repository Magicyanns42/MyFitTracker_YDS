// SVG Animations for Exercises
class SVGAnimations {
    static getBenchPressAnimation() {
        return `
            <svg viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg">
                <!-- Background -->
                <rect width="200" height="300" fill="#f5f5f5"/>
                
                <!-- Bench -->
                <rect x="30" y="150" width="140" height="20" fill="#8B4513" rx="2"/>
                <rect x="20" y="170" width="160" height="10" fill="#654321"/>
                
                <!-- Body -->
                <ellipse cx="100" cy="140" rx="25" ry="30" fill="#E8D7C3"/>
                
                <!-- Arms - Animated -->
                <g id="arms">
                    <line x1="75" y1="120" x2="45" y2="90" stroke="#D4A574" stroke-width="8" stroke-linecap="round"/>
                    <line x1="125" y1="120" x2="155" y2="90" stroke="#D4A574" stroke-width="8" stroke-linecap="round"/>
                    
                    <!-- Dumbbells -->
                    <circle cx="45" cy="85" r="6" fill="#FFD700"/>
                    <circle cx="155" cy="85" r="6" fill="#FFD700"/>
                </g>
                
                <!-- Animation -->
                <style>
                    @keyframes benchPress {
                        0% {
                            transform: translateY(0px);
                        }
                        50% {
                            transform: translateY(-40px);
                        }
                        100% {
                            transform: translateY(0px);
                        }
                    }
                    #arms {
                        animation: benchPress 2s ease-in-out infinite;
                    }
                </style>
            </svg>
        `;
    }

    static getTractionAnimation() {
        return `
            <svg viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg">
                <!-- Background -->
                <rect width="200" height="300" fill="#f5f5f5"/>
                
                <!-- Pull-up bar -->
                <rect x="20" y="30" width="160" height="8" fill="#333" rx="4"/>
                
                <!-- Body - Animated -->
                <g id="pullUpBody">
                    <!-- Head -->
                    <circle cx="100" cy="80" r="12" fill="#E8D7C3"/>
                    
                    <!-- Torso -->
                    <ellipse cx="100" cy="120" rx="18" ry="25" fill="#E8D7C3"/>
                    
                    <!-- Arms -->
                    <line x1="82" y1="90" x2="45" y2="45" stroke="#D4A574" stroke-width="8" stroke-linecap="round"/>
                    <line x1="118" y1="90" x2="155" y2="45" stroke="#D4A574" stroke-width="8" stroke-linecap="round"/>
                    
                    <!-- Legs -->
                    <line x1="95" y1="145" x2="85" y2="200" stroke="#8B6F47" stroke-width="7" stroke-linecap="round"/>
                    <line x1="105" y1="145" x2="115" y2="200" stroke="#8B6F47" stroke-width="7" stroke-linecap="round"/>
                </g>
                
                <!-- Animation -->
                <style>
                    @keyframes pullUp {
                        0% {
                            transform: translateY(60px);
                        }
                        50% {
                            transform: translateY(0px);
                        }
                        100% {
                            transform: translateY(60px);
                        }
                    }
                    #pullUpBody {
                        animation: pullUp 2.5s ease-in-out infinite;
                    }
                </style>
            </svg>
        `;
    }

    static getMilitaryPressAnimation() {
        return `
            <svg viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg">
                <!-- Background -->
                <rect width="200" height="300" fill="#f5f5f5"/>
                
                <!-- Body -->
                <ellipse cx="100" cy="150" rx="20" ry="40" fill="#E8D7C3"/>
                <circle cx="100" cy="110" r="10" fill="#E8D7C3"/>
                
                <!-- Arms - Animated -->
                <g id="pressArms">
                    <line x1="80" y1="130" x2="60" y2="60" stroke="#D4A574" stroke-width="8" stroke-linecap="round"/>
                    <line x1="120" y1="130" x2="140" y2="60" stroke="#D4A574" stroke-width="8" stroke-linecap="round"/>
                    
                    <!-- Dumbbells -->
                    <circle cx="60" cy="55" r="6" fill="#FFD700"/>
                    <circle cx="140" cy="55" r="6" fill="#FFD700"/>
                </g>
                
                <!-- Animation -->
                <style>
                    @keyframes militaryPress {
                        0% {
                            transform: translateY(40px);
                        }
                        50% {
                            transform: translateY(-40px);
                        }
                        100% {
                            transform: translateY(40px);
                        }
                    }
                    #pressArms {
                        animation: militaryPress 2s ease-in-out infinite;
                    }
                </style>
            </svg>
        `;
    }

    static getBicepCurlAnimation() {
        return `
            <svg viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg">
                <!-- Background -->
                <rect width="200" height="300" fill="#f5f5f5"/>
                
                <!-- Body -->
                <ellipse cx="100" cy="150" rx="18" ry="35" fill="#E8D7C3"/>
                <circle cx="100" cy="110" r="10" fill="#E8D7C3"/>
                
                <!-- Arms - Animated -->
                <g id="curlArms">
                    <!-- Left Arm -->
                    <line x1="82" y1="130" x2="50" y2="180" stroke="#D4A574" stroke-width="8" stroke-linecap="round"/>
                    <circle cx="50" cy="185" r="6" fill="#FFD700"/>
                    
                    <!-- Right Arm -->
                    <line x1="118" y1="130" x2="150" y2="180" stroke="#D4A574" stroke-width="8" stroke-linecap="round"/>
                    <circle cx="150" cy="185" r="6" fill="#FFD700"/>
                </g>
                
                <!-- Animation -->
                <style>
                    @keyframes bicepCurl {
                        0% {
                            transform: rotateX(0deg);
                        }
                        50% {
                            transform: rotateX(-40deg);
                        }
                        100% {
                            transform: rotateX(0deg);
                        }
                    }
                    #curlArms {
                        animation: bicepCurl 2s ease-in-out infinite;
                        transform-origin: 100px 130px;
                    }
                </style>
            </svg>
        `;
    }

    static getLateralRaiseAnimation() {
        return `
            <svg viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg">
                <!-- Background -->
                <rect width="200" height="300" fill="#f5f5f5"/>
                
                <!-- Body -->
                <ellipse cx="100" cy="150" rx="18" ry="35" fill="#E8D7C3"/>
                <circle cx="100" cy="110" r="10" fill="#E8D7C3"/>
                
                <!-- Arms - Animated -->
                <g id="lateralArms">
                    <line x1="82" y1="130" x2="30" y2="90" stroke="#D4A574" stroke-width="8" stroke-linecap="round"/>
                    <line x1="118" y1="130" x2="170" y2="90" stroke="#D4A574" stroke-width="8" stroke-linecap="round"/>
                    
                    <!-- Dumbbells -->
                    <circle cx="30" cy="90" r="6" fill="#FFD700"/>
                    <circle cx="170" cy="90" r="6" fill="#FFD700"/>
                </g>
                
                <!-- Animation -->
                <style>
                    @keyframes lateralRaise {
                        0% {
                            transform: rotateZ(0deg);
                        }
                        50% {
                            transform: rotateZ(45deg);
                        }
                        100% {
                            transform: rotateZ(0deg);
                        }
                    }
                    #lateralArms {
                        animation: lateralRaise 2s ease-in-out infinite;
                        transform-origin: 100px 130px;
                    }
                </style>
            </svg>
        `;
    }

    static getTricepExtensionAnimation() {
        return `
            <svg viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg">
                <!-- Background -->
                <rect width="200" height="300" fill="#f5f5f5"/>
                
                <!-- Body -->
                <ellipse cx="100" cy="150" rx="18" ry="35" fill="#E8D7C3"/>
                <circle cx="100" cy="110" r="10" fill="#E8D7C3"/>
                
                <!-- Arm - Animated -->
                <g id="tricepArm">
                    <line x1="100" y1="130" x2="100" y2="80" stroke="#D4A574" stroke-width="8" stroke-linecap="round"/>
                    <line x1="100" y1="80" x2="120" y2="50" stroke="#D4A574" stroke-width="8" stroke-linecap="round"/>
                    
                    <!-- Dumbbell -->
                    <circle cx="120" cy="45" r="6" fill="#FFD700"/>
                </g>
                
                <!-- Animation -->
                <style>
                    @keyframes tricepExtension {
                        0% {
                            transform: rotateZ(-40deg);
                        }
                        50% {
                            transform: rotateZ(0deg);
                        }
                        100% {
                            transform: rotateZ(-40deg);
                        }
                    }
                    #tricepArm {
                        animation: tricepExtension 2s ease-in-out infinite;
                        transform-origin: 100px 130px;
                    }
                </style>
            </svg>
        `;
    }

    static getBarrowAnimation() {
        return `
            <svg viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg">
                <!-- Background -->
                <rect width="200" height="300" fill="#f5f5f5"/>
                
                <!-- Legs for balance -->
                <line x1="80" y1="180" x2="70" y2="240" stroke="#8B6F47" stroke-width="6" stroke-linecap="round"/>
                <line x1="120" y1="180" x2="130" y2="240" stroke="#8B6F47" stroke-width="6" stroke-linecap="round"/>
                
                <!-- Body - Animated -->
                <g id="rowBody">
                    <!-- Back -->
                    <ellipse cx="100" cy="140" rx="20" ry="35" fill="#E8D7C3"/>
                    
                    <!-- Arms with Bar -->
                    <line x1="80" y1="130" x2="30" y2="150" stroke="#D4A574" stroke-width="8" stroke-linecap="round"/>
                    <line x1="120" y1="130" x2="170" y2="150" stroke="#D4A574" stroke-width="8" stroke-linecap="round"/>
                    
                    <!-- Barbell -->
                    <line x1="30" y1="145" x2="170" y2="155" stroke="#333" stroke-width="6"/>
                </g>
                
                <!-- Animation -->
                <style>
                    @keyframes barbelRow {
                        0% {
                            transform: translateY(20px) rotateZ(-10deg);
                        }
                        50% {
                            transform: translateY(-20px) rotateZ(0deg);
                        }
                        100% {
                            transform: translateY(20px) rotateZ(-10deg);
                        }
                    }
                    #rowBody {
                        animation: barbelRow 2.5s ease-in-out infinite;
                    }
                </style>
            </svg>
        `;
    }

    static getAnimationForExercise(exerciseId) {
        const animations = {
            1: this.getBenchPressAnimation(),
            2: this.getTractionAnimation(),
            3: this.getLateralRaiseAnimation(),
            4: this.getMilitaryPressAnimation(),
            5: this.getLateralRaiseAnimation(),
            6: this.getBicepCurlAnimation(),
            7: this.getTricepExtensionAnimation(),
            8: this.getBarrowAnimation(),
            9: this.getBenchPressAnimation(),
            10: this.getBicepCurlAnimation()
        };
        
        return animations[exerciseId] || '<p style="text-align:center; padding:20px;">📸 Animation en cours de développement</p>';
    }
}
