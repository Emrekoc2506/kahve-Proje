import React from 'react';
import '../css/magaza.css'
import menu2 from '../image/menu.png'

const Menu: React.FC = () => {
    return (
        <section className="section-container ">
            <div className="section-content">
                < span className="subtitle" > ROKET CAFFEE </ span>
                <h2 style={{ color: '#379243' }} className="title">NEDEN ROKETCOFFEE</h2>
                <pre style={{
                    backgroundColor: '#f7f7f7',
                    color: '#444',

                    borderRight: '4px solid #379243',
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
                    fontSize: '20px'
                }}>
                    Kahve sadece bir içecek değil, aynı zamanda dostluğun, muhabbetin ve yeni fikirlerin filizlendiği bir kültür mirasıdır. ROKETKAFE olarak biz, bu asırlık geleneği, milletimizin uzaydaki ve teknolojideki iddialı hedefleriyle birleştiriyoruz.
                    <br></br>
                    <br></br>
                    "ROKET", sadece bir makine değil, gökyüzüne uzanan milli bir iradenin, yerli ve milli teknolojinin sembolüdür. "KAFE" ise, bu büyük hayallerin, yepyeni projelerin ve ülkemizi ileriye taşıyacak genç dimağların buluştuğu sıcak bir yuva.
                    <br></br>
                    <br></br>
                    Roket Coffee'de içilen her yudum kahve, kalbi vatan sevgisiyle dolu, aklı bilimle parlayan bir neslin geleceğe olan inancını pekiştirir. Burası, şanlı tarihimizden aldığımız ilhamla, geleceğe roket hızıyla ilerleyeceğimiz bir duraktır.
                    <br></br>
                    <br></br>
                    Roket Coffee'ye hoş geldiniz. Burada sadece kahve içilmez, burada Türkiye'nin geleceği için fikirler üretilir, dostluklar pekişir ve her damlasında milli bir gurur hissedilir.
                </pre>
            </div >
            <div className="section-image">
                <img src={menu2} alt="menu" />
            </div>
        </section >
    );
};

export default Menu;