import { useState, useEffect } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import ProductCard from './components/ProductCard'
import Login from './pages/Login'
import Signup from './pages/Signup'

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

const Home: React.FC<{
  loading: boolean;
  error: string | null;
  filteredProducts: Product[];
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  selectedCategory: string;
  setSelectedCategory: (val: string) => void;
  maxPrice: number;
  setMaxPrice: (val: number) => void;
  categories: string[];
}> = ({
  loading,
  error,
  filteredProducts,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  maxPrice,
  setMaxPrice,
  categories
}) => (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-12 text-center border-b border-gray-100 pb-12">
        <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
          Discover Our <span className="text-indigo-600">Premium</span> Collection
        </h2>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
          High-quality products from across the globe, curated just for you.
          Experience the future of online shopping with our modern interface.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 mb-12 flex flex-col lg:flex-row gap-8 items-end">
        <div className="flex-grow w-full">
          <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Search Products</label>
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 border-0 focus:ring-2 focus:ring-indigo-500 rounded-2xl py-3 pl-12 pr-4 text-gray-900 placeholder-gray-400 transition-all font-medium"
            />
            <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <div className="w-full lg:w-72">
          <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full bg-gray-50 border-0 focus:ring-2 focus:ring-indigo-500 rounded-2xl py-3 px-4 text-gray-900 font-medium cursor-pointer transition-all"
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat} className="capitalize">{cat}</option>
            ))}
          </select>
        </div>

        <div className="w-full lg:w-72">
          <div className="flex justify-between items-center mb-2 px-1">
            <label className="text-sm font-bold text-gray-700">Max Price</label>
            <span className="text-indigo-600 font-bold">${maxPrice}</span>
          </div>
          <input
            type="range"
            min="0"
            max="1000"
            value={maxPrice}
            onChange={(e) => setMaxPrice(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
          <div className="flex justify-between mt-2 text-xs font-bold text-gray-400">
            <span>$0</span>
            <span>$1000</span>
          </div>
        </div>
      </div>

      {!loading && !error && (
        <div className="mb-8 flex justify-between items-center px-1">
          <p className="text-gray-500 font-medium">
            Showing <span className="text-gray-900 font-bold">{filteredProducts.length}</span> products
          </p>
          {(searchQuery || selectedCategory !== 'all' || maxPrice < 1000) && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setMaxPrice(1000);
              }}
              className="text-indigo-600 font-bold hover:underline transition-all"
            >
              Clear All Filters
            </button>
          )}
        </div>
      )}

      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="animate-pulse bg-white rounded-2xl border border-gray-100 h-[450px] overflow-hidden">
              <div className="bg-gray-200 h-64 mb-4"></div>
              <div className="p-6">
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {error && (
        <div className="text-center py-20 bg-red-50 rounded-3xl border-2 border-dashed border-red-200">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 text-red-600 rounded-full mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-red-900 mb-2">Failed to load products</h3>
          <p className="text-red-700">{error}</p>
          <button onClick={() => window.location.reload()} className="mt-6 px-8 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-colors shadow-lg shadow-red-200">Try Again</button>
        </div>
      )}

      {!loading && !error && (
        <>
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)}
            </div>
          ) : (
            <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-gray-200">
              <div className="w-20 h-20 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-500">Try adjusting your filters or search terms.</p>
            </div>
          )}
        </>
      )}
    </main>
  );

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [maxPrice, setMaxPrice] = useState(1000);
  const [categories, setCategories] = useState<string[]>([]);
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          fetch('https://fakestoreapi.com/products'),
          fetch('https://fakestoreapi.com/products/categories')
        ]);
        if (!productsRes.ok || !categoriesRes.ok) throw new Error('Failed to fetch data');
        const productsData = await productsRes.json();
        const categoriesData = await categoriesRes.json();
        setProducts(productsData);
        setCategories(categoriesData);
        const highestPrice = Math.max(...productsData.map((p: Product) => p.price));
        setMaxPrice(Math.ceil(highestPrice));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesPrice = product.price <= maxPrice;
    return matchesSearch && matchesCategory && matchesPrice;
  });

  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 overflow-x-hidden">
      {!isAuthPage && (
        <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 cursor-pointer group">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-200 group-hover:rotate-12 transition-transform">S</div>
              <h1 className="text-2xl font-black bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">ModernStore</h1>
            </Link>
            <nav className="hidden md:flex items-center gap-6 font-bold text-gray-600">
              <Link to="/" className="hover:text-indigo-600 transition-colors">Shop</Link>
              <Link to="/login" className="hover:text-indigo-600 transition-colors">Login</Link>
              <Link to="/signup" className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">Sign Up</Link>
            </nav>
            <button className="relative p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full ring-2 ring-white">0</span>
            </button>
          </div>
        </header>
      )}

      <Routes>
        <Route path="/" element={<Home loading={loading} error={error} filteredProducts={filteredProducts} searchQuery={searchQuery} setSearchQuery={setSearchQuery} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} maxPrice={maxPrice} setMaxPrice={setMaxPrice} categories={categories} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>

      {!isAuthPage && (
        <footer className="bg-white border-t border-gray-100 py-20 mt-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="flex justify-center gap-12 mb-12">
              <Link to="/" className="text-gray-500 font-bold hover:text-indigo-600 transition-colors">Shop</Link>
              <Link to="/login" className="text-gray-500 font-bold hover:text-indigo-600 transition-colors">Login</Link>
              <Link to="/signup" className="text-gray-500 font-bold hover:text-indigo-600 transition-colors">Signup</Link>
            </div>
            <p className="text-gray-400 font-medium">&copy; 2026 ModernStore. Built with Tailwind CSS and React.</p>
          </div>
        </footer>
      )}

      {isAuthPage && (
        <Link to="/" className="fixed bottom-8 left-8 bg-white text-gray-900 border border-gray-200 px-6 py-3 rounded-2xl shadow-2xl font-black hover:bg-gray-50 z-50 transition-all active:scale-95 flex items-center gap-2">
          <span>&larr;</span> Back to Shop
        </Link>
      )}
    </div>
  );
}

export default App
