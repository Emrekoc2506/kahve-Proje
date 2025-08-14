// src/components/AdminRoute.tsx
import { useState, useEffect } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { auth, db } from '../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Navigate, Outlet } from 'react-router-dom';
import LoadingScreen from './loading';

const AdminRoute = () => {
    const [user, setUser] = useState<User | null>(null);
    const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            console.log("AuthState changed. Current user:", currentUser); // 🎉 1. Kontrol
            setUser(currentUser);

            if (currentUser) {
                try {
                    const userDocRef = doc(db, 'users', currentUser.uid);
                    const userDoc = await getDoc(userDocRef);

                    console.log("User document exists:", userDoc.exists()); // 🎉 2. Kontrol

                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        console.log("User data from Firestore:", userData); // 🎉 3. Kontrol
                        console.log("isAdmin value:", userData.isAdmin); // 🎉 4. Kontrol

                        setIsAdmin(userData.isAdmin === true);
                    } else {
                        console.error("Firestore'da kullanıcı belgesi bulunamadı.");
                        setIsAdmin(false);
                    }
                } catch (error) {
                    console.error("Firestore'dan veri çekerken hata oluştu:", error); // 🎉 Hata durumunu yakala
                    setIsAdmin(false);
                }
            } else {
                setIsAdmin(false);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return <LoadingScreen />;
    }

    if (!user || !isAdmin) {
        alert("Bu sayfaya erişim yetkiniz yoktur!");
        return <Navigate to="/sayfa" />;
    }

    return <Outlet />;
};

export default AdminRoute;