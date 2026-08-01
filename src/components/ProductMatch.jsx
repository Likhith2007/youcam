import React, { useState } from 'react';
import { Sparkles, ShoppingBag, ExternalLink, Star, CheckCircle, ShieldCheck, Heart } from 'lucide-react';

export default function ProductMatch({ ingredients = [] }) {
  const [purchasedItems, setPurchasedItems] = useState({});

  const mockProducts = [
    {
      id: 1,
      name: 'SkinPulse Niacinamide 10% Clarifying Complex',
      category: 'Pore & Texture Refining Serum',
      price: '$48.00',
      rating: 4.9,
      reviews: 342,
      activeIngredient: ingredients[0]?.name || 'Niacinamide 10%',
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=500&q=80',
      description: 'Medical-grade Vitamin B3 formulation targeting enlarged pores, sebum imbalance, and uneven texture.'
    },
    {
      id: 2,
      name: 'SkinPulse Multi-Depth Hyaluronic Acid B5',
      category: 'Intensive Moisture Lock Serum',
      price: '$52.00',
      rating: 4.9,
      reviews: 518,
      activeIngredient: ingredients[1]?.name || 'Hyaluronic Acid Complex',
      image: 'https://images.unsplash.com/photo-1608248597263-000799965813?auto=format&fit=crop&w=500&q=80',
      description: 'Triple-molecular-weight hyaluronic acid for instant sub-epidermal hydration and fine line plumping.'
    },
    {
      id: 3,
      name: 'SkinPulse Time-Release Retinol 0.3% Recovery',
      category: 'Cellular Renewal Night Elixir',
      price: '$64.00',
      rating: 4.8,
      reviews: 289,
      activeIngredient: ingredients[2]?.name || 'Encapsulated Retinol',
      image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=500&q=80',
      description: 'Micro-encapsulated pure retinol paired with phytosqualane to stimulate collagen with zero redness.'
    }
  ];

  const handleBuy = (id) => {
    setPurchasedItems(prev => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setPurchasedItems(prev => ({ ...prev, [id]: false }));
    }, 2500);
  };

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="font-display font-bold text-xl text-white">Recommended Active Ingredients & Product Match</h3>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Matched by YouCam AI
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">High-potency clinical actives chosen specifically for your skin profile</p>
        </div>
      </div>

      {/* Active Ingredients Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {ingredients.map((ing, idx) => {
          const directLink = ing.productLink || `https://www.amazon.com/s?k=${encodeURIComponent(ing.name)}`;
          return (
            <div key={idx} className="glass-card rounded-2xl p-4 border border-slate-800 flex items-center justify-between group hover:border-teal-500/40 transition-all">
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20 flex-shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-white group-hover:text-teal-300 transition-colors">{ing.name}</h4>
                  <p className="text-[11px] text-teal-300 font-medium">{ing.focus}</p>
                </div>
              </div>

              <a
                href={directLink}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-slate-900 hover:bg-teal-500/10 border border-slate-800 text-slate-400 hover:text-teal-300 transition-all"
                title={`Search ${ing.name} on Amazon`}
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          );
        })}
      </div>

      {/* Recommended Product Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mockProducts.map((prod) => {
          const isPurchased = purchasedItems[prod.id];
          const directBuyUrl = `https://www.amazon.com/s?k=${encodeURIComponent(prod.name)}`;
          return (
            <div
              key={prod.id}
              className="glass-panel rounded-2xl overflow-hidden border border-slate-800 hover:border-teal-500/40 transition-all flex flex-col justify-between group"
            >
              {/* Product Image */}
              <div className="relative aspect-square bg-slate-900 overflow-hidden">
                <img
                  src={prod.image}
                  alt={prod.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-[10px] font-bold text-teal-300 border border-teal-500/30">
                  {prod.activeIngredient}
                </div>
              </div>

              {/* Product Details */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center space-x-1 text-amber-400 text-xs mb-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span className="font-bold text-slate-200">{prod.rating}</span>
                    <span className="text-slate-500">({prod.reviews})</span>
                  </div>

                  <h4 className="font-bold text-sm text-white group-hover:text-teal-300 transition-colors leading-tight">
                    {prod.name}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-1">{prod.category}</p>
                  
                  <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                    {prod.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <span className="font-display font-extrabold text-lg text-white">{prod.price}</span>

                  <div className="flex items-center space-x-2">
                    <a
                      href={directBuyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all text-xs font-semibold flex items-center space-x-1"
                      title="View Product on Amazon"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    <button
                      onClick={() => {
                        handleBuy(prod.id);
                        window.open(directBuyUrl, '_blank');
                      }}
                      className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all shadow-md ${
                        isPurchased
                          ? 'bg-emerald-500 text-white'
                          : 'bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-white shadow-teal-500/20'
                      }`}
                    >
                      {isPurchased ? (
                        <>
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>Opening Link</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Buy Product ↗</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
