import { useCart } from "../context/CartContext";
import { useState } from "react";
import { FiShoppingCart } from "react-icons/fi";

function AddToCart({ product }) {
    const { addToCart } = useCart();
    const [added, setAdded] = useState(false);

    function handleAdd() {
        addToCart(product);
        setAdded(true);

        setTimeout(() => setAdded(false), 1200);
    }

    return (
        <button
            onClick={handleAdd}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-white transition ${added ? "bg-gray-600 " : "bg-orange-500 hover:bg-gray-600 cursor-pointer"
                }`}
        >

            {added ? "Added" : "Add to Cart"}
        </button>
    );
}

export default AddToCart;