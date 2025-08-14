import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase/firebase';

interface UserModel {
    username: string;
}

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [error, setError] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [data, setData] = useState<UserModel>({
        username: ''
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;
        setData({ ...data, [id]: value });
    };

    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => { // Formu submit ettiğimizde çalışacak
        event.preventDefault(); // Sayfanın yeniden yüklenmesini engeller
        setError('');
        setMessage('');

        if (!data.username) {
            setError('Lütfen e-posta adresinizi girin.');
            return;
        }

        try {
            await sendPasswordResetEmail(auth, data.username);
            setMessage('Şifre sıfırlama bağlantısı e-posta adresinize gönderildi.');
            setData({ username: '' }); // E-posta gönderildikten sonra inputu temizleriz
        } catch (err: any) {
            switch (err.code) {
                case 'auth/invalid-email':
                    setError('Geçersiz e-posta formatı.');
                    break;
                case 'auth/user-not-found':
                    setError('Bu e-posta ile kayıtlı bir kullanıcı bulunamadı.');
                    break;
                default:
                    setError('Bir hata oluştu: ' + err.message);
                    break;
            }
        }
    };

    return (
        <>
            <div className="background">
                <div className="shape"></div>
                <div className="shape"></div>
            </div>
            {/* Form submit olduğunda handleFormSubmit çalışacak */}
            <form className="login-form" onSubmit={handleFormSubmit}>
                <h3>Şifremi Unuttum</h3>

                <label>E-Posta Giriniz</label>
                <input
                    type="text"
                    placeholder="Eposta"
                    id="username"
                    value={data.username}
                    onChange={handleInputChange}
                />

                {/* Buton artık formun submit'ini tetikleyecek */}
                <button type="submit">Devam Et</button>

                {message && <div style={{ color: 'green', marginTop: '10px' }}>{message}</div>}
                {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}

                <div className="social">
                    <Link to="/login">Giriş Ekranına Dön</Link>
                </div>
            </form>
        </>
    );
};

export default ForgotPassword;