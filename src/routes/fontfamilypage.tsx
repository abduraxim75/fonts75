import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

type FontVariant = {
    variant: string;
};

const FontFamilyPage: React.FC = () => {
    const { fontFamily } = useParams<{ fontFamily: string }>();
    const [variants, setVariants] = useState<FontVariant[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    const { familyId } = useParams<{ familyId: string }>();

    useEffect(() => {
        const fetchFonts = async () => {
            try {
                const apiKey = import.meta.env.VITE_APP_API_KEY; 
                const baseUrl = import.meta.env.VITE_APP_BASE_URL;
                const url = `${baseUrl}?key=${apiKey}&family=${familyId}`;

                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Failed to fetch fonts');
                }

                const data = await response.json();
                setVariants(data?.items[0]?.variants || []);
            } catch (error) {
                setError('Error fetching fonts');
                console.error('Error fetching fonts:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFonts();
    }, [familyId]);

    return (
        <div>
            <h2>Font Family: {fontFamily}</h2>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div>
                    <h4>Total Variants: {variants.length}</h4>
                    <ul>
                        {variants.map((variant, index) => (
                            <li key={index}>
                                <p>
                                    {variant.variant}
                                    <p>
                                        were
                                    </p>
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default FontFamilyPage;
