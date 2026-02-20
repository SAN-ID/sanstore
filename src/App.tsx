/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Search, 
  ShoppingCart, 
  MessageCircle, 
  Smartphone, 
  Cpu, 
  Globe, 
  ShieldCheck, 
  Zap, 
  Clock,
  Instagram,
  Twitter,
  MessageSquare,
  ChevronRight,
  X,
  ExternalLink,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---

interface Product {
  id: string;
  name: string;
  category: string;
  subCategory?: string;
  price: string;
  description?: string;
  icon?: React.ReactNode;
  image?: string;
  options?: { label: string; price: string }[];
}

// --- Data ---

const WHATSAPP_NUMBER = "6285896011259";

const CATEGORIES = [
  { id: 'all', name: 'Semua Produk', icon: <Globe className="w-5 h-5" /> },
  { id: 'sosmed', name: 'Suntik Sosmed', icon: <Zap className="w-5 h-5" /> },
  { id: 'premium', name: 'App Premium', icon: <ShieldCheck className="w-5 h-5" /> },
  { id: 'jb', name: 'Aplikasi JB', icon: <Smartphone className="w-5 h-5" /> },
  { id: 'panel', name: 'Panel Pterodactyl', icon: <Cpu className="w-5 h-5" /> },
  { id: 'nokos', name: 'Nomor Kosong (Nokos)', icon: <MessageSquare className="w-5 h-5" /> },
  { id: 'logo', name: 'Logo JB', icon: <ExternalLink className="w-5 h-5" /> },
];

const PRODUCTS: Product[] = [
  // TIKTOK FOLLOWERS INDO
  { id: 'tt-f-indo', name: 'TikTok Followers Indo', category: 'sosmed', subCategory: 'TikTok', price: '7k - 30k', image: 'https://picsum.photos/seed/tt1/400/400', options: [
    { label: '100 followers', price: '7k' },
    { label: '200 followers', price: '13k' },
    { label: '300 followers', price: '16k' },
    { label: '400 followers', price: '24k' },
    { label: '500 followers', price: '30k' },
  ]},
  // TIKTOK FOLLOWERS NO INDO
  { id: 'tt-f-no-indo', name: 'TikTok Followers Global', category: 'sosmed', subCategory: 'TikTok', price: '2.5k - 15k', image: 'https://picsum.photos/seed/tt2/400/400', options: [
    { label: '100 followers', price: '2.5k' },
    { label: '200 followers', price: '5k' },
    { label: '300 followers', price: '7k' },
    { label: '400 followers', price: '9k' },
    { label: '500 followers', price: '10k' },
    { label: '1000 followers', price: '15k' },
  ]},
  // TIKTOK LIKES
  { id: 'tt-l', name: 'TikTok Likes', category: 'sosmed', subCategory: 'TikTok', price: '3k - 30k', image: 'https://picsum.photos/seed/tt3/400/400', options: [
    { label: '1000 like', price: '3k' },
    { label: '5000 like', price: '5k' },
    { label: '10.000 like', price: '8k' },
    { label: '15.000 like', price: '10k' },
    { label: '30.000 like', price: '15k' },
    { label: '50.000 like', price: '30k' },
  ]},
  // TIKTOK VIEWS
  { id: 'tt-v', name: 'TikTok Views', category: 'sosmed', subCategory: 'TikTok', price: '3.3k - 9k', image: 'https://picsum.photos/seed/tt4/400/400', options: [
    { label: '10.000 views', price: '3.3k' },
    { label: '20.000 views', price: '4k' },
    { label: '30.000 views', price: '5k' },
    { label: '40.000 views', price: '7k' },
    { label: '50.0000 views', price: '9k' },
  ]},
  // IG FOLLOWERS INDO
  { id: 'ig-f-indo', name: 'IG Followers Indo', category: 'sosmed', subCategory: 'Instagram', price: '5k - 19k', image: 'https://picsum.photos/seed/ig1/400/400', options: [
    { label: '100 followers', price: '5k' },
    { label: '200 followers', price: '7k' },
    { label: '300 followers', price: '10k' },
    { label: '400 followers', price: '15k' },
    { label: '500 followers', price: '19k' },
  ]},
  // IG FOLLOWERS NO INDO
  { id: 'ig-f-no-indo', name: 'IG Followers Global', category: 'sosmed', subCategory: 'Instagram', price: '3k - 15k', image: 'https://picsum.photos/seed/ig2/400/400', options: [
    { label: '100 followers', price: '3k' },
    { label: '200 followers', price: '5k' },
    { label: '300 followers', price: '7k' },
    { label: '400 followers', price: '10k' },
    { label: '500 followers', price: '15k' },
  ]},
  // IG LIKE
  { id: 'ig-l', name: 'IG Likes Indo', category: 'sosmed', subCategory: 'Instagram', price: '5k - 25k', image: 'https://picsum.photos/seed/ig3/400/400', options: [
    { label: '100 like indonesia', price: '5k' },
    { label: '200 like indonesia', price: '9k' },
    { label: '300 like indonesia', price: '16k' },
    { label: '400 like indonesia', price: '18k' },
    { label: '500 like indonesia', price: '25k' },
  ]},
  // IG VIEWS
  { id: 'ig-v', name: 'IG Views', category: 'sosmed', subCategory: 'Instagram', price: '3.5k - 10k', image: 'https://picsum.photos/seed/ig4/400/400', options: [
    { label: '100000 views', price: '3.5k' },
    { label: '200000 views', price: '5.5k' },
    { label: '300000 views', price: '7.5k' },
    { label: '400000 views', price: '9k' },
    { label: '500000 views', price: '10k' },
  ]},
  // TWITTER FOLLOWERS
  { id: 'tw-f', name: 'Twitter Followers', category: 'sosmed', subCategory: 'Twitter', price: '3k - 20k', image: 'https://picsum.photos/seed/tw1/400/400', options: [
    { label: '100 followers twiter indo', price: '3k' },
    { label: '200 followers twiter', price: '6k' },
    { label: '300 followers twiter', price: '12k' },
    { label: '400 followers twiter', price: '15k' },
    { label: '500 followers twiter', price: '20k' },
  ]},
  // TWITTER LIKES
  { id: 'tw-l', name: 'Twitter Likes', category: 'sosmed', subCategory: 'Twitter', price: '2.5k - 9k', image: 'https://picsum.photos/seed/tw2/400/400', options: [
    { label: '100 like twiter', price: '2.5k' },
    { label: '200 like twiter', price: '4k' },
    { label: '300 like twiter', price: '5.5k' },
    { label: '400 like twiter', price: '7.5k' },
    { label: '500 like twiter', price: '9k' },
  ]},
  // WA CHANNEL
  { id: 'wa-c', name: 'WA Channel Members', category: 'sosmed', subCategory: 'WhatsApp', price: '7k - 65k', image: 'https://picsum.photos/seed/wa1/400/400', options: [
    { label: '100 pengikut', price: '7k' },
    { label: '200 pengikut', price: '16k' },
    { label: '300 pengikut', price: '18k' },
    { label: '400 pengikut', price: '25k' },
    { label: '500 pengikut', price: '35k' },
    { label: '1000 pengikut', price: '65k' },
  ]},
  // PREMIUM APPS
  { id: 'am-prem', name: 'Alight Motion Premium', category: 'premium', price: '10k', description: 'AM Premium 1 Tahun', image: 'https://picsum.photos/seed/am/400/400' },
  { id: 'cc-prem', name: 'CapCut Premium', category: 'premium', price: '15k', description: 'CapCut Premium 1 Tahun', image: 'https://picsum.photos/seed/capcut/400/400' },
  // JB APPS
  { id: 'apk-sv', name: 'Apk Auto SV', category: 'jb', price: 'Hubungi Admin', description: 'Aplikasi Auto Save Contact', image: 'https://picsum.photos/seed/sv/400/400' },
  { id: 'fake-ktp', name: 'Generate Fake KTP', category: 'jb', price: 'Hubungi Admin', description: 'Tools Generate KTP Palsu', image: 'https://picsum.photos/seed/ktp/400/400' },
  { id: 'qr-no-ktp', name: 'Apk QR No KTP', category: 'jb', price: 'Hubungi Admin', description: 'Aplikasi QR Tanpa KTP', image: 'https://picsum.photos/seed/qr/400/400' },
  // PANEL
  { id: 'panel-1gb', name: 'Panel Pterodactyl 1GB', category: 'panel', price: '1k', image: 'https://picsum.photos/seed/p1/400/400' },
  { id: 'panel-2gb', name: 'Panel Pterodactyl 2GB', category: 'panel', price: '2k', image: 'https://picsum.photos/seed/p2/400/400' },
  { id: 'panel-3gb', name: 'Panel Pterodactyl 3GB', category: 'panel', price: '3k', image: 'https://picsum.photos/seed/p3/400/400' },
  { id: 'panel-4gb', name: 'Panel Pterodactyl 4GB', category: 'panel', price: '4k', image: 'https://picsum.photos/seed/p4/400/400' },
  { id: 'panel-5gb', name: 'Panel Pterodactyl 5GB', category: 'panel', price: '5k', image: 'https://picsum.photos/seed/p5/400/400' },
  { id: 'panel-unli', name: 'Panel Unlimited (No Garansi)', category: 'panel', price: '7k', image: 'https://picsum.photos/seed/punli/400/400' },
  { id: 'panel-garansi', name: 'Panel Garansi 2x', category: 'panel', price: '10k', image: 'https://picsum.photos/seed/pgar/400/400' },
  // NOKOS
  { id: 'nokos-indo', name: 'Nokos Indonesia', category: 'nokos', price: '6k', image: 'https://picsum.photos/seed/n1/400/400' },
  { id: 'nokos-my', name: 'Nokos Malaysia', category: 'nokos', price: '15k', image: 'https://picsum.photos/seed/n2/400/400' },
  { id: 'nokos-ph', name: 'Nokos Filipina', category: 'nokos', price: '7k', image: 'https://picsum.photos/seed/n3/400/400' },
  { id: 'nokos-ca', name: 'Nokos Canada', category: 'nokos', price: '10k', image: 'https://picsum.photos/seed/n4/400/400' },
  { id: 'nokos-jp', name: 'Nokos Japan', category: 'nokos', price: '10k', image: 'https://picsum.photos/seed/n5/400/400' },
  { id: 'nokos-cn', name: 'Nokos China', category: 'nokos', price: '14k', image: 'https://picsum.photos/seed/n6/400/400' },
  { id: 'nokos-de', name: 'Nokos Germany', category: 'nokos', price: '13k', image: 'https://picsum.photos/seed/n7/400/400' },
  { id: 'nokos-kr', name: 'Nokos Korea', category: 'nokos', price: '14k', image: 'https://picsum.photos/seed/n8/400/400' },
  { id: 'nokos-th', name: 'Nokos Thailand', category: 'nokos', price: '10k', image: 'https://picsum.photos/seed/n9/400/400' },
  { id: 'nokos-hk', name: 'Nokos Hongkong', category: 'nokos', price: '15k', image: 'https://picsum.photos/seed/n10/400/400' },
  // LOGO
  { id: 'logo-jb', name: 'Logo JB Custom', category: 'logo', price: 'Hubungi Admin', image: 'https://picsum.photos/seed/logo-design/400/400' },
];

// --- Components ---

const ProductCard = ({ product, onClick }: { product: Product, onClick: (p: Product) => void }) => {
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="bg-[#0a192f]/60 backdrop-blur-md border border-blue-900/30 rounded-3xl overflow-hidden shadow-2xl hover:shadow-blue-500/30 transition-all cursor-pointer group"
      onClick={() => onClick(product)}
    >
      <div className="h-48 bg-slate-900 relative overflow-hidden">
        {product.image ? (
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out brightness-75 group-hover:brightness-100" 
            referrerPolicy="no-referrer" 
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-900/40 to-black flex items-center justify-center">
            <div className="text-blue-400 group-hover:scale-125 transition-transform duration-500">
              {product.subCategory === 'TikTok' && <Smartphone className="w-16 h-16" />}
              {product.subCategory === 'Instagram' && <Instagram className="w-16 h-16" />}
              {product.subCategory === 'Twitter' && <Twitter className="w-16 h-16" />}
              {product.subCategory === 'WhatsApp' && <MessageSquare className="w-16 h-16" />}
              {!product.subCategory && <Zap className="w-16 h-16" />}
            </div>
          </div>
        )}
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f] via-transparent to-transparent opacity-60" />
        
        <div className="absolute top-3 left-3 bg-black/40 backdrop-blur-md border border-white/10 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
          {product.subCategory || product.category}
        </div>
      </div>
      
      <div className="p-5 space-y-3">
        <h3 className="text-white font-bold text-lg leading-tight group-hover:text-blue-400 transition-colors">{product.name}</h3>
        <div className="flex items-center justify-between">
          <span className="text-blue-400 font-mono font-bold text-sm">Rp {product.price}</span>
          <div className="w-8 h-8 rounded-full bg-blue-600/20 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
            <ChevronRight className="w-4 h-4 text-blue-400 group-hover:text-white" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Modal = ({ product, onClose }: { product: Product, onClose: () => void }) => {
  const [selectedOption, setSelectedOption] = useState(product.options?.[0] || null);
  const [target, setTarget] = useState('');

  const handleBuy = () => {
    const text = `pembelian: ${product.name}
jenis : ${product.subCategory || product.category}
target : ${target || 'Belum diisi'}
jumlah : ${selectedOption ? selectedOption.label : '1'}

keterangan: pembelian ini bersifat manual harap tunggu admin online dan memberikan Qris admin tutup pada jam 22:30 - 12:00 sampai siang jika belum membalas mungkin ada masalah`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-[#0d1b2a] border border-blue-500/30 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="relative h-48 bg-gradient-to-r from-blue-900 to-indigo-900 flex items-center justify-center">
          <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 rounded-full text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-2">{product.name}</h2>
            <p className="text-blue-200 text-sm opacity-80">{product.subCategory || product.category}</p>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {product.options && (
            <div className="space-y-3">
              <label className="text-blue-300 text-xs font-bold uppercase tracking-widest">Pilih Paket</label>
              <div className="grid grid-cols-2 gap-2">
                {product.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedOption(opt)}
                    className={`p-3 rounded-xl border text-sm transition-all text-left ${
                      selectedOption?.label === opt.label 
                      ? 'bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-600/20' 
                      : 'bg-blue-900/20 border-blue-900/40 text-blue-300 hover:border-blue-500/50'
                    }`}
                  >
                    <div className="font-semibold">{opt.label}</div>
                    <div className="text-xs opacity-70">Rp {opt.price}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-3">
            <label className="text-blue-300 text-xs font-bold uppercase tracking-widest">Target / Link</label>
            <input 
              type="text" 
              placeholder="Masukkan link sosmed atau username..."
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              className="w-full bg-blue-900/10 border border-blue-900/40 rounded-xl p-4 text-white placeholder:text-blue-700 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <div className="bg-blue-900/20 p-4 rounded-xl border border-blue-900/30 flex gap-3 items-start">
            <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
            <p className="text-xs text-blue-200 leading-relaxed">
              Pembelian bersifat manual. Harap tunggu admin online untuk memberikan QRIS. Admin tutup jam 22:30 - 12:00.
            </p>
          </div>

          <button 
            onClick={handleBuy}
            className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold text-lg shadow-xl shadow-blue-600/20 transition-all flex items-center justify-center gap-3"
          >
            <MessageCircle className="w-6 h-6" /> Beli Sekarang via WhatsApp
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- Main App ---

export default function App() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           (p.subCategory?.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-blue-500/30">
      {/* Navbar */}
      <nav className="sticky top-0 z-40 bg-[#020617]/80 backdrop-blur-md border-b border-blue-900/30">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
              <ShoppingCart className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight hidden sm:block">San <span className="text-blue-500">STORE</span></span>
          </div>

          <div className="flex-1 max-w-xl relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Cari produk digital..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/50 border border-slate-800 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:border-blue-500 transition-colors text-sm"
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex flex-col items-end">
              <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Status Admin</span>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-xs font-medium text-emerald-400">Online</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-12">
        {/* Banner / Ads Section */}
        <section className="relative rounded-3xl overflow-hidden h-64 md:h-80 group">
          <img 
            src="https://picsum.photos/seed/cyber/1920/1080" 
            alt="Banner" 
            className="w-full h-full object-cover brightness-50 group-hover:scale-105 transition-transform duration-1000"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent" />
          <div className="absolute inset-0 p-8 flex flex-col justify-end">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-3xl md:text-5xl font-black text-white mb-2 tracking-tight">PROMO SUNTIK SOSMED!</h1>
              <p className="text-blue-300 text-lg max-w-lg">Dapatkan followers & likes berkualitas dengan harga termurah se-Indonesia.</p>
              <div className="mt-6 flex gap-3">
                <button className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-600/20">
                  Cek Sekarang
                </button>
                <div className="px-6 py-3 bg-white/10 backdrop-blur-md border border-white/10 text-white rounded-xl font-bold">
                  Diskon 20%
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Categories */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-500" /> Kategori Produk
            </h2>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl whitespace-nowrap transition-all border ${
                  activeCategory === cat.id 
                  ? 'bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-600/20' 
                  : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                {cat.icon}
                <span className="font-semibold text-sm">{cat.name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Product Grid */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-blue-500" /> 
              {CATEGORIES.find(c => c.id === activeCategory)?.name}
            </h2>
            <span className="text-xs text-slate-500 font-mono">{filteredProducts.length} Produk ditemukan</span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onClick={setSelectedProduct} 
                />
              ))}
            </AnimatePresence>
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20 bg-slate-900/20 rounded-3xl border border-dashed border-slate-800">
              <Search className="w-12 h-12 text-slate-700 mx-auto mb-4" />
              <p className="text-slate-500">Produk tidak ditemukan. Coba kata kunci lain.</p>
            </div>
          )}
        </section>

        {/* Info Section / Ads 2 */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-900/20 to-slate-900 p-6 rounded-3xl border border-blue-900/30">
            <Clock className="w-8 h-8 text-blue-500 mb-4" />
            <h3 className="text-white font-bold mb-2">Jam Operasional</h3>
            <p className="text-slate-400 text-sm">Setiap Hari: 12:00 - 22:30 WIB. Diluar jam tersebut slow respon.</p>
          </div>
          <div className="bg-gradient-to-br from-indigo-900/20 to-slate-900 p-6 rounded-3xl border border-indigo-900/30">
            <ShieldCheck className="w-8 h-8 text-indigo-500 mb-4" />
            <h3 className="text-white font-bold mb-2">Garansi Layanan</h3>
            <p className="text-slate-400 text-sm">Beberapa layanan memiliki garansi refill. Cek detail produk atau tanya admin.</p>
          </div>
          <div className="bg-gradient-to-br from-emerald-900/20 to-slate-900 p-6 rounded-3xl border border-emerald-900/30">
            <MessageCircle className="w-8 h-8 text-emerald-500 mb-4" />
            <h3 className="text-white font-bold mb-2">Bantuan Admin</h3>
            <p className="text-slate-400 text-sm">Butuh bantuan atau ingin custom order? Hubungi WhatsApp kami langsung.</p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-6">
          <div className="flex items-center justify-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-white tracking-tight">San <span className="text-blue-500">STORE</span></span>
          </div>
          <p className="text-slate-500 text-sm max-w-md mx-auto">
            Penyedia layanan digital terpercaya sejak 2024. Kualitas adalah prioritas kami.
          </p>
          <div className="flex justify-center gap-4">
            <a href="#" className="p-2 bg-slate-900 hover:bg-blue-600 rounded-full transition-colors text-slate-400 hover:text-white">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="p-2 bg-slate-900 hover:bg-blue-600 rounded-full transition-colors text-slate-400 hover:text-white">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="p-2 bg-slate-900 hover:bg-blue-600 rounded-full transition-colors text-slate-400 hover:text-white">
              <MessageCircle className="w-5 h-5" />
            </a>
          </div>
          <div className="pt-8 border-t border-slate-900 text-[10px] text-slate-600 uppercase tracking-widest">
            &copy; 2026 San STORE. All Rights Reserved.
          </div>
        </div>
      </footer>

      {/* Product Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <Modal 
            product={selectedProduct} 
            onClose={() => setSelectedProduct(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
