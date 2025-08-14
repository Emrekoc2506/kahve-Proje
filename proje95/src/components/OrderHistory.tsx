// src/components/OrderHistory.tsx
/*import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, type Timestamp } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useAuth } from '../contest/AuthContext';

interface OrderItem {
    productName: string;
    price: number;
    quantity: number;
}

interface Order {
    orderId: string;
    items: OrderItem[];
    purchaseTime: Date | null;
    status: string;
    totalAmount: number;
}

const OrderHistory: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const { user } = useAuth(); // AuthContext'ten oturum açmış kullanıcıyı al

    useEffect(() => {
        const fetchOrders = async () => {
            if (!user) {
                // Kullanıcı yoksa hata mesajı göster ve yüklemeyi bitir
                setLoading(false);
                setError("Geçmiş siparişleri görüntülemek için oturum açmalısınız.");
                return;
            }

            try {
                // Sadece oturum açmış kullanıcının siparişlerini çeker
                const ordersRef = collection(db, 'users', user.uid, 'orders');
                const q = query(ordersRef, orderBy('purchaseTime', 'desc'));
                const querySnapshot = await getDocs(q);

                const fetchedOrders: Order[] = [];
                querySnapshot.forEach((doc) => {
                    const docData = doc.data();

                    const purchaseTimeTimestamp = docData.purchaseTime as Timestamp;
                    const purchaseDate = purchaseTimeTimestamp?.toDate() || null;

                    // Toplam tutarı hesapla
                    const total = (docData.items as OrderItem[] || []).reduce(
                        (sum, item) => sum + (item.price * item.quantity), 0
                    );

                    fetchedOrders.push({
                        orderId: doc.id,
                        items: (docData.items as OrderItem[]) || [],
                        purchaseTime: purchaseDate,
                        status: docData.status as string || 'Bilinmiyor',
                        totalAmount: total,
                    });
                });
                setOrders(fetchedOrders);
            } catch (err) {
                console.error("Siparişler çekilirken bir hata oluştu:", err);
                setError("Sipariş geçmişi yüklenemedi. Lütfen tekrar deneyin.");
            } finally {
                setLoading(false);
            }
        };

        // Kullanıcı bilgisi mevcutsa veriyi çek
        if (user) {
            fetchOrders();
        } else {
            setLoading(false);
            setError("Geçmiş siparişleri görüntülemek için lütfen giriş yapın.");
        }
    }, [user]); // user nesnesi değiştiğinde useEffect'i tekrar çalıştır

    if (loading) return <div style={{ padding: '20px' }}>Sipariş geçmişiniz yükleniyor...</div>;
    if (error) return <div style={{ padding: '20px' }}>Hata: {error}</div>;

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <h2>Sipariş Geçmişiniz</h2>
            {orders.length === 0 ? (
                <p>Henüz herhangi bir siparişiniz bulunmamaktadır.</p>
            ) : (
                orders.map((order, index) => (
                    <div key={order.orderId} style={{ border: '1px solid #ccc', padding: '15px', marginBottom: '20px', borderRadius: '8px' }}>
                        <p><strong>Sipariş Numarası:</strong> {order.orderId}</p>
                        <p><strong>Tarih:</strong> {order.purchaseTime ? order.purchaseTime.toLocaleString() : 'Bilinmiyor'}</p>
                        <p><strong>Durum:</strong> {order.status}</p>
                        <p><strong>Toplam Tutar:</strong> {order.totalAmount.toFixed(2)} TL</p>
                        <h4 style={{ marginTop: '10px' }}>Sipariş Detayları:</h4>
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

export default OrderHistory;*/