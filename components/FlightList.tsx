
import React from 'react';
import { 
  Plane, 
  PlaneTakeoff, 
  PlaneLanding, 
  Clock, 
  Users, 
  Luggage, 
  CreditCard, 
  CloudSun, 
  ThermometerSun, 
  Droplets, 
  AlertCircle,
  QrCode,
  Info,
  BellRing,
  Briefcase,
  ShieldCheck,
  Check,
  Bus
} from 'lucide-react';

interface Passenger {
  name: string;
  ticketNumber?: string;
  doc?: string;
  cpf?: string;
}

interface WeatherForecast {
  tempMax: number;
  tempMin: number;
  feelsLike: number;
  humidity: number;
  rainProb: number;
  condition: string;
}

interface FlightLeg {
  flightNumber: string;
  airline: string;
  aircraft?: string;
  departure: {
    code: string;
    city: string;
    time: string;
    date: string;
    brasiliaTime?: string;
  };
  arrival: {
    code: string;
    city: string;
    time: string;
    date: string;
    brasiliaTime?: string;
  };
  duration: string;
  layover?: string;
  checkInTime?: string;
  weatherDeparture?: WeatherForecast;
  weatherArrival?: WeatherForecast;
}

interface Trip {
  id: string;
  type: 'ida' | 'volta' | 'interno';
  title: string;
  bookingReference: string;
  provider: string;
  passengers: Passenger[];
  legs: FlightLeg[];
  baggage: string;
  financials?: {
    total: string;
    installments?: string;
    status: string;
  };
}

// MOCKED WEATHER DATA - JANEIRO/FEVEREIRO 2026 (VERÃO)
const WEATHER_SP: WeatherForecast = { tempMax: 29, tempMin: 21, feelsLike: 32, humidity: 75, rainProb: 60, condition: "Sol com Pancadas" };
const WEATHER_JNB: WeatherForecast = { tempMax: 27, tempMin: 16, feelsLike: 29, humidity: 55, rainProb: 40, condition: "Tarde com Tempestades" };
const WEATHER_CPT: WeatherForecast = { tempMax: 28, tempMin: 17, feelsLike: 28, humidity: 50, rainProb: 5, condition: "Sol e Muito Vento" };
const WEATHER_LAD: WeatherForecast = { tempMax: 33, tempMin: 25, feelsLike: 39, humidity: 80, rainProb: 20, condition: "Muito Abafado" };

// SALVADOR / ARACAJU SPECIFIC DATA (JULHO 2026)
const SALVADOR_WEATHER_ARR: WeatherForecast = { tempMax: 27, tempMin: 22, feelsLike: 29, humidity: 78, rainProb: 15, condition: "Sol com algumas nuvens" };
const RIO_WEATHER_DEP: WeatherForecast = { tempMax: 25, tempMin: 18, feelsLike: 26, humidity: 70, rainProb: 10, condition: "Céu Limpo" };

const SALVADOR_TRIPS: Trip[] = [
  {
    id: 'ssa-ida',
    type: 'ida',
    title: 'Ida: Rio de Janeiro (GIG) → Salvador (SSA)',
    bookingReference: 'LA-KISS-91283',
    provider: 'Operado por LATAM Airlines Brasil',
    baggage: '1 bagagem de mão incluída. Bagagem despachada cobrada à parte.',
    passengers: [
      { name: 'André Victor Brito de Andrade', cpf: '126.669.667-98' },
      { name: 'Marcelly Bispo Pereira da Silva', cpf: '140.192.717-39' }
    ],
    legs: [
      {
        flightNumber: 'LA 3674',
        airline: 'LATAM Airlines Brasil',
        checkInTime: '19:45 (GIG de preferência)',
        departure: { code: 'GIG', city: 'Rio de Janeiro (Galeão)', time: '21:45', date: 'Sáb., 11 de jul.' },
        arrival: { code: 'SSA', city: 'Salvador International', time: '23:45', date: 'Sáb., 11 de jul.' },
        duration: '2h 00m',
        weatherDeparture: RIO_WEATHER_DEP,
        weatherArrival: SALVADOR_WEATHER_ARR
      }
    ]
  },
  {
    id: 'ssa-volta',
    type: 'volta',
    title: 'Volta: Salvador (SSA) → Rio de Janeiro (GIG)',
    bookingReference: 'LA-KISS-91283',
    provider: 'Operado por LATAM Airlines Brasil',
    baggage: '1 bagagem de mão incluída. Bagagem despachada cobrada à parte.',
    passengers: [
      { name: 'André Victor Brito de Andrade', cpf: '126.669.667-98' },
      { name: 'Marcelly Bispo Pereira da Silva', cpf: '140.192.717-39' }
    ],
    legs: [
      {
        flightNumber: 'LA 3673',
        airline: 'LATAM Airlines Brasil',
        checkInTime: '03:00 (SSA de madrugada)',
        departure: { code: 'SSA', city: 'Salvador International', time: '05:00', date: 'Sex., 24 de jul.' },
        arrival: { code: 'GIG', city: 'Rio de Janeiro (Galeão)', time: '07:10', date: 'Sex., 24 de jul.' },
        duration: '2h 10m',
        weatherDeparture: SALVADOR_WEATHER_ARR,
        weatherArrival: RIO_WEATHER_DEP
      }
    ]
  }
];

const TRIPS: Trip[] = [
  {
    id: 'int-ida',
    type: 'ida',
    title: 'Ida: Brasil → África do Sul',
    bookingReference: '862508329300',
    provider: 'Decolar / TAAG',
    baggage: '2 malas despachadas por adulto + Bagagem de mão',
    passengers: [
      { name: 'André Victor Brito de Andrade', ticketNumber: '1186055770451', cpf: '126.669.667-98' },
      { name: 'Marcelly Bispo Pereira da Silva', ticketNumber: '1186055770450', cpf: '140.192.717-39' }
    ],
    legs: [
      {
        flightNumber: 'DT 748',
        airline: 'TAAG Angola Airlines',
        checkInTime: '14:05 (Recomendado)',
        departure: { code: 'GRU', city: 'São Paulo', time: '18:05', date: '25/Jan/26', brasiliaTime: '18:05' },
        arrival: { code: 'NBJ', city: 'Luanda', time: '06:40', date: '26/Jan/26', brasiliaTime: '02:40' },
        duration: '8h 35m',
        layover: 'Conexão: 3h 15m em Luanda',
        weatherDeparture: WEATHER_SP,
        weatherArrival: WEATHER_LAD
      },
      {
        flightNumber: 'DT 577',
        airline: 'TAAG Angola Airlines',
        departure: { code: 'NBJ', city: 'Luanda', time: '09:55', date: '26/Jan/26', brasiliaTime: '05:55' },
        arrival: { code: 'JNB', city: 'Joanesburgo', time: '14:40', date: '26/Jan/26', brasiliaTime: '09:40' },
        duration: '3h 45m',
        weatherDeparture: WEATHER_LAD,
        weatherArrival: WEATHER_JNB
      }
    ]
  },
  {
    id: 'dom-ida',
    type: 'interno',
    title: 'Interno: Joanesburgo → Cidade do Cabo',
    bookingReference: '1108-387-389',
    provider: 'MyTrip / South African Airways',
    baggage: 'Franquia Econômica Padrão',
    financials: { total: 'R$ 1.568,97', installments: 'Parcelado', status: 'Pago' },
    passengers: [
      { name: 'André Victor Brito de Andrade', cpf: '126.669.667-98' },
      { name: 'Marcelly Bispo Pereira da Silva', cpf: '140.192.717-39' }
    ],
    legs: [
      {
        flightNumber: 'SA 363',
        airline: 'South African Airways',
        checkInTime: '16:45',
        departure: { code: 'JNB', city: 'Joanesburgo', time: '18:45', date: '26/Jan/26', brasiliaTime: '13:45' },
        arrival: { code: 'CPT', city: 'Cidade do Cabo', time: '21:00', date: '26/Jan/26', brasiliaTime: '16:00' },
        duration: '2h 15m',
        weatherDeparture: WEATHER_JNB,
        weatherArrival: WEATHER_CPT
      }
    ]
  },
  {
    id: 'dom-volta',
    type: 'interno',
    title: 'Interno: Cidade do Cabo → Joanesburgo',
    bookingReference: '1108-387-389',
    provider: 'MyTrip / South African Airways',
    baggage: 'Franquia Econômica Padrão',
    passengers: [
      { name: 'André Victor Brito de Andrade', cpf: '126.669.667-98' },
      { name: 'Marcelly Bispo Pereira da Silva', cpf: '140.192.717-39' }
    ],
    legs: [
      {
        flightNumber: 'SA 372',
        airline: 'South African Airways',
        checkInTime: '18:25',
        departure: { code: 'CPT', city: 'Cidade do Cabo', time: '20:25', date: '31/Jan/26', brasiliaTime: '15:25' },
        arrival: { code: 'JNB', city: 'Joanesburgo', time: '22:25', date: '31/Jan/26', brasiliaTime: '17:25' },
        duration: '2h 00m',
        weatherDeparture: WEATHER_CPT,
        weatherArrival: WEATHER_JNB
      }
    ]
  },
  {
    id: 'int-volta',
    type: 'volta',
    title: 'Volta: África do Sul → Brasil',
    bookingReference: '862508329300',
    provider: 'Decolar / TAAG',
    baggage: '2 malas despachadas por adulto + Bagagem de mão',
    passengers: [
      { name: 'André Victor Brito de Andrade', ticketNumber: '1186055770451', cpf: '126.669.667-98' },
      { name: 'Marcelly Bispo Pereira da Silva', ticketNumber: '1186055770450', cpf: '140.192.717-39' }
    ],
    legs: [
      {
        flightNumber: 'DT 576',
        airline: 'TAAG Angola Airlines',
        checkInTime: '21:45 (do dia anterior)',
        departure: { code: 'JNB', city: 'Joanesburgo', time: '00:45', date: '06/Fev/26', brasiliaTime: '19:45 (05/Fev)' },
        arrival: { code: 'NBJ', city: 'Luanda', time: '03:30', date: '06/Fev/26', brasiliaTime: '23:30 (05/Fev)' },
        duration: '3h 45m',
        layover: 'Conexão: 7h 05m em Luanda',
        weatherDeparture: WEATHER_JNB,
        weatherArrival: WEATHER_LAD
      },
      {
        flightNumber: 'DT 747',
        airline: 'TAAG Angola Airlines',
        departure: { code: 'NBJ', city: 'Luanda', time: '10:35', date: '06/Fev/26', brasiliaTime: '06:35' },
        arrival: { code: 'GRU', city: 'São Paulo', time: '15:05', date: '06/Fev/26', brasiliaTime: '15:05' },
        duration: '8h 30m',
        weatherDeparture: WEATHER_LAD,
        weatherArrival: WEATHER_SP
      }
    ]
  }
];

const WeatherWidget: React.FC<{ weather: WeatherForecast, label: string }> = ({ weather, label }) => (
  <div className="bg-white/50 rounded-lg p-2 text-xs flex flex-col items-center border border-gray-100 min-w-[80px]">
    <span className="font-bold text-gray-500 mb-1">{label}</span>
    <div className="flex items-center gap-1 mb-1">
      {weather.rainProb > 40 ? <Droplets className="w-4 h-4 text-blue-500" /> : <CloudSun className="w-4 h-4 text-amber-500" />}
      <span className="font-bold text-lg">{weather.tempMax}°</span>
    </div>
    <div className="flex flex-col gap-0.5 w-full text-[10px] text-gray-600">
      <div className="flex justify-between"><span>Min:</span> <span className="font-medium">{weather.tempMin}°</span></div>
      <div className="flex justify-between text-orange-600"><ThermometerSun className="w-3 h-3" /> <span className="font-medium">{weather.feelsLike}°</span></div>
      <div className="flex justify-between text-blue-600"><Droplets className="w-3 h-3" /> <span className="font-medium">{weather.rainProb}%</span></div>
    </div>
  </div>
);

const FlightList: React.FC = () => {
  const [selectedTrip, setSelectedTrip] = React.useState<any>(null);
  const [activeTab, setActiveTab] = React.useState<'ida' | 'volta'>('ida');

  React.useEffect(() => {
    const saved = localStorage.getItem('selected_trip');
    if (saved) {
      try {
        setSelectedTrip(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  const isSalvadorAracaju = selectedTrip?.id === 'am_ssa_aju' || selectedTrip?.id === 'am_sp_ssa_aju';

  if (isSalvadorAracaju) {
    const rawFlight = activeTab === 'ida' ? SALVADOR_TRIPS[0] : SALVADOR_TRIPS[1];
    const isSPRoute = selectedTrip?.id === 'am_sp_ssa_aju';
    const activeFlight = React.useMemo(() => {
      if (!isSPRoute) return rawFlight;
      const adapted = JSON.parse(JSON.stringify(rawFlight));
      if (activeTab === 'ida') {
        adapted.title = 'Ida: São Paulo (GRU) → Salvador (SSA)';
        adapted.legs[0].flightNumber = 'AD 2310';
        adapted.legs[0].airline = 'Azul Linhas Aéreas';
        adapted.legs[0].checkInTime = '04:15 (GRU de preferência)';
        adapted.legs[0].departure = { code: 'GRU', city: 'São Paulo (Guarulhos)', time: '06:15', date: 'Sex., 10 de jul.' };
        adapted.legs[0].arrival = { code: 'SSA', city: 'Salvador International', time: '08:40', date: 'Sex., 10 de jul.' };
        adapted.legs[0].duration = '2h 25m';
      } else {
        adapted.title = 'Volta: Salvador (SSA) → São Paulo (GRU)';
        adapted.legs[0].flightNumber = 'AD 4211';
        adapted.legs[0].airline = 'Azul Linhas Aéreas';
        adapted.legs[0].checkInTime = '14:00 (SSA)';
        adapted.legs[0].departure = { code: 'SSA', city: 'Salvador International', time: '16:00', date: 'Sex., 24 de jul.' };
        adapted.legs[0].arrival = { code: 'GRU', city: 'São Paulo (Guarulhos)', time: '18:15', date: 'Sex., 24 de jul.' };
        adapted.legs[0].duration = '2h 15m';
      }
      return adapted;
    }, [rawFlight, isSPRoute, activeTab]);

    const leg = activeFlight.legs[0];
    const displayPrice = isSPRoute ? '1.100' : '618';

    return (
      <div className="space-y-6">
        {/* GOLD STANDARD ULTRA-PREMIUM FLIGHT CARD CONTAINER */}
        <div id="flight_gold_card" className="bg-[#0b0f19] border border-slate-800 rounded-[32px] p-6 text-white shadow-2xl relative overflow-hidden">
          
          {/* Header Layout Grid */}
          <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
            <div>
              <div className="flex items-center gap-1.5 text-emerald-400 text-[10px] font-black uppercase tracking-widest mb-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                ROTEIRO ATIVO DEDICADO
              </div>
              <h2 className="text-2xl font-display font-black text-white tracking-tight uppercase">
                {isSPRoute ? 'SÃO PAULO + SALVADOR + ARACAJÚ' : 'SALVADOR + ARACAJÚ'}
              </h2>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="bg-[#15233c] text-[#5582f3] text-[9.5px] font-black uppercase px-2 py-0.5 rounded tracking-wider">MAPA COORDENADO</span>
                <span className="text-xs text-slate-400 font-bold tracking-wide">{leg.departure.code} ➔ {leg.arrival.code}</span>
              </div>
            </div>

            {/* Passagem Praticada Box */}
            <div className="bg-[#111827] border border-slate-800 rounded-2xl p-4 w-full md:w-auto min-w-[280px]">
              <div className="flex justify-between items-start gap-3">
                <div>
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">PASSAGEM PRATICADA</span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="text-sm font-black text-emerald-400">R$</span>
                    <span className="text-3xl font-display font-black text-white tracking-tight">{displayPrice}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium">Valores por passageiro</span>
                </div>
                <div className="text-right space-y-1">
                  <span className="inline-block bg-[#10b981]/15 text-[#10b981] text-[9px] font-black uppercase px-2 py-0.5 rounded border border-[#10b981]/15 tracking-wider">CONSULTADO SUCESSO</span>
                  <p className="text-[9px] text-slate-500 font-medium font-mono">Atualizado: Hoje às 12:45</p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Navigation/Direction Tabs */}
          <div className="grid grid-cols-2 gap-3 mb-6 bg-[#090d16] p-1.5 rounded-2xl border border-slate-900">
            <button 
              id="tab_ida_btn"
              onClick={() => setActiveTab('ida')}
              className={`flex items-center justify-center gap-2 py-3 rounded-xl transition-all font-black text-xs uppercase tracking-wider ${activeTab === 'ida' ? 'bg-[#00c58e] text-slate-950 font-black shadow-lg shadow-[#00c58e]/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
            >
              <PlaneTakeoff className="w-4 h-4" /> SENTIDO IDA: {isSPRoute ? '10 JUL' : '11 JUL'}
            </button>
            <button 
              id="tab_volta_btn"
              onClick={() => setActiveTab('volta')}
              className={`flex items-center justify-center gap-2 py-3 rounded-xl transition-all font-black text-xs uppercase tracking-wider ${activeTab === 'volta' ? 'bg-[#00c58e] text-slate-950 font-black shadow-lg shadow-[#00c58e]/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
            >
              <PlaneLanding className="w-4 h-4" /> SENTIDO VOLTA: 24 JUL
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left Box: Timeline details */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest font-mono">LINHA DO TEMPO DA VIAGEM</span>
                  <div className="flex items-center gap-1.5 text-[#00c58e]">
                    <span className="w-2 h-2 rounded-full bg-[#00c58e] animate-pulse"></span>
                    <span className="text-[10px] font-black uppercase tracking-widest">VOO DIRETO SEM ESCALAS</span>
                  </div>
                </div>

                {/* Vertical timeline detail matching design */}
                <div className="bg-[#111827] rounded-[24px] border border-slate-800 p-5 relative overflow-hidden mb-4 animate-in fade-in duration-350">
                  <div className="flex items-center gap-2.5 mb-5 flex-wrap">
                    <span className="bg-black text-white px-3 py-1 rounded-lg text-[10px] font-black font-mono tracking-wider border border-slate-850">{leg.flightNumber}</span>
                    <span className="text-slate-400 text-xs font-bold uppercase tracking-wide">{leg.airline}</span>
                    <span className="text-slate-500 text-[11px] font-medium ml-auto flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {leg.duration}
                    </span>
                  </div>

                  {/* Time columns & vertical flow line */}
                  <div className="flex items-stretch gap-6 pl-1">
                    {/* Vertical line indicator */}
                    <div className="flex flex-col items-center">
                      <div className="w-3.5 h-3.5 rounded-full bg-[#00c58e] border-[3px] border-[#111827] ring-4 ring-[#00c58e]/20"></div>
                      <div className="flex-1 w-0.5 bg-gradient-to-b from-[#00c58e] to-rose-500 border-dashed border-l border-slate-700 my-1"></div>
                      <div className="w-3.5 h-3.5 rounded-full bg-rose-500 border-[3px] border-[#111827] ring-4 ring-rose-500/20"></div>
                    </div>

                    <div className="flex-1 grid grid-cols-2 gap-4">
                      {/* Departure */}
                      <div className="space-y-1">
                        <span className="text-[9px] font-black text-rose-500 uppercase tracking-widest block">PARTIDA</span>
                        <div className="flex items-baseline gap-1.5 flex-wrap">
                          <span className="text-2xl font-black text-white leading-none">{leg.departure.time}</span>
                          <span className="text-sm font-black text-slate-400">{leg.departure.code}</span>
                        </div>
                        <p className="text-slate-500 text-[11px] font-semibold leading-tight">{leg.departure.city}</p>
                        <p className="text-slate-500 text-[9px] font-medium font-mono">{leg.departure.date}</p>
                      </div>

                      {/* Arrival */}
                      <div className="space-y-1 pl-4 border-l border-slate-850">
                        <span className="text-[9px] font-black text-[#00c58e] uppercase tracking-widest block">CHEGADA</span>
                        <div className="flex items-baseline gap-1.5 flex-wrap">
                          <span className="text-2xl font-black text-white leading-none">{leg.arrival.time}</span>
                          <span className="text-sm font-black text-slate-400">{leg.arrival.code}</span>
                        </div>
                        <p className="text-slate-500 text-[11px] font-semibold leading-tight">{leg.arrival.city}</p>
                        <p className="text-slate-500 text-[9px] font-medium font-mono">{leg.arrival.date}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Vertical Bus Connection Pathway Connector */}
                <div className="flex flex-col items-center my-3 relative">
                  <div className="h-4 w-0.5 border-dashed border-l-2 border-slate-700"></div>
                  <div className="bg-slate-900 border border-slate-800 px-3.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest text-orange-400 shrink-0 font-mono flex items-center gap-1">
                    <Bus className="w-3 h-3 text-orange-400" /> CONEXÃO RODOVIÁRIA (ÁGUIA BRANCA)
                  </div>
                  <div className="h-4 w-0.5 border-dashed border-l-2 border-slate-700"></div>
                </div>

                {/* BUS CONNECTION DETAIL CARD */}
                <div className="bg-[#111827] border border-orange-500/10 rounded-[24px] p-5 relative overflow-hidden mb-4 animate-in slide-in-from-bottom duration-300">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-3xl pointer-events-none"></div>

                  <div className="flex items-center gap-2.5 mb-5 flex-wrap">
                    <span className="bg-orange-500/10 text-orange-400 border border-orange-500/25 px-2.5 py-1 rounded-lg text-[9px] font-black tracking-wider uppercase flex items-center gap-1.5 font-mono">
                      BUS • ÁGUIA BRANCA
                    </span>
                    <span className="text-slate-400 text-xs font-bold uppercase tracking-wide">Viação Águia Branca</span>
                    <span className="text-orange-400 text-xs font-black ml-auto flex items-center gap-1 font-mono">
                      <Clock className="w-3.5 h-3.5" /> 5h 25m
                    </span>
                  </div>

                  {activeTab === 'ida' ? (
                    <div className="flex items-stretch gap-6 pl-1">
                      {/* Vertical line indicator */}
                      <div className="flex flex-col items-center">
                        <div className="w-3.5 h-3.5 rounded-full bg-orange-500 border-[3px] border-[#111827] ring-4 ring-orange-500/20"></div>
                        <div className="flex-1 w-0.5 bg-gradient-to-b from-orange-500 to-amber-500 border-dashed border-l border-slate-700 my-1"></div>
                        <div className="w-3.5 h-3.5 rounded-full bg-amber-500 border-[3px] border-[#111827] ring-4 ring-amber-500/20"></div>
                      </div>

                      <div className="flex-1 grid grid-cols-2 gap-4">
                        {/* Departure (Salvador) */}
                        <div className="space-y-1">
                          <span className="text-[9px] font-black text-orange-400 uppercase tracking-widest block">EMBARQUE SALVADOR</span>
                          <div className="flex items-baseline gap-1.5 flex-wrap">
                            <span className="text-2xl font-black text-white leading-none">06:40</span>
                            <span className="text-xs font-bold text-slate-400">SSA</span>
                          </div>
                          <p className="text-slate-500 text-[11px] font-semibold leading-tight">Terminal Rodoviário de Salvador</p>
                          <p className="text-slate-500 text-[9px] font-medium font-mono">14 de jul. de 2026 (Terça-feira)</p>
                        </div>

                        {/* Arrival (Aracaju) */}
                        <div className="space-y-1 pl-4 border-l border-slate-850">
                          <span className="text-[9px] font-black text-amber-400 uppercase tracking-widest block">DESEMBARQUE ARACAJU</span>
                          <div className="flex items-baseline gap-1.5 flex-wrap">
                            <span className="text-2xl font-black text-white leading-none">12:05</span>
                            <span className="text-xs font-bold text-slate-400">AJU</span>
                          </div>
                          <p className="text-slate-500 text-[11px] font-semibold leading-tight">Terminal Rodoviário de Aracaju</p>
                          <p className="text-slate-500 text-[9px] font-medium font-mono">14 de jul. de 2026 (Terça-feira)</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-stretch gap-6 pl-1">
                      {/* Vertical line indicator */}
                      <div className="flex flex-col items-center">
                        <div className="w-3.5 h-3.5 rounded-full bg-orange-400 border-[3px] border-[#111827] ring-4 ring-orange-400/20"></div>
                        <div className="flex-1 w-0.5 bg-gradient-to-b from-orange-400 to-orange-500 border-dashed border-l border-slate-700 my-1"></div>
                        <div className="w-3.5 h-3.5 rounded-full bg-orange-500 border-[3px] border-[#111827] ring-4 ring-orange-500/20"></div>
                      </div>

                      <div className="flex-1 grid grid-cols-2 gap-4">
                        {/* Departure (Aracaju) */}
                        <div className="space-y-1">
                          <span className="text-[9px] font-black text-orange-400 uppercase tracking-widest block">EMBARQUE ARACAJU</span>
                          <div className="flex items-baseline gap-1.5 flex-wrap">
                            <span className="text-2xl font-black text-white leading-none">07:00</span>
                            <span className="text-xs font-bold text-slate-400">AJU</span>
                          </div>
                          <p className="text-slate-500 text-[11px] font-semibold leading-tight">Terminal Rodoviário de Aracaju</p>
                          <p className="text-slate-500 text-[9px] font-medium font-mono">21 de jul. de 2026 (Terça-feira)</p>
                        </div>

                        {/* Arrival (Salvador) */}
                        <div className="space-y-1 pl-4 border-l border-slate-850">
                          <span className="text-[9px] font-black text-orange-500 uppercase tracking-widest block">DESEMBARQUE SALVADOR</span>
                          <div className="flex items-baseline gap-1.5 flex-wrap">
                            <span className="text-2xl font-black text-white leading-none">12:25</span>
                            <span className="text-xs font-bold text-slate-400">SSA</span>
                          </div>
                          <p className="text-slate-500 text-[11px] font-semibold leading-tight">Terminal Rodoviário de Salvador</p>
                          <p className="text-slate-500 text-[9px] font-medium font-mono">21 de jul. de 2026 (Terça-feira)</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Seat and pricing details matching screenshot */}
                  <div className="mt-5 pt-4 border-t border-slate-800 flex justify-between items-center text-xs flex-wrap gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] uppercase font-black text-slate-500 tracking-wider font-mono">ACOMODAÇÃO:</span>
                      <span className="font-extrabold text-white flex items-center gap-1">
                        SEMILEITO <span className="bg-[#1e293b] text-orange-400 border border-slate-700 text-[9.5px] px-2 py-0.5 rounded font-black font-mono">POLTRONA 17</span>
                      </span>
                    </div>
                    <div className="text-right flex items-center gap-2 ml-auto">
                      <span className="text-[9px] uppercase font-black text-slate-500 tracking-wider font-mono">PASSAGEM COM TAXAS:</span>
                      <p className="font-display font-black text-orange-400 text-sm">R$ 109,19</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Weather info for ports */}
              <div className="grid grid-cols-2 gap-3">
                {leg.weatherDeparture && (
                  <div className="bg-[#111827] border border-slate-800 rounded-2xl p-3 text-xs">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-bold text-slate-500 uppercase">Clima {leg.departure.code}</span>
                      <span className="text-xs">{leg.weatherDeparture.condition}</span>
                    </div>
                    <div className="flex items-baseline gap-1 text-white">
                      <span className="text-base font-black">{leg.weatherDeparture.tempMax}°C</span>
                      <span className="text-[10px] text-slate-500">Sensação {leg.weatherDeparture.feelsLike}°C</span>
                    </div>
                  </div>
                )}
                {leg.weatherArrival && (
                  <div className="bg-[#111827] border border-slate-800 rounded-2xl p-3 text-xs">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-bold text-slate-500 uppercase">Clima {leg.arrival.code}</span>
                      <span className="text-xs">{leg.weatherArrival.condition}</span>
                    </div>
                    <div className="flex items-baseline gap-1 text-white">
                      <span className="text-base font-black">{leg.weatherArrival.tempMax}°C</span>
                      <span className="text-[10px] text-slate-500">Sensação {leg.weatherArrival.feelsLike}°C</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Box: Baggage limits Panel */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div className="bg-[#111827]/65 border border-slate-800 rounded-[24px] p-5 space-y-4">
                <div className="flex items-center gap-2.5 text-slate-300">
                  <Luggage className="w-5 h-5 text-[#00c58e]" />
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-wider text-white">BAGAGENS INCLUSAS</h4>
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">FRANQUIA POR BILHETE</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {/* Laptop/Mochila item */}
                  <div className="bg-[#090d16] rounded-xl border border-slate-800/80 p-3.5 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-slate-950 flex items-center justify-center text-[#00c58e] border border-slate-850">
                        <Briefcase className="w-4 h-4" />
                      </div>
                      <div>
                        <h5 className="font-bold text-xs text-slate-200">Artigo Pessoal (Mochila)</h5>
                        <p className="text-[10px] text-slate-500">Sob assento</p>
                      </div>
                    </div>
                    <span className="bg-[#10b981]/15 text-[#10b981] text-[9px] font-black px-2 py-1 rounded tracking-wider border border-[#10b981]/20">INCLUSO</span>
                  </div>

                  {/* Cabin bag (10kg) */}
                  <div className="bg-[#090d16] rounded-xl border border-slate-800/80 p-3.5 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-slate-950 flex items-center justify-center text-[#00c58e] border border-slate-850">
                        <Luggage className="w-4 h-4" />
                      </div>
                      <div>
                        <h5 className="font-bold text-xs text-slate-200">Bagagem de Mão (10kg)</h5>
                        <p className="text-[10px] text-slate-500">Compartimento superior</p>
                      </div>
                    </div>
                    <span className="bg-[#10b981]/15 text-[#10b981] text-[9px] font-black px-2 py-1 rounded tracking-wider border border-[#10b981]/20">INCLUSO</span>
                  </div>

                  {/* Checked bag (23kg) - NO INC */}
                  <div className="bg-[#090d16] rounded-xl border border-slate-800/80 p-3.5 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-slate-950 flex items-center justify-center text-rose-500 border border-slate-850">
                        <Luggage className="w-4 h-4" />
                      </div>
                      <div>
                        <h5 className="font-bold text-xs text-slate-200">Mala Despachada (23kg)</h5>
                        <p className="text-[10px] text-slate-500">Despacho opcional no aeroporto</p>
                      </div>
                    </div>
                    <span className="bg-rose-500/15 text-rose-500 text-[9px] font-black px-2 py-1 rounded tracking-wider border border-rose-500/20">NÃO INC</span>
                  </div>
                </div>

                {/* Baggage notice at the bottom */}
                <div className="pt-2 flex gap-2 items-start text-[10px] text-slate-400 font-medium leading-relaxed">
                  <Check className="w-4 h-4 text-[#00c58e] shrink-0 mt-0.5" />
                  <p>Valores e bagagens simulados via tarifas consolidadas pela inteligência. Emissão garantida sem nenhuma cobrança surpresa no balcão.</p>
                </div>
              </div>

              {/* Passenger list check */}
              <div className="mt-4 bg-[#111827] border border-slate-800 rounded-2xl p-4 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-slate-400">
                  <Users className="w-4 h-4 text-[#00c58e]" />
                  <span>Passageiros: <strong className="text-white">André & Marcelly</strong></span>
                </div>
                <span className="text-[10px] bg-slate-800 text-slate-300 font-mono px-2 py-0.5 rounded">Voo Confirmado</span>
              </div>
            </div>
          </div>

          {/* Action button at bottom */}
          <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-[10.5px] text-slate-400 font-semibold">Localizador da Reserva: <strong className="font-mono text-white text-xs ml-1 bg-slate-800 px-2.5 py-1 rounded">{activeFlight.bookingReference}</strong></span>
            <button 
              id="edit_ticket_btn"
              onClick={() => alert('Para editar dados do bilhete, entre em contato com kiss&fly ou agência parceira.')}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 border border-slate-700 hover:border-slate-500 rounded-xl transition-all font-black text-xs uppercase tracking-wider text-slate-300 hover:text-white bg-slate-900"
            >
              EDITAR DADOS DO BILHETE
            </button>
          </div>
        </div>

        {/* Dynamic price list widget */}
        <div className="bg-[#0b0f19] border border-slate-800 rounded-[32px] p-6 text-white shadow-xl space-y-6">
          <div>
            <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest block mb-1">Cotação Atualizada (Passagem Ida e Volta GIG ⇆ SSA)</span>
            <h2 className="text-2xl font-display font-black text-white">Compare Opções de Reserva</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-2.5xl border border-[#00c58e]/30">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-xs font-bold font-mono">KF</div>
                <div>
                  <h4 className="font-bold text-sm">kiss&fly</h4>
                  <p className="text-[10px] text-slate-400">Melhor tarifa total garantida</p>
                </div>
              </div>
              <div className="text-right flex items-center gap-3">
                <span className="font-display font-black text-emerald-400 text-base">R$ 618,00</span>
                <span className="bg-emerald-500 text-slate-950 px-2 py-0.5 rounded-lg text-[8px] font-black uppercase tracking-wider">RESERVA</span>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-[#111827] rounded-2.5xl border border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-rose-500 flex items-center justify-center text-xs font-bold text-white font-mono">LA</div>
                <div>
                  <h4 className="font-bold text-sm">LATAM</h4>
                  <p className="text-[10px] text-slate-400">Companhia Aérea</p>
                </div>
              </div>
              <div className="text-right flex items-center gap-3">
                <span className="font-display font-bold text-slate-300">R$ 659,00</span>
                <span className="bg-white/5 text-white px-2 py-0.5 rounded-lg text-[8px] font-bold uppercase tracking-wider">COTAR</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentTrips = isSalvadorAracaju ? SALVADOR_TRIPS : TRIPS;

  return (
    <div className="space-y-6">
      {currentTrips.map((trip) => (
        <div key={trip.id} className={`rounded-3xl border-2 overflow-hidden shadow-sm ${trip.type === 'ida' ? 'bg-blue-50 border-blue-200' : trip.type === 'volta' ? 'bg-orange-50 border-orange-200' : 'bg-gray-50 border-gray-200'}`}>
          <div className={`p-4 border-b border-dashed ${trip.type === 'ida' ? 'border-blue-200 bg-blue-100/50' : trip.type === 'volta' ? 'border-orange-200 bg-orange-100/50' : 'border-gray-200 bg-gray-100'}`}>
            <div className="flex items-center justify-between mb-2">
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${trip.type === 'ida' ? 'bg-blue-600 text-white' : trip.type === 'volta' ? 'bg-orange-500 text-white' : 'bg-gray-600 text-white'}`}>{trip.type === 'ida' ? 'Ida' : trip.type === 'volta' ? 'Volta' : 'Interno'}</span>
              <span className="font-mono font-bold text-xs text-gray-400">REF: {trip.bookingReference}</span>
            </div>
            <h3 className="font-display font-bold text-lg text-slate-800 flex items-center gap-2">{trip.type === 'ida' ? <PlaneTakeoff className="text-blue-600" /> : <PlaneLanding className="text-orange-600" />} {trip.title}</h3>
          </div>
          <div className="p-4 space-y-6">
            {trip.legs.map((leg, idx) => (
              <div key={idx} className="relative pl-4 border-l-2 border-dashed border-gray-300">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-4 border-green-500"></div>
                <div className="mb-2 flex justify-between items-center"><span className="text-xs font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded">{leg.airline} - {leg.flightNumber}</span><span className="text-xs text-gray-400 flex items-center gap-1"><Clock className="w-3 h-3" /> {leg.duration}</span></div>
                <div className="grid grid-cols-[1fr,auto,1fr] gap-2 items-center mb-4 text-center">
                  <div><p className="text-2xl font-display font-black text-slate-800">{leg.departure.code}</p><p className="text-xs font-bold text-gray-600">{leg.departure.time}</p></div>
                  <Plane className="w-4 h-4 text-gray-300 rotate-90" />
                  <div><p className="text-2xl font-display font-black text-slate-800">{leg.arrival.code}</p><p className="text-xs font-bold text-gray-600">{leg.arrival.time}</p></div>
                </div>
                {(leg.weatherDeparture || leg.weatherArrival) && (
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {leg.weatherDeparture && <WeatherWidget weather={leg.weatherDeparture} label={leg.departure.code} />}
                    {leg.weatherArrival && <WeatherWidget weather={leg.weatherArrival} label={leg.arrival.code} />}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="bg-white p-4 border-t border-gray-100 text-xs space-y-2">
            <div className="flex items-start gap-2 text-gray-500"><Users className="w-4 h-4" /> <span>{trip.passengers.map(p => p.name).join(' & ')}</span></div>
            <div className="flex items-center gap-2 text-gray-500"><Luggage className="w-4 h-4" /> <span>{trip.baggage}</span></div>
          </div>
        </div>
      ))}

      {isSalvadorAracaju && (
        <div className="bg-slate-900 border border-white/10 rounded-[32px] p-6 text-white shadow-xl space-y-6 mt-8">
          <div>
            <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest block mb-1">Cotação Updated (Passagem GIG ⇆ SSA)</span>
            <h2 className="text-2xl font-display font-black text-white">Compare Opções de Reserva</h2>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-2.5xl border border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-xs font-bold">KF</div>
                <div>
                  <h4 className="font-bold text-sm">kiss&fly</h4>
                  <p className="text-[10px] text-slate-400">Operadora Recomendada (Melhor tarifa total)</p>
                </div>
              </div>
              <div className="text-right flex items-center gap-3">
                <span className="font-display font-black text-emerald-400">R$ 618,00</span>
                <span className="bg-emerald-500 text-slate-950 px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider">RESERVAR</span>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-white/5 rounded-2.5xl border border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-rose-500 flex items-center justify-center text-xs font-bold text-white">LA</div>
                <div>
                  <h4 className="font-bold text-sm">LATAM</h4>
                  <p className="text-[10px] text-slate-400">Companhia Aérea</p>
                </div>
              </div>
              <div className="text-right flex items-center gap-3">
                <span className="font-display font-bold text-slate-300">R$ 659,00</span>
                <span className="bg-white/10 text-white px-2.5 py-1 rounded-lg text-[9px] font-bold uppercase tracking-wider">COTAR</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightList;
