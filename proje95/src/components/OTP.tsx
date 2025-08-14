/*import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const OTP = () => {
    const navigate = useNavigate();
    const [otp, setOtp] = useState<string[]>(['', '', '', '']);
    const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

    const handleChange = (index: number, value: string) => {
        if (!/^\d?$/.test(value)) return; // Sadece rakam ve boşluk

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Otomatik sonraki inputa geç
        if (value && inputsRef.current[index + 1]) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !otp[index] && inputsRef.current[index - 1]) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const code = otp.join('');
        console.log('Girilen OTP:', code);

        // Burada OTP doğrulama işlemi yapılabilir
        navigate('/yenisifre'); // örnek yönlendirme
    };

    const handleResend = () => {
        console.log('Kod yeniden gönderildi');
        // Burada yeniden gönderme işlemi yapılabilir
    };

    return (
        <>
            <div className="background">
                <div className="shape"></div>
                <div className="shape"></div>
            </div>
            <form className="login-form" onSubmit={handleSubmit}>
                <h3>Doğrulama Kodu</h3>
                <p style={{ textAlign: 'center', marginBottom: '20px' }}>
                    Epostanıza bir doğrulama kodu gönderdik
                </p>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength={1}
                            className="otp-input"
                            value={digit}
                            onChange={(e) => handleChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            ref={(el) => (inputsRef.current[index] = el)}
                            required
                        />
                    ))}
                </div>

                <button type="submit">Doğrula</button>
                <div className='social'>
                    <Link to="/forgotpassword">Kod gelmedi</Link>
                </div>
            </form>
        </>
    );
};

export default OTP;*/
