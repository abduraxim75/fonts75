import React, { useState } from 'react';
import { Googlefonts, Search } from "../utils/svg-formatter";
import { Select } from 'antd';
import { Font } from '../type/type';

const { Option } = Select;

interface NavbarProps {
    fonts: Font[];
    setFonts: React.Dispatch<React.SetStateAction<Font[]>>;
}

const Navbar: React.FC<NavbarProps> = ({ fonts, setFonts }) => {
    const [, setSortBy] = useState<string>('trending');
    const [, setSearchQuery] = useState<string>('');

    const handleSortChange = (value: string) => {
        setSortBy(value);
    };

    const handleSearch = (value: string) => {
        setSearchQuery(value);
        const filteredFonts = fonts.filter(font => font.family.toLowerCase().includes(value.toLowerCase()));
        setFonts(filteredFonts);
    };

    return (
        <div className="navbar">
            <div className="nav-container">
                <div className="google-font-svg">
                    <Googlefonts />
                    <h2>Google Fonts</h2>
                </div>
                <div className="searchbar">
                    <Search />
                    <input type="text" placeholder="Search Fonts" onChange={(e) => handleSearch(e.target.value)} />
                </div>
                <div className="select-bar">
                    <Select
                        className="select"
                        showSearch
                        placeholder="Sort by:"
                        optionFilterProp="children"
                        onChange={handleSortChange}
                        filterOption={(input, option) =>
                            (option?.children as unknown as string).toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        <Option value="trending">Trending</Option>
                        <Option value="popularity">Popularity</Option>
                        <Option value="newest">Newest</Option>
                    </Select>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
