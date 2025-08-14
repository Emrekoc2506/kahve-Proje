import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase';

interface UserModel {
    email: string;
    password: string;
}

const Login = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [data, setData] = useState<UserModel>({
        email: '',
        password: ''
    });

    const emailDomains = ['gmail.com', 'outlook.com', 'hotmail.com', 'yahoo.com'];
    const [emailSuggestions, setEmailSuggestions] = useState<string[]>([]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;

        if (id === 'email') {
            const [localPart, domainPart] = value.split('@');
            if (!domainPart) {
                setEmailSuggestions(emailDomains.map(domain => `${localPart}@${domain}`));
            } else {
                const filtered = emailDomains
                    .filter(domain => domain.startsWith(domainPart))
                    .map(domain => `${localPart}@${domain}`);
                setEmailSuggestions(filtered);
            }
        }//ilk benim yazdıgımı (localpart) yaz daha sonra @ koy daha sonra uzantı gelsin(domain)

        setData({ ...data, [id]: value });
        setError(''); // Hata mesajını temizle
    };

    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        // Formun varsayılan submit davranısı engelle(sayfa yenilenmesin)
        event.preventDefault();
        // Burada form verilerini işle!!
        setError('');

        if (!data.email || !data.password) {
            setError('E-posta ve şifre boş olamaz.');
            return;
        }

        try {
            await signInWithEmailAndPassword(auth, data.email, data.password);
            console.log("Giriş başarılı!");
            navigate('/sayfa');
        } catch (firebaseError: any) {
            console.error("Giriş hatası:", firebaseError.message);

            if (firebaseError.code === 'auth/invalid-email') {
                setError('Geçersiz e-posta adresi.');
            } else if (firebaseError.code === 'auth/user-not-found' || firebaseError.code === 'auth/wrong-password') {
                setError('Kullanıcı bulunamadı veya şifre yanlış.');
            } else {
                setError('Giriş başarısız oldu. Lütfen tekrar deneyin.');
            }
        }
    };

    return (
        <>
            <div className="background">
                <div className="shape"></div>
                <div className="shape"></div>
            </div>
            <form onSubmit={handleFormSubmit} className="login-form">
                <h3>Login Here</h3>

                <label htmlFor="email">Email</label>
                <input
                    type="text"
                    placeholder="Email"
                    id="email"
                    value={data.email}
                    onChange={handleInputChange}
                    list="email-suggestions"
                />
                <datalist id="email-suggestions">
                    {emailSuggestions.map(suggestion => (
                        <option key={suggestion} value={suggestion} />
                    ))}
                </datalist>

                <label htmlFor="password">Password</label>
                <div style={{ position: 'relative' }}>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Şifre"
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
                            top: '60%',
                            transform: 'translateY(-50%)',
                            cursor: 'pointer',
                            fontSize: '20px',
                            userSelect: 'none'
                        }}
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>

                <button type="submit">Login</button>
                {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}

                <div className="social">
                    <Link to="/register">Register</Link>
                </div>
                <div className='social'>
                    <Link to="/forgotpassword"> Şifremi Unuttum </Link>
                </div>
            </form>
        </>
    );
};

export default Login;