import React from 'react';
import {
    ArrowUp

} from 'lucide-react';

const BackToTop = () => {
    const [visible, setVisible] = React.useState(false);

    React.useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setVisible(true);
            } else {
                setVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <button
            onClick={scrollToTop}
            className={`back-to-top ${visible ? 'show' : ''}`}
            aria-label="Back to top"
        >
            <ArrowUp className="h-6 w-6" />
        </button>
    );
};

export default BackToTop;
