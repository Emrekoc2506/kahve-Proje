import React from 'react';
import '../css/magaza.css'

import Roket from '../image/Roket.png';
import { TbBackground } from 'react-icons/tb';

const Mağaza: React.FC = () => {
    return (
        <section className="section-container">
            <div className="section-image">
                <img src={Roket} alt="Mağazalar" />
            </div>
            <div className="section-content">
                <span className="subtitle"> ROKET CAFFEE</span>
                <h2 style={{ color: '#379243' }} className="title">BİZ KİMİZ</h2>
                <pre style={{
                    backgroundColor: '#f7f7f7',
                    color: '#444',
                    borderLeft: '4px solid #379243',
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
                    Türkiye'nin savunma sanayinde destan yazan bir ekip var. Onların her başarısı, ay yıldızlı bayrağımızın
                    göklerde daha yüksekte dalgalanması demek. Bu yolda, gece gündüz demeden, uykusuz gecelerde bile durmadan çalışan,
                    vatan sevdasıyla atan kalpler var. İşte Roketsan ailesi bu tutkuyla ilerliyor.
                    <br></br>
                    <br></br>
                    <br></br>
                    Peki, bu büyük vizyonu gerçeğe dönüştüren zihinlere, bu yorulmak bilmeyen ellere güç veren ne? Yanıt,
                    sadece bir içecekten çok daha fazlası: RoketCoffee. Biz, sadece bir kahve markası değiliz. Biz, milli savunmamızın
                    en kritik anlarında, en zorlu mühendislik problemlerinin çözüldüğü o toplantı masalarının vazgeçilmez bir
                    parçasıyız. RoketCoffee, sabaha kadar süren çalışmaların, yeni fikirlerin doğduğu anların, ekip ruhunun pekiştiği o
                    dostane sohbetlerin yakıtıdır. Her yudumunda, bir roketin havalanması için gereken odaklanma, yaratıcılık ve enerji
                    vardır.
                </pre>
            </div>
        </section>
    );
};

export default Mağaza;