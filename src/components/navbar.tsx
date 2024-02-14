import React, { useState } from 'react';
import { Googlefonts, Search } from "../utils/svg-formatter";
import { Select } from 'antd';

const { Option } = Select;

interface Font {
    family: string;
    menu: string;
    popularity: number;
    lastModified: string;
}

interface NavbarProps {
    fonts: Font[];
    setFonts: React.Dispatch<React.SetStateAction<Font[]>>;
}

const Navbar: React.FC<NavbarProps> = ({ fonts, setFonts }) => {
    const [sortBy, setSortBy] = useState<string>('trending');
    const [searchQuery, setSearchQuery] = useState<string>('');

    const handleSortChange = (value: string) => {
        setSortBy(value);
    };

    const handleSearch = (value: string) => {
        setSearchQuery(value);
        const filteredFonts = fonts.filter(font => font.family.toLowerCase().includes(value.toLowerCase()));
        setFonts(filteredFonts);
    };

    const renderFontOptions = () => {
        let sortedFonts = [...fonts];
        if (sortBy === 'popularity') {
            sortedFonts.sort((a, b) => b.popularity - a.popularity);
        } else if (sortBy === 'newest') {
            sortedFonts.sort((a, b) => (new Date(b.lastModified) as any) - (new Date(a.lastModified) as any));
        }
        return sortedFonts.map(font => (
            <Option key={font.family} value={font.family}>{font.family}</Option>
        ));
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
