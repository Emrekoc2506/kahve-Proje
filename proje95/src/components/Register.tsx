import { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase/firebase'; // Firestore için db import edildi
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore'; // Firestore fonksiyonları import edildi

interface usermodel {
    username: string;
    Email: string;
    password: string;
}

const Register = () => {
    const [data, setData] = useState<usermodel>({
        username: '',
        Email: '',
        password: ''
    });

    const [message, setMessage] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const navigate = useNavigate();

    const emailDomains = ['gmail.com', 'outlook.com', 'hotmail.com', 'yahoo.com'];
    const [emailSuggestions, setEmailSuggestions] = useState<string[]>([]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const id = event.target.id;
        const value = event.target.value;

        if (id === 'Email') {
            const [localPart, domainPart] = value.split('@');
            if (!domainPart) {
                setEmailSuggestions(emailDomains.map(domain => `${localPart}@${domain}`));
            } else {
                const filtered = emailDomains
                    .filter(domain => domain.startsWith(domainPart))
                    .map(domain => `${localPart}@${domain}`);
                setEmailSuggestions(filtered);
            }
        }

        setData({ ...data, [id]: value });
        setMessage('');
    };

    const handleEmailSuggestionClick = (suggestedEmail: string) => {
        setData({ ...data, Email: suggestedEmail });
        setEmailSuggestions([]);
    };

    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError('');

        // 1. Koşul: Her yeri doldur
        if (data.username === '' || data.Email === '' || data.password === '') {
            setError('Her alanı doldurmak zorunludur.');
            return;
        }

        // 2. Koşul: Geçerli e-posta formatı
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.Email)) {
            setError('Geçersiz e-posta formatı.');
            return;
        }

        // 3. Koşul: Şifre uzunluğu ve karmaşıklığı
        if (data.password.length < 6) {
            setError('Şifre en az 6 karakter olmalıdır.');
            return;
        }
        if (!/[A-Z]/.test(data.password)) {
            setError('Şifre en az bir büyük harf içermelidir.');
            return;
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(data.password)) {
            setError('Şifre en az bir özel karakter (noktalama işareti) içermelidir.');
            return;
        }

        // 4. Koşul: Kullanıcı adı (username) zaten kayıtlı mı kontrolü
        try {
            const usersRef = collection(db, 'users');
            const q = query(usersRef, where('username', '==', data.username));
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                setError('Bu kullanıcı adı zaten alınmış.');
                return;
            }
        } catch (dbError) {
            console.error("Firestore sorgu hatası:", dbError);
            setError('Kullanıcı adı kontrolünde bir sorun oluştu.');
            return;
        }

        try {
            // 5. Firebase Auth ile kullanıcı kaydetme işlemi
            const userCredential = await createUserWithEmailAndPassword(auth, data.Email, data.password);

            // 6. Firestore'a kullanıcı bilgilerini ekleme
            await addDoc(collection(db, 'users'), {
                uid: userCredential.user.uid,
                username: data.username,
                email: data.Email,
                createdAt: new Date()
            });

            setMessage('Kayıt başarılı, giriş sayfasına yönlendiriliyorsunuz.');

            // Başarılı kayıt sonrası yönlendirme
            setTimeout(() => {
                navigate('/login');
            }, 2000);

            // Form alanlarını temizleme
            setData({ username: '', Email: '', password: '' });

        } catch (err: any) {
            // 7. Firebase Auth'dan gelen hataları yakalama
            switch (err.code) {
                case 'auth/email-already-in-use':
                    setError('Bu e-posta adresi zaten kullanımda.');
                    break;
                case 'auth/invalid-email':
                    setError('Geçersiz e-posta formatı.');
                    break;
                case 'auth/weak-password':
                    setError('Şifre en az 6 karakter olmalıdır.');
                    break;
                default:
                    setError(err.message);
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
            <form onSubmit={handleFormSubmit}>
                <h3>Register Here</h3>

                <label>Username</label>
                <input
                    type="text"
                    placeholder="Kullanıcı adı"
                    id="username"
                    value={data.username}
                    onChange={handleInputChange}
                />

                <label>Email</label>
                <input
                    type="text"
                    placeholder="Email"
                    id="Email"
                    value={data.Email}
                    onChange={handleInputChange}
                    autoComplete="off"
                />

                {emailSuggestions.length > 0 && (
                    <ul style={{
                        listStyleType: 'none',
                        padding: '0',
                        margin: '5px 0',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        backgroundColor: '#ff0d1b2a'
                    }}>
                        {emailSuggestions.map((suggestion, index) => (
                            <li
                                key={index}
                                onClick={() => handleEmailSuggestionClick(suggestion)}
                                style={{
                                    padding: '8px',
                                    cursor: 'pointer',
                                    borderBottom: index !== emailSuggestions.length - 1 ? '1px solid #eee' : 'none'
                                }}
                            >
                                {suggestion}
                            </li>
                        ))}
                    </ul>
                )}

                <label>Password</label>
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

                <button type="submit">Register</button>
                {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}

                <div className="social">
                    {message && <p>{message}</p>}
                    <Link to="/login">Login</Link>
                </div>
            </form>
        </>
    );
};

export default Register;