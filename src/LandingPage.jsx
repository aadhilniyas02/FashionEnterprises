import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Menu, X, ChevronRight, Check, Star, ArrowRight,
    Scissors, Truck, Globe, Clock, MessageCircle, ArrowUp,
    Instagram, Facebook, Twitter, MapPin, Phone, Mail,
    ShoppingBag, Award, Zap, Layers
} from 'lucide-react';

const sections = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'history', label: 'History' },
    { id: 'services', label: 'Services' },
    { id: 'process', label: 'Process' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'contact', label: 'Contact' },
];

const staggerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" }
    }
};

export default function LandingPage() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');

    // Handle Scroll
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            // Update active section
            const sectionElements = sections.map(s => document.getElementById(s.id));
            const scrollPosition = window.scrollY + 100;

            for (const section of sectionElements) {
                if (section && section.offsetTop <= scrollPosition && (section.offsetTop + section.offsetHeight) > scrollPosition) {
                    setActiveSection(section.id);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollTo = (id) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
            setMobileMenuOpen(false);
        }
    };

    return (
        <div className="font-sans text-gray-800 antialiased bg-white selection:bg-red-100 selection:text-red-900 overflow-x-hidden">

            {/* --- NAVBAR --- */}
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
                    }`}
            >
                <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
                    {/* Logo */}
                    <div
                        onClick={() => scrollTo('hero')}
                        className="cursor-pointer flex items-center gap-2 group"
                    >
                        <div className="w-8 h-8 bg-red-600 text-white flex items-center justify-center rounded-lg font-bold text-xl group-hover:rotate-12 transition-transform">
                            F
                        </div>
                        <span className={`text-2xl font-bold tracking-tight ${scrolled ? 'text-gray-900' : 'text-gray-900 md:text-white'}`}>
                            FASHION<span className="text-red-600">ENTERPRISES</span>
                        </span>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">
                        {sections.map((section) => (
                            <button
                                key={section.id}
                                onClick={() => scrollTo(section.id)}
                                className={`text-sm font-medium tracking-wide uppercase hover:text-red-600 transition-colors relative group ${activeSection === section.id
                                        ? 'text-red-600'
                                        : scrolled ? 'text-gray-600' : 'text-gray-200'
                                    }`}
                            >
                                {section.label}
                                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full ${activeSection === section.id ? 'w-full' : ''}`}></span>
                            </button>
                        ))}
                        <button
                            onClick={() => scrollTo('contact')}
                            className={`px-5 py-2 rounded-full font-semibold text-sm transition-all hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 ${scrolled
                                    ? 'bg-red-600 text-white hover:bg-red-700'
                                    : 'bg-white text-gray-900 hover:bg-gray-100'
                                }`}
                        >
                            Get a Quote
                        </button>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="md:hidden p-2 text-gray-600"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} className={!scrolled && !mobileMenuOpen ? 'text-white' : 'text-gray-900'} />}
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center gap-8 md:hidden"
                    >
                        {sections.map((section) => (
                            <button
                                key={section.id}
                                onClick={() => scrollTo(section.id)}
                                className="text-2xl font-bold text-gray-800 hover:text-red-600 transition-colors"
                                style={{ color: activeSection === section.id ? '#dc2626' : undefined }}
                            >
                                {section.label}
                            </button>
                        ))}
                        <button
                            onClick={() => scrollTo('contact')}
                            className="mt-4 px-8 py-3 bg-red-600 text-white rounded-full text-lg font-bold shadow-xl active:scale-95 transition-transform"
                        >
                            Get Started
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* --- HERO SECTION --- */}
            <section id="hero" className="relative w-full h-screen flex items-center justify-center overflow-hidden">
                {/* Background Image with Parallax-like fixed attachment */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop')",
                        backgroundAttachment: 'fixed'
                    }}
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>

                <div className="relative container mx-auto px-4 md:px-8 z-10 pt-20">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="max-w-3xl"
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <span className="h-0.5 w-12 bg-red-600"></span>
                            <span className="text-red-500 font-bold tracking-widest uppercase text-sm">Premium Apparel Manufacturing</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
                            Crafting Excellence in <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">Every Stitch</span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-xl leading-relaxed">
                            We bring your fashion ideas to life through expert tailoring, premium imported fabrics, and high-quality garment production. Since 2016, we have been delivering clothing crafted with precision, comfort, and timeless style.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button onClick={() => scrollTo('gallery')} className="px-8 py-4 bg-red-600 text-white rounded-full font-bold shadow-lg hover:bg-red-700 hover:shadow-red-600/30 transition-all flex items-center justify-center gap-2 group">
                                Explore Collection
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button onClick={() => scrollTo('contact')} className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border border-white/30 rounded-full font-bold hover:bg-white hover:text-gray-900 transition-all">
                                Request a Quote
                            </button>
                        </div>

                        {/* Stats */}
                        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
                            {[
                                { val: '250+', label: 'Customers' },
                                { val: '10+', label: 'Years Experience' },
                                { val: 'Premium', label: 'Fabric' },
                                { val: 'Trusted', label: 'Service' }
                            ].map((stat, idx) => (
                                <div key={idx} className="border-l-2 border-red-600 pl-4">
                                    <div className="text-2xl md:text-3xl font-bold text-white">{stat.val}</div>
                                    <div className="text-sm text-gray-300 uppercase tracking-wider">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Scroll Down Indicator */}
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 cursor-pointer"
                    onClick={() => scrollTo('about')}
                >
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-xs uppercase tracking-widest">Scroll</span>
                        <ArrowUp size={20} className="rotate-180" />
                    </div>
                </motion.div>
            </section>

            {/* --- ABOUT US --- */}
            <section id="about" className="py-20 md:py-32 bg-white">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={staggerVariants}
                        >
                            <motion.span variants={itemVariants} className="text-red-600 font-bold uppercase tracking-widest text-sm mb-2 block">ABOUT OUR COMPANY</motion.span>
                            <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                                Redefining Apparel <br />Manufacturing
                            </motion.h2>
                            <motion.p variants={itemVariants} className="text-gray-600 text-lg mb-6 leading-relaxed">
                                Founded in 2016, Fashion Enterprises began as a tailoring business dedicated to delivering high-quality custom garments. Over the years, we expanded our expertise by importing premium fabrics and producing garments that meet both local and international standards.
                            </motion.p>
                            <motion.p variants={itemVariants} className="text-gray-600 text-lg mb-8 leading-relaxed">
                                Today, we specialize in tailoring, garment production, and exporting apparel while maintaining the traditional craftsmanship that defines our brand. Our focus is simple - quality materials, precise tailoring, and designs that reflect our customers’ style and vision.
                            </motion.p>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                {[
                                    { icon: Award, title: "Quality First", desc: "High-quality fabrics for lasting comfort" },
                                    { icon: Globe, title: "Expert Tailoring", desc: "Precise stitching with skilled craftsmanship" },
                                    { icon: Scissors, title: "Custom Designs", desc: "Garments tailored to your style" },
                                ].map((feature, i) => (
                                    <motion.div
                                        key={i}
                                        variants={itemVariants}
                                        className="p-4 bg-gray-50 rounded-xl hover:shadow-md transition-shadow border border-gray-100"
                                    >
                                        <feature.icon className="w-8 h-8 text-red-600 mb-3" />
                                        <h3 className="font-bold text-gray-900 mb-1">{feature.title}</h3>
                                        <p className="text-sm text-gray-500">{feature.desc}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            <div className="absolute -inset-4 bg-red-100 rounded-3xl -z-10 rotate-3"></div>
                            <img
                                src="https://images.unsplash.com/photo-1537832816519-689ad163238b?q=80&w=2059&auto=format&fit=crop"
                                alt="Fashion Workshop"
                                className="rounded-2xl shadow-xl w-full h-[600px] object-cover"
                            />
                            <div className="absolute bottom-8 left-8 bg-white p-6 rounded-xl shadow-lg max-w-xs animate-float">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="flex -space-x-2">
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-[10px] overflow-hidden">
                                                <img src={`https://randomuser.me/api/portraits/men/${i * 10}.jpg`} alt="worker" />
                                            </div>
                                        ))}
                                    </div>
                                    <span className="text-sm font-bold text-gray-900">Expert Team</span>
                                </div>
                                <p className="text-xs text-gray-500">Our experienced tailors and garment specialists ensure every piece meets the highest standards of quality and craftsmanship</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* --- HISTORY / STORY --- */}
            <section id="history" className="py-20 bg-gray-50">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
                        <div className="w-20 h-1 bg-red-600 mx-auto rounded-full"></div>
                    </div>

                    <div className="relative">
                        {/* Line */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gray-200 hidden md:block"></div>

                        <div className="space-y-12">
                            {[
                                { year: '2016', title: 'Established', desc: 'Started as a tailoring business focused on custom garments and quality craftsmanship.' },
                                { year: '2019', title: 'Expansion', desc: 'Expanded operations to include importing premium fabrics for tailoring and garment production.' },
                                { year: '2021', title: 'Garment Production Growth', desc: 'Increased production capacity to serve more customers and businesses.' },
                                { year: '2024', title: 'Export Development', desc: 'Started exploring international markets and exporting garments to overseas customers.' },
                            ].map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className={`flex items-center justify-between md:justify-center w-full ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                                >
                                    <div className="hidden md:block w-5/12"></div>
                                    <div className="z-10 flex-shrink-0 w-8 h-8 rounded-full bg-red-600 border-4 border-white shadow-lg mx-auto md:mx-0"></div>
                                    <div className={`w-full md:w-5/12 pl-8 md:pl-0 ${idx % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 text-left'}`}>
                                        <span className="text-red-600 font-bold text-lg">{item.year}</span>
                                        <h3 className="text-xl font-bold text-gray-900 mt-1">{item.title}</h3>
                                        <p className="text-gray-500 mt-2">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* --- WHAT WE DO (Services Grid) --- */}
            <section id="services" className="py-20 md:py-32 bg-white">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-red-600 font-bold uppercase tracking-widest text-sm">Services</span>
                        <h2 className="text-4xl font-bold text-gray-900 mt-2 mb-6">Our Fashion & Tailoring Services</h2>
                        <p className="text-gray-600">We provide professional tailoring, garment production, and fabric sourcing services designed to meet both personal and business needs.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: "Custom Tailoring", icon: ShoppingBag, img: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=2075&auto=format&fit=crop" },
                            { title: "Bulk Manufacturing", icon: Layers, img: "https://images.unsplash.com/photo-1620799140408-ed5341cd2431?q=80&w=2072&auto=format&fit=crop" },
                            { title: "Garment Production", icon: Scissors, img: "https://images.unsplash.com/photo-1504198458649-3128b932f49e?q=80&w=2069&auto=format&fit=crop" },
                            { title: "Private Labeling", icon: Award, img: "https://images.unsplash.com/photo-1589810635657-232948472d98?q=80&w=2070&auto=format&fit=crop" },
                            { title: "Uniform Tailoring", icon: Zap, img: "https://images.unsplash.com/photo-1588667823321-c167d5ae134b?q=80&w=2070&auto=format&fit=crop" },
                            { title: "Quality Finishing", icon: Check, img: "https://images.unsplash.com/photo-1596328639259-71286c75a0e5?q=80&w=2070&auto=format&fit=crop" }
                        ].map((service, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                whileHover={{ y: -10 }}
                                className="group relative h-80 rounded-2xl overflow-hidden shadow-lg cursor-pointer"
                            >
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                    style={{ backgroundImage: `url(${service.img})` }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90"></div>

                                <div className="absolute bottom-0 left-0 p-8 w-full">
                                    <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mb-4 text-white shadow-lg group-hover:scale-110 transition-transform">
                                        <service.icon size={24} />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                                   
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- OUR PROCESS --- */}
            <section id="process" className="py-20 bg-gray-900 text-white">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">How We Work</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">Our step-by-step process ensures quality and perfect fit</p>
                    </div>

                    <div className="relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gray-700 -translate-y-1/2 z-0"></div>

                        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative z-10">
                            {[
                                { step: "01", title: "Consultation", icon: MessageCircle },
                                { step: "02", title: "Design", icon: Scissors },
                                { step: "03", title: "Sample", icon: Layers },
                                { step: "04", title: "Production", icon: Zap },
                                { step: "05", title: "Delivery", icon: Truck },
                            ].map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.15 }}
                                    className="flex flex-col items-center text-center bg-gray-900 md:bg-transparent p-4 rounded-xl border border-gray-800 md:border-none"
                                >
                                    <div className="w-16 h-16 rounded-full bg-gray-800 border-2 border-red-600 flex items-center justify-center mb-4 relative shadow-[0_0_15px_rgba(220,38,38,0.5)]">
                                        <item.icon className="text-white" size={28} />
                                        <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 rounded-full text-xs flex items-center justify-center font-bold">
                                            {item.step}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                                  
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* --- WHY CHOOSE US (Split) --- */}
            <section className="py-20 bg-white overflow-hidden">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="flex flex-col md:flex-row items-center gap-16">
                        <motion.div
                            initial={{ x: -100, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            className="w-full md:w-1/2"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=2074&auto=format&fit=crop"
                                alt="Fabric Detail"
                                className="rounded-2xl shadow-2xl skew-y-3 hover:skew-y-0 transition-transform duration-700"
                            />
                        </motion.div>

                        <motion.div
                            initial={{ x: 100, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            className="w-full md:w-1/2"
                        >
                            <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Choose Us ?</h2>
                            <p className="text-gray-600 mb-8 text-lg">
                                We focus on quality tailoring, premium fabrics, and reliable service. With years of experience, our goal is to deliver garments that combine comfort, style, and durability for every customer.
                            </p>

                            <ul className="space-y-4 mb-8">
                                {[
                                    "Experienced Tailors",
                                    "Premium Fabric QualitY",
                                    "Custom Fit Garments",
                                    "Reliable Service"
                                ].map((point, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <Check className="text-red-600 flex-shrink-0" />
                                        <span className="text-gray-800 font-medium">{point}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="flex gap-4">
                                <div className="px-4 py-2 bg-gray-100 rounded text-xs font-bold text-gray-500 uppercase">EXPERT TAILORING</div>
                                <div className="px-4 py-2 bg-gray-100 rounded text-xs font-bold text-gray-500 uppercase">PREMIUM FABRICS</div>
                                <div className="px-4 py-2 bg-gray-100 rounded text-xs font-bold text-gray-500 uppercase">QUALITY GUARANTEED</div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* --- GALLERY (Masonry-ish) --- */}
            <section id="gallery" className="py-20 bg-gray-50">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="mb-12 flex justify-between items-end">
                        <div>
                            <span className="text-red-600 font-bold uppercase tracking-widest text-sm">Portfolio</span>
                            <h2 className="text-3xl font-bold text-gray-900 mt-2">Recent Productions</h2>
                        </div>
                        <button className="hidden md:flex items-center gap-2 text-red-600 font-bold hover:translate-x-1 transition-transform">
                            View Full Gallery <ArrowRight size={18} />
                        </button>
                    </div>

                    <div className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6">
                        {[
                            "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2020&auto=format&fit=crop",
                            "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop",
                            "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop",
                            "https://images.unsplash.com/photo-1485230905905-ec40986f9960?q=80&w=2070&auto=format&fit=crop",
                            "https://images.unsplash.com/photo-1454720503269-3a35c21bebc6?q=80&w=2006&auto=format&fit=crop",
                            "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071&auto=format&fit=crop",
                            "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop"
                        ].map((src, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="relative group overflow-hidden rounded-xl break-inside-avoid shadow-sm hover:shadow-xl transition-shadow"
                            >
                                <img src={src} alt="Gallery" className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" />
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <span className="text-white font-bold tracking-wider border border-white px-4 py-2 uppercase text-sm">View Item</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- TESTIMONIALS --- */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 md:px-8">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">Client Success Stories</h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { name: "Nishan Perera", role: "Retail Customer", text: "Fashion Enterprises provided excellent tailoring service. The fitting and fabric quality were perfect. Highly recommended for anyone looking for quality garments." },
                            { name: "Jakeen Abdul", role: "Business Owner", text: "We ordered uniforms for our staff and the quality was very good. The stitching and finishing were professional and delivered on time." },
                            { name: "Tharushi Fernando", role: "Boutique Owner", text: "Very reliable tailoring service. They helped us with custom designs and the garments were exactly what we expected." },
                        ].map((t, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2 }}
                                className="p-8 bg-gray-50 rounded-2xl border border-gray-100 relative"
                            >
                                <div className="absolute -top-4 left-8 text-6xl text-red-200 font-serif">"</div>
                                <div className="flex gap-1 text-yellow-500 mb-4">
                                    {[1, 2, 3, 4, 5].map(star => <Star key={star} size={16} fill="currentColor" />)}
                                </div>
                                <p className="text-gray-600 mb-6 italic">{t.text}</p>
                                <div>
                                    <h4 className="font-bold text-gray-900">{t.name}</h4>
                                    <p className="text-sm text-gray-500">{t.role}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- FAQ --- */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4 md:px-8 max-w-4xl">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        {[
                            { q: "Do you provide custom tailoring ?", a: "Yes, we offer custom tailoring services based on your measurements and design preferences." },
                            { q: "Can I choose my own fabric ?", a: "Yes, customers can bring their own fabric or select from our available premium fabrics." },
                            { q: "Do you make uniforms for companies or schools ?", a: "Yes, we provide custom uniform tailoring for businesses, schools, and organizations." },
                            { q: "How long does tailoring take ?", a: "The time depends on the design and quantity, but most orders are completed within a few days." },
                            { q: "Do you sell ready-made garments ?", a: "Yes, we also offer ready-made garments along with custom tailoring services." },
                            { q: "Do you import fabrics ?", a: "Yes, we import premium fabrics to ensure high quality for our tailoring and garment production." },
                        ].map((faq, i) => (
                            <details key={i} className="group bg-white rounded-lg shadow-sm open:shadow-md transition-shadow">
                                <summary className="flex cursor-pointer justify-between items-center p-6 font-medium text-gray-900 list-none">
                                    <span>{faq.q}</span>
                                    <span className="transition group-open:rotate-180">
                                        <ChevronRight />
                                    </span>
                                </summary>
                                <div className="px-6 pb-6 text-gray-600 animate-fadeIn">
                                    {faq.a}
                                </div>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- CONTACT --- */}
            <section id="contact" className="py-20 bg-gray-900 text-white relative overflow-hidden">
                {/* Decorative Map BG */}
                <div className="absolute inset-0 opacity-10 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-cover bg-center"></div>

                <div className="container mx-auto px-4 md:px-8 relative z-10">
                    <div className="flex flex-col md:flex-row gap-16">

                        <div className="w-full md:w-1/2">
                            <h2 className="text-4xl font-bold mb-6">Let's Create Something <span className="text-red-600">Extraordinary</span></h2>
                            <p className="text-gray-300 mb-10">Ready to start your clothing branc ? Get in touch with us for a consultation or quote.</p>

                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-red-500"><MapPin /></div>
                                    <div>
                                        <h4 className="font-bold">Visit Us</h4>
                                        <p className="text-gray-400">23 C Wattegama Road, Guruketa, Ukuwela, Matale, Sri Lanka</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-red-500"><Phone /></div>
                                    <div>
                                        <h4 className="font-bold">Call Us</h4>
                                        <p className="text-gray-400">+94 77 87 92 291</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-red-500"><Mail /></div>
                                    <div>
                                        <h4 className="font-bold">Email Us</h4>
                                        <p className="text-gray-400">officefashionenterprises@gmail.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full md:w-1/2">
                            <form className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 space-y-6" onSubmit={(e) => e.preventDefault()}>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-300">First Name</label>
                                        <input type="text" className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-white focus:outline-none focus:border-red-500 transition-colors" placeholder="Raveen" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-300">Last Name</label>
                                        <input type="text" className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-white focus:outline-none focus:border-red-500 transition-colors" placeholder="Kumar" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">Email Address</label>
                                    <input type="email" className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-white focus:outline-none focus:border-red-500 transition-colors" placeholder="raveen1989@gmail.com" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">Message</label>
                                    <textarea rows={4} className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-white focus:outline-none focus:border-red-500 transition-colors" placeholder="Tell us about your project..."></textarea>
                                </div>
                                <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-lg shadow-lg hover:shadow-red-600/20 transition-all flex justify-center gap-2">
                                    Send Message <ArrowRight />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- FOOTER --- */}
            <footer className="bg-black text-white py-12 border-t border-white/10">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="grid md:grid-cols-4 gap-12 mb-12">
                        <div className="col-span-1 md:col-span-2">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-8 h-8 bg-white text-red-600 flex items-center justify-center rounded-lg font-bold text-xl">F</div>
                                <span className="text-2xl font-bold tracking-tight">FASHION<span className="text-red-500">ENTERPRISES</span></span>
                            </div>
                            <p className="text-gray-400 max-w-sm mb-6">
                                Fashion Enterprises provides professional tailoring, garment production, and premium fabric solutions. Since 2016, we have been delivering quality craftsmanship and reliable service to our customers.
                            </p>
                            <div className="flex gap-4">
                                {[Instagram, Facebook, Twitter].map((Icon, i) => (
                                    <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-red-600 transition-colors">
                                        <Icon size={20} />
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
                            <ul className="space-y-2 text-gray-400">
                                {['Home', 'About Us', 'Services', 'Process', 'Contact'].map(link => (
                                    <li key={link}><a href="#" className="hover:text-red-500 transition-colors">{link}</a></li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold text-lg mb-4">Legal</h4>
                            <ul className="space-y-2 text-gray-400">
                                {['Privacy Policy', 'Terms of Service'].map(link => (
                                    <li key={link}><a href="#" className="hover:text-red-500 transition-colors">{link}</a></li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                        <p>© 2026 Fashion Enterprises. All rights reserved.</p>
                        <p>Powered by PRIME DIGITAL</p>
                    </div>
                </div>
            </footer>

            {/* --- FLOATING BUTTONS --- */}
            <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-40">
                <AnimatePresence>
                    {scrolled && (
                        <motion.button
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className="w-12 h-12 bg-white text-gray-900 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
                        >
                            <ArrowUp size={20} />
                        </motion.button>
                    )}
                </AnimatePresence>

                <a
                    href="https://wa.me/1234567890"
                    target="_blank"
                    rel="noreferrer"
                    className="w-14 h-14 bg-green-500 text-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 active:scale-90 transition-transform hover:shadow-green-500/30"
                >
                    <MessageCircle size={28} />
                </a>
            </div>

        </div>
    );
}
