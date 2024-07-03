import React from 'react'
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';

const Navbar = () => {
    const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

    React.useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);

        // Očistite event listener kad se komponenta demontira
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            {windowWidth >= 787 ? <DesktopNav /> : <MobileNav />}
        </>
    );
}

export default Navbar