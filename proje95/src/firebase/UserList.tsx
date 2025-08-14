
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore'; // Firestore fonksiyonlarını içe aktarın
import { db } from './firebase'; // Az önce oluşturduğumuz db objesini içe aktarın

interface User {
    id: string;
    name: string;
    email: string;
    // Diğer kullanıcı özellikleri
}

const UserList: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersCollectionRef = collection(db, 'users'); // 'users' koleksiyonuna referans alın
                const querySnapshot = await getDocs(usersCollectionRef); // Dokümanları getirin

                const usersData: User[] = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data() as Omit<User, 'id'> // id hariç diğer verileri alın
                }));
                setUsers(usersData);
            } catch (err) {
                console.error("Kullanıcılar çekilirken hata oluştu:", err);
                setError("Kullanıcılar yüklenemedi.");
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []); // Bileşen ilk yüklendiğinde bir kez çalıştır

    if (loading) {
        return <div>Kullanıcılar yükleniyor...</div>;
    }

    if (error) {
        return <div>Hata: {error}</div>;
    }

    return (
        <div>
            <h1>Kullanıcı Listesi</h1>
            {users.length === 0 ? (
                <p>Henüz hiç kullanıcı yok.</p>
            ) : (
                <ul>
                    {users.map(user => (
                        <li key={user.id}>
                            {user.name} ({user.email})
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default UserList;
