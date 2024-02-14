import React, { useState } from 'react';
import { FiX } from 'react-icons/fi';

const Drawerleft: React.FC = () => {
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const handleIconClick = () => {
        onClose(); 
    };

    return (
        <div className={`container${open ? ' open' : ''}`}>
            <div className="content">
                <button className='drew-btn' onClick={showDrawer}>
                    Filter
                </button>
            </div>
            {open && (
                <div className='drawer'>
                    <div className='drawer-header'>
                        <FiX onClick={handleIconClick} /> 
                        <h3>Preview</h3>
                    </div>
                    <div className='drawer-content'>
                        <textarea placeholder='Type Something'></textarea>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Drawerleft;
