import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateEmail, updatePassword, signOut, onAuthStateChanged, type User, reauthenticateWithCredential, EmailAuthProvider, verifyBeforeUpdateEmail } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { CiCoffeeCup } from "react-icons/ci";
import Header from './header';
import LoadingScreen from './loading';
import IH from './IH';

const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [error, setError] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    const [launching,] = useState<boolean>(false);
    const handleClick = (section: string) => {
        const element = document.getElementById(section);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                setNewEmail(currentUser.email || '');
            } else {
                navigate('/login');
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, [navigate]);

    const reauthenticateUser = async () => {
        console.log("reauthenticateUser çalıştırıldı.");
        if (!user || !currentPassword) {
            setError('Şifre alanı boş bırakılamaz.');
            console.log("Hata: Mevcut şifre veya kullanıcı boş.");
            return false;
        }

        const credential = EmailAuthProvider.credential(user.email!, currentPassword);
        try {
            await reauthenticateWithCredential(user, credential);
            setCurrentPassword('');
            console.log("Yeniden kimlik doğrulama başarılı!");
            return true;
        } catch (err: any) {
            console.error("Yeniden kimlik doğrulama hatası:", err);
            if (err.code === 'auth/wrong-password') {
                setError('Hatalı mevcut şifre.');
            } else {
                setError('Yeniden kimlik doğrulama hatası: ' + err.message);
            }
            return false;
        }
    };

    const handleUpdateEmail = async () => {
        setError('');
        setMessage('');

        console.log("handleUpdateEmail çalıştırıldı.");

        if (!newEmail) {
            setError('E-posta alanı boş bırakılamaz.');
            return;
        }
        if (user && newEmail === user.email) {
            setError('Yeni e-posta adresi, mevcut e-posta adresiyle aynı olamaz.');
            return;
        }

        const reauthenticated = await reauthenticateUser();

        console.log("reauthenticated değeri:", reauthenticated);

        if (!reauthenticated) {
            console.log("Yeniden kimlik doğrulama başarısız olduğu için işlem durduruldu.");
            return;
        }

        console.log("Yeniden kimlik doğrulama başarılı, e-posta güncelleme başlatılıyor.");

        try {
            if (user) {
                await verifyBeforeUpdateEmail(user, newEmail);
                setMessage('Yeni e-posta adresinize bir doğrulama e-postası gönderildi. Lütfen e-postanızı kontrol edin ve linke tıklayın.');
                setNewEmail('');
            }
        } catch (err: any) {
            console.error("E-posta güncelleme hatası:", err);
            setError('E-posta güncelleme hatası: ' + err.message);
        }
    };

    const handleUpdatePassword = async () => {
        setError('');
        setMessage('');

        if (!newPassword || !confirmPassword) {
            setError('Şifre alanları boş bırakılamaz.');
            return;
        }
        if (newPassword !== confirmPassword) {
            setError('Şifreler eşleşmiyor.');
            return;
        }

        if (newPassword.length < 6) {
            setError('Şifre en az 6 karakter olmalıdır.');
            return;
        }
        if (!/[A-Z]/.test(newPassword)) {
            setError('Şifre en az bir büyük harf içermelidir.');
            return;
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(newPassword)) {
            setError('Şifre en az bir özel karakter (noktalama işareti) içermelidir.');
            return;
        }

        const reauthenticated = await reauthenticateUser();
        if (!reauthenticated) {
            return;
        }

        try {
            if (user) {
                await updatePassword(user, newPassword);
                setMessage('Şifre başarıyla güncellendi. Güvenlik nedeniyle lütfen tekrar giriş yapın.');

                await signOut(auth);
                navigate('/login');
            }
        } catch (err: any) {
            setError('Şifre güncelleme hatası: ' + err.message);
        }
    };

    if (loading) {
        return <LoadingScreen />;
    }

    return (
        <div>
            <div className='header' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className='title'><Header /></div>
                <div className='title' onClick={() => navigate('/sayfa')} style={{ cursor: 'pointer' }}>
                    <div>Roket Coffee</div>
                </div>
                <div className='nav-menu' style={{ marginLeft: 'auto', display: 'flex', gap: '20px', padding: '0 90px' }}>
                    {['Menü', 'hakkinda', 'iletisim'].map(section => (
                        <div key={section} className={`nav-item ${launching ? 'launch' : ''}`} onClick={() => {
                            if (section === 'Menü') {
                                navigate('/home');
                            } else {
                                handleClick(section);
                            }
                        }}>
                            <CiCoffeeCup /> {section.charAt(0).toUpperCase() + section.slice(1)}
                        </div>
                    ))}
                </div>
            </div>

            <div className="profile-content">
                <h2 style={{ textAlign: 'center' }}>Profil Bilgileri</h2>
                {message && <div style={{ color: 'green', marginTop: '10px', textAlign: 'center' }}>{message}</div>}
                {error && <div style={{ color: 'red', marginTop: '10px', textAlign: 'center' }}>{error}</div>}

                <div style={{ maxWidth: '400px', margin: '20px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
                    <h3>E-posta Adresini Güncelle</h3>
                    <label style={{ display: 'block', marginBottom: '5px' }}> Yeni E-Posta </label>
                    <input
                        type="email"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        style={{ width: 'calc(100% - 22px)', padding: '10px', marginBottom: '10px' }}
                    />
                    <label style={{ display: 'block', marginBottom: '5px' }}>Mevcut Şifreniz</label>
                    <div style={{ position: 'relative', marginBottom: '10px' }}>
                        <input
                            type={showCurrentPassword ? 'text' : 'password'}
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            style={{ width: 'calc(100% - 22px)', padding: '10px' }}
                        />
                        <span
                            onClick={() => setShowCurrentPassword(prev => !prev)}
                            style={{
                                color: "#aa7015",
                                position: 'absolute',
                                right: '30px',
                                top: '50%',
                                transform: 'translateY(-20%)',
                                cursor: 'pointer',
                                fontSize: '18px',
                                userSelect: 'none'
                            }}
                        >
                            {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                    <button onClick={handleUpdateEmail} style={{ width: '100%', padding: '10px', backgroundColor: '#aa7015', color: '#fff' }}>E-postayı Güncelle</button>
                </div>

                <div style={{ maxWidth: '400px', margin: '20px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
                    <h3>Şifremi Değiştir</h3>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Mevcut Şifreniz</label>
                    <div style={{ position: 'relative', marginBottom: '10px' }}>
                        <input
                            type={showCurrentPassword ? 'text' : 'password'}
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            placeholder="Mevcut Şifrenizi girin"
                            style={{ width: 'calc(100% - 22px)', padding: '10px' }}
                        />
                        <span
                            onClick={() => setShowCurrentPassword(prev => !prev)}
                            style={{
                                color: "#aa7015",
                                position: 'absolute',
                                right: '30px',
                                top: '50%',
                                transform: 'translateY(-20%)',
                                cursor: 'pointer',
                                fontSize: '18px',
                                userSelect: 'none'
                            }}
                        >
                            {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Yeni Şifre</label>
                    <div style={{ position: 'relative', marginBottom: '10px' }}>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Yeni Şifre"
                            style={{ width: 'calc(100% - 22px)', padding: '10px' }}
                        />
                        <span
                            onClick={() => setShowPassword(prev => !prev)}
                            style={{
                                color: "#aa7015",
                                position: 'absolute',
                                right: '30px',
                                top: '50%',
                                transform: 'translateY(-20%)',
                                cursor: 'pointer',
                                fontSize: '18px',
                                userSelect: 'none'
                            }}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Yeni Şifre (Tekrar)</label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Şifreyi tekrar girin"
                        style={{ width: 'calc(100% - 22px)', padding: '10px', marginBottom: '10px' }}
                    />
                    <button onClick={handleUpdatePassword} style={{ width: '100%', padding: '10px', backgroundColor: '#aa7015', color: '#fff' }}>Şifreni güncelle</button>
                </div>
            </div>

            <IH />
        </div>
    );
};

export default Profile;
