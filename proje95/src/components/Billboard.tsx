import React from 'react';
import '../css/billboard.css';

interface BillboardProps {
    title: string;
    subtitle: string;
    imageUrl: string;
    buttonText: string;
    onButtonClick: () => void;
}

// Billboard bileşenini tanımlıyoruz React.FC fonksiyonel bileşen olduğunu belirtir.
// Props'ları destructure et.
const Billboard: React.FC<BillboardProps> = ({ title, subtitle, imageUrl, buttonText, onButtonClick }) => {

    // Konsola hata mesajı yazdırılır
    if (!imageUrl) {
        console.error("Billboard için görsel yolu belirtilmedi!");
        return null;
    }

    // Bileşenin JSX çıktısı
    return (
        <div className="billboard-container" style={{ backgroundImage: `url(${imageUrl})` }}>

            <div className="billboard-content">
                <h1>{title}</h1>
                <p>{subtitle}</p>
                <button onClick={onButtonClick}>{buttonText}</button>
            </div>
        </div>
    );
};

export default Billboard;
