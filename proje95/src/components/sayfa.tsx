import React, { useState, useEffect } from 'react';
import Header from './header';
import Sidebar from './sidebar.tsx';
import { CiCoffeeCup } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import type { Course } from '../data';
import { getCourses } from '../data';
import Billboard from './Billboard';
import BillboardImage from '../image/Billboard.jpg';
import Magaza from './Magaza.tsx';
import Menu from './Menu.tsx';
import { onAuthStateChanged, signOut, type User } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { FaUserCircle } from "react-icons/fa";
import IH from './IH.tsx';

const Sayfa = () => {
    const [launching, setLaunching] = useState(false);
    const navigate = useNavigate();
    const [courses, setCourses] = useState<Course[]>([]);
    const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [user, setUser] = useState<User | null>(null);
    const [showAccountMenu, setShowAccountMenu] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const fetchCourses = async () => {
            const data = await getCourses();
            setCourses(data);
            setFilteredCourses(data);
        };
        fetchCourses();
    }, []);

    useEffect(() => {
        if (selectedCategory) {
            setFilteredCourses(courses.filter(c => c.category === selectedCategory));
        } else {
            setFilteredCourses(courses);
        }
    }, [selectedCategory, courses]);

    const handleClick = (targetId: string) => {
        setLaunching(true);
        setTimeout(() => {
            const target = document.getElementById(targetId);
            if (target) target.scrollIntoView({ behavior: 'smooth' });
            setLaunching(false);
        }, 800);
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/login');
        } catch (error) {
            console.error("Çıkış yapma hatası:", error);
        }
    };

    const handleAccountClick = () => {
        if (!user) {
            navigate('/login');
        }
    };

    return (
        <div>
            {/* Sadece header kısmında değişiklik yapıldı */}
            <div className='header' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className='title'><Header /></div>
                <div className='title' onClick={() => window.location.href = '/sayfa'} style={{ cursor: 'pointer' }}>
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

                    {/* "Hesap" Menüsü */}
                    <div
                        className="nav-item"
                        onMouseEnter={() => setShowAccountMenu(true)}
                        onMouseLeave={() => setShowAccountMenu(false)}
                        onClick={handleAccountClick}
                        style={{ position: 'relative', cursor: 'pointer' }}
                    >
                        <div
                        >
                            <FaUserCircle style={{ fontSize: '18px', marginRight: '8px' }} />
                            <span className="nav-item">Hesap</span>
                        </div>

                        {user && showAccountMenu && (
                            <div
                                className="dropdown-menu"
                                style={{
                                    color: 'white',
                                    position: 'absolute',
                                    top: '100%',
                                    right: '0',
                                    backgroundColor: '#aa7015',
                                    border: '1px solid #ccc',
                                    borderRadius: '5px',
                                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                                    zIndex: 1000,
                                    minWidth: '150px'
                                }}
                            >
                                <div
                                    className="dropdown-item"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        navigate('/profile ');
                                        setShowAccountMenu(false);
                                    }}
                                    style={{ padding: '10px 20px', cursor: 'pointer', borderBottom: '1px solid #eee' }}
                                >
                                    Hesap Ayarları
                                </div>
                                <div
                                    className="dropdown-item"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleLogout();
                                        setShowAccountMenu(false);
                                    }}
                                    style={{ padding: '10px 20px', cursor: 'pointer' }}
                                >
                                    Çıkış Yap
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Billboard
                imageUrl={BillboardImage}
                title="Günlük Kahve Keyfiniz İçin"
                subtitle="En taze ve lezzetli kahve çekirdeklerini keşfedin."
                buttonText="Hemen İncele"
                onButtonClick={() => {

                    navigate('/home');
                }}

            />

            <div><Magaza /></div>
            <div><Menu /></div>
            <div><IH /></div>

        </div>
    );
};

export default Sayfa;