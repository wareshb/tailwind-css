import React from 'react';

interface ProductCardProps {
    product: {
        id: number;
        title: string;
        price: number;
        description: string;
        category: string;
        image: string;
        rating: {
            rate: number;
            count: number;
        };
    };
    onAddToCart: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
    return (
        <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group flex flex-col h-full">
            <div className="relative aspect-square p-6 overflow-hidden bg-gray-50 flex items-center justify-center">
                <img
                    src={product.image}
                    alt={product.title}
                    className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                    <span className="bg-indigo-600 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                        {product.category}
                    </span>
                </div>
            </div>

            <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-1 mb-2 text-yellow-400">
                    <span className="text-sm font-bold text-gray-700">{product.rating.rate}</span>
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-xs text-gray-400 ml-1">({product.rating.count})</span>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                    {product.title}
                </h3>

                <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-grow">
                    {product.description}
                </p>

                <div className="mt-auto flex items-center justify-between">
                    <span className="text-2xl font-black text-gray-900">
                        ${product.price.toFixed(2)}
                    </span>
                    <button
                        onClick={onAddToCart}
                        className="bg-gray-900 text-white p-2 px-4 rounded-xl hover:bg-indigo-600 transition-colors duration-300 font-semibold group-hover:shadow-lg"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
