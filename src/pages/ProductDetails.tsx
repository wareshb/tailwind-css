import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ShoppingCart, ArrowLeft } from 'lucide-react';
import ProductCard from '../components/ProductCard';

interface Product {
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
}

interface ProductDetailsProps {
    products: Product[];
    onAddToCart: (product: Product) => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ products, onAddToCart }) => {
    const { id } = useParams<{ id: string }>();
    const product = products.find(p => p.id === Number(id));

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!product) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-4">
                <div className="w-20 h-20 bg-gray-50 text-gray-300 rounded-full flex items-center justify-center mb-4">
                    <ShoppingCart className="w-10 h-10" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Product not found</h2>
                <p className="text-gray-500 mb-6">The product you are looking for doesn't exist or has been removed.</p>
                <Link to="/" className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
                    Back to Shop
                </Link>
            </div>
        );
    }

    const relatedProducts = products
        .filter(p => p.category === product.category && p.id !== product.id)
        .slice(0, 4);

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 md:py-16">
            {/* Breadcrumbs / Back Link */}
            <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-indigo-600 font-bold mb-8 transition-colors">
                <ArrowLeft className="w-5 h-5" />
                Back to Shop
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-24">
                {/* Image Section */}
                <div className="bg-white rounded-3xl p-8 md:p-12 flex items-center justify-center shadow-sm border border-gray-100">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="max-h-[500px] w-full object-contain mix-blend-multiply"
                    />
                </div>

                {/* Info Section */}
                <div className="flex flex-col justify-center">
                    <div className="inline-flex items-center px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-sm font-bold w-fit mb-6 uppercase tracking-wider">
                        {product.category}
                    </div>

                    <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 leading-tight">
                        {product.title}
                    </h1>

                    <div className="flex items-center gap-4 mb-8">
                        <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-lg">
                            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                            <span className="font-black text-yellow-700">{product.rating.rate}</span>
                        </div>
                        <span className="text-gray-400 font-medium">({product.rating.count} reviews)</span>
                    </div>

                    <div className="text-4xl font-black text-gray-900 mb-8">
                        ${product.price.toFixed(2)}
                    </div>

                    <p className="text-gray-500 text-lg leading-relaxed mb-10 border-l-4 border-indigo-100 pl-6">
                        {product.description}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <button
                            onClick={() => onAddToCart(product)}
                            className="flex-grow bg-indigo-600 text-white py-4 px-8 rounded-2xl font-black text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 active:scale-[0.98] flex items-center justify-center gap-3"
                        >
                            <ShoppingCart className="w-6 h-6" />
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>

            {/* Related Products Section */}
            {relatedProducts.length > 0 && (
                <div className="border-t border-gray-100 pt-24">
                    <div className="flex items-center justify-between mb-12">
                        <h2 className="text-3xl font-black text-gray-900">
                            Similar <span className="text-indigo-600">Products</span>
                        </h2>
                        <Link to="/" className="text-indigo-600 font-bold hover:underline">
                            View All
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {relatedProducts.map(p => (
                            <ProductCard key={p.id} product={p} onAddToCart={() => onAddToCart(p)} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetails;
