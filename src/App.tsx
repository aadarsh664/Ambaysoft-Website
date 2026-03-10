import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react';
import { 
  Menu, X, ArrowRight, Monitor, Shield, Settings, Clock, 
  GraduationCap, Globe, Server, Megaphone, Smartphone, Printer, 
  MapPin, Phone, Mail
} from 'lucide-react';

const FadeInUp = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
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
    <div className="min-h-screen bg-[#f8fafc] font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900 overflow-x-hidden">
      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex-shrink-0 flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-indigo-800 flex items-center justify-center">
                <span className="text-white font-bold text-xl leading-none">A</span>
              </div>
              <span className="font-bold text-2xl tracking-tight text-slate-900">Ambaysoft</span>
            </div>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a key={link} href={`#${link.toLowerCase()}`} className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">
                  {link}
                </a>
              ))}
              <a href="#contact" className="inline-flex items-center justify-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm hover:shadow transition-all">
                Get Quote
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-slate-600 hover:text-slate-900 focus:outline-none">
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg border-t border-slate-100 py-4 px-4 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setIsMobileMenuOpen(false)} className="text-base font-medium text-slate-800 hover:text-indigo-600">
                {link}
              </a>
            ))}
            <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700">
              Get Quote
            </a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Parallax Background Elements */}
        <motion.div style={{ y: y1 }} className="absolute top-0 right-0 -z-10 w-full h-full opacity-40 pointer-events-none">
           <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-indigo-300/30 blur-[100px]" />
           <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] rounded-full bg-orange-300/20 blur-[100px]" />
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            <div className="max-w-2xl">
              <FadeInUp>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-sm font-medium mb-6">
                  <span className="flex h-2 w-2 rounded-full bg-indigo-600"></span>
                  Next-Gen IT Agency
                </div>
              </FadeInUp>
              <FadeInUp delay={0.1}>
                <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-slate-900 mb-6 leading-[1.1]">
                  Empowering <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-400">Schools & Businesses</span>
                </h1>
              </FadeInUp>
              <FadeInUp delay={0.2}>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-xl">
                  We provide cutting-edge Web Design, ERP, and Printing services from Patna & Madhubani to help your business thrive in the digital age.
                </p>
              </FadeInUp>
              <FadeInUp delay={0.3} className="flex flex-col sm:flex-row gap-4">
                <a href="#contact" className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all hover:-translate-y-0.5">
                  Start Your Project
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
                <a href="#services" className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-full text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all">
                  Our Services
                </a>
              </FadeInUp>
            </div>

            {/* Hero Right: Tech Dashboard Mockup */}
            <FadeInUp delay={0.4} className="relative lg:ml-auto w-full max-w-lg">
              <Hero3DMockup y2={y2} />
            </FadeInUp>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <FadeInUp>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Choose Ambaysoft?</h2>
              <p className="text-slate-600">We combine technical excellence with business acumen to deliver solutions that drive real growth.</p>
            </FadeInUp>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Monitor, title: "Modern Tech Stack", desc: "Built with the latest frameworks for speed and scalability." },
              { icon: Shield, title: "Secure & Reliable", desc: "Enterprise-grade security protocols to protect your data." },
              { icon: Settings, title: "Custom Solutions", desc: "Tailored software designed specifically for your workflow." },
              { icon: Clock, title: "24/7 Support", desc: "Round-the-clock technical assistance whenever you need it." }
            ].map((feature, idx) => (
              <FadeInUp key={idx} delay={idx * 0.1}>
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-indigo-100/50 transition-all duration-300 group">
                  <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{feature.desc}</p>
                </div>
              </FadeInUp>
            ))}
          </div>
        </div>
      </section>

      {/* Services Bento Grid */}
      <section id="services" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <FadeInUp>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Our Premium Services</h2>
              <p className="text-slate-600 max-w-2xl">Comprehensive IT solutions tailored for educational institutions and modern businesses.</p>
            </FadeInUp>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-min md:auto-rows-[280px]">
            {/* ERP - Large Card */}
            <FadeInUp delay={0.1} className="md:col-span-2 md:row-span-2">
              <div className="h-full p-8 rounded-3xl bg-indigo-600 text-white relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300 shadow-lg hover:shadow-indigo-500/30">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 transition-transform group-hover:scale-150 duration-700"></div>
                <div className="relative z-10 h-full flex flex-col">
                  <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6 md:mb-auto">
                    <GraduationCap className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold mb-3">School ERP Software</h3>
                    <p className="text-indigo-100 text-lg max-w-md mb-6">Complete management system for schools and colleges. Handle admissions, fees, attendance, and exams seamlessly.</p>
                    <div className="inline-flex items-center text-white font-medium group/btn cursor-pointer">
                      Explore ERP <ArrowRight className="ml-2 h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            </FadeInUp>

            {/* Web Design */}
            <FadeInUp delay={0.2}>
              <div className="h-full p-8 rounded-3xl bg-white border border-slate-100 group hover:-translate-y-1 transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 flex flex-col">
                <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center mb-6 md:mb-auto">
                  <Globe className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Website Design</h3>
                  <p className="text-slate-600 text-sm mb-4">Stunning, responsive websites that convert visitors into customers.</p>
                  <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-orange-500 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </FadeInUp>

            {/* Domain & Hosting */}
            <FadeInUp delay={0.3}>
              <div className="h-full p-8 rounded-3xl bg-white border border-slate-100 group hover:-translate-y-1 transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 flex flex-col">
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-6 md:mb-auto">
                  <Server className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Domain & Hosting</h3>
                  <p className="text-slate-600 text-sm mb-4">Fast, secure, and reliable cloud hosting solutions with 99.9% uptime.</p>
                  <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </FadeInUp>

            {/* Digital Marketing */}
            <FadeInUp delay={0.4} className="md:col-span-2">
              <div className="h-full p-8 rounded-3xl bg-slate-900 text-white relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300 shadow-xl">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div className="flex justify-between items-start mb-6 md:mb-0">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                      <Megaphone className="h-6 w-6 text-white" />
                    </div>
                    <ArrowRight className="h-6 w-6 text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all cursor-pointer" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Digital Marketing</h3>
                    <p className="text-slate-400 max-w-md">SEO, Social Media, and Performance Marketing to skyrocket your brand's online visibility and ROI.</p>
                  </div>
                </div>
              </div>
            </FadeInUp>

            {/* App & SMS */}
            <FadeInUp delay={0.5}>
              <div className="h-full p-8 rounded-3xl bg-orange-500 text-white group hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-orange-500/30 flex flex-col">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-6 md:mb-auto">
                  <Smartphone className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">App & SMS Services</h3>
                  <p className="text-orange-100 text-sm mb-4">Custom mobile apps and bulk SMS gateways for instant communication.</p>
                  <ArrowRight className="h-5 w-5 text-orange-200 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </FadeInUp>

            {/* Printing */}
            <FadeInUp delay={0.6} className="md:col-span-3 lg:col-span-1">
              <div className="h-full p-8 rounded-3xl bg-white border border-slate-100 group hover:-translate-y-1 transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 flex flex-col">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-6 md:mb-auto">
                  <Printer className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Printing Solutions</h3>
                  <p className="text-slate-600 text-sm mb-4">High-quality ID cards, brochures, and corporate identity materials.</p>
                  <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </FadeInUp>
          </div>
        </div>
      </section>

      {/* Clients Carousel */}
      <section id="clients" className="py-20 bg-white overflow-hidden border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
          <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Trusted by innovative companies</p>
        </div>
        
        <div className="relative w-full flex overflow-hidden group">
          {/* Gradient Masks */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10"></div>
          
          <div className="flex w-max animate-scroll">
            {/* First Set */}
            <div className="flex items-center space-x-16 px-8">
              {['Webtech', 'Infinit', 'Coffee', 'Oval', 'Owlblack', 'Symtech'].map((logo, i) => (
                <div key={i} className="text-2xl font-black text-slate-300 uppercase tracking-tighter hover:text-indigo-600 transition-colors cursor-default">
                  {logo}.
                </div>
              ))}
            </div>
            {/* Duplicate Set for Infinite Scroll */}
            <div className="flex items-center space-x-16 px-8">
              {['Webtech', 'Infinit', 'Coffee', 'Oval', 'Owlblack', 'Symtech'].map((logo, i) => (
                <div key={`dup-${i}`} className="text-2xl font-black text-slate-300 uppercase tracking-tighter hover:text-indigo-600 transition-colors cursor-default">
                  {logo}.
                </div>
              ))}
            </div>
             {/* Third Set to ensure no gap on wide screens */}
             <div className="flex items-center space-x-16 px-8">
              {['Webtech', 'Infinit', 'Coffee', 'Oval', 'Owlblack', 'Symtech'].map((logo, i) => (
                <div key={`dup2-${i}`} className="text-2xl font-black text-slate-300 uppercase tracking-tighter hover:text-indigo-600 transition-colors cursor-default">
                  {logo}.
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer / Contact */}
      <footer id="contact" className="bg-slate-900 pt-24 pb-12 text-slate-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
            
            {/* Contact Form */}
            <div>
              <FadeInUp>
                <h2 className="text-3xl font-bold text-white mb-2">Let's build together.</h2>
                <p className="text-slate-400 mb-8">Fill out the form and our team will get back to you within 24 hours.</p>
                
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="relative z-0 w-full group">
                    <input type="text" name="name" id="name" className="block py-3 px-0 w-full text-base text-white bg-transparent border-0 border-b border-slate-700 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-500 peer" placeholder=" " required />
                    <label htmlFor="name" className="peer-focus:font-medium absolute text-slate-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-indigo-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Your Name</label>
                  </div>
                  
                  <div className="relative z-0 w-full group">
                    <input type="email" name="email" id="email" className="block py-3 px-0 w-full text-base text-white bg-transparent border-0 border-b border-slate-700 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-500 peer" placeholder=" " required />
                    <label htmlFor="email" className="peer-focus:font-medium absolute text-slate-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-indigo-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email Address</label>
                  </div>

                  <div className="relative z-0 w-full group">
                    <textarea name="message" id="message" rows={4} className="block py-3 px-0 w-full text-base text-white bg-transparent border-0 border-b border-slate-700 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-500 peer resize-none" placeholder=" " required></textarea>
                    <label htmlFor="message" className="peer-focus:font-medium absolute text-slate-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-indigo-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Project Details</label>
                  </div>

                  <button type="submit" className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-500 transition-colors w-full sm:w-auto">
                    Send Message
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                </form>
              </FadeInUp>
            </div>

            {/* Contact Info */}
            <div className="lg:pl-12">
              <FadeInUp delay={0.2}>
                <div className="flex items-center gap-2 mb-8">
                  <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                    <span className="text-white font-bold text-xl leading-none">A</span>
                  </div>
                  <span className="font-bold text-2xl tracking-tight text-white">Ambaysoft</span>
                </div>

                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <MapPin className="h-6 w-6 text-indigo-500 shrink-0 mt-1" />
                    <div>
                      <h4 className="text-white font-medium mb-1">Head Office</h4>
                      <p className="text-slate-400">Patna, Bihar, India<br/>PIN - 800001</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <MapPin className="h-6 w-6 text-orange-500 shrink-0 mt-1" />
                    <div>
                      <h4 className="text-white font-medium mb-1">Regional Office</h4>
                      <p className="text-slate-400">Madhubani, Bihar, India<br/>PIN - 847211</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <Phone className="h-6 w-6 text-slate-500 shrink-0" />
                    <p className="text-slate-400">+91 98765 43210</p>
                  </div>

                  <div className="flex items-center gap-4">
                    <Mail className="h-6 w-6 text-slate-500 shrink-0" />
                    <p className="text-slate-400">hello@ambaysoft.com</p>
                  </div>
                </div>
              </FadeInUp>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-500">
              &copy; {new Date().getFullYear()} Ambaysoft Technologies. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-slate-500">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
