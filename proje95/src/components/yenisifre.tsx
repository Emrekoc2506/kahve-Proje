/*import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa";
// Firebase ve local storage fonksiyonlarını import ediyoruz
import { auth } from '../firebase/firebase';
import { getAuth, updatePassword } from 'firebase/auth';

const YeniSifre: React.FC = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [data, setData] = useState({
        password: '',
        confirmPassword: ''
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;
        setData(prev => ({ ...prev, [id]: value }));
    };

    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError('');

        const { password, confirmPassword } = data;

        if (!password || !confirmPassword) {
            setError('Şifre alanları boş bırakılamaz');
            return;
        }

        if (password.length < 6) {
            setError('Şifre en az 6 karakter olmalı');
            return;
        }

        if (password !== confirmPassword) {
            setError('Şifreler eşleşmiyor');
            return;
        }

        // Firebase ile şifre güncelleme
        const user = auth.currentUser;
        if (user) {
            try {
                // Firebase'in updatePassword fonksiyonunu kullanarak şifreyi güncelliyoruz
                await updatePassword(user, password);

                // Şifre güncelleme başarılı olduğunda kullanıcıyı çıkışa zorlamak için local storage'ı temizliyoruz
                localStorage.removeItem('ACTIVE_USER');

                // Giriş sayfasına yönlendiriyoruz
                navigate('/login');
            } catch (err: any) {
                // Firebase hatalarını yakalama
                if (err.code === 'auth/requires-recent-login') {
                    setError('Şifre güncellemek için yakın zamanda giriş yapmanız gerekiyor. Lütfen tekrar giriş yapın.');
                } else {
                    setError('Şifre güncelleme sırasında bir hata oluştu: ' + err.message);
                }
            }
        } else {
            // Aktif kullanıcı yoksa hata göster
            setError('Aktif bir kullanıcı oturumu bulunamadı.');
            navigate('/login');
        }
    };

    return (
        <>
            <div className="background">
                <div className="shape"></div>
                <div className="shape"></div>
            </div>
            <form onSubmit={handleFormSubmit} className="login-form">
                <h3>Yeni Şifre Belirle</h3>

                <label>Yeni Şifre</label>
                <div style={{ position: 'relative' }}>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Yeni şifre"
                        id="password"
                        value={data.password}
                        onChange={handleInputChange}
                        style={{ paddingRight: '30px' }}
                    />
                    <span
                        onClick={() => setShowPassword(prev => !prev)}
                        style={{
                            position: 'absolute',
                            right: '8px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            cursor: 'pointer',
                            fontSize: '18px',
                            userSelect: 'none'
                        }}
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>

                <label>Yeni Şifre (Tekrar)</label>
                <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Şifreyi tekrar girin"
                    id="confirmPassword"
                    value={data.confirmPassword}
                    onChange={handleInputChange}
                />

                <button type="submit">Şifreyi Güncelle</button>
                {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
            </form>
        </>
    );
};

export default YeniSifre;*/