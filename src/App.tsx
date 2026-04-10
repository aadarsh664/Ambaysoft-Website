import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react';
import { 
  Menu, X, ArrowRight, Monitor, Shield, Settings, Clock, 
  GraduationCap, Globe, Server, Megaphone, Smartphone, Printer, 
  MapPin, Phone, Mail
} from 'lucide-react';

const FadeInUp = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string, key?: React.Key }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.7, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

const Hero3DMockup = ({ y2 }: { y2: any }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xPct = x / rect.width - 0.5;
    const yPct = y / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), springConfig);

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1200,
        y: y2
      }}
      className="relative w-full z-10"
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="w-full h-full relative"
      >
        {/* Main Card */}
        <div className="relative rounded-2xl bg-white shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden" style={{ transform: "translateZ(0)" }}>
          {/* Mockup Header */}
          <div className="h-12 border-b border-slate-100 bg-slate-50/50 flex items-center px-4 gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-400"></div>
            <div className="w-3 h-3 rounded-full bg-amber-400"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
          </div>
          {/* Mockup Body */}
          <div className="p-6 grid gap-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-sm text-slate-500 font-medium">Total Revenue</div>
                <div className="text-2xl font-bold text-slate-900">$124,500</div>
              </div>
              <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                <ArrowRight className="h-5 w-5 -rotate-45" />
              </div>
            </div>
            {/* Chart placeholder */}
            <div className="h-32 w-full flex items-end gap-2">
              {[40, 70, 45, 90, 65, 85, 100].map((h, i) => (
                <div key={i} className="w-full bg-indigo-100 rounded-t-sm relative group">
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                    className="absolute bottom-0 w-full bg-indigo-600 rounded-t-sm group-hover:bg-orange-500 transition-colors"
                  ></motion.div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="text-xs text-slate-500 mb-1">Active Users</div>
                <div className="font-semibold text-slate-900">2,405</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="text-xs text-slate-500 mb-1">Conversion</div>
                <div className="font-semibold text-slate-900">4.8%</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Floating elements - using z to pop out */}
        <motion.div 
          animate={{ y: [0, -10, 0] }} 
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{ z: 80 }}
          className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border border-slate-100 flex items-center gap-4"
        >
          <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
            <Shield className="h-5 w-5" />
          </div>
          <div>
            <div className="text-sm font-bold text-slate-900">Secure Setup</div>
            <div className="text-xs text-slate-500">100% Protected</div>
          </div>
        </motion.div>

        {/* Another floating element for extra 3D effect */}
        <motion.div 
          animate={{ y: [0, 10, 0] }} 
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          style={{ z: 100 }}
          className="absolute -top-6 -right-6 bg-white p-3 rounded-xl shadow-xl border border-slate-100 flex items-center gap-3"
        >
          <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
            <Settings className="h-4 w-4" />
          </div>
          <div className="pr-2">
            <div className="text-xs font-bold text-slate-900">Optimized</div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -100]);

  const navLinks = ['Home', 'About', 'Services', 'Clients', 'Contact'];

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-blue-950 selection:bg-red-100 selection:text-red-900 overflow-x-hidden">
      {/* Navbar */}
      <div className={`fixed top-0 w-full z-50 transition-all duration-500 flex justify-center ${isScrolled ? 'pt-4 px-4 pointer-events-none' : 'pt-0 px-0 pointer-events-auto'}`}>
        <nav className={`transition-all duration-500 flex items-center justify-between ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-lg border border-slate-200 rounded-full px-4 py-2 pointer-events-auto w-auto max-w-full' 
            : 'bg-transparent py-4 sm:py-6 px-4 sm:px-6 lg:px-8 w-full max-w-7xl'
        }`}>
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2 mr-4 md:mr-8">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center">
              <span className="text-white font-bold text-xl leading-none">A</span>
            </div>
            <span className={`font-bold tracking-tight text-blue-950 transition-all duration-300 ${isScrolled ? 'text-lg hidden sm:block' : 'text-xl sm:text-2xl'}`}>
              Ambaysoft
            </span>
          </div>
          
          {/* Desktop Nav Links */}
          <div className={`items-center space-x-8 transition-all duration-300 overflow-hidden ${isScrolled ? 'hidden' : 'hidden md:flex'}`}>
            {navLinks.map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} className="text-sm font-medium text-slate-600 hover:text-red-600 transition-colors whitespace-nowrap">
                {link}
              </a>
            ))}
          </div>

          {/* Right side controls */}
          <div className="flex items-center gap-2 sm:gap-3 ml-auto">
            <a href="#contact" className="inline-flex items-center justify-center px-4 sm:px-5 py-2 sm:py-2.5 border border-transparent text-sm font-medium rounded-full text-white bg-red-600 hover:bg-red-700 shadow-sm hover:shadow transition-all whitespace-nowrap">
              Get Quote
            </a>
            
            {/* Hamburger Menu */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className={`text-slate-600 hover:text-blue-950 focus:outline-none items-center justify-center w-10 h-10 rounded-full hover:bg-slate-100 transition-colors ${!isScrolled ? 'flex md:hidden' : 'flex'}`}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Nav Dropdown */}
      {isMobileMenuOpen && (
        <div className="fixed top-[80px] left-4 right-4 bg-white shadow-2xl border border-slate-100 rounded-2xl py-4 px-4 flex flex-col space-y-2 z-40">
          {navLinks.map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setIsMobileMenuOpen(false)} className="text-base font-medium text-slate-800 hover:text-red-600 hover:bg-slate-50 px-4 py-3 rounded-xl transition-colors">
              {link}
            </a>
          ))}
        </div>
      )}

      {/* Hero Section */}
      <section id="home" className="relative pt-32 pb-12 md:pt-40 md:pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Parallax Background Elements */}
        <motion.div style={{ y: y1 }} className="absolute top-0 right-0 -z-10 w-full h-full opacity-40 pointer-events-none">
           <div className="absolute top-[-10%] right-[-5%] w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] rounded-full bg-red-300/30 blur-[60px] sm:blur-[100px]" />
           <div className="absolute top-[20%] right-[10%] w-[250px] sm:w-[500px] h-[250px] sm:h-[500px] rounded-full bg-blue-300/20 blur-[60px] sm:blur-[100px]" />
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="max-w-2xl text-center lg:text-left mx-auto lg:mx-0">
              <FadeInUp>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-100 text-red-600 text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                  <span className="flex h-2 w-2 rounded-full bg-red-600"></span>
                  Next-Gen IT Agency
                </div>
              </FadeInUp>
              <FadeInUp delay={0.1}>
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-blue-950 mb-4 sm:mb-6 leading-[1.1]">
                  Empowering <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">Schools & Businesses</span>
                </h1>
              </FadeInUp>
              <FadeInUp delay={0.2}>
                <p className="text-base sm:text-lg text-slate-600 mb-6 sm:mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
                  We provide cutting-edge Web Design, ERP, and Printing services from Patna & Madhubani to help your business thrive in the digital age.
                </p>
              </FadeInUp>
              <FadeInUp delay={0.3} className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                <a href="#contact" className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-medium rounded-full text-white bg-red-600 hover:bg-red-700 shadow-lg shadow-red-200 transition-all hover:-translate-y-0.5">
                  Start Your Project
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </a>
                <a href="#services" className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-medium rounded-full text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all">
                  Our Services
                </a>
              </FadeInUp>
            </div>

            {/* Hero Right: Tech Dashboard Mockup (Desktop) */}
            <FadeInUp delay={0.4} className="hidden lg:block relative lg:ml-auto w-full max-w-lg mx-auto mt-8 lg:mt-0">
              <Hero3DMockup y2={y2} />
            </FadeInUp>

            {/* Hero Right: Mobile Text Carousel (Mobile/Tablet) */}
            <FadeInUp delay={0.4} className="block lg:hidden w-full mt-12 overflow-hidden relative">
              <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#f8fafc] to-transparent z-10"></div>
              <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#f8fafc] to-transparent z-10"></div>
              
              <div className="flex w-max animate-scroll">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex items-center px-4">
                    <span className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-950 to-blue-800 uppercase tracking-tight mx-4">Web Design</span>
                    <span className="text-red-500 mx-2 text-2xl">•</span>
                    <span className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-950 to-blue-800 uppercase tracking-tight mx-4">School ERP</span>
                    <span className="text-red-500 mx-2 text-2xl">•</span>
                    <span className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-950 to-blue-800 uppercase tracking-tight mx-4">Printing</span>
                    <span className="text-red-500 mx-2 text-2xl">•</span>
                    <span className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-950 to-blue-800 uppercase tracking-tight mx-4">App Dev</span>
                    <span className="text-red-500 mx-2 text-2xl">•</span>
                  </div>
                ))}
              </div>
            </FadeInUp>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="about" className="py-12 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-8 md:mb-16">
            <FadeInUp>
              <h2 className="text-2xl sm:text-3xl font-bold text-blue-950 mb-3 sm:mb-4">Why Choose Ambaysoft?</h2>
              <p className="text-sm sm:text-base text-slate-600">We combine technical excellence with business acumen to deliver solutions that drive real growth.</p>
            </FadeInUp>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {[
              { icon: Monitor, title: "Modern Tech Stack", desc: "Built with the latest frameworks for speed and scalability." },
              { icon: Shield, title: "Secure & Reliable", desc: "Enterprise-grade security protocols to protect your data." },
              { icon: Settings, title: "Custom Solutions", desc: "Tailored software designed specifically for your workflow." },
              { icon: Clock, title: "24/7 Support", desc: "Round-the-clock technical assistance whenever you need it." }
            ].map((feature, idx) => (
              <FadeInUp key={idx} delay={idx * 0.1}>
                <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-red-100/50 transition-all duration-300 group h-full">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                    <feature.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-blue-950 mb-2">{feature.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{feature.desc}</p>
                </div>
              </FadeInUp>
            ))}
          </div>
        </div>
      </section>

      {/* Services Bento Grid */}
      <section id="services" className="py-12 md:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 md:mb-16 text-center md:text-left">
            <FadeInUp>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-950 mb-3 sm:mb-4">Our Premium Services</h2>
              <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto md:mx-0">Comprehensive IT solutions tailored for educational institutions and modern businesses.</p>
            </FadeInUp>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 auto-rows-min md:auto-rows-[280px]">
            {/* ERP - Large Card */}
            <FadeInUp delay={0.1} className="sm:col-span-2 md:row-span-2">
              <div className="h-full p-6 sm:p-8 rounded-3xl bg-red-600 text-white relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300 shadow-lg hover:shadow-red-500/30">
                <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-white/10 rounded-full blur-3xl -mr-10 sm:-mr-20 -mt-10 sm:-mt-20 transition-transform group-hover:scale-150 duration-700"></div>
                <div className="relative z-10 h-full flex flex-col">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 sm:mb-6 md:mb-auto">
                    <GraduationCap className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-3">School ERP Software</h3>
                    <p className="text-red-100 text-sm sm:text-lg max-w-md mb-4 sm:mb-6">Complete management system for schools and colleges. Handle admissions, fees, attendance, and exams seamlessly.</p>
                    <div className="inline-flex items-center text-white font-medium group/btn cursor-pointer text-sm sm:text-base">
                      Explore ERP <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover/btn:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            </FadeInUp>

            {/* Web Design */}
            <FadeInUp delay={0.2}>
              <div className="h-full p-6 sm:p-8 rounded-3xl bg-white border border-slate-100 group hover:-translate-y-1 transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 flex flex-col">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center mb-4 sm:mb-6 md:mb-auto">
                  <Globe className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-blue-950 mb-1 sm:mb-2">Website Design</h3>
                  <p className="text-slate-600 text-xs sm:text-sm mb-3 sm:mb-4">Stunning, responsive websites that convert visitors into customers.</p>
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 text-slate-400 group-hover:text-orange-500 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </FadeInUp>

            {/* Domain & Hosting */}
            <FadeInUp delay={0.3}>
              <div className="h-full p-6 sm:p-8 rounded-3xl bg-white border border-slate-100 group hover:-translate-y-1 transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 flex flex-col">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4 sm:mb-6 md:mb-auto">
                  <Server className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-blue-950 mb-1 sm:mb-2">Domain & Hosting</h3>
                  <p className="text-slate-600 text-xs sm:text-sm mb-3 sm:mb-4">Fast, secure, and reliable cloud hosting solutions with 99.9% uptime.</p>
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </FadeInUp>

            {/* Digital Marketing */}
            <FadeInUp delay={0.4} className="sm:col-span-2">
              <div className="h-full p-6 sm:p-8 rounded-3xl bg-blue-950 text-white relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300 shadow-xl">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div className="flex justify-between items-start mb-4 sm:mb-6 md:mb-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/10 flex items-center justify-center">
                      <Megaphone className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </div>
                    <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6 text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all cursor-pointer" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">Digital Marketing</h3>
                    <p className="text-slate-400 text-sm sm:text-base max-w-md">SEO, Social Media, and Performance Marketing to skyrocket your brand's online visibility and ROI.</p>
                  </div>
                </div>
              </div>
            </FadeInUp>

            {/* App & SMS */}
            <FadeInUp delay={0.5}>
              <div className="h-full p-6 sm:p-8 rounded-3xl bg-blue-800 text-white group hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-blue-800/30 flex flex-col">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/20 flex items-center justify-center mb-4 sm:mb-6 md:mb-auto">
                  <Smartphone className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">App & SMS Services</h3>
                  <p className="text-blue-100 text-xs sm:text-sm mb-3 sm:mb-4">Custom mobile apps and bulk SMS gateways for instant communication.</p>
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 text-blue-200 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </FadeInUp>

            {/* Printing */}
            <FadeInUp delay={0.6} className="sm:col-span-2 md:col-span-3 lg:col-span-1">
              <div className="h-full p-6 sm:p-8 rounded-3xl bg-white border border-slate-100 group hover:-translate-y-1 transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 flex flex-col">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4 sm:mb-6 md:mb-auto">
                  <Printer className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-blue-950 mb-1 sm:mb-2">Printing Solutions</h3>
                  <p className="text-slate-600 text-xs sm:text-sm mb-3 sm:mb-4">High-quality ID cards, brochures, and corporate identity materials.</p>
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </FadeInUp>
          </div>
        </div>
      </section>

      {/* Clients Carousel */}
      <section id="clients" className="py-12 md:py-20 bg-white overflow-hidden border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 md:mb-10 text-center">
          <p className="text-xs sm:text-sm font-semibold text-slate-400 uppercase tracking-wider">Trusted by innovative companies</p>
        </div>
        
        <div className="relative w-full flex overflow-hidden group">
          {/* Gradient Masks */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-white to-transparent z-10"></div>
          
          <div className="flex w-max animate-scroll">
            {[...Array(4)].map((_, setIndex) => (
              <div key={setIndex} className="flex items-center space-x-8 sm:space-x-16 px-4 sm:px-8">
                {['Webtech', 'Infinit', 'Coffee', 'Oval', 'Owlblack', 'Symtech'].map((logo, i) => (
                  <div key={`${setIndex}-${i}`} className="text-xl sm:text-2xl font-black text-slate-300 uppercase tracking-tighter hover:text-red-600 transition-colors cursor-default">
                    {logo}.
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer / Contact */}
      <footer id="contact" className="bg-blue-950 pt-16 md:pt-24 pb-8 md:pb-12 text-slate-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 mb-12 md:mb-16">
            
            {/* Contact Form */}
            <div>
              <FadeInUp>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Let's build together.</h2>
                <p className="text-sm sm:text-base text-slate-400 mb-6 sm:mb-8">Fill out the form and our team will get back to you within 24 hours.</p>
                
                <form className="space-y-4 sm:space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="relative z-0 w-full group">
                    <input type="text" name="name" id="name" className="block py-2.5 sm:py-3 px-0 w-full text-sm sm:text-base text-white bg-transparent border-0 border-b border-slate-700 appearance-none focus:outline-none focus:ring-0 focus:border-red-500 peer" placeholder=" " required />
                    <label htmlFor="name" className="peer-focus:font-medium absolute text-sm sm:text-base text-slate-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Your Name</label>
                  </div>
                  
                  <div className="relative z-0 w-full group">
                    <input type="email" name="email" id="email" className="block py-2.5 sm:py-3 px-0 w-full text-sm sm:text-base text-white bg-transparent border-0 border-b border-slate-700 appearance-none focus:outline-none focus:ring-0 focus:border-red-500 peer" placeholder=" " required />
                    <label htmlFor="email" className="peer-focus:font-medium absolute text-sm sm:text-base text-slate-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email Address</label>
                  </div>

                  <div className="relative z-0 w-full group">
                    <textarea name="message" id="message" rows={4} className="block py-2.5 sm:py-3 px-0 w-full text-sm sm:text-base text-white bg-transparent border-0 border-b border-slate-700 appearance-none focus:outline-none focus:ring-0 focus:border-red-500 peer resize-none" placeholder=" " required></textarea>
                    <label htmlFor="message" className="peer-focus:font-medium absolute text-sm sm:text-base text-slate-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Project Details</label>
                  </div>

                  <button type="submit" className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-medium rounded-full text-white bg-red-600 hover:bg-red-500 transition-colors w-full sm:w-auto mt-2">
                    Send Message
                    <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                </form>
              </FadeInUp>
            </div>

            {/* Contact Info */}
            <div className="lg:pl-12">
              <FadeInUp delay={0.2}>
                <div className="flex items-center gap-2 mb-6 sm:mb-8">
                  <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center">
                    <span className="text-white font-bold text-xl leading-none">A</span>
                  </div>
                  <span className="font-bold text-xl sm:text-2xl tracking-tight text-white">Ambaysoft</span>
                </div>

                <div className="space-y-6 sm:space-y-8">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-red-500 shrink-0 mt-1" />
                    <div>
                      <h4 className="text-white text-sm sm:text-base font-medium mb-1">Head Office</h4>
                      <p className="text-xs sm:text-sm text-slate-400">Patna, Bihar, India<br/>PIN - 800001</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 sm:gap-4">
                    <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-orange-500 shrink-0 mt-1" />
                    <div>
                      <h4 className="text-white text-sm sm:text-base font-medium mb-1">Regional Office</h4>
                      <p className="text-xs sm:text-sm text-slate-400">Madhubani, Bihar, India<br/>PIN - 847211</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 sm:gap-4">
                    <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-slate-500 shrink-0" />
                    <p className="text-xs sm:text-sm text-slate-400">+91 98765 43210</p>
                  </div>

                  <div className="flex items-center gap-3 sm:gap-4">
                    <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-slate-500 shrink-0" />
                    <p className="text-xs sm:text-sm text-slate-400">hello@ambaysoft.com</p>
                  </div>
                </div>
              </FadeInUp>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs sm:text-sm text-slate-500 text-center md:text-left">
              &copy; {new Date().getFullYear()} Ambaysoft Technologies. All rights reserved.
            </p>
            <div className="flex gap-4 sm:gap-6 text-xs sm:text-sm text-slate-500">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
