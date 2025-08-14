import React from "react";
import logo from "../image/logo.png"; // logo.png dosyasının yoluna göre ayarla
import "../css/header.css";

const Header: React.FC = () => {
    return (
        <header className="header" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>

            {/* ✅ Var olan logo görüntüsü (değiştirilmedi) */}
            <img src={logo} alt="Logo" className="logo" />
        </header>
        // Bu header bileşeni, sitenin üst kısmında yer alacak ve logo ile başlığı içerecek.
    );
};

export default Header;
