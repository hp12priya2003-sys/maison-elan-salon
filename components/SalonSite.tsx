"use client";

import { useEffect, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown, ArrowDownRight, ArrowLeft, ArrowRight, ArrowUpRight, Check,
  Instagram, Menu, MessageCircle, Scissors, Sparkles, X, ChevronDown, MapPin, Clock3
} from "lucide-react";

const WHATSAPP_NUMBER = "917019260151";
const whatsappLink = (message: string) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

const images = {
  hero: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=2200&q=90",
  intro: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=85",
  introSmall: "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?auto=format&fit=crop&w=700&q=85",
  cut: "https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=900&q=85",
  colour: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=85",
  ritual: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=900&q=85",
  occasion: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=85",
  stylist1: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=800&q=85",
  stylist2: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=800&q=85",
  stylist3: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=800&q=85",
  stylist4: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=85",
  look1: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1000&q=85",
  look2: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=85",
  look3: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=85",
  look4: "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?auto=format&fit=crop&w=1200&q=85",
  studio: "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&w=1400&q=85",
  products: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=1200&q=85"
};

const services = [
  { number: "01", title: "The Cut", category: "CUT & STYLE", description: "Precision cuts and considered styling, shaped around your features, texture and everyday life.", duration: "45–75 MIN", price: "From ₹1,500", image: images.cut },
  { number: "02", title: "The Colour", category: "COLOUR & GLOSS", description: "Dimensional colour, luminous gloss and soft, seamless blends made uniquely yours.", duration: "90–180 MIN", price: "From ₹4,000", image: images.colour },
  { number: "03", title: "The Ritual", category: "CARE & RESTORE", description: "Restorative treatments and scalp rituals designed to leave hair feeling cared for.", duration: "45–90 MIN", price: "From ₹2,000", image: images.ritual },
  { number: "04", title: "The Occasion", category: "EVENT STYLING", description: "Beautifully finished looks for celebrations, weddings, evenings and everything in between.", duration: "45–90 MIN", price: "From ₹2,500", image: images.occasion }
];

const experts = [
  { name: "Mira Kapoor", role: "CREATIVE DIRECTOR · CUT & STYLE", image: images.stylist1, bio: "Mira believes the best haircut starts with a conversation, not a trend. She creates considered shapes that grow out beautifully and work with the way each client actually lives.", experience: "12 years in cut, shape & styling", approach: "Face-framing detail, natural movement and wearable shape", specialties: ["Signature haircuts", "Layering & movement", "Personal style consultations", "Blowouts & finish work"], work: ["Soft, face-framing layers", "The lived-in bob", "Movement-led long layers"] },
  { name: "Aanya Mehta", role: "COLOUR SPECIALIST", image: images.stylist2, bio: "Aanya is drawn to colour that feels effortless in every light. Her consultations focus on tone, dimension and a maintenance plan that fits the client's routine.", experience: "9 years in colour & gloss", approach: "Dimensional colour with thoughtful upkeep", specialties: ["Balayage & highlights", "Dimensional brunettes", "Gloss & toning", "Colour correction consultations"], work: ["Sunlit brunette", "Soft caramel ribbons", "Seamless blonde blend"] },
  { name: "Leah Fernandes", role: "HAIR & SCALP RITUALS", image: images.stylist4, bio: "Leah creates calm, restorative appointments centred on hair condition, scalp comfort and practical aftercare. Her approach is gentle, considered and never one-size-fits-all.", experience: "8 years in hair care & styling", approach: "Care-first rituals and realistic maintenance", specialties: ["Deep conditioning rituals", "Scalp-care consultations", "Hair repair routines", "Healthy-hair styling"], work: ["The restorative ritual", "Gloss and softness", "A calmer wash-day routine"] },
  { name: "Sana Roy", role: "OCCASION STYLIST", image: images.stylist3, bio: "Sana creates polished occasion hair that still feels personal. From relaxed waves to elegant updos, she works with the outfit, the occasion and the client's comfort.", experience: "7 years in occasion styling", approach: "Modern glamour without losing your individuality", specialties: ["Wedding guest styling", "Modern updos", "Soft waves & blowouts", "Event-ready consultations"], work: ["The modern updo", "Soft occasion waves", "Polished evening finish"] }
];

const looks = [
  { image: images.look1, label: "Soft movement", category: "CUTS" },
  { image: images.look2, label: "The modern brunette", category: "COLOUR" },
  { image: images.look3, label: "Effortless texture", category: "TEXTURE" },
  { image: images.look4, label: "The occasion edit", category: "OCCASION" }
];

const reveal = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const } }
};

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return <motion.div className={className} variants={reveal} initial={reduce ? false : "hidden"} whileInView="visible" viewport={{ once: true, amount: 0.16 }} transition={{ delay }}>{children}</motion.div>;
}

function BookingModal({ open, onClose, initialService = "" }: { open: boolean; onClose: () => void; initialService?: string }) {
  const [service, setService] = useState(initialService);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("Afternoon");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => { if (open) setService(initialService); }, [open, initialService]);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const message = `Hello MAISON ÉLAN, I'd like to enquire about an appointment.\n\nName: ${name}\nService: ${service || "Please recommend a service"}\nPreferred date: ${date || "Flexible"}\nPreferred time: ${time}\nContact number: ${phone || "Not provided"}\nAdditional notes: ${notes || "None"}\n\nPlease confirm availability and final pricing.`;
    window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
  };

  return <AnimatePresence>{open && <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
    <motion.div className="booking-modal" role="dialog" aria-modal="true" aria-labelledby="booking-title" initial={{ opacity: 0, y: 24, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 15 }} transition={{ duration: .25 }}>
      <button className="modal-close" onClick={onClose} aria-label="Close booking form"><X size={20}/></button>
      <span className="eyebrow">YOUR NEXT HAIR RITUAL</span>
      <h2 id="booking-title" className="display">Let's make it <em>yours.</em></h2>
      <p>Share a few details and we'll continue your appointment enquiry with our team on WhatsApp. Your booking is confirmed only after the salon replies.</p>
      <form className="booking-form" onSubmit={submit}>
        <div className="form-field"><label htmlFor="guest-name">Your name *</label><input id="guest-name" required value={name} onChange={e => setName(e.target.value)} placeholder="Full name"/></div>
        <div className="form-field"><label htmlFor="guest-phone">Contact number</label><input id="guest-phone" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Country code + number"/></div>
        <div className="form-field full"><label htmlFor="guest-service">What would you like? *</label><select id="guest-service" required value={service} onChange={e => setService(e.target.value)}><option value="">Choose a service</option>{services.map(s => <option key={s.title} value={s.title}>{s.title} — {s.category}</option>)}<option value="Beauty Atelier consultation">Beauty Atelier consultation</option><option value="Appointment with Mira Kapoor">Appointment with Mira Kapoor</option><option value="Appointment with Aanya Mehta">Appointment with Aanya Mehta</option><option value="Appointment with Leah Fernandes">Appointment with Leah Fernandes</option><option value="Appointment with Sana Roy">Appointment with Sana Roy</option><option value="Not sure — please recommend">Not sure — please recommend</option></select></div>
        <div className="form-field"><label htmlFor="guest-date">Preferred date</label><input id="guest-date" type="date" min={new Date().toISOString().split("T")[0]} value={date} onChange={e => setDate(e.target.value)}/></div>
        <div className="form-field"><label htmlFor="guest-time">Preferred time</label><select id="guest-time" value={time} onChange={e => setTime(e.target.value)}><option>Morning</option><option>Afternoon</option><option>Evening</option><option>Flexible</option></select></div>
        <div className="form-field full"><label htmlFor="guest-notes">Anything else? (optional)</label><textarea id="guest-notes" rows={3} value={notes} onChange={e => setNotes(e.target.value)} placeholder="Your hair goals, occasion or preferred stylist…"/></div>
        <p className="form-note">This opens WhatsApp with your enquiry pre-filled. Please do not share sensitive personal or medical information.</p>
        <button type="submit" className="btn btn-dark">Continue on WhatsApp <ArrowUpRight size={15}/></button>
      </form>
    </motion.div>
  </motion.div>}</AnimatePresence>;
}

function ServiceModal({ service, onClose, onBook }: { service: (typeof services)[number] | null; onClose: () => void; onBook: (title: string) => void }) {
  return <AnimatePresence>{service && <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
    <motion.div className="booking-modal" role="dialog" aria-modal="true" aria-labelledby="service-modal-title" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 15 }}>
      <button className="modal-close" onClick={onClose} aria-label="Close service details"><X size={20}/></button>
      <span className="eyebrow">{service.category}</span><img className="service-modal-image" src={service.image} alt={`${service.title} salon service`} />
      <h2 id="service-modal-title" className="display">{service.title}</h2><p>{service.description}</p>
      <div className="service-modal-meta"><span><Clock3 size={13} style={{ display: "inline", verticalAlign: "middle", marginRight: 6 }}/>{service.duration}</span><span>{service.price}</span></div>
      <p>Every appointment begins with a conversation about your hair, desired result and maintenance routine. Final pricing and duration are confirmed after consultation.</p>
      <button className="btn btn-dark" onClick={() => onBook(service.title)}>Enquire about this service <ArrowUpRight size={15}/></button>
    </motion.div>
  </motion.div>}</AnimatePresence>;
}

function ExpertModal({ person, onClose, onBook }: { person: (typeof experts)[number] | null; onClose: () => void; onBook: (service: string) => void }) {
  return <AnimatePresence>{person && <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}>
    <motion.div className="expert-modal" role="dialog" aria-modal="true" aria-labelledby="expert-modal-title" initial={{ opacity: 0, y: 24, scale: .985 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 14 }} transition={{ duration: .28 }}>
      <button className="modal-close" onClick={onClose} aria-label="Close specialist profile"><X size={20}/></button>
      <div className="expert-modal-grid">
        <div className="expert-modal-portrait"><img src={person.image} alt={`Portrait of ${person.name}`}/><span className="eyebrow">THE MAISON TEAM</span></div>
        <div className="expert-modal-content"><span className="eyebrow">{person.role}</span><h2 id="expert-modal-title" className="display">Meet <em>{person.name.split(" ")[0]}.</em></h2><p className="expert-bio">{person.bio}</p><div className="expert-experience"><span className="eyebrow">EXPERIENCE</span><p>{person.experience}</p></div><div className="expert-experience"><span className="eyebrow">THEIR APPROACH</span><p>{person.approach}</p></div><div className="expert-specialties"><span className="eyebrow">AREAS OF EXPERTISE</span><div className="specialty-tags">{person.specialties.map(item => <span key={item}>{item}</span>)}</div></div><div className="expert-work"><span className="eyebrow">WORK THEY LOVE</span><ul>{person.work.map(item => <li key={item}>{item}</li>)}</ul></div><button className="btn btn-dark expert-book" onClick={() => onBook(`Appointment with ${person.name}`)}>Book with {person.name.split(" ")[0]} <ArrowUpRight size={15}/></button><p className="expert-note">We'll confirm availability and the final service details with you.</p></div>
      </div>
    </motion.div>
  </motion.div>}</AnimatePresence>;
}

export default function SalonSite() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [initialService, setInitialService] = useState("");
  const [activeService, setActiveService] = useState<(typeof services)[number] | null>(null);
  const [lookFilter, setLookFilter] = useState("ALL");
  const [activeLook, setActiveLook] = useState<(typeof looks)[number] | null>(null);
  const [activeExpert, setActiveExpert] = useState<(typeof experts)[number] | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    handleScroll(); window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openBooking = (service = "") => { setInitialService(service); setActiveService(null); setBookingOpen(true); setMenuOpen(false); };
  const closeMenu = () => setMenuOpen(false);
  const filteredLooks = lookFilter === "ALL" ? looks : looks.filter(item => item.category === lookFilter);

  return <main>
    <div className="topline">A considered approach to beautiful hair <span style={{ margin: "0 9px", color: "#cbb18c" }}>✳</span> Now welcoming appointments</div>
    <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
      <div className="container nav-inner">
        <a className="wordmark" href="#home" aria-label="Maison Élan home">MAISON ÉLAN<span>HAIR · BEAUTY · RITUAL</span></a>
        <nav className={`nav-links ${menuOpen ? "open" : ""}`} aria-label="Main navigation">
          <a href="#services" onClick={closeMenu}>Services</a><a href="#studio" onClick={closeMenu}>The Studio</a><a href="#experts" onClick={closeMenu}>Our Experts</a><a href="#lookbook" onClick={closeMenu}>Lookbook</a><a href="#faq" onClick={closeMenu}>FAQs</a><a href="#location" onClick={closeMenu}>Visit</a><a href="#contact" onClick={closeMenu}>Contact</a>
        </nav>
        <button className="btn btn-dark nav-book" onClick={() => openBooking()}>Book a visit <ArrowUpRight size={13}/></button>
        <button className="menu-toggle" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(v => !v)}>{menuOpen ? <X size={23}/> : <Menu size={23}/>}</button>
      </div>
    </header>

    <section className="hero" id="home">
      <motion.img className="hero-image" src={images.hero} alt="Editorial beauty portrait for Maison Élan" initial={{ scale: 1.12 }} animate={{ scale: 1 }} transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}/>
      <div className="container hero-content">
        <motion.span className="eyebrow" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .35, duration: .7 }}>THE MODERN HAIR ATELIER</motion.span>
        <motion.h1 className="display" initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .5, duration: 1, ease: [0.22, 1, 0.36, 1] }}>Your hair.<br/><em>Your signature.</em></motion.h1>
        <motion.p className="hero-description" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .8, duration: .7 }}>Thoughtful styling, beautiful transformations and rituals designed around you. A little more than a good hair day.</motion.p>
        <motion.div className="hero-actions" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: .7 }}><a href="#services" className="btn btn-light">Discover our services <ArrowDownRight size={15}/></a><button className="btn" style={{ borderColor: "rgba(255,255,255,.65)", color: "white", background: "transparent" }} onClick={() => openBooking()}>Book your visit <ArrowUpRight size={15}/></button></motion.div>
      </div>
      <div className="hero-stamp" aria-hidden="true"><div>CONSIDERED<br/>BEAUTY<br/><b>ME</b><br/>EST. IN STYLE</div></div>
      <div className="container hero-meta"><span>Independent beauty · Thoughtfully considered</span><span className="hero-scroll"><span className="scroll-line"/> SCROLL TO DISCOVER <ArrowDown size={12}/></span><span className="vertical-note">A NEW KIND OF HAIR DAY</span></div>
    </section>

    <section className="section-pad" id="about"><div className="container intro-grid">
      <Reveal className="intro-image-wrap"><img className="intro-image" src={images.intro} alt="Fashion-led beauty portrait with understated styling"/><img className="intro-image-small" src={images.introSmall} alt="A detail from our beauty editorial"/><span className="image-caption">A softer kind of statement — 01 / 04</span></Reveal>
      <Reveal className="intro-text" delay={.1}><span className="eyebrow">BEAUTY, WITH INTENTION</span><h2 className="display">A little more than a <em>good hair day.</em></h2><p>At MAISON ÉLAN, beautiful hair is personal. We take time to understand your texture, your routine, your inspiration and what makes you feel most like yourself before recommending a cut, colour or ritual.</p><p>We believe you should feel listened to, never rushed. That means considered consultations, clear conversations about upkeep, thoughtful techniques and recommendations that make sense for your real life — not just the photograph you bring in.</p><p>We want to be the studio you return to because your stylist remembers the little details, your hair feels cared for between visits, and every appointment feels like time set aside for you. No pressure, no one-size-fits-all formulas — just good people, honest advice and a result that feels unmistakably yours.</p><a className="text-link" href="#studio">Discover what makes us different <ArrowRight size={15}/></a></Reveal>
    </div></section>

    <section className="section-pad services" id="services"><div className="container">
      <Reveal className="section-head"><div><span className="eyebrow">THE MAISON MENU</span><h2 className="display section-title">Good hair, <em>considered.</em></h2></div><p className="section-copy">A thoughtful edit of signature services, tailored to your texture, your mood and the way you want to feel.</p></Reveal>
      <div className="service-grid">{services.map((service, index) => <Reveal key={service.number} delay={index * .07}><article className="service-card"><div className="service-image-wrap"><img className="service-image" src={service.image} alt={`${service.title} at Maison Élan`} loading="lazy"/><span className="service-number">{service.number}</span></div><div className="service-info"><span className="eyebrow">{service.category}</span><h3>{service.title}</h3><p>{service.description}</p><div className="service-bottom"><span>{service.price}</span><button onClick={() => setActiveService(service)}>Explore <ArrowUpRight size={13}/></button></div></div></article></Reveal>)}</div>
      <div style={{ textAlign: "center", marginTop: 38 }}><button className="btn btn-outline" onClick={() => openBooking("Not sure — please recommend")}>Explore services with us <ArrowRight size={15}/></button></div>
    </div></section>

    <div className="marquee" aria-label="Maison Élan services"><div className="marquee-track" aria-hidden="true">{[0,1].map(i => <span key={i}>Lived-in colour <i>✳</i> Precision cuts <i>✳</i> Beautiful texture <i>✳</i> Restorative rituals <i>✳</i> Occasion styling <i>✳</i> Your signature <i>✳</i></span>)}</div></div>

    <section className="section-pad atelier" id="atelier"><div className="container atelier-grid"><Reveal className="atelier-copy"><span className="eyebrow">THE BEAUTY ATELIER</span><h2 className="display">Let's find your <em>look.</em></h2><p>Not quite sure what to book? Tell us a little about your hair, your inspiration and what you have in mind. We'll help you find a considered place to begin.</p><button className="btn btn-light" onClick={() => openBooking("Beauty Atelier consultation")}>Start your beauty edit <ArrowUpRight size={15}/></button></Reveal><Reveal className="atelier-steps" delay={.12}>{[{n:"01",title:"Tell us what you love",desc:"Your hair goals, texture and the looks you save."},{n:"02",title:"Explore your possibilities",desc:"Discover services that fit your style and routine."},{n:"03",title:"Meet your match",desc:"Find a specialist and make a plan together."}].map(step => <button key={step.n} className="atelier-step" onClick={() => openBooking("Beauty Atelier consultation")}><span className="step-no">{step.n}</span><span><strong>{step.title}</strong><small>{step.desc}</small></span><ArrowUpRight size={17}/></button>)}</Reveal></div></section>

    <section className="section-pad" id="experts"><div className="container"><Reveal className="section-head"><div><span className="eyebrow">GOOD HANDS, GOOD PEOPLE</span><h2 className="display section-title">Meet your <em>people.</em></h2></div><p className="section-copy">Thoughtful artists with different strengths and one shared belief: the best result starts with listening. Open a profile to explore their work, approach and expertise.</p></Reveal><div className="team-grid">{experts.map((person, index) => <Reveal key={person.name} delay={index * .07}><article className="team-card"><button className="team-profile-trigger" onClick={() => setActiveExpert(person)} aria-label={`View ${person.name}'s profile`}><div className="team-photo"><img src={person.image} alt={`Portrait of ${person.name}, ${person.role.toLowerCase()}`} loading="lazy"/><span className="team-photo-cta">Meet {person.name.split(" ")[0]} <ArrowUpRight size={14}/></span></div></button><h3 className="team-name">{person.name}</h3><div className="team-role">{person.role}</div><p className="team-card-bio">{person.bio}</p><button className="team-link" onClick={() => setActiveExpert(person)}>View profile & work <ArrowUpRight size={13}/></button></article></Reveal>)}</div></div></section>

    <section className="section-pad lookbook" id="lookbook"><div className="container"><Reveal className="section-head"><div><span className="eyebrow">THE LOOKBOOK</span><h2 className="display section-title">A study in <em>beautiful hair.</em></h2></div><p className="section-copy">A visual diary of texture, shape and colour. Save a look you love and bring it to your consultation.</p></Reveal><div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>{["ALL", "CUTS", "COLOUR", "TEXTURE", "OCCASION"].map(filter => <button key={filter} onClick={() => setLookFilter(filter)} className="btn" style={{ minHeight: 36, padding: "0 14px", fontSize: 9, background: lookFilter === filter ? "var(--espresso)" : "transparent", color: lookFilter === filter ? "var(--paper)" : "var(--espresso)" }}>{filter}</button>)}</div><motion.div layout className="lookbook-grid">{filteredLooks.map((item, index) => <motion.button layout key={item.label} className="lookbook-item" onClick={() => setActiveLook(item)} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .4, delay: index * .04 }}><img src={item.image} alt={item.label} loading="lazy"/><span className="lookbook-label">{item.label} <ArrowUpRight size={12} style={{ display: "inline", marginLeft: 5 }}/></span></motion.button>)}</motion.div></div></section>

    <section className="section-pad" id="studio"><div className="container studio-grid"><Reveal><img className="studio-image" src={images.studio} alt="Warm, considered salon interior with contemporary styling stations" loading="lazy"/></Reveal><Reveal className="studio-copy" delay={.12}><span className="eyebrow">A PLACE TO PAUSE</span><h2 className="display">Make space for <em>yourself.</em></h2><p>Good hair is part of it. Feeling looked after is the rest. Our studio is designed to feel welcoming, calm and considered — a place to slow down, talk through what you want and leave feeling like yourself.</p><p>Every appointment begins with a conversation. No one-size-fits-all formulas. Just thoughtful recommendations, transparent expectations and care that continues beyond the mirror.</p><div className="studio-stat"><div><strong className="display">01:01</strong><span>One-to-one attention</span></div><div><strong className="display">You</strong><span>Always at the centre</span></div></div><a className="text-link" href="#contact">Plan your visit <ArrowRight size={15}/></a></Reveal></div></section>

    <section className="section-pad testimonials"><div className="container"><Reveal className="section-head"><div><span className="eyebrow">KIND WORDS</span><h2 className="display section-title">A feeling worth <em>sharing.</em></h2></div><p className="section-copy">The best compliment is when you leave feeling more like yourself. These sample cards are placeholders for verified client reviews.</p></Reveal><div className="review-grid">{[{quote:"I finally found a stylist who listens first and suggests second. The whole experience felt thoughtful.",name:"CLIENT REVIEW · SAMPLE"},{quote:"The colour was beautifully blended and the aftercare advice made maintaining it feel easy.",name:"CLIENT REVIEW · SAMPLE"},{quote:"A calm, lovely experience from the first consultation to the final look. I left feeling amazing.",name:"CLIENT REVIEW · SAMPLE"}].map(review => <Reveal key={review.quote}><article className="review-card"><div className="stars" aria-label="Decorative star rating">★★★★★</div><blockquote>“{review.quote}”</blockquote><div className="review-author">{review.name}</div></article></Reveal>)}</div></div></section>

    <section className="section-pad faq-section" id="faq"><div className="container faq-layout"><Reveal className="faq-intro"><span className="eyebrow">A FEW GOOD TO KNOWS</span><h2 className="display">Before you <em>visit.</em></h2><p>Everything you need to feel comfortable before your appointment. If there's something else on your mind, send us a message — we're happy to help.</p><button className="text-link" onClick={() => openBooking("Question before my visit")}>Ask us a question <ArrowUpRight size={14}/></button></Reveal><div className="faq-list">{[
      {q:"How do I choose the right service?",a:"If you're unsure, start with a consultation. Tell us what you would like to change, share inspiration if you have it, and we'll talk through suitable options, expected upkeep and pricing before beginning."},
      {q:"Do I need to book in advance?",a:"We recommend booking ahead, especially for colour appointments and special occasions. Send us your preferred service, date and time on WhatsApp and our team will confirm availability."},
      {q:"How long will my appointment take?",a:"Timing depends on the service, your hair and the result you're looking for. The durations shown on the website are estimates; your stylist will confirm a more accurate timeframe during consultation."},
      {q:"Can I bring a reference photo?",a:"Absolutely. Reference photos help us understand the mood and details you like. We'll discuss what is achievable for your hair, how the result may differ and what maintenance it could involve."},
      {q:"Will I know the price before we begin?",a:"Yes. Prices shown are indicative starting prices for this concept. For a real appointment, we'll discuss the service plan and confirm the final quote with you before any work begins."},
      {q:"What if I need to change my appointment?",a:"Please contact us as early as possible if your plans change. The salon's confirmed cancellation and rescheduling policy will be shared when your appointment is arranged."}
    ].map((item,index)=><div className={`faq-item ${openFaq===index?"is-open":""}`} key={item.q}><button className="faq-question" aria-expanded={openFaq===index} onClick={()=>setOpenFaq(openFaq===index?null:index)}><span><small>0{index+1}</small>{item.q}</span><ChevronDown size={18}/></button><AnimatePresence initial={false}>{openFaq===index&&<motion.div className="faq-answer" initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}} exit={{height:0,opacity:0}} transition={{duration:.25}}><p>{item.a}</p></motion.div>}</AnimatePresence></div>)}</div></div></section>

    <section className="section-pad location-section" id="location"><div className="container"><Reveal className="section-head"><div><span className="eyebrow">COME FIND YOUR MOMENT</span><h2 className="display section-title">A little time <em>for you.</em></h2></div><p className="section-copy">A welcoming studio, thoughtful people and a little space to pause. Contact us before travelling so we can confirm the current address and your appointment details.</p></Reveal><div className="location-grid"><Reveal className="location-image-wrap"><img src={images.studio} alt="Warm neutral salon interior with considered styling stations" loading="lazy"/><span className="location-image-label">MAISON ÉLAN · THE STUDIO</span></Reveal><Reveal className="location-card" delay={.12}><span className="eyebrow">VISIT THE STUDIO</span><h3 className="display">Your chair is <em>waiting.</em></h3><div className="location-detail"><MapPin size={18}/><div><strong>Location</strong><p>Dubai, United Arab Emirates</p><small>Demo location for this portfolio concept — confirm and replace with the client's verified address before launch.</small></div></div><div className="location-detail"><Clock3 size={18}/><div><strong>Opening hours</strong><p>By appointment</p><small>Ask us for current availability and opening hours.</small></div></div><div className="location-detail"><MessageCircle size={18}/><div><strong>Appointments & directions</strong><p>+91 70192 60151</p><small>Message us to confirm the address, availability and directions before visiting.</small></div></div><div className="location-actions"><a className="btn btn-dark" href={whatsappLink("Hello MAISON ÉLAN, could you please share your verified salon address, directions and available appointment times?")} target="_blank" rel="noreferrer">Get directions on WhatsApp <ArrowUpRight size={14}/></a><a className="text-link" href="#contact">All contact details <ArrowRight size={14}/></a></div></Reveal></div></div></section>

    <section className="cta-banner"><img src={images.products} alt="Premium hair and beauty care editorial" loading="lazy"/><div className="container cta-content"><Reveal><span className="eyebrow">YOUR MOMENT STARTS HERE</span><h2 className="display">Your next great<br/><em>hair day</em> awaits.</h2><p>Tell us what you're dreaming of. We'll help you find the service, the specialist and the right time for you.</p><button className="btn btn-light" onClick={() => openBooking()}>Book your appointment <ArrowUpRight size={15}/></button></Reveal></div></section>

    <footer className="footer" id="contact"><div className="container"><div className="footer-main"><div className="footer-brand"><a className="wordmark" href="#home">MAISON ÉLAN<span>HAIR · BEAUTY · RITUAL</span></a><p>A considered approach to beautiful hair. Thoughtful styling, personalised rituals and a little more room to feel like yourself.</p><div className="footer-social"><a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={15}/></a><a href={whatsappLink("Hello MAISON ÉLAN, I'd like to know more about your services.")} target="_blank" rel="noreferrer" aria-label="WhatsApp"><MessageCircle size={15}/></a></div></div><div className="footer-col"><h4>Explore</h4><a href="#about">Our philosophy</a><a href="#services">Services</a><a href="#experts">Our experts</a><a href="#lookbook">Lookbook</a><a href="#atelier">Beauty Atelier</a><a href="#faq">FAQs</a><a href="#location">Visit the studio</a></div><div className="footer-col"><h4>Visit</h4><p>Dubai, United Arab Emirates</p><p>Demo location — replace with verified client address.</p><p>Hours: By appointment</p><a href="#location">View visit information ↗</a><button className="text-link" style={{ color: "var(--paper)", borderColor: "#ffffff50", background: "transparent" }} onClick={() => openBooking()}>Plan your visit <ArrowUpRight size={13}/></button></div><div className="footer-col"><h4>Get in touch</h4><p>For appointments, service enquiries and collaborations.</p><a href={whatsappLink("Hello MAISON ÉLAN, I'd like to enquire about an appointment.")} target="_blank" rel="noreferrer">WhatsApp: +91 70192 60151</a><a href="mailto:hello@maisonelan.example">hello@maisonelan.example</a><p style={{ marginTop: 15, color: "#8f7d70", fontSize: 9 }}>Demo contact details — customise before launch.</p></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} MAISON ÉLAN. ALL RIGHTS RESERVED.</span><span>MADE WITH INTENTION.</span><span className="footer-credit">A digital experience by <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">Webloom Studio ↗</a></span></div></div></footer>

    <a className="whatsapp-float" href={whatsappLink("Hello MAISON ÉLAN, I'd like to enquire about an appointment.")} target="_blank" rel="noreferrer"><MessageCircle size={17}/> Enquire on WhatsApp</a>
    <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} initialService={initialService}/>
    <ExpertModal person={activeExpert} onClose={() => setActiveExpert(null)} onBook={service => { setActiveExpert(null); openBooking(service); }}/>
    <ServiceModal service={activeService} onClose={() => setActiveService(null)} onBook={openBooking}/>
    <AnimatePresence>{activeLook && <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={e => { if (e.target === e.currentTarget) setActiveLook(null); }}><motion.div style={{ width: "min(850px,100%)", position: "relative", background: "var(--paper)", padding: 12 }} initial={{ scale: .97, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: .98, opacity: 0 }}><button className="modal-close" onClick={() => setActiveLook(null)} aria-label="Close lookbook image"><X size={22}/></button><img src={activeLook.image} alt={activeLook.label} style={{ width: "100%", maxHeight: "75vh", objectFit: "cover" }}/><div style={{ display: "flex", justifyContent: "space-between", padding: "15px 5px 5px", gap: 20 }}><span className="display" style={{ fontSize: 28 }}>{activeLook.label}</span><button className="text-link" onClick={() => { setActiveLook(null); openBooking("Consultation inspired by: " + activeLook.label); }}>Discuss this look <ArrowUpRight size={13}/></button></div></motion.div></motion.div>}</AnimatePresence>
  </main>;
}
