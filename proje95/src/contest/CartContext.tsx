

import { createContext, useState, useContext, useEffect } from 'react';
import type { ReactNode } from 'react';
import { auth } from '../firebase/firebase';
import { ref, set, onValue, off } from "firebase/database";
import { database } from "../firebase/firebase";

// Sepetimizdeki bir ürünün yapısı
interface CartItem {
    id: number;
    title: string;
    price: number;
    quantity: number;
    imageSrc: string;
}

// Sepet Context'inin tipi
interface CartContextType {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (itemId: number) => void;
    updateItemQuantity: (itemId: number, newQuantity: number) => void;
    clearCart: () => void;
    isCartLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isCartLoading, setIsCartLoading] = useState(true);

    const writeUserCartToDb = (updatedCart: CartItem[]) => {
        if (auth.currentUser) {
            const cartRef = ref(database, `ürünler/${auth.currentUser.uid}`);
            const dataToSave = updatedCart.reduce((acc, item) => {
                acc[item.id] = item;
                return acc;
            }, {} as Record<number, CartItem>);
            set(cartRef, dataToSave)
                .catch(error => {
                    console.error("Sepet kaydedilirken hata oluştu:", error);
                });
        }
    };

    const addToCart = (item: CartItem) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
            let newCart;

            if (existingItem) {
                newCart = prevCart.map(cartItem =>
                    cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
                );
            } else {
                newCart = [...prevCart, { ...item, quantity: 1 }];
            }
            writeUserCartToDb(newCart);
            return newCart;
        });
    };

    const removeFromCart = (itemId: number) => {
        setCart(prevCart => {
            const newCart = prevCart.filter(cartItem => cartItem.id !== itemId);
            writeUserCartToDb(newCart);
            return newCart;
        });
    };

    const updateItemQuantity = (itemId: number, newQuantity: number) => {
        setCart(prevCart => {
            let newCart;
            if (newQuantity <= 0) {
                newCart = prevCart.filter(cartItem => cartItem.id !== itemId);
            } else {
                newCart = prevCart.map(cartItem =>
                    cartItem.id === itemId ? { ...cartItem, quantity: newQuantity } : cartItem
                );
            }
            writeUserCartToDb(newCart);
            return newCart;
        });
    };

    const clearCart = () => {
        setCart([]);
        if (auth.currentUser) {
            set(ref(database, `ürünler/${auth.currentUser.uid}`), null);
        }
    };

    useEffect(() => {
        if (auth.currentUser) {
            const cartRef = ref(database, `ürünler/${auth.currentUser.uid}`);

            const cartListener = onValue(cartRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    const cartList = Object.keys(data).map(key => ({
                        ...data[key]
                    }));
                    setCart(cartList);
                } else {
                    setCart([]);
                }
                setIsCartLoading(false);
            });

            return () => {
                off(cartRef, 'value', cartListener);
            };
        } else {
            setCart([]);
            setIsCartLoading(false);
        }
    }, [auth.currentUser]);

    const value = {
        cart,
        addToCart,
        removeFromCart,
        updateItemQuantity,
        clearCart,
        isCartLoading
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart, CartProvider içinde kullanılmalıdır.');
    }
    return context;
};