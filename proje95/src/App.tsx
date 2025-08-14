import { BrowserRouter, Routes, Route, Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut, type User } from 'firebase/auth';
import { auth } from './firebase/firebase';
import './css/header.css';
import './App.css';
import './css/button.css';
import './css/IH.css';
import './CartSidebar.css';

import { CiCoffeeCup } from "react-icons/ci";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";

import Header from './components/header';
import Sidebar from './components/sidebar';
import Login from './components/login';
import Register from './components/Register';
import CartSidebar from './components/CartSidebar';
import Button from './components/button'; // Sepete ekle butonu
import Odemeyap from './components/odemeyap'; // Satın al butonu
import Sayfa from './components/sayfa';
import { getCourses } from './data';
import Forgotpassword from './components/forgotpassword';
import UserList from './firebase/UserList';
import Profile from './components/Profile';
import IH from './components/IH';
import { useCart, CartProvider } from './contest/CartContext';
import type { Product } from './types/product';
import LoadingScreen from './components/loading'
import AdminRoute from './components/adminRoute';
import AdminPage from './components/AdminPage';

// 🔐 PrivateRoute - Firebase'den oturum durumunu alır ve yönlendirir.
const PrivateRoute = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

// 🏠 Home bileşeni - Düzeltilmiş Hali
const Home = ({ user }: { user: User | null }) => {
  const navigate = useNavigate();
  const [launching, setLaunching] = useState(false);
  const [courses, setCourses] = useState<Product[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);

  const { cart, addToCart } = useCart();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error("Çıkış yaparken bir hata oluştu:", error);
    }
  };

  const handleAccountClick = () => {
    if (!user) {
      navigate('/login');
    }
  };

  useEffect(() => {
    setIsLoadingData(true); // <<-- Veri yüklenmeye başlarken true yap
    const fetchCourses = async () => {
      const data = await getCourses();
      setCourses(data);
      setFilteredCourses(data);
      setIsLoadingData(false); // <<-- Veri yüklendiğinde false yap
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      const filtered = courses.filter(course => course.category === selectedCategory);
      setFilteredCourses(filtered);
    } else {
      setFilteredCourses(courses);
    }
  }, [selectedCategory, courses]);

  const handleClick = (targetId: string): void => {
    setLaunching(true);
    setTimeout(() => {
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
      setLaunching(false);
    }, 800);
  };

  const handleAddToCart = (product: Product) => {
    addToCart({ ...product, price: product.price || 0, quantity: 1, imageSrc: product.imageSrc || '' });
    setIsCartOpen(true);
  };
  // Eğer veri yükleniyorsa LoadingScreen'i göster
  if (isLoadingData) {
    return <LoadingScreen />;
  }

  return (
    <div>
      {/* 🔝 Header ve Navigasyon */}
      <div className='header' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className='title'><Header /></div>
        <div className='title' onClick={() => window.location.href = '/home'} style={{ cursor: 'pointer' }}>
          <div>Roket Coffee</div>
        </div>
        <div className='nav-menu' style={{ marginLeft: 'auto', display: 'flex', gap: '20px', padding: '0 40px' }}>
          {['Anasayfa', 'hakkinda', 'kahveler', 'iletisim'].map(section => (
            <div
              key={section}
              className={`nav-item ${launching ? 'launch' : ''}`}
              onClick={() => {
                if (section === 'Anasayfa') navigate('/sayfa');
                else handleClick(section);
              }}
            >
              <CiCoffeeCup /> {section.charAt(0).toUpperCase() + section.slice(1)}
            </div>
          ))}
          <div
            className="nav-item"
            onMouseEnter={() => setShowAccountMenu(true)}
            onMouseLeave={() => setShowAccountMenu(false)}
            onClick={handleAccountClick}
            style={{ position: 'relative', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <FaUserCircle style={{ fontSize: '18px' }} />
            <span className="nav-item">Hesap</span>
            {user && showAccountMenu && (
              <div
                className="dropdown-menu"
                style={{
                  color: 'white',
                  position: 'absolute',
                  top: '100%',
                  right: '0',
                  backgroundColor: 'rgba(170, 112, 21, 1)',
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
                    navigate('/Profile');
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
          <div className={`nav-item ${launching ? 'launch' : ''}`} onClick={() => setIsCartOpen(true)}>
            <FaShoppingCart /> Sepet ({cart.length})
          </div>
        </div>
      </div>

      {/* 🧭 Sidebar */}
      <Sidebar onCategorySelect={setSelectedCategory} />

      {/* ☕ Kahveler */}
      <div id="kahveler" className="course-list">
        {filteredCourses.map(course => (
          <div key={course.id} className="course-card">
            {course.imageSrc && <img src={course.imageSrc} alt={course.title} className="course-image" />}
            <h2>{course.title}</h2>
            <p>{course.description}</p>

            {/* Yeni CSS sınıfını buraya ekliyoruz */}
            <p className="price-text">
              {course.price}₺
            </p>

            <Button onClick={() => handleAddToCart(course)}>
              Sepete Ekle
            </Button>
          </div>
        ))}
      </div>


      {/* 📖 Hakkında */}
      <div><IH /></div>

      {/* 🛒 Sepet */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
      {isCartOpen && <div className="overlay" onClick={() => setIsCartOpen(false)}></div>}
    </div>
  );
};

// 🚀 Ana App
function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route path="/" element={user ? <Sayfa /> : <Navigate to="/login" />} />
          <Route path="/login" element={user ? <Navigate to="/sayfa" /> : <Login />} />
          <Route path="/register" element={user ? <Navigate to="/sayfa" /> : <Register />} />
          <Route path="/forgotpassword" element={<Forgotpassword />} />
          <Route element={<PrivateRoute />}>
            <Route element={<AdminRoute />}>
              <Route path="/admin" element={<AdminPage />} />
            </Route>
            <Route path="/sayfa" element={<Sayfa />} />
            <Route path="/home" element={<Home user={user} />} />
            <Route path="/userlist" element={<UserList />} />
            <Route path="/Profile" element={<Profile />} />
          </Route>
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;