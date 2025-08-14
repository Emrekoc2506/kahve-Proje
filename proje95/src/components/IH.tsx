import React from 'react'; // Gerekli import
import '../css/IH.css';
import Card from './Card.tsx'

const IH = () => {
    return (
        <>
            <div id="hakkinda" className="section">
                <h2>Hakkında</h2>
                <pre style={{
                    backgroundColor: '#f7f7f7',
                    color: '#444',
                    padding: '1.5em',
                    borderRadius: '20px',
                    fontFamily: 'math',
                    lineHeight: '1.6',
                    whiteSpace: 'pre-wrap',
                    overflowX: 'hidden',
                    fontWeight: 'bold',
                    fontStyle: 'italic',
                    letterSpacing: '0.5px',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
                    fontSize: '25px'
                }}>
                    Roket Coffee, milli teknoloji hedeflerimizin heyecanını, geleneksel kahve kültürümüzün sıcaklığıyla birleştiren modern bir buluşma noktasıdır. Burası, "ROKET" gibi hızla yükselen fikirlerin, "Kafe" gibi samimi bir ortamda demlenerek ülkemizin geleceğine ışık tuttuğu yerdir.

                    Roket Coffee'ye hoş geldiniz. Burada, hayaller göklere çıkar.
                    <br></br>
                    <br></br>
                    <br></br>
                    Roket Coffee'ye hoş geldiniz. Burada, hayaller göklere çıkar
                </pre>
            </div>
            <div id="iletisim" className="section">
                <h2>İletişim</h2>
                <ul>
                    <li>📧 roketkahve@roketsan.com.tr</li>
                    <li>📍 Ankara Elmadağ yerleşkesi</li>
                    <li>📞 +90 555 123 45 67</li>
                </ul>
                <Card />
            </div>
        </>
    );
};

export default IH;