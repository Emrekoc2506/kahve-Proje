// src/orders.ts
import { db } from './firebase/firebase';
import { collection, addDoc, serverTimestamp, doc } from 'firebase/firestore';

interface OrderData {
    items: {
        productName: string;
        price: number;
        quantity: number;
    }[];
}

const addOrderToFirestore = async (userId: string, orderDetails: OrderData) => {
    try {
        const newOrder = {
            items: orderDetails.items,
            purchaseTime: serverTimestamp(),
            status: 'pending',
        };

        const userDocRef = doc(db, 'orders', userId);

        // 🎉 Hatanın düzeltildiği yer burası:
        // orders koleksiyon referansını, kullanıcının belgesi altında oluşturuyoruz.
        const ordersCollectionRef = collection(userDocRef, 'orders');

        await addDoc(ordersCollectionRef, newOrder);

        console.log('Sipariş başarıyla kaydedildi!');
        return true;
    } catch (error) {
        console.error('Sipariş kaydedilirken bir hata oluştu:', error);
        return false;
    }
};

export default addOrderToFirestore;