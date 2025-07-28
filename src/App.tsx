import React, { useState } from 'react';
import { CheckIcon, StarIcon, CrownIcon, UserIcon, ClockIcon, SearchIcon, ShieldCheckIcon, HeartHandshakeIcon, Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin, Menu, X, ArrowRight, PlusIcon, HomeIcon, WrenchIcon, ZapIcon, Brush, SparklesIcon, HammerIcon, StarIcon as RatingIcon } from 'lucide-react';

interface Plan {
  id: string;
  name: string;
  price: number;
  period: string;
  orderLimit: number | null;
  isPopular?: boolean;
  isPremium?: boolean;
  features: string[];
  color: string;
  icon: React.ReactNode;
}

const plans: Plan[] = [
  {
    id: 'starter',
    name: 'Стартовий',
    price: 0,
    period: 'безкоштовно',
    orderLimit: 10,
    features: [
      '10 замовлень на місяць',
      'Базовий профіль майстра',
      'Можливість отримувати відгуки',
      'Доступ до каталогу послуг',
      'Базова підтримка',
      'Мобільний додаток'
    ],
    color: 'from-gray-50 to-gray-100 border-gray-200',
    icon: <UserIcon className="w-8 h-8 text-gray-600" />
  },
  {
    id: 'basic',
    name: 'Базовий',
    price: 299,
    period: 'на місяць',
    orderLimit: 100,
    isPopular: true,
    features: [
      '100 замовлень на місяць',
      'Розширений профіль з фото робіт',
      'Календар записів',
      'Аналітика та статистика',
      'Промо-інструменти',
      'Пріоритетна підтримка',
      'Інтеграція з соцмережами',
      'Сповіщення про нові замовлення'
    ],
    color: 'from-blue-50 to-indigo-100 border-blue-200',
    icon: <StarIcon className="w-8 h-8 text-blue-600" />
  },
  {
    id: 'premium',
    name: 'Преміум',
    price: 599,
    period: 'на місяць',
    orderLimit: null,
    isPremium: true,
    features: [
      'Безлімітні замовлення',
      'Пріоритетна видача в пошуку',
      'VIP профіль з відзнакою',
      'Персональний менеджер',
      'Розширена аналітика',
      'Автоматичні нагадування клієнтам',
      'Інтеграція з CRM системами',
      '24/7 підтримка',
      'Можливість створювати акції',
      'Власний URL профілю'
    ],
    color: 'from-purple-50 to-pink-100 border-purple-200',
    icon: <CrownIcon className="w-8 h-8 text-purple-600" />
  }
];

// Services data
const services = [
  { id: 1, name: 'Повішення картин', icon: <Brush className="w-8 h-8" />, color: 'from-red-500 to-pink-500' },
  { id: 2, name: 'Сантехнічні роботи', icon: <WrenchIcon className="w-8 h-8" />, color: 'from-blue-500 to-cyan-500' },
  { id: 3, name: 'Електричні роботи', icon: <ZapIcon className="w-8 h-8" />, color: 'from-yellow-500 to-orange-500' },
  { id: 4, name: 'Збірка меблів', icon: <HammerIcon className="w-8 h-8" />, color: 'from-green-500 to-emerald-500' },
  { id: 5, name: 'Прибирання', icon: <SparklesIcon className="w-8 h-8" />, color: 'from-purple-500 to-violet-500' },
  { id: 6, name: 'Дрібний ремонт', icon: <HomeIcon className="w-8 h-8" />, color: 'from-indigo-500 to-blue-500' }
];

// Masters data
const masters = [
  {
    id: 1,
    name: 'Олександр Петренко',
    rating: 4.9,
    reviews: 127,
    specialty: 'Сантехнік',
    price: 450,
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    verified: true
  },
  {
    id: 2,
    name: 'Марія Коваленко',
    rating: 4.8,
    reviews: 89,
    specialty: 'Електрик',
    price: 380,
    photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    verified: true
  },
  {
    id: 3,
    name: 'Дмитро Іваненко',
    rating: 4.7,
    reviews: 156,
    specialty: 'Столяр',
    price: 520,
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    verified: false
  }
];

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'home' | 'services' | 'masters' | 'pricing'>('home');
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showComparison, setShowComparison] = useState(false);
  const [showRegistration, setShowRegistration] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    service: '',
    address: '',
    budget: ''
  });
  const [registrationData, setRegistrationData] = useState({
    name: '',
    email: '',
    phone: '',
    specialty: '',
    plan: ''
  });

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    setRegistrationData(prev => ({ ...prev, plan: planId }));
    setShowRegistration(true);
  };

  const handleRegistrationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Реєстрація:', registrationData);
    alert(`Дякуємо за реєстрацію, ${registrationData.name}! Ви обрали план: ${registrationData.plan}`);
    setShowRegistration(false);
    setRegistrationData({
      name: '',
      email: '',
      phone: '',
      specialty: '',
      plan: ''
    });
  };

  const handleTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Створено завдання:', taskData);
    alert(`Завдання "${taskData.title}" успішно створено!`);
    setShowTaskModal(false);
    setTaskData({
      title: '',
      description: '',
      service: '',
      address: '',
      budget: ''
    });
  };

  const handleServiceSelect = (serviceId: number) => {
    setSelectedService(serviceId);
    const service = services.find(s => s.id === serviceId);
    if (service) {
      setTaskData(prev => ({ ...prev, service: service.name }));
      setShowTaskModal(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setCurrentView('home')}>
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <HeartHandshakeIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  HandyHelper
                </h1>
                <p className="text-sm text-gray-600">Пошук майстрів для побутових робіт</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <button 
                onClick={() => setCurrentView('home')}
                className={`transition-colors ${currentView === 'home' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
              >
                Головна
              </button>
              <button 
                onClick={() => setCurrentView('services')}
                className={`transition-colors ${currentView === 'services' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
              >
                Послуги
              </button>
              <button 
                onClick={() => setCurrentView('masters')}
                className={`transition-colors ${currentView === 'masters' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
              >
                Майстри
              </button>
              <button 
                onClick={() => setCurrentView('pricing')}
                className={`transition-colors ${currentView === 'pricing' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
              >
                Тарифи
              </button>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Увійти
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      {currentView === 'home' && (
        <>
          {/* Hero Section */}
          <section className="py-20 px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Знайди <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">майстра</span> легко
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Швидкий пошук надійних майстрів для будь-яких побутових робіт. 
                Перевірені фахівці, прозорі ціни, гарантія якості.
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
                <button 
                  onClick={() => setCurrentView('services')}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Знайти майстра
                </button>
                <button 
                  onClick={() => setCurrentView('pricing')}
                  className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300"
                >
                  Стати майстром
                </button>
              </div>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <div className="flex items-center text-green-600">
                  <CheckIcon className="w-5 h-5 mr-2" />
                  <span>Перевірені майстри</span>
                </div>
                <div className="flex items-center text-green-600">
                  <ShieldCheckIcon className="w-5 h-5 mr-2" />
                  <span>Гарантія якості</span>
                </div>
                <div className="flex items-center text-green-600">
                  <ClockIcon className="w-5 h-5 mr-2" />
                  <span>Швидкий відгук</span>
                </div>
              </div>
            </div>
          </section>

          {/* Services Preview */}
          <section className="py-16 px-4 bg-white/50">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Популярні послуги</h3>
                <p className="text-gray-600">Оберіть категорію або створіть власне завдання</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {services.map((service) => (
                  <div
                    key={service.id}
                    onClick={() => handleServiceSelect(service.id)}
                    className={`bg-gradient-to-br ${service.color} rounded-2xl p-6 text-center cursor-pointer hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl`}
                  >
                    <div className="text-white mb-4 flex justify-center">
                      {service.icon}
                    </div>
                    <h4 className="text-white font-semibold text-sm">{service.name}</h4>
                  </div>
                ))}
              </div>
              <div className="text-center mt-8">
                <button 
                  onClick={() => setCurrentView('services')}
                  className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2 mx-auto"
                >
                  Переглянути всі послуги
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </section>
        </>
      )}

      {currentView === 'services' && (
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Каталог послуг</h2>
              <p className="text-gray-600">Оберіть потрібну послугу та створіть завдання</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <div
                  key={service.id}
                  onClick={() => handleServiceSelect(service.id)}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-2"
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center text-white mb-6`}>
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{service.name}</h3>
                  <p className="text-gray-600 mb-6">Професійні послуги від перевірених майстрів</p>
                  <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300">
                    Створити завдання
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {currentView === 'masters' && (
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Наші майстри</h2>
              <p className="text-gray-600">Перевірені фахівці готові виконати ваше завдання</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {masters.map((master) => (
                <div key={master.id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="text-center">
                    <div className="relative inline-block mb-4">
                      <img 
                        src={master.photo} 
                        alt={master.name}
                        className="w-24 h-24 rounded-full object-cover mx-auto"
                      />
                      {master.verified && (
                        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                          <CheckIcon className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{master.name}</h3>
                    <p className="text-gray-600 mb-3">{master.specialty}</p>
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <RatingIcon 
                            key={i} 
                            className={`w-4 h-4 ${i < Math.floor(master.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                      <span className="text-gray-600 text-sm">
                        {master.rating} ({master.reviews} відгуків)
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-blue-600 mb-4">
                      від ₴{master.price}/год
                    </div>
                    <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                      Написати майстру
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {currentView === 'pricing' && (
        <>
          {/* Hero Section for Pricing */}
          <section className="py-20 px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Оберіть свій <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">тариф</span>
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Розпочніть безкоштовно або оберіть план, який підходить для вашого бізнесу. 
                Всі плани включають доступ до платформи та базовий функціонал.
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <div className="flex items-center text-green-600">
                  <CheckIcon className="w-5 h-5 mr-2" />
                  <span>14 днів безкоштовного тестування</span>
                </div>
                <div className="flex items-center text-green-600">
                  <ShieldCheckIcon className="w-5 h-5 mr-2" />
                  <span>Без прихованих платежів</span>
                </div>
              </div>
            </div>
          </section>

          {/* Pricing Plans */}
          <section id="pricing" className="py-16 px-4">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <button
                  onClick={() => setShowComparison(!showComparison)}
                  className="inline-flex items-center px-4 py-2 bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow"
                >
                  <SearchIcon className="w-4 h-4 mr-2" />
                  {showComparison ? 'Приховати порівняння' : 'Порівняти плани'}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                {plans.map((plan) => (
                  <div
                    key={plan.id}
                    className={`relative bg-gradient-to-br ${plan.color} rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${
                      selectedPlan === plan.id ? 'ring-4 ring-blue-500 ring-opacity-50' : ''
                    }`}
                  >
                    {plan.isPopular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                          🔥 Найпопулярніший
                        </div>
                      </div>
                    )}
                    
                    {plan.isPremium && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                          👑 Преміум
                        </div>
                      </div>
                    )}

                    <div className="p-8">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center">
                          {plan.icon}
                          <h3 className="text-2xl font-bold text-gray-900 ml-3">{plan.name}</h3>
                        </div>
                      </div>

                      <div className="mb-6">
                        <div className="flex items-baseline">
                          <span className="text-4xl font-bold text-gray-900">
                            {plan.price === 0 ? 'Безкоштовно' : `₴${plan.price}`}
                          </span>
                          {plan.price > 0 && (
                            <span className="text-gray-600 ml-2">/{plan.period}</span>
                          )}
                        </div>
                        <div className="flex items-center mt-2 text-gray-600">
                          <ClockIcon className="w-4 h-4 mr-2" />
                          <span>
                            {plan.orderLimit 
                              ? `До ${plan.orderLimit} замовлень/місяць`
                              : 'Безлімітні замовлення'
                            }
                          </span>
                        </div>
                      </div>

                      <ul className="space-y-4 mb-8">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <CheckIcon className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <button
                        onClick={() => handleSelectPlan(plan.id)}
                        className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 ${
                          selectedPlan === plan.id
                            ? 'bg-green-600 text-white'
                            : plan.id === 'starter'
                            ? 'bg-gray-800 text-white hover:bg-gray-900'
                            : plan.id === 'basic'
                            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700'
                            : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700'
                        } shadow-lg hover:shadow-xl`}
                      >
                        {selectedPlan === plan.id ? (
                          <>
                            <CheckIcon className="w-5 h-5" />
                            Обрано
                          </>
                        ) : (
                          <>
                            {plan.price === 0 ? 'Розпочати безкоштовно' : 'Обрати план'}
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>

                      {selectedPlan === plan.id && (
                        <div className="mt-4 text-center">
                          <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm font-medium">
                            <CheckIcon className="w-4 h-4 mr-1" />
                            Обрано
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Comparison Table */}
              {showComparison && (
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                  <div className="px-8 py-6 bg-gradient-to-r from-blue-600 to-indigo-600">
                    <h3 className="text-2xl font-bold text-white text-center">Детальне порівняння планів</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="text-left py-4 px-6 font-semibold text-gray-900">Можливості</th>
                          {plans.map((plan) => (
                            <th key={plan.id} className="text-center py-4 px-6 font-semibold text-gray-900">
                              {plan.name}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr>
                          <td className="py-4 px-6 font-medium text-gray-900">Замовлення на місяць</td>
                          <td className="py-4 px-6 text-center">10</td>
                          <td className="py-4 px-6 text-center">100</td>
                          <td className="py-4 px-6 text-center">Безлімітно</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="py-4 px-6 font-medium text-gray-900">Пріоритет в пошуку</td>
                          <td className="py-4 px-6 text-center">❌</td>
                          <td className="py-4 px-6 text-center">❌</td>
                          <td className="py-4 px-6 text-center">✅</td>
                        </tr>
                        <tr>
                          <td className="py-4 px-6 font-medium text-gray-900">Аналітика</td>
                          <td className="py-4 px-6 text-center">❌</td>
                          <td className="py-4 px-6 text-center">✅</td>
                          <td className="py-4 px-6 text-center">✅ Розширена</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="py-4 px-6 font-medium text-gray-900">Підтримка</td>
                          <td className="py-4 px-6 text-center">Базова</td>
                          <td className="py-4 px-6 text-center">Пріоритетна</td>
                          <td className="py-4 px-6 text-center">24/7</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-16 px-4 bg-white/50">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Часті питання</h3>
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h4 className="font-semibold text-gray-900 mb-2">Чи можу я змінити план пізніше?</h4>
                  <p className="text-gray-600">Так, ви можете покращити або понизити свій план в будь-який час. Зміни набудуть чинності з наступного білінгового циклу.</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h4 className="font-semibold text-gray-900 mb-2">Що відбувається, якщо я перевищу ліміт замовлень?</h4>
                  <p className="text-gray-600">Ви отримаєте сповіщення при досягненні 80% ліміту. При перевищенні можна буде покращити план або дочекатися наступного місяця.</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h4 className="font-semibold text-gray-900 mb-2">Як працює пріоритетна видача для Преміум користувачів?</h4>
                  <p className="text-gray-600">Преміум майстри показуються першими в результатах пошуку клієнтів, що збільшує їх шанси отримати більше замовлень.</p>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <HeartHandshakeIcon className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">HandyHelper</span>
              </div>
              <p className="text-gray-400">Пошук майстрів для побутових робіт.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Продукт</h4>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => setCurrentView('pricing')} className="hover:text-white transition-colors">Тарифи</button></li>
                <li><button onClick={() => setCurrentView('services')} className="hover:text-white transition-colors">Послуги</button></li>
                <li><button onClick={() => setCurrentView('masters')} className="hover:text-white transition-colors">Майстри</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Підтримка</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="mailto:support@handyhelper.com" className="hover:text-white transition-colors flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  support@handyhelper.com
                </a></li>
                <li><a href="tel:+380671234567" className="hover:text-white transition-colors flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  +38 (067) 123-45-67
                </a></li>
                <li className="flex items-center gap-2 text-gray-400">
                  <MapPin className="w-4 h-4" />
                  Київ, Україна
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Слідкувати</h4>
              <div className="flex space-x-4">
                <a href="https://facebook.com/handyhelper" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="https://instagram.com/handyhelper" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="https://twitter.com/handyhelper" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="https://linkedin.com/company/handyhelper" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 HandyHelper. Всі права захищені.</p>
          </div>
        </div>
      </footer>

      {/* Registration Modal */}
      {showRegistration && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 relative">
            <button
              onClick={() => setShowRegistration(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Реєстрація майстра</h2>
              <p className="text-gray-600">Заповніть форму для початку роботи</p>
            </div>

            <form onSubmit={handleRegistrationSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Повне ім'я *
                </label>
                <input
                  type="text"
                  required
                  value={registrationData.name}
                  onChange={(e) => setRegistrationData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Введіть ваше повне ім'я"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={registrationData.email}
                  onChange={(e) => setRegistrationData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Телефон *
                </label>
                <input
                  type="tel"
                  required
                  value={registrationData.phone}
                  onChange={(e) => setRegistrationData(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="+38 (067) 123-45-67"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Спеціальність *
                </label>
                <select
                  required
                  value={registrationData.specialty}
                  onChange={(e) => setRegistrationData(prev => ({ ...prev, specialty: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Оберіть спеціальність</option>
                  <option value="plumber">Сантехнік</option>
                  <option value="electrician">Електрик</option>
                  <option value="carpenter">Столяр</option>
                  <option value="painter">Маляр</option>
                  <option value="cleaner">Клінінг</option>
                  <option value="mechanic">Механік</option>
                  <option value="gardener">Садівник</option>
                  <option value="other">Інше</option>
                </select>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">
                  Обраний план: <span className="font-semibold text-blue-600">
                    {plans.find(p => p.id === registrationData.plan)?.name}
                  </span>
                </p>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center gap-2"
              >
                Зареєструватися
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Task Creation Modal */}
      {showTaskModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-8 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowTaskModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Створити завдання</h2>
              <p className="text-gray-600">Опишіть, яка допомога вам потрібна</p>
            </div>

            <form onSubmit={handleTaskSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Заголовок завдання *
                </label>
                <input
                  type="text"
                  required
                  value={taskData.title}
                  onChange={(e) => setTaskData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Наприклад: Повісити картину в спальні"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Категорія послуги *
                </label>
                <select
                  required
                  value={taskData.service}
                  onChange={(e) => setTaskData(prev => ({ ...prev, service: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Оберіть категорію</option>
                  {services.map(service => (
                    <option key={service.id} value={service.name}>{service.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Опис завдання *
                </label>
                <textarea
                  required
                  value={taskData.description}
                  onChange={(e) => setTaskData(prev => ({ ...prev, description: e.target.value }))}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Детально опишіть, що потрібно зробити..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Адреса виконання *
                </label>
                <input
                  type="text"
                  required
                  value={taskData.address}
                  onChange={(e) => setTaskData(prev => ({ ...prev, address: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Вулиця, будинок, квартира"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Бюджет (₴)
                </label>
                <input
                  type="number"
                  value={taskData.budget}
                  onChange={(e) => setTaskData(prev => ({ ...prev, budget: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ваш орієнтовний бюджет"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowTaskModal(false)}
                  className="flex-1 py-3 px-6 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Скасувати
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  Створити завдання
                  <PlusIcon className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;