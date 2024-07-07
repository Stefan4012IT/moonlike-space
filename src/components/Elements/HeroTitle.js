import React, { useEffect } from 'react';

const HeroTitle = () => {
    useEffect(() => {
        const target = document.querySelector('.hero-dynamic');
        const title = document.querySelector('.hero-title');
        const words = ['Jagger', 'light', 'space'];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        const type = () => {
            const currentWord = words[wordIndex];
            const currentText = currentWord.slice(0, charIndex);
            title.style.opacity = '1';

            if (wordIndex === words.length - 1 && charIndex === currentWord.length) {
                target.textContent = currentText;
                title.style.animation = 'none'; // Prestanak treperenja na kraju
                return;
            } else {
                target.textContent = currentText + '_';
            }

            if (!isDeleting && charIndex < currentWord.length) {
                charIndex++;
                setTimeout(type, 150);
            } else if (isDeleting && charIndex > 0) {
                title.style.animation = 'none';
                charIndex--;
                setTimeout(type, 100);
            } else if (!isDeleting && charIndex === currentWord.length) {
                title.style.animation = 'blink .4s forwards .3s';
                setTimeout(() => {

                    isDeleting = true;
                    type();

                }, 2000);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex++;
                if (wordIndex < words.length) {
                    setTimeout(type, 500);
                }
            }
        };

        setTimeout(type, 7000); // Kašnjenje od 3 sekunde pre početka

    }, []);

    return (
        <h2 className="hero-title">
            Mo<span className="span-red">o</span>nlike.<span className="hero-dynamic"></span>
        </h2>
    );
};

export default HeroTitle;