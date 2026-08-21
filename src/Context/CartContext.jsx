import {
    createContext,
    useState,
    useEffect,
    useMemo,
    useContext,
} from "react";

const CartContext = createContext();

export function CartProvider({ children }) {

    // LOAD CART FROM LOCAL STORAGE
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem("cart");

        return savedCart ? JSON.parse(savedCart) : [];
    });

    // SAVE CART
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartItems));
    }, [cartItems]);

    // ADD TO CART
    const addToCart = (product) => {
        if (!product) return;

        setCartItems((prev) => {

            const existingItem = prev.find(
                (item) => item.id === product.id
            );

            // IF PRODUCT EXISTS
            if (existingItem) {
                return prev.map((item) =>
                    item.id === product.id
                        ? {
                            ...item,
                            quantity: item.quantity + 1,
                        }
                        : item
                );
            }

            // NEW PRODUCT
            return [
                ...prev,
                {
                    ...product,
                    quantity: 1,
                },
            ];
        });
    };

    // UPDATE QUANTITY
    const updateQuantity = (id, change) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === id
                    ? {
                        ...item,
                        quantity: Math.max(
                            1,
                            item.quantity + change

                        ),
                    }
                    : item
            )
        );
    };

    // REMOVE ITEM
    const removeFromCart = (id) => {
        setCartItems((prev) =>
            prev.filter((item) => item.id !== id)
        );
    };

    // CLEAR CART
    const clearCart = () => {
        setCartItems([]);
    };

    // TOTAL CART ITEMS
    const cartCount = useMemo(() => {
        return cartItems.reduce(
            (total, item) => total + item.quantity,
            0
        );
    }, [cartItems]);

    // TOTAL PRICE
    const cartTotal = useMemo(() => {
        return cartItems.reduce(
            (total, item) =>
                total + Number(item.price) * item.quantity,
            0
        );
    }, [cartItems]);

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                updateQuantity,
                removeFromCart,
                clearCart,
                cartCount,
                cartTotal,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

// CUSTOM HOOK
export function useCart() {
    return useContext(CartContext);
}