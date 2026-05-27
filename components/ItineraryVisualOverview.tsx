import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  Plane, 
  Calendar, 
  Clock, 
  DollarSign, 
  GitCommit, 
  MapPin, 
  Edit3, 
  Check, 
  Activity, 
  Map, 
  RefreshCw,
  ShoppingBag,
  Briefcase,
  AlertCircle,
  ArrowRight,
  Info,
  Bus
} from 'lucide-react';

interface Stop {
  airport: string;
  city: string;
  coords: string;
}

interface FlightLeg {
  flightNumber: string;
  airline: string;
  from: string;
  fromCity: string;
  to: string;
  toCity: string;
  depTime: string;
  arrTime: string;
  duration: string;
  layoverAfter?: string; // Time waiting or connection alert
}

interface BaggageOption {
  type: 'personal' | 'cabin' | 'checked';
  label: string;
  limit: string;
  included: boolean;
  color: string;
}

interface ItineraryData {
  id: string;
  tripName: string;
  stops: Stop[];
  outboundDate: string;
  outboundTime: string;
  returnDate: string;
  returnTime: string;
  price: string;
  lastResearched: string;
  outboundLegs: FlightLeg[];
  inboundLegs: FlightLeg[];
  baggage: BaggageOption[];
  airlineLogoNote?: string;
}

const TEMPLATE_ITINERARIES: Record<string, ItineraryData> = {
  'am_porto_seguro': {
    id: 'am_porto_seguro',
    tripName: 'Porto Seguro',
    stops: [
      { airport: 'GRU', city: 'São Paulo', coords: '-23.4356° S, -46.4731° W' },
      { airport: 'BPS', city: 'Porto Seguro', coords: '-16.4497° S, -39.0660° W' }
    ],
    outboundDate: '12 de Julho de 2026',
    outboundTime: '08:30',
    returnDate: '19 de Julho de 2026',
    returnTime: '15:45',
    price: '950',
    lastResearched: 'Hoje às 14:32',
    outboundLegs: [
      {
        flightNumber: 'LA3402',
        airline: 'LATAM Airlines',
        from: 'GRU',
        fromCity: 'São Paulo (Guarulhos)',
        to: 'BPS',
        toCity: 'Porto Seguro',
        depTime: '08:30',
        arrTime: '10:35',
        duration: '2h05'
      }
    ],
    inboundLegs: [
      {
        flightNumber: 'LA3409',
        airline: 'LATAM Airlines',
        from: 'BPS',
        fromCity: 'Porto Seguro',
        to: 'GRU',
        toCity: 'São Paulo (Guarulhos)',
        depTime: '15:45',
        arrTime: '17:55',
        duration: '2h10'
      }
    ],
    baggage: [
      { type: 'personal', label: 'Artigo Pessoal (Mochila)', limit: 'Sob assento da frente', included: true, color: 'text-emerald-400 bg-emerald-500/10' },
      { type: 'cabin', label: 'Bagagem de Mão (10kg)', limit: 'No compartimento superior', included: true, color: 'text-emerald-400 bg-emerald-500/10' },
      { type: 'checked', label: 'Mala Despachada (23kg)', limit: 'No porão do avião', included: false, color: 'text-rose-400 bg-rose-500/10' }
    ],
    airlineLogoNote: 'LATAM Air Direct Flight'
  },
  'am_sp_ssa_aju': {
    id: 'am_sp_ssa_aju',
    tripName: 'São Paulo + Salvador + Aracajú + Catais',
    stops: [
      { airport: 'GRU', city: 'São Paulo', coords: '-23.4356° S, -46.4731° W' },
      { airport: 'SSA', city: 'Salvador', coords: '-12.9714° S, -38.5014° W' },
      { airport: 'AJU', city: 'Aracajú', coords: '-10.9472° S, -37.0731° W' },
      { airport: 'CAT', city: 'Catais', coords: '-13.9100° S, -38.9800° W' }
    ],
    outboundDate: '10 de Julho de 2026',
    outboundTime: '06:15',
    returnDate: '24 de Julho de 2026',
    returnTime: '19:30',
    price: '1.100',
    lastResearched: 'Hoje às 11:20',
    outboundLegs: [
      {
        flightNumber: 'AD2310',
        airline: 'Azul Linhas Aéreas',
        from: 'GRU',
        fromCity: 'São Paulo (Guarulhos)',
        to: 'SSA',
        toCity: 'Salvador (Dep. Luís Eduardo)',
        depTime: '06:15',
        arrTime: '08:40',
        duration: '2h25',
        layoverAfter: 'Conexão de 1h50m no Aeroporto de Salvador (Troca de aeronave)'
      },
      {
        flightNumber: 'AD4190',
        airline: 'Azul Linhas Aéreas',
        from: 'SSA',
        fromCity: 'Salvador',
        to: 'AJU',
        toCity: 'Aracaju',
        depTime: '10:30',
        arrTime: '11:15',
        duration: '0h45'
      }
    ],
    inboundLegs: [
      {
        flightNumber: 'AD4211',
        airline: 'Azul Linhas Aéreas',
        from: 'AJU',
        fromCity: 'Aracaju',
        to: 'GRU',
        toCity: 'São Paulo (Guarulhos)',
        depTime: '19:30',
        arrTime: '22:15',
        duration: '2h45'
      }
    ],
    baggage: [
      { type: 'personal', label: 'Artigo Pessoal (Mochila)', limit: 'Sob assento', included: true, color: 'text-emerald-400 bg-emerald-500/10' },
      { type: 'cabin', label: 'Bagagem de Mão (10kg)', limit: 'Compartimento superior', included: true, color: 'text-emerald-400 bg-emerald-500/10' },
      { type: 'checked', label: 'Mala Despachada (23kg)', limit: 'Despachada no balcão', included: true, color: 'text-emerald-400 bg-emerald-500/10' }
    ],
    airlineLogoNote: 'Parceria Especial Azul'
  },
  'am_ssa_aju': {
    id: 'am_ssa_aju',
    tripName: 'Salvador + Aracajú',
    stops: [
      { airport: 'GIG', city: 'Rio de Janeiro', coords: '-22.8134° S, -43.2494° W' },
      { airport: 'SSA', city: 'Salvador', coords: '-12.9714° S, -38.5014° W' }
    ],
    outboundDate: '11 de Julho de 2026',
    outboundTime: '21:45',
    returnDate: '24 de Julho de 2026',
    returnTime: '05:00',
    price: '618',
    lastResearched: 'Hoje às 12:45',
    outboundLegs: [
      {
        flightNumber: 'LA3674',
        airline: 'LATAM Airlines Brasil',
        from: 'GIG',
        fromCity: 'Rio de Janeiro (Galeão)',
        to: 'SSA',
        toCity: 'Salvador International',
        depTime: '21:45',
        arrTime: '23:45',
        duration: '2h00'
      }
    ],
    inboundLegs: [
      {
        flightNumber: 'LA3673',
        airline: 'LATAM Airlines Brasil',
        from: 'SSA',
        fromCity: 'Salvador International',
        to: 'GIG',
        toCity: 'Rio de Janeiro (Galeão)',
        depTime: '05:00',
        arrTime: '07:10',
        duration: '2h10'
      }
    ],
    baggage: [
      { type: 'personal', label: 'Artigo Pessoal (Mochila)', limit: 'Sob assento', included: true, color: 'text-emerald-400 bg-emerald-500/10' },
      { type: 'cabin', label: 'Bagagem de Mão (10kg)', limit: 'Compartimento superior', included: true, color: 'text-emerald-400 bg-emerald-500/10' },
      { type: 'checked', label: 'Mala Despachada (23kg)', limit: 'Despacho opcional no aeroporto', included: false, color: 'text-rose-400 bg-rose-500/10' }
    ],
    airlineLogoNote: 'Voo Direto LATAM'
  },
  'am_foz': {
    id: 'am_foz',
    tripName: 'Foz do Iguaçu',
    stops: [
      { airport: 'GRU', city: 'São Paulo', coords: '-23.4356° S, -46.4731° W' },
      { airport: 'IGU', city: 'Foz do Iguaçu', coords: '-25.6953° S, -54.4367° W' }
    ],
    outboundDate: '05 de Janeiro de 2027',
    outboundTime: '07:15',
    returnDate: '12 de Janeiro de 2027',
    returnTime: '14:00',
    price: '1.300',
    lastResearched: 'Ontem às 18:00',
    outboundLegs: [
      {
        flightNumber: 'LA3120',
        airline: 'LATAM Brasil',
        from: 'GRU',
        fromCity: 'São Paulo (Guarulhos)',
        to: 'IGU',
        toCity: 'Foz do Iguaçu',
        depTime: '07:15',
        arrTime: '08:55',
        duration: '1h40'
      }
    ],
    inboundLegs: [
      {
        flightNumber: 'LA3121',
        airline: 'LATAM Brasil',
        from: 'IGU',
        fromCity: 'Foz do Iguaçu',
        to: 'GRU',
        toCity: 'São Paulo (Guarulhos)',
        depTime: '14:00',
        arrTime: '15:40',
        duration: '1h40'
      }
    ],
    baggage: [
      { type: 'personal', label: 'Artigo Pessoal (Mochila)', limit: 'Incluso de forma gratuita', included: true, color: 'text-emerald-400 bg-emerald-500/10' },
      { type: 'cabin', label: 'Mala de Bordo (10kg)', limit: 'Incluso na tarifa básica', included: true, color: 'text-emerald-400 bg-emerald-500/10' },
      { type: 'checked', label: 'Mala de Porão (23kg)', limit: 'Despachada gratuitamente', included: true, color: 'text-emerald-400 bg-emerald-500/10' }
    ],
    airlineLogoNote: 'Voe LATAM Direto'
  },
  'am_foz_ba': {
    id: 'am_foz_ba',
    tripName: 'Foz do Iguaçu + Buenos Aires',
    stops: [
      { airport: 'IGU', city: 'Foz do Iguaçu', coords: '-25.6953° S, -54.4367° W' },
      { airport: 'EZE', city: 'Buenos Aires', coords: '-34.8222° S, -58.5358° W' }
    ],
    outboundDate: '08 de Janeiro de 2027',
    outboundTime: '10:30',
    returnDate: '18 de Janeiro de 2027',
    returnTime: '21:00',
    price: '1.550',
    lastResearched: 'Hoje às 15:40',
    outboundLegs: [
      {
        flightNumber: 'AR2245',
        airline: 'Aerolíneas Argentinas',
        from: 'IGU',
        fromCity: 'Foz do Iguaçu',
        to: 'EZE',
        toCity: 'Buenos Aires (Ezeiza)',
        depTime: '10:30',
        arrTime: '12:25',
        duration: '1h55'
      }
    ],
    inboundLegs: [
      {
        flightNumber: 'AR2244',
        airline: 'Aerolíneas Argentinas',
        from: 'EZE',
        fromCity: 'Buenos Aires (Ezeiza)',
        to: 'IGU',
        toCity: 'Foz do Iguaçu',
        depTime: '21:00',
        arrTime: '22:55',
        duration: '1h55'
      }
    ],
    baggage: [
      { type: 'personal', label: 'Artigo Pessoal (Mochila)', limit: 'Sob o assento dianteiro', included: true, color: 'text-emerald-400 bg-emerald-500/10' },
      { type: 'cabin', label: 'Bagagem de Mão (10kg)', limit: 'No Bagageiro Superior', included: true, color: 'text-emerald-400 bg-emerald-500/10' },
      { type: 'checked', label: 'Mala Despachada (23kg)', limit: 'Franquia inclusa no bilhete', included: true, color: 'text-emerald-400 bg-emerald-500/10' }
    ]
  },
  'am_foz_ba_patagonia': {
    id: 'am_foz_ba_patagonia',
    tripName: 'Foz do Iguaçu + Buenos Aires + Patagônia',
    stops: [
      { airport: 'IGU', city: 'Foz do Iguaçu', coords: '-25.6953° S, -54.4367° W' },
      { airport: 'AEP', city: 'Buenos Aires', coords: '-34.5580° S, -58.4170° W' },
      { airport: 'FTE', city: 'El Calafate', coords: '-50.2800° S, -72.0500° W' }
    ],
    outboundDate: '04 de Janeiro de 2027',
    outboundTime: '06:00',
    returnDate: '20 de Janeiro de 2027',
    returnTime: '23:45',
    price: '2.100',
    lastResearched: 'Hoje às 08:15',
    outboundLegs: [
      {
        flightNumber: 'AR1723',
        airline: 'Aerolíneas Argentinas',
        from: 'IGU',
        fromCity: 'Foz do Iguaçu',
        to: 'AEP',
        toCity: 'Buenos Aires (Aeroparque)',
        depTime: '06:00',
        arrTime: '07:55',
        duration: '1h55',
         layoverAfter: 'Conexão de 2h35m no Aeroparque com re-despacho de bagagem obrigatório'
      },
      {
        flightNumber: 'AR1820',
        airline: 'Aerolíneas Argentinas',
        from: 'AEP',
        fromCity: 'Buenos Aires',
        to: 'FTE',
        toCity: 'El Calafate',
        depTime: '10:30',
        arrTime: '13:45',
        duration: '3h15'
      }
    ],
    inboundLegs: [
      {
        flightNumber: 'AR1821',
        airline: 'Aerolíneas Argentinas',
        from: 'FTE',
        fromCity: 'El Calafate',
        to: 'AEP',
        toCity: 'Buenos Aires (Aeroparque)',
        depTime: '17:15',
        arrTime: '20:30',
        duration: '3h15',
        layoverAfter: 'Conexão rápida de 1h30m para trocar de portão e voltar a Foz'
      },
      {
        flightNumber: 'AR1724',
        airline: 'Aerolíneas Argentinas',
        from: 'AEP',
        fromCity: 'Buenos Aires',
        to: 'IGU',
        toCity: 'Foz do Iguaçu',
        depTime: '22:00',
        arrTime: '23:45',
        duration: '1h45'
      }
    ],
    baggage: [
      { type: 'personal', label: 'Item Pessoal (Mochila)', limit: 'Incluso no bilhete', included: true, color: 'text-emerald-400 bg-emerald-500/10' },
      { type: 'cabin', label: 'Mala Padrão 10kg', limit: 'Incluso na cabine', included: true, color: 'text-emerald-400 bg-emerald-500/10' },
      { type: 'checked', label: '2 Malas Despachadas (23kg)', limit: 'Ampla cobertura internacional', included: true, color: 'text-emerald-400 bg-emerald-500/10' }
    ]
  },
  'am_foz_ass_ba': {
    id: 'am_foz_ass_ba',
    tripName: 'Foz do Iguaçu + Assunção + Buenos Aires',
    stops: [
      { airport: 'IGU', city: 'Foz do Iguaçu', coords: '-25.6953° S, -54.4367° W' },
      { airport: 'ASU', city: 'Assunção', coords: '-25.2400° S, -57.5100° W' },
      { airport: 'EZE', city: 'Buenos Aires', coords: '-34.8222° S, -58.5358° W' }
    ],
    outboundDate: '06 de Janeiro de 2027',
    outboundTime: '08:00',
    returnDate: '19 de Janeiro de 2027',
    returnTime: '16:30',
    price: '1.800',
    lastResearched: 'Hoje às 10:00',
    outboundLegs: [
      {
        flightNumber: 'ZP840',
        airline: 'Paranair',
        from: 'IGU',
        fromCity: 'Foz do Iguaçu',
        to: 'ASU',
        toCity: 'Assunção (Silvio Pettirossi)',
        depTime: '08:00',
        arrTime: '08:50',
        duration: '0h50',
        layoverAfter: 'Conexão de 2h10m em Assunção descendo na pista'
      },
      {
        flightNumber: 'ZP841',
        airline: 'Paranair',
        from: 'ASU',
        fromCity: 'Assunção',
        to: 'EZE',
        toCity: 'Buenos Aires (Ezeiza)',
        depTime: '11:00',
        arrTime: '12:50',
        duration: '1h50'
      }
    ],
    inboundLegs: [
      {
        flightNumber: 'AR2240',
        airline: 'Aerolíneas Argentinas',
        from: 'EZE',
        fromCity: 'Buenos Aires (Ezeiza)',
        to: 'IGU',
        toCity: 'Foz do Iguaçu',
        depTime: '16:30',
        arrTime: '18:25',
        duration: '1h55'
      }
    ],
    baggage: [
      { type: 'personal', label: 'Bolsa ou Mochila', limit: 'Incluso', included: true, color: 'text-emerald-400 bg-emerald-500/10' },
      { type: 'cabin', label: 'Mala de Cabine 10kg', limit: 'Incluso no bagageiro', included: true, color: 'text-emerald-400 bg-emerald-500/10' },
      { type: 'checked', label: '1 Mala Despachada (23kg)', limit: 'Incluso no bilhete', included: true, color: 'text-emerald-400 bg-emerald-500/10' }
    ]
  },
  'am_colombia': {
    id: 'am_colombia',
    tripName: 'Colômbia',
    stops: [
      { airport: 'GRU', city: 'São Paulo', coords: '-23.4356° S, -46.4731° W' },
      { airport: 'BOG', city: 'Bogotá', coords: '4.7110° N, -74.0721° W' },
      { airport: 'CTG', city: 'Cartagena', coords: '10.3910° N, -75.4794° W' }
    ],
    outboundDate: '10 de Janeiro de 2027',
    outboundTime: '05:45',
    returnDate: '25 de Janeiro de 2027',
    returnTime: '22:15',
    price: '1.400',
    lastResearched: 'Há 1 hora',
    outboundLegs: [
      {
        flightNumber: 'AV86',
        airline: 'Avianca',
        from: 'GRU',
        fromCity: 'São Paulo (Guarulhos)',
        to: 'BOG',
        toCity: 'Bogotá (El Dorado)',
        depTime: '05:45',
        arrTime: '10:05',
        duration: '6h20',
        layoverAfter: 'Conexão de 2h10m em Bogotá'
      },
      {
        flightNumber: 'AV9550',
        airline: 'Avianca',
        from: 'BOG',
        fromCity: 'Bogotá',
        to: 'CTG',
        toCity: 'Cartagena',
        depTime: '12:15',
        arrTime: '13:45',
        duration: '1h30'
      }
    ],
    inboundLegs: [
      {
        flightNumber: 'AV9551',
        airline: 'Avianca',
        from: 'CTG',
        fromCity: 'Cartagena',
        to: 'BOG',
        toCity: 'Bogotá',
        depTime: '22:15',
        arrTime: '23:45',
        duration: '1h30',
        layoverAfter: 'Escala de 1h50m em Bogotá'
      },
      {
        flightNumber: 'AV85',
        airline: 'Avianca',
        from: 'BOG',
        fromCity: 'Bogotá',
        to: 'GRU',
        toCity: 'São Paulo (Guarulhos)',
        depTime: '01:35',
        arrTime: '08:15',
        duration: '5h40'
      }
    ],
    baggage: [
      { type: 'personal', label: 'Item de mão leve', limit: 'Incluso', included: true, color: 'text-emerald-400 bg-emerald-500/10' },
      { type: 'cabin', label: 'Mala de mão 10kg', limit: 'Incluso', included: true, color: 'text-emerald-400 bg-emerald-500/10' },
      { type: 'checked', label: 'Checked Bag (23kg)', limit: 'Despacho extra contratado', included: true, color: 'text-emerald-400 bg-emerald-500/10' }
    ]
  },
  'am_peru': {
    id: 'am_peru',
    tripName: 'Peru',
    stops: [
      { airport: 'GRU', city: 'São Paulo', coords: '-23.4356° S, -46.4731° W' },
      { airport: 'LIM', city: 'Lima', coords: '-12.0464° S, -77.0428° W' },
      { airport: 'CUZ', city: 'Cusco', coords: '-13.5226° S, -71.9673° W' }
    ],
    outboundDate: '12 de Janeiro de 2027',
    outboundTime: '09:10',
    returnDate: '24 de Janeiro de 2027',
    returnTime: '20:00',
    price: '1.750',
    lastResearched: 'Ontem às 15:30',
    outboundLegs: [
      {
        flightNumber: 'LA8004',
        airline: 'LATAM Airlines',
        from: 'GRU',
        fromCity: 'São Paulo (Guarulhos)',
        to: 'LIM',
        toCity: 'Lima (Jorge Chávez)',
        depTime: '09:10',
        arrTime: '12:35',
        duration: '5h25',
        layoverAfter: 'Parada de 2h25m em Lima com imigração obrigatória'
      },
      {
        flightNumber: 'LA2012',
        airline: 'LATAM Peru',
        from: 'LIM',
        fromCity: 'Lima',
        to: 'CUZ',
        toCity: 'Cusco (Alejandro Velasco)',
        depTime: '15:00',
        arrTime: '16:20',
        duration: '1h20'
      }
    ],
    inboundLegs: [
      {
        flightNumber: 'LA2013',
        airline: 'LATAM Peru',
        from: 'CUZ',
        fromCity: 'Cusco',
        to: 'LIM',
        toCity: 'Lima',
        depTime: '20:00',
        arrTime: '21:20',
        duration: '1h20',
        layoverAfter: 'Imigração/Troca de aeronave de 2h00m'
      },
      {
        flightNumber: 'LA8005',
        airline: 'LATAM Airlines',
        from: 'LIM',
        fromCity: 'Lima',
        to: 'GRU',
        toCity: 'São Paulo (Guarulhos)',
        depTime: '23:20',
        arrTime: '05:45',
        duration: '5h25'
      }
    ],
    baggage: [
      { type: 'personal', label: 'Item Pessoal', limit: 'Gratuito', included: true, color: 'text-emerald-400 bg-emerald-500/10' },
      { type: 'cabin', label: 'Cabin Bag 10kg', limit: 'Gratuito', included: true, color: 'text-emerald-400 bg-emerald-500/10' },
      { type: 'checked', label: 'Bagagem Despachada', limit: 'Tarifa Plus Contratada', included: true, color: 'text-emerald-400 bg-emerald-500/10' }
    ]
  },
  'am_africa_sul': {
    id: 'am_africa_sul',
    tripName: 'África do Sul',
    stops: [
      { airport: 'GRU', city: 'São Paulo', coords: '-23.4356° S, -46.4731° W' },
      { airport: 'JNB', city: 'Johanesburgo', coords: '-26.1392° S, 28.2460° E' },
      { airport: 'CPT', city: 'Cape Town', coords: '-33.9715° S, 18.6021° E' }
    ],
    outboundDate: '15 de Janeiro de 2026',
    outboundTime: '11:00',
    returnDate: '05 de Fevereiro de 2026',
    returnTime: '22:30',
    price: '1.200',
    lastResearched: 'Completado (Histórico)',
    outboundLegs: [
      {
        flightNumber: 'SA223',
        airline: 'South African Airways',
        from: 'GRU',
        fromCity: 'São Paulo (Guarulhos)',
        to: 'JNB',
        toCity: 'Johanesburgo (O.R. Tambo)',
        depTime: '11:00',
        arrTime: '23:45',
        duration: '8h45',
        layoverAfter: 'Hospedagem de Trânsito / Conexão na manhã seguinte (8h30m de espera)'
      },
      {
        flightNumber: 'FA102',
        airline: 'FlySafair',
        from: 'JNB',
        fromCity: 'Johanesburgo',
        to: 'CPT',
        toCity: 'Cape Town Int',
        depTime: '08:15',
        arrTime: '10:25',
        duration: '2h10'
      }
    ],
    inboundLegs: [
      {
        flightNumber: 'FA103',
        airline: 'FlySafair',
        from: 'CPT',
        fromCity: 'Cape Town Int',
        to: 'JNB',
        toCity: 'Johanesburgo',
        depTime: '18:00',
        arrTime: '20:10',
        duration: '2h10',
        layoverAfter: 'Conexão em Johanesburgo de 2h20m'
      },
      {
        flightNumber: 'SA222',
        airline: 'South African Airways',
        from: 'JNB',
        fromCity: 'Johanesburgo',
        to: 'GRU',
        toCity: 'São Paulo (Guarulhos)',
        depTime: '22:30',
        arrTime: '06:15',
        duration: '8h45'
      }
    ],
    baggage: [
      { type: 'personal', label: 'Item Pessoal', limit: 'Incluso', included: true, color: 'text-emerald-400 bg-emerald-500/10' },
      { type: 'cabin', label: 'Mala De Bordo 10kg', limit: 'Incluso', included: true, color: 'text-emerald-400 bg-emerald-500/10' },
      { type: 'checked', label: '2 x Malas de 23kg', limit: 'Ampla cobertura intercontinental', included: true, color: 'text-emerald-400 bg-emerald-500/10' }
    ]
  }
};

interface OverviewProps {
  tripId: string;
}

export const ItineraryVisualOverview: React.FC<OverviewProps> = ({ tripId }) => {
  const [data, setData] = useState<ItineraryData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTimelineTab, setActiveTimelineTab] = useState<'ida' | 'volta'>('ida');

  // Flight Editable Fields State
  const [editedPrice, setEditedPrice] = useState('');
  const [editedOutboundDate, setEditedOutboundDate] = useState('');
  const [editedOutboundTime, setEditedOutboundTime] = useState('');
  const [editedReturnDate, setEditedReturnDate] = useState('');
  const [editedReturnTime, setEditedReturnTime] = useState('');
  const [editedLastResearched, setEditedLastResearched] = useState('');
  
  // Baggage controls in Edit Mode
  const [editedBag1, setEditedBag1] = useState(true);
  const [editedBag2, setEditedBag2] = useState(true);
  const [editedBag3, setEditedBag3] = useState(true);

  // Connection alert fields in Edit Mode
  const [layoverTextIda, setLayoverTextIda] = useState('');
  const [layoverTextVolta, setLayoverTextVolta] = useState('');

  // Sincroniza e carrega dados salvos localmente ou usa template
  useEffect(() => {
    const key = `itinerary_custom_${tripId}`;
    const saved = localStorage.getItem(key);
    if (saved) {
      try {
        setData(JSON.parse(saved));
      } catch (err) {
        setData(TEMPLATE_ITINERARIES[tripId] || TEMPLATE_ITINERARIES['am_foz']);
      }
    } else {
      setData(TEMPLATE_ITINERARIES[tripId] || TEMPLATE_ITINERARIES['am_foz']);
    }
  }, [tripId]);

  const handleSave = () => {
    if (!data) return;
    
    // Constrói custom legs atualizando layovers de conexões adicionais
    const updatedOutboundLegs = [...(data.outboundLegs || [])];
    if (updatedOutboundLegs.length > 0) {
      if (layoverTextIda) {
        updatedOutboundLegs[0].layoverAfter = layoverTextIda;
      } else {
        delete updatedOutboundLegs[0].layoverAfter;
      }
    }

    const updatedInboundLegs = [...(data.inboundLegs || [])];
    if (updatedInboundLegs.length > 0) {
      if (layoverTextVolta) {
        updatedInboundLegs[0].layoverAfter = layoverTextVolta;
      } else {
        delete updatedInboundLegs[0].layoverAfter;
      }
    }

    const updatedBaggage: BaggageOption[] = [
      { type: 'personal', label: 'Artigo Pessoal (Mochila)', limit: 'Sob assento da frente', included: editedBag1, color: editedBag1 ? 'text-emerald-400 bg-emerald-500/10' : 'text-rose-400 bg-rose-500/10' },
      { type: 'cabin', label: 'Bagagem de Mão (10kg)', limit: 'No compartimento superior', included: editedBag2, color: editedBag2 ? 'text-emerald-400 bg-emerald-500/10' : 'text-rose-400 bg-rose-500/10' },
      { type: 'checked', label: 'Mala Despachada (23kg)', limit: 'No porão do avião', included: editedBag3, color: editedBag3 ? 'text-emerald-400 bg-emerald-500/10' : 'text-rose-400 bg-rose-500/10' }
    ];

    const updated: ItineraryData = {
      ...data,
      price: editedPrice,
      outboundDate: editedOutboundDate,
      outboundTime: editedOutboundTime,
      returnDate: editedReturnDate,
      returnTime: editedReturnTime,
      lastResearched: editedLastResearched,
      outboundLegs: updatedOutboundLegs,
      inboundLegs: updatedInboundLegs,
      baggage: updatedBaggage
    };

    setData(updated);
    localStorage.setItem(`itinerary_custom_${tripId}`, JSON.stringify(updated));
    
    // Alerta o evento customizado no topo para manter os preços das viagens em sincronia profunda no dashboard
    window.dispatchEvent(new CustomEvent('trip-price-updated', { detail: { id: tripId, price: editedPrice } }));
    setIsEditing(false);
  };

  const startEdit = () => {
    if (!data) return;
    setEditedPrice(data.price);
    setEditedOutboundDate(data.outboundDate);
    setEditedOutboundTime(data.outboundTime);
    setEditedReturnDate(data.returnDate);
    setEditedReturnTime(data.returnTime);
    setEditedLastResearched(data.lastResearched);
    setEditedBag1(data.baggage?.[0]?.included ?? true);
    setEditedBag2(data.baggage?.[1]?.included ?? true);
    setEditedBag3(data.baggage?.[2]?.included ?? false);
    setLayoverTextIda(data.outboundLegs?.[0]?.layoverAfter || '');
    setLayoverTextVolta(data.inboundLegs?.[0]?.layoverAfter || '');
    setIsEditing(true);
  };

  if (!data) return null;

  const currentLegs = activeTimelineTab === 'ida' ? data.outboundLegs || [] : data.inboundLegs || [];
  const hasConnections = currentLegs.some(leg => !!leg.layoverAfter);

  return (
    <div className="w-full bg-[#0d121f] rounded-[2.5rem] border border-white/10 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.85)] p-5 sm:p-8 text-white mb-8 overflow-hidden">
      
      {/* Header Info & Price Highlight */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/5 pb-6 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Compass className="w-5 h-5 text-emerald-400 animate-spin-slow" />
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400">Roteiro Ativo Dedicado</h3>
          </div>
          <h2 className="text-xl sm:text-2xl font-black font-display tracking-tight text-white uppercase uppercase-latin">
            {data.tripName}
          </h2>
          <div className="flex items-center gap-2.5 mt-2 text-slate-400">
            <span className="text-[10px] bg-slate-800 border border-white/5 rounded-full px-2.5 py-0.5 font-bold">
              MAPA COORDENADO
            </span>
            <span className="text-xs font-mono font-medium tracking-tighter opacity-70">
              {data.stops?.map(s => s.airport).join(' ➔ ')}
            </span>
          </div>
        </div>

        {/* Big Contrast Gold Price Card */}
        <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/5 border border-emerald-500/30 rounded-3xl p-4 sm:p-5 flex items-center justify-between md:justify-end gap-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] self-start w-full md:w-auto min-w-[240px]">
          <div>
            <span className="text-[9px] font-black uppercase tracking-widest text-[#94a3b8] block mb-1">Passagem Praticada</span>
            <div className="flex items-baseline gap-1">
              <span className="text-emerald-400 font-extrabold text-xs">R$</span>
              <span className="text-3xl font-black font-display text-white tracking-tight">{data.price}</span>
            </div>
            <span className="text-[8px] font-semibold text-slate-400 block mt-0.5">Valores por passageiro</span>
          </div>
          <div className="text-right">
            <span className="text-[8px] font-black bg-emerald-500/20 text-emerald-400 rounded-full py-1 px-2.5 uppercase tracking-wide block mb-2 font-display">
              CONSULTADO SUCESSO
            </span>
            <p className="text-[9px] text-slate-400 font-medium">Atualizado: <span className="text-white font-bold">{data.lastResearched}</span></p>
          </div>
        </div>
      </div>

      {/* Grid: Timelines (Left) & Baggage Visual Card (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Interactive Timeline (Span 8) */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* TAB Switches with custom visual highlights */}
          <div className="flex items-center justify-between bg-black/45 p-1.5 rounded-2xl border border-white/5 w-full">
            <button
              onClick={() => setActiveTimelineTab('ida')}
              className={`flex-1 flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                activeTimelineTab === 'ida' 
                  ? 'bg-emerald-500 text-slate-950 shadow-lg font-black' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Plane className="w-4 h-4 translate-y-[0.5px]" />
              Sentido Ida: {data.outboundDate.split(' de ')[0]} {data.outboundDate.split(' de ')[1]?.substring(0, 3)}
            </button>
            <button
              onClick={() => setActiveTimelineTab('volta')}
              className={`flex-1 flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                activeTimelineTab === 'volta' 
                  ? 'bg-purple-500 text-white shadow-lg font-black' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Plane className="w-4 h-4 rotate-180 translate-y-[-0.5px]" />
              Sentido Volta: {data.returnDate.split(' de ')[0]} {data.returnDate.split(' de ')[1]?.substring(0, 3)}
            </button>
          </div>

          {/* Core Timeline Module Panel */}
          <div className="bg-slate-950/40 border border-white/5 rounded-3xl p-6 relative">
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-white/5">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Linha do Tempo de Voos</span>
              <div className="flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${hasConnections ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400'}`}></span>
                <span className="text-[9px] font-bold uppercase tracking-wider text-slate-300">
                  {hasConnections ? 'Voo com Conexão' : 'Voo Direto sem Escalas'}
                </span>
              </div>
            </div>

            {/* Custom Visual Timeline Flow */}
            <div className="space-y-6 relative before:absolute before:left-6 before:top-2 before:bottom-2 before:w-[2px] before:bg-gradient-to-b before:from-emerald-500/20 before:via-white/5 before:to-purple-500/20">
              
              {currentLegs.length === 0 ? (
                <div className="text-center py-6 text-slate-500 text-xs italic">Nenhum detalhe de voo disponível para essa rota.</div>
              ) : (
                currentLegs.map((leg, index) => {
                  const isFirst = index === 0;
                  const isLast = index === currentLegs.length - 1;
                  return (
                    <div key={leg.flightNumber + '-' + index} className="space-y-4">
                      
                      {/* Timeline Segment Block */}
                      <div className="relative pl-14 group">
                        
                        {/* Bullet Marker dot representing Geodesic Departure point */}
                        <div className="absolute left-[17px] top-1.5 w-4.5 h-4.5 rounded-full bg-slate-950 border-2 border-emerald-400 flex items-center justify-center shadow-md shadow-emerald-500/10 group-hover:scale-110 transition-transform">
                          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
                        </div>

                        {/* Top: Airline / Flight Badge info */}
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className="text-[9px] bg-slate-800 border border-white/10 rounded-md px-2 py-0.5 text-white font-mono tracking-widest uppercase">
                            {leg.flightNumber}
                          </span>
                          <span className="text-[10px] font-extrabold text-slate-300 uppercase">{leg.airline}</span>
                          <span className="text-[9px] ml-auto font-bold opacity-60 text-slate-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" /> Duration: {leg.duration}
                          </span>
                        </div>

                        {/* Departure and Arrival Layout */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-black/20 rounded-2xl p-4 border border-white/5">
                          
                          {/* Departure Node detail */}
                          <div className="flex items-center gap-3">
                            <div className="text-left">
                              <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest block mb-0.5">Partida</span>
                              <div className="flex items-baseline gap-1.5">
                                <span className="font-display font-black text-lg">{leg.depTime}</span>
                                <span className="text-[10px] font-black uppercase text-slate-300 tracking-wider bg-white/5 rounded px-1.5">{leg.from}</span>
                              </div>
                              <p className="text-[11px] font-bold text-slate-400 group-hover:text-slate-200 transition-colors">{leg.fromCity}</p>
                            </div>
                          </div>

                          {/* Arrival Node detail */}
                          <div className="flex items-center gap-3 border-t md:border-t-0 md:border-l border-white/5 pt-3 md:pt-0 md:pl-4">
                            <div className="text-left">
                              <span className="text-[9px] font-black text-purple-400 uppercase tracking-widest block mb-0.5">Chegada</span>
                              <div className="flex items-baseline gap-1.5">
                                <span className="font-display font-black text-lg">{leg.arrTime}</span>
                                <span className="text-[10px] font-black uppercase text-slate-300 tracking-wider bg-white/5 rounded px-1.5">{leg.to}</span>
                              </div>
                              <p className="text-[11px] font-bold text-slate-400 group-hover:text-slate-200 transition-colors">{leg.toCity}</p>
                            </div>
                          </div>

                        </div>

                      </div>

                      {/* Connection / Layover warning alert block */}
                      {leg.layoverAfter && (
                        <div className="relative pl-14 py-1.5">
                          <div className="absolute left-4.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 flex items-center justify-center">
                            <AlertCircle className="w-4 h-4 text-amber-400 animate-pulse shrink-0" />
                          </div>
                          <div className="bg-amber-500/10 border border-amber-500/20 text-amber-300 rounded-2xl px-4 py-3 text-xs md:text-[11px] font-bold flex flex-col md:flex-row md:items-center justify-between gap-2.5 shadow-md">
                            <div className="flex items-center gap-2">
                              <Info className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                              <span className="leading-tight">{leg.layoverAfter}</span>
                            </div>
                            <span className="text-[9px] font-black tracking-widest uppercase bg-amber-400/20 text-amber-200 rounded-full py-0.5 px-2.5 border border-amber-400/30 shrink-0 self-start md:self-auto">
                              ESPERA OBRIGATÓRIA
                            </span>
                          </div>
                        </div>
                      )}

                    </div>
                  );
                })
              )}

              {/* Optional Terrestrial Bus Connection */}
              {(data.id === 'am_ssa_aju' || data.id === 'am_sp_ssa_aju') && (
                <>
                  {/* Decorative dashed connector */}
                  <div className="relative pl-14 py-2">
                    <div className="flex items-center gap-2 bg-[#111827] border border-white/5 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest text-orange-400 shrink-0 font-mono w-fit">
                      <Bus className="w-3.5 h-3.5 text-orange-400" /> Conexão Terrestre Rodoviária (Viação Águia Branca)
                    </div>
                  </div>

                  {activeTimelineTab === 'ida' ? (
                    <div className="relative pl-14 group animate-in fade-in duration-300">
                      {/* Orange Bullet Marker */}
                      <div className="absolute left-[17px] top-1.5 w-[18px] h-[18px] rounded-full bg-slate-950 border-2 border-orange-400 flex items-center justify-center shadow-md shadow-orange-500/10 group-hover:scale-110 transition-transform">
                        <span className="w-1.5 h-1.5 bg-orange-400 rounded-full"></span>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="text-[9px] bg-orange-600/10 text-orange-400 border border-orange-500/20 px-2 py-0.5 rounded-md font-mono tracking-widest uppercase font-black">
                          ÁGUIA BRANCA
                        </span>
                        <span className="text-[10px] font-extrabold text-slate-300 uppercase">Viação Águia Branca (Poltrona 17)</span>
                        <span className="text-[9px] ml-auto font-bold opacity-60 text-slate-400 flex items-center gap-1 font-mono">
                          <Clock className="w-3.5 h-3.5" /> 5h 25m
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-black/40 rounded-2xl p-4 border border-white/5">
                        <div className="flex items-center gap-3">
                          <div className="text-left">
                            <span className="text-[9px] font-black text-orange-400 uppercase tracking-widest block mb-0.5">Embarque Salvador</span>
                            <div className="flex items-baseline gap-1.5">
                              <span className="font-display font-black text-lg">06:40</span>
                              <span className="text-[10px] font-black uppercase text-slate-300 tracking-wider bg-white/5 rounded px-1.5 font-mono">SSA</span>
                            </div>
                            <p className="text-[11px] font-bold text-slate-400">Terminal Rodoviário de Salvador</p>
                            <p className="text-[9px] font-medium text-slate-500 font-mono">14 de jul. de 2026 (Terça-feira)</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 border-t md:border-t-0 md:border-l border-white/5 pt-3 md:pt-0 md:pl-4">
                          <div className="text-left">
                            <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest block mb-0.5">Desembarque Aracaju</span>
                            <div className="flex items-baseline gap-1.5">
                              <span className="font-display font-black text-lg">12:05</span>
                              <span className="text-[10px] font-black uppercase text-slate-300 tracking-wider bg-white/5 rounded px-1.5 font-mono">AJU</span>
                            </div>
                            <p className="text-[11px] font-bold text-slate-400">Terminal Rodoviário de Aracaju</p>
                            <p className="text-[9px] font-medium text-slate-500 font-mono">14 de jul. de 2026 (Terça-feira)</p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-2.5 flex justify-between items-center text-[10px] bg-white/5 rounded-xl p-2.5 px-4 border border-white/5 flex-wrap gap-2">
                        <span className="font-bold text-slate-400">Acomodação: <strong className="text-white">SEMILEITO</strong></span>
                        <span className="font-bold text-slate-400">Valor Total: <strong className="text-orange-400">R$ 109,19 (com taxas)</strong></span>
                      </div>
                    </div>
                  ) : (
                    <div className="relative pl-14 group animate-in fade-in duration-300">
                      {/* Orange Bullet Marker */}
                      <div className="absolute left-[17px] top-1.5 w-[18px] h-[18px] rounded-full bg-slate-950 border-2 border-orange-400 flex items-center justify-center shadow-md shadow-orange-500/10 group-hover:scale-110 transition-transform">
                        <span className="w-1.5 h-1.5 bg-orange-400 rounded-full"></span>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="text-[9px] bg-orange-600/10 text-orange-400 border border-orange-500/20 px-2 py-0.5 rounded-md font-mono tracking-widest uppercase font-black">
                          ÁGUIA BRANCA
                        </span>
                        <span className="text-[10px] font-extrabold text-slate-300 uppercase">Viação Águia Branca (Poltrona 17)</span>
                        <span className="text-[9px] ml-auto font-bold opacity-60 text-[#00c58e] flex items-center gap-1 font-mono">
                          <Clock className="w-3.5 h-3.5" /> 5h 25m
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-black/40 rounded-2xl p-4 border border-white/5">
                        <div className="flex items-center gap-3">
                          <div className="text-left">
                            <span className="text-[9px] font-black text-orange-400 uppercase tracking-widest block mb-0.5">Embarque Aracaju</span>
                            <div className="flex items-baseline gap-1.5">
                              <span className="font-display font-black text-lg">07:00</span>
                              <span className="text-[10px] font-black uppercase text-slate-300 tracking-wider bg-white/5 rounded px-1.5 font-mono">AJU</span>
                            </div>
                            <p className="text-[11px] font-bold text-slate-400">Terminal Rodoviário de Aracaju</p>
                            <p className="text-[9px] font-medium text-slate-500 font-mono">21 de jul. de 2026 (Terça-feira)</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 border-t md:border-t-0 md:border-l border-white/5 pt-3 md:pt-0 md:pl-4">
                          <div className="text-left">
                            <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest block mb-0.5">Desembarque Salvador</span>
                            <div className="flex items-baseline gap-1.5">
                              <span className="font-display font-black text-lg">12:25</span>
                              <span className="text-[10px] font-black uppercase text-slate-300 tracking-wider bg-white/5 rounded px-1.5 font-mono">SSA</span>
                            </div>
                            <p className="text-[11px] font-bold text-slate-400">Terminal Rodoviário de Salvador</p>
                            <p className="text-[9px] font-medium text-slate-500 font-mono">21 de jul. de 2026 (Terça-feira)</p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-2.5 flex justify-between items-center text-[10px] bg-white/5 rounded-xl p-2.5 px-4 border border-white/5 flex-wrap gap-2">
                        <span className="font-bold text-slate-400">Acomodação: <strong className="text-white">SEMILEITO</strong></span>
                        <span className="font-bold text-slate-400">Valor Total: <strong className="text-orange-400">R$ 109,19 (com taxas)</strong></span>
                      </div>
                    </div>
                  )}
                </>
              )}

            </div>
          </div>
        </div>

        {/* Right Column: Baggage allowance details module (Span 4) */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Baggage Panel Card */}
          <div className="bg-gradient-to-b from-[#131b2e] to-[#0c1120] border border-white/10 rounded-3xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
            <div className="flex items-center gap-2 mb-5 pb-3 border-b border-white/5">
              <ShoppingBag className="w-5 h-5 text-emerald-400" />
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-white">Bagagens Inclusas</h4>
                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Franquia por Bilhete</p>
              </div>
            </div>

            {/* List of Baggage Details with beautiful visual items */}
            <div className="space-y-3">
              {data.baggage?.map((bag) => {
                const IconComponent = bag.type === 'personal' ? Briefcase : ShoppingBag;
                return (
                  <div 
                    key={bag.type}
                    className={`rounded-2xl border p-3 flex items-start gap-3 transition-all ${
                      bag.included 
                        ? 'bg-emerald-500/5 border-emerald-500/10 hover:border-emerald-500/25' 
                        : 'bg-rose-500/5 border-rose-500/10 hover:border-rose-500/25'
                    }`}
                  >
                    <div className={`p-2.5 rounded-xl shrink-0 ${bag.color}`}>
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold text-white leading-none tracking-tight">{bag.label}</span>
                        <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-md self-start ${
                          bag.included ? 'bg-emerald-500/15 text-emerald-400' : 'bg-rose-500/15 text-rose-400'
                        }`}>
                          {bag.included ? 'INCLUSO' : 'NÃO INC'}
                        </span>
                      </div>
                      <p className="text-[9.5px] text-slate-400 font-semibold mt-1">{bag.limit}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* General Disclaimer Badge inside Baggage Frame */}
            <div className="bg-slate-950 p-3.5 rounded-2xl border border-white/5 mt-4 flex items-start gap-2.5 text-[10px] text-slate-400 leading-relaxed font-semibold">
              <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                Valores e bagagens simulados via tarifas consolidadas pela inteligência. Emissão garantida sem nenhuma cobrança surpresa no balcão.
              </span>
            </div>

          </div>

          {/* Quick interactive action to edit itinerary values */}
          <div className="w-full">
            {!isEditing ? (
              <button
                onClick={startEdit}
                className="w-full flex items-center justify-center gap-2.5 bg-slate-900 hover:bg-emerald-500 hover:text-slate-950 px-5 py-4 rounded-2xl border border-white/10 transition-all font-black text-xs uppercase tracking-[0.2em]"
              >
                <Edit3 className="w-4 h-4" />
                Editar Dados do Bilhete
              </button>
            ) : (
              <div className="bg-slate-950 border border-white/10 rounded-[2rem] p-5 shadow-2xl w-full animate-in slide-in-from-bottom duration-300">
                <h4 className="text-xs font-black tracking-widest uppercase text-white mb-4 border-b border-white/5 pb-2 flex items-center gap-2">
                  <Edit3 className="w-4 h-4 text-emerald-400" />
                  Atualizar Dados do Bilhete
                </h4>
                
                <div className="space-y-4 mb-5 max-h-[360px] overflow-y-auto pr-1">
                  <div>
                    <label className="text-[9px] font-black tracking-wider text-slate-400 uppercase block mb-1">Preço Praticado</label>
                    <input 
                      type="text" 
                      value={editedPrice} 
                      onChange={(e) => setEditedPrice(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm font-bold text-white focus:outline-none focus:border-emerald-400"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="text-[9px] font-black tracking-wider text-slate-400 uppercase block mb-1">Data de Ida</label>
                      <input 
                        type="text" 
                        value={editedOutboundDate} 
                        onChange={(e) => setEditedOutboundDate(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white font-bold focus:outline-none focus:border-emerald-400"
                      />
                    </div>
                    <div>
                      <label className="text-[9px] font-black tracking-wider text-slate-400 uppercase block mb-1">Hora de Ida</label>
                      <input 
                        type="text" 
                        value={editedOutboundTime} 
                        onChange={(e) => setEditedOutboundTime(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white font-bold focus:outline-none focus:border-emerald-400"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="text-[9px] font-black tracking-wider text-slate-400 uppercase block mb-1">Data de Volta</label>
                      <input 
                        type="text" 
                        value={editedReturnDate} 
                        onChange={(e) => setEditedReturnDate(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white font-bold focus:outline-none focus:border-emerald-400"
                      />
                    </div>
                    <div>
                      <label className="text-[9px] font-black tracking-wider text-slate-400 uppercase block mb-1">Hora de Volta</label>
                      <input 
                        type="text" 
                        value={editedReturnTime} 
                        onChange={(e) => setEditedReturnTime(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white font-bold focus:outline-none focus:border-emerald-400"
                      />
                    </div>
                  </div>
                  
                  {/* Layover editable textboxes */}
                  <div>
                    <label className="text-[9px] font-black tracking-wider text-slate-400 uppercase block mb-1">Mensagem de Conexão (Ida)</label>
                    <input 
                      type="text" 
                      placeholder="Ex: Conexão de 1h30m em Congonhas"
                      value={layoverTextIda} 
                      onChange={(e) => setLayoverTextIda(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white font-bold focus:outline-none focus:border-emerald-400"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] font-black tracking-wider text-slate-400 uppercase block mb-1">Mensagem de Conexão (Volta)</label>
                    <input 
                      type="text" 
                      placeholder="Ex: Conexão rápida de 1h15m em Ezeiza"
                      value={layoverTextVolta} 
                      onChange={(e) => setLayoverTextVolta(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white font-bold focus:outline-none focus:border-emerald-400"
                    />
                  </div>

                  {/* Baggage toggles */}
                  <div className="border-t border-white/5 pt-3">
                    <span className="text-[9px] font-black tracking-wider text-slate-400 uppercase block mb-2">Configure as Bagagens</span>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2.5 text-xs font-bold text-slate-200 cursor-pointer">
                        <input type="checkbox" checked={editedBag1} onChange={(e) => setEditedBag1(e.target.checked)} className="rounded border-white/10 bg-slate-950 text-emerald-500 focus:ring-0 focus:ring-offset-0" />
                        Item Pessoal (Mochila) Incluso
                      </label>
                      <label className="flex items-center gap-2.5 text-xs font-bold text-slate-200 cursor-pointer">
                        <input type="checkbox" checked={editedBag2} onChange={(e) => setEditedBag2(e.target.checked)} className="rounded border-white/10 bg-slate-950 text-emerald-500 focus:ring-0 focus:ring-offset-0" />
                        Mala de Bordo (10kg) Inclusa
                      </label>
                      <label className="flex items-center gap-2.5 text-xs font-bold text-slate-200 cursor-pointer">
                        <input type="checkbox" checked={editedBag3} onChange={(e) => setEditedBag3(e.target.checked)} className="rounded border-white/10 bg-slate-950 text-emerald-500 focus:ring-0 focus:ring-offset-0" />
                        Mala Despachada (23kg) Inclusa
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="text-[9px] font-black tracking-wider text-slate-400 uppercase block mb-1">Data/Hora da Consulta</label>
                    <input 
                      type="text" 
                      value={editedLastResearched} 
                      onChange={(e) => setEditedLastResearched(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white font-bold focus:outline-none focus:border-[#c084fc]"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2.5">
                  <button 
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 hover:bg-white/5 text-slate-300 font-bold border border-white/10 rounded-xl text-[10px] uppercase tracking-wider"
                  >
                    Cancelar
                  </button>
                  <button 
                    onClick={handleSave}
                    className="flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 px-5 py-2 font-black rounded-xl text-[10px] uppercase tracking-widest text-slate-950"
                  >
                    <Check className="w-3.5 h-3.5" />
                    Salvar
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
