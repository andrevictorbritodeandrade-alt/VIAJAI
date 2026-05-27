
import React, { useState } from 'react';
import { 
  Hotel, 
  MapPin, 
  CalendarDays, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  Clock,
  ShieldCheck,
  Users,
  Wallet,
  ArrowLeft,
  Star
} from 'lucide-react';
import { MENU_ITEMS } from '../constants';
import CategoryHeader from './CategoryHeader';

// ... (Rest of the structure will be added)

const ACCOMMODATION_DATA = [
  {
    region: 'Porto da Barra',
    options: [
      {
        id: 'rede_andrade',
        name: 'Rede Andrade Barra',
        type: 'Hotel',
        neighborhood: 'Porto da Barra',
        rating: 7.0,
        pricePerDay: 274,
        totalPrice: 822,
        proximity: 'Perto de Praia do Porto e Farol',
        description: 'Piscina externa, buffet de café da manhã incluso, aceita pets.',
        amenities: ['Piscina externa', 'Café da manhã incluso', 'Aceita pets', 'Wi-Fi grátis', 'Restaurante'],
        image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=500&auto=format&fit=crop',
        url: 'https://www.hoteis.com/ho272681/rede-andrade-barra-salvador-brasil/?chkin=2026-07-11&chkout=2026-07-14'
      },
      {
        id: 'apart_queen',
        name: 'Apart Queen Barra',
        type: 'Local Inteiro',
        neighborhood: 'Porto da Barra',
        rating: 9.0,
        pricePerDay: 241,
        totalPrice: 723,
        proximity: 'Perto do Shopping Barra e praias',
        description: 'Piscina externa, Wi-Fi grátis, recepção 24h.',
        amenities: ['Piscina externa', 'Wi-Fi grátis', 'Recepção 24h', 'Cozinha', 'Estacionamento'],
        image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=500&auto=format&fit=crop',
        url: 'https://www.hoteis.com/ho4177308000/apart-queen-barra/?chkin=2026-07-11&chkout=2026-07-14'
      }
    ]
  },
  {
    region: 'Rio Vermelho',
    options: [
      {
        id: 'mar_hotel',
        name: 'Mar Hotel Rio Vermelho',
        type: 'Hotel',
        neighborhood: 'Rio Vermelho',
        rating: 7.2,
        pricePerDay: 190,
        totalPrice: 570,
        proximity: 'Perto da Praia da Paciência',
        description: 'Piscina externa, café da manhã incluso, aceita pets.',
        amenities: ['Piscina externa', 'Café da manhã incluso', 'Aceita pets', 'Wi-Fi grátis', 'Ar-condicionado'],
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=500&auto=format&fit=crop',
        url: 'https://www.hoteis.com/ho458703/mar-hotel-rio-vermelho-salvador-brasil/?chkin=2026-07-11&chkout=2026-07-14'
      },
      {
        id: 'ibis_rio_vermelho',
        name: 'Ibis Salvador Rio Vermelho',
        type: 'Hotel',
        neighborhood: 'Rio Vermelho',
        rating: 8.6,
        pricePerDay: 250,
        totalPrice: 750,
        proximity: 'Beira-mar (praia do Buracão)',
        description: 'Restaurante, estacionamento, pet-friendly.',
        amenities: ['Beira-mar', 'Restaurante', 'Bar/Lounge', 'Estacionamento', 'Wi-Fi grátis'],
        image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=500&auto=format&fit=crop',
        url: 'https://www.hoteis.com/ho218419/ibis-salvador-rio-vermelho-salvador-brasil/?chkin=2026-07-11&chkout=2026-07-14'
      },
      {
        id: 'sol_nascente',
        name: 'Sol Nascente',
        type: 'Local Inteiro',
        neighborhood: 'Rio Vermelho',
        rating: 9.2,
        pricePerDay: 223,
        totalPrice: 669,
        proximity: 'Perto da Praia da Paciência',
        description: 'Piscina particular, cozinha, sacada com vista.',
        amenities: ['Piscina particular', 'Cozinha', 'Sacada com vista', 'Ar-condicionado', 'Lavanderia'],
        image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=500&auto=format&fit=crop',
        url: 'https://www.hoteis.com/ho3502730976/?chkin=2026-07-11&chkout=2026-07-14'
      }
    ]
  }
];

const AccommodationCard: React.FC<{ acc: any }> = ({ acc }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="bg-white rounded-[24px] border border-slate-100 shadow-sm overflow-hidden flex flex-col">
        <img src={acc.image} alt={acc.name} className="w-full h-40 object-cover" />
        <div className="p-4 space-y-3">
            <div className="flex justify-between items-start">
                <div>
                    <h4 className="font-black text-slate-900 text-lg">{acc.name}</h4>
                    <p className="text-xs font-bold text-slate-500 uppercase mt-1">{acc.type} • {acc.neighborhood}</p>
                </div>
                <div className="flex items-center gap-1 bg-amber-50 text-amber-700 font-black text-xs px-2 py-1 rounded-lg shrink-0">
                    <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                    {acc.rating}
                </div>
            </div>
            
            <div className="flex justify-between items-center py-2 border-y border-slate-100">
                <div>
                    <span className="block text-[10px] font-black text-slate-400 uppercase">Diária</span>
                    <span className="text-lg font-black text-slate-900">R$ {acc.pricePerDay}</span>
                </div>
                <div className="text-right">
                    <span className="block text-[10px] font-black text-slate-400 uppercase">Total (3 diárias)</span>
                    <span className="text-lg font-black text-emerald-600">R$ {acc.totalPrice}</span>
                </div>
            </div>
            
            <div className="space-y-2">
                <p className="text-xs text-slate-600">{acc.proximity}</p>
                {expanded && (
                    <div className="text-xs text-slate-600 animate-in fade-in slide-in-from-top-2 pt-2 space-y-2">
                        <p>{acc.description}</p>
                        <div className="flex flex-wrap gap-2">
                            {acc.amenities.map((amenity: string) => (
                                <span key={amenity} className="bg-slate-100 text-slate-600 px-2 py-1 rounded-md text-[10px] font-bold">
                                    {amenity}
                                </span>
                            ))}
                        </div>
                        <a href={acc.url} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-slate-900 text-white text-center rounded-xl font-black uppercase tracking-widest text-[11px] mt-2">
                            Ver no Hoteis.com
                        </a>
                    </div>
                )}
            </div>

            <button 
                onClick={() => setExpanded(!expanded)}
                className="w-full flex items-center justify-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest pt-2 hover:text-slate-600"
            >
                {expanded ? 'Mostrar menos' : 'Mostrar detalhes completos'}
                {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
        </div>
    </div>
  );
};

const AccommodationList: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const menuItem = MENU_ITEMS.find(item => item.id === 'hospedagem');

  return (
    <div className="space-y-6 pb-20 animate-in fade-in slide-in-from-bottom-4">
      {/* Header com a imagem do card */}
      <CategoryHeader title={menuItem?.title || 'HOSPEDAGEM'} onBack={onBack} bgImage={menuItem?.bgImage} />

      <div className="space-y-8 px-2">
        {ACCOMMODATION_DATA.map((regionGroup) => (
            <div key={regionGroup.region} className="space-y-4">
                <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest px-1">
                    {regionGroup.region}
                </h3>
                
                {regionGroup.options.map(acc => (
                    <AccommodationCard key={acc.id} acc={acc} />
                ))}
            </div>
        ))}
      </div>
    </div>
  );
};

export default AccommodationList;
