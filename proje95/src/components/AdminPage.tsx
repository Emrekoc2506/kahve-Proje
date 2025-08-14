// src/components/AdminPage.tsx
import React, { useState, useEffect } from 'react';
import { collectionGroup, getDocs, query, type Timestamp } from 'firebase/firestore';
import { db } from '../firebase/firebase';

interface OrderItem {
    productName: string;
    price: number;
    quantity: number;
}

interface Order {
    userId: string;
    items: OrderItem[];
    purchaseTime: Date | null;
    status: string;
}

const AdminPage: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const ordersQuery = query(collectionGroup(db, 'orders'));
                const querySnapshot = await getDocs(ordersQuery);

                const fetchedOrders: Order[] = [];
                querySnapshot.forEach((doc) => {
                    const docData = doc.data();

                    // Her alanı ayrı ayrı kontrol ederek daha güvenli bir atama yapıyoruz
                    const purchaseTimeTimestamp = docData.purchaseTime as Timestamp;
                    const purchaseDate = purchaseTimeTimestamp ? purchaseTimeTimestamp.toDate() : null;

                    fetchedOrders.push({
                        userId: doc.ref.parent?.parent?.id || 'Bilinmiyor',
                        items: (docData.items as OrderItem[]) || [], // items yoksa boş dizi olarak atıyoruz
                        purchaseTime: purchaseDate,
                        status: docData.status as string || 'Bilinmiyor',
                    });
                });
                setOrders(fetchedOrders);
            } catch (err) {
                console.error("Siparişler çekilirken bir hata oluştu:", err);
                setError("Siparişleri çekemedi. Güvenlik kurallarını veya veritabanı yapısını kontrol edin.");
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) return <div>Siparişler yükleniyor...</div>;
    if (error) return <div>Hata: {error}</div>;

    return (
        <div>
            <h2>Yönetici Paneli - Tüm Siparişler</h2>
            {orders.length === 0 ? (
                <p>Henüz sipariş bulunmamaktadır.</p>
            ) : (
                orders.map((order, index) => (
                    <div key={index} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
                        <p><strong>Sipariş No:</strong> {index + 1}</p>
                        <p><strong>Kullanıcı ID:</strong> {order.userId}</p>
                        <p><strong>Zaman:</strong> {order.purchaseTime ? order.purchaseTime.toLocaleString() : 'Zaman bilgisi yok'}</p>
                        <p><strong>Durum:</strong> {order.status}</p>
                        <ul>
                            {order.items.map((item, itemIndex) => (
                                <li key={itemIndex}>
                                    {item.productName} - {item.quantity} adet x {item.price} TL
                                </li>
                            ))}
                        </ul>
                    </div>
                ))
            )}
        </div>
    );
};

export default AdminPage;