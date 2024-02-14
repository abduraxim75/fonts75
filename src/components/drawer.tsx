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
            <style >{`
                .container {
                    display: flex;
                    transition: margin 0.3s;
                    
                }

                .container.open {
                    margin-left: 300px; // Adjust the margin-left to match the drawer width
                }

                .content {
                    flex-grow: 1;
                }

                .drew-btn {
                    padding: 10px 20px;
                    background-color: #1890ff;
                    color: white;
                    border: none;
                    cursor: pointer;
                }

                .drawer {
                    width: 300px;
                    background-color: #f0f0f0;
                    padding: 10px;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
                }

                .drawer-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                .drawer-content textarea {
                    width: 100%;
                    height: 100px;
                    padding: 8px;
                    resize: none;
                }
            `}</style>
        </div>
    );
};

export default Drawerleft;
