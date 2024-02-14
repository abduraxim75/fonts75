import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './navbar';
import Footergoogle from './footer';

type Font = {
    family: string;
    menu: string;
    variants: string[];
};

type ApiResponse = {
    items: Font[];
};

const FontsComponent: React.FC = () => {
    const [fonts, setFonts] = useState<Font[]>([]);
    const [sort,setSort] = useState<string>("")

    useEffect(() => {
        const fetchFonts = async () => {
            try {
                const apiKey = import.meta.env.VITE_APP_API_KEY;
                const baseUrl = import.meta.env.VITE_APP_BASE_URL;
                const url = `${baseUrl}?key=${apiKey}`;
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Fonts yuklashda xatolik');
                }
                const data: ApiResponse = await response.json();
                setFonts(data.items);
            } catch (error) {
                console.error('Xato: fontlar yuklashda xatolik:', error);
            }
        };

        fetchFonts();
    }, []);


    useEffect(() => {
        const loadFonts = () => {
            fonts.forEach(font => {
                const fontFamily = font.family.replace(/\s+/g, '-');
                const styleElement = document.createElement('style');
                styleElement.textContent = `
                    @font-face {
                        font-family: "${fontFamily}";
                        src: url("${font.menu}");
                    }
                `;
                document.head.appendChild(styleElement);
            });
        };

        loadFonts();

        return () => {
            fonts.forEach(font => {
                const fontFamily = font.family.replace(/\s+/g, '-');
                const styleElement = document.querySelector(`[data-font-family="${fontFamily}"]`);
                if (styleElement) {
                    document.head.removeChild(styleElement);
                }
            });
        };
    }, [fonts]);

    return (
        <div>
            <Navbar fonts={fonts} setFonts={setFonts} />
            <h4 className='font-h4'>Total Font Families: {fonts.length}</h4>
            <ul className='font-ul'>
                {fonts.map(font => {
                    const fontFamily = font.family.replace(/\s+/g, '-');
                    return (
                        <li className='font-li' key={fontFamily}>
                            <Link to={`/specimen/${font.family}`}>
                                <h4>{font.family}</h4>
                                <h1 className={`h1-${fontFamily}`} style={{ fontFamily: font.family, fontSize: `${font.menu}px` }}>
                                    Whereas disregard and contempt for human rights have resulted
                                </h1>
                                
                            </Link>
                        </li>
                        
                    );
                })}
            </ul>
            <Footergoogle/>
        </div>
    );
};

export default FontsComponent;
