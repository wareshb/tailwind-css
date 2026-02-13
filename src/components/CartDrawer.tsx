import React from 'react';
import { ShoppingBag, X, Plus, Minus, Trash2 } from 'lucide-react';

interface CartItem {
    id: number;
    title: string;
    price: number;
    image: string;
    quantity: number;
}

interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    items: CartItem[];
    onUpdateQuantity: (id: number, delta: number) => void;
    onRemove: (id: number) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({
    isOpen,
    onClose,
    items,
    onUpdateQuantity,
    onRemove
}) => {
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={onClose}
            />

            {/* Drawer */}
            <div
                className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-[101] shadow-2xl transition-transform duration-300 ease-in-out transform ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
                                <ShoppingBag className="w-6 h-6" />
                            </div>
                            <h2 className="text-xl font-black text-gray-900">Your Cart</h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <X className="w-6 h-6 text-gray-400" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex-grow overflow-y-auto p-6 space-y-6">
                        {items.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-center">
                                <div className="w-20 h-20 bg-gray-50 text-gray-300 rounded-full flex items-center justify-center mb-4">
                                    <ShoppingBag className="w-10 h-10" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">Cart is empty</h3>
                                <p className="text-gray-500">Looks like you haven't added anything yet.</p>
                                <button
                                    onClick={onClose}
                                    className="mt-6 text-indigo-600 font-bold hover:underline"
                                >
                                    Start Shopping
                                </button>
                            </div>
                        ) : (
                            items.map((item) => (
                                <div key={item.id} className="flex gap-4 group">
                                    <div className="w-24 h-24 bg-gray-50 rounded-2xl overflow-hidden p-3 flex-shrink-0">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-contain mix-blend-multiply"
                                        />
                                    </div>
                                    <div className="flex-grow">
                                        <div className="flex justify-between mb-1">
                                            <h4 className="font-bold text-gray-900 line-clamp-1">{item.title}</h4>
                                            <button
                                                onClick={() => onRemove(item.id)}
                                                className="text-gray-400 hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                        <p className="text-indigo-600 font-black text-lg mb-3">${item.price.toFixed(2)}</p>
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center bg-gray-50 rounded-xl px-2 py-1">
                                                <button
                                                    onClick={() => onUpdateQuantity(item.id, -1)}
                                                    className="p-1 hover:text-indigo-600 transition-colors disabled:opacity-30"
                                                    disabled={item.quantity <= 1}
                                                >
                                                    <Minus className="w-4 h-4" />
                                                </button>
                                                <span className="w-8 text-center font-bold text-gray-900">{item.quantity}</span>
                                                <button
                                                    onClick={() => onUpdateQuantity(item.id, 1)}
                                                    className="p-1 hover:text-indigo-600 transition-colors"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Footer */}
                    {items.length > 0 && (
                        <div className="p-6 border-t border-gray-100 bg-gray-50/50">
                            <div className="flex justify-between items-center mb-6">
                                <span className="text-gray-500 font-medium">Subtotal</span>
                                <span className="text-2xl font-black text-gray-900">${total.toFixed(2)}</span>
                            </div>
                            <button className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black text-lg hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 active:scale-[0.98]">
                                Proceed to Checkout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default CartDrawer;
