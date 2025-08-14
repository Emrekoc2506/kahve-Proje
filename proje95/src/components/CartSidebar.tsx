// src/components/CartSidebar.tsx
import React from 'react';
import { useCart } from '../contest/CartContext';
import { auth } from '../firebase/firebase';
import addOrderToFirestore from '../orders';
import CopKutusu from './copkutusu';
import Kapat from './kapat';
import Odemeyap from './odemeyap';
import { FaPlus, FaMinus } from 'react-icons/fa'; // Yeni ikonları ekliyoruz
import '../CartSidebar.css';

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

const CartSidebar: React.FC<Props> = ({ isOpen, onClose }) => {
    const { cart, removeFromCart, updateItemQuantity, clearCart, isCartLoading } = useCart();

    const total = cart.reduce(
        (acc: number, item) => acc + (item.price ?? 0) * item.quantity,
        0
    );

    const handleCheckout = async () => {
        const user = auth.currentUser;

        if (!user) {
            alert('Sipariş vermek için lütfen giriş yapın.');
            return;
        }

        if (cart.length === 0) {
            alert('Sepetiniz boş. Lütfen ürün ekleyin.');
            return;
        }

        try {
            const orderData = cart.map(item => ({
                productName: item.title,
                price: item.price,
                quantity: item.quantity,
            }));

            await addOrderToFirestore(user.uid, { items: orderData });

            alert('Siparişiniz başarıyla alındı!');
            clearCart();
            onClose();

        } catch (error) {
            console.error("Sipariş verisi kaydedilirken bir hata oluştu:", error);
            alert('Siparişinizi oluştururken bir hata oluştu. Lütfen tekrar deneyin.');
        }
    };

    return (
        <div className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
            <div className="cart-header">
                <h3>Sepetiniz ({cart.length})</h3>
                <Kapat className="close-btn" onClick={onClose} />
            </div>
            <div className="cart-items">
                {isCartLoading ? (
                    <p>Sepet yükleniyor...</p>
                ) : cart.length === 0 ? (
                    <p>Sepetinizde ürün bulunmamaktadır.</p>
                ) : (
                    cart.map(item => (
                        <div key={item.id} className="cart-item">
                            <img src={item.imageSrc} alt={item.title} />
                            <div className="item-details">
                                <h4>{item.title}</h4>
                                {/* 🔽 Miktar kontrolleri ve fiyatı güncelledik 🔽 */}
                                <div className="item-quantity-price">
                                    <div className="quantity-controls">
                                        <button
                                            onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                                            className="quantity-btn"
                                        >
                                            <FaMinus />
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button
                                            onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                                            className="quantity-btn"
                                        >
                                            <FaPlus />
                                        </button>
                                    </div>
                                    <p>₺{item.price * item.quantity}</p>
                                </div>
                            </div>
                            <CopKutusu onClick={() => removeFromCart(item.id)} />
                        </div>
                    ))
                )}
            </div>
            <div className="cart-footer">
                <h4>Toplam: ₺{total.toFixed(2)}</h4>
                {cart.length > 0 && (
                    <Odemeyap onClick={handleCheckout}>
                        Satın Al
                    </Odemeyap>
                )}
            </div>
        </div>
    );
};

export default CartSidebar;