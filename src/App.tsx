import { type FormEvent, type ReactNode, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  CalendarClock,
  Check,
  CircleAlert,
  CircleCheck,
  ClipboardList,
  Fan,
  Mail,
  Menu,
  MessageCircle,
  Package,
  Phone,
  Plus,
  Refrigerator,
  Search,
  Send,
  Settings2,
  ShieldCheck,
  Snowflake,
  Sparkles,
  ThermometerSnowflake,
  ToolCase,
  WashingMachine,
  Wrench,
  X,
} from 'lucide-react';

const queryClient = new QueryClient();

const services = [
  { icon: Fan, number: '01', title: 'Air conditioners', text: 'Cooling checks, servicing, fault finding and careful deep cleaning for split units.' },
  { icon: Refrigerator, number: '02', title: 'Refrigerators', text: 'Troubleshooting for cooling, unusual noise, leaks and everyday performance issues.' },
  { icon: WashingMachine, number: '03', title: 'Washing machines', text: 'Practical diagnosis for drainage, spin, vibration and cycle problems.' },
  { icon: ShieldCheck, number: '04', title: 'Singer warranty service', text: 'A clear path for eligible Singer warranty-related service requests, subject to terms.' },
  { icon: Settings2, number: '05', title: 'Installation', text: 'Neat, considered installation support for appliances and cooling equipment.' },
  { icon: Wrench, number: '06', title: 'General repairs', text: 'When an appliance is behaving strangely, start with a proper diagnosis.' },
];

const products = [
  { icon: Fan, title: 'Air conditioners', detail: 'For bedrooms, living spaces and focused cooling.', accent: 'sky' },
  { icon: Refrigerator, title: 'Refrigerators', detail: 'Everyday cold storage for homes and small businesses.', accent: 'blue' },
  { icon: WashingMachine, title: 'Washing machines', detail: 'Laundry appliances chosen around how you live.', accent: 'deep' },
];

const steps = [
  { number: '01', icon: ClipboardList, title: 'Tell us what changed', text: 'Call, WhatsApp, or leave the essentials in the request form.' },
  { number: '02', icon: Search, title: 'We clarify the issue', text: 'We ask the useful questions before suggesting a next step.' },
  { number: '03', icon: CalendarClock, title: 'Agree the visit', text: 'You get a clear conversation about service timing before anything begins.' },
  { number: '04', icon: Check, title: 'Restore the routine', text: 'We work carefully, explain what was found, and leave you with a practical next step.' },
];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function BrandMark() {
  return (
    <a href="#top" className="flex items-center gap-3" data-testid="link-brand">
      <span className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-[#4682B4] text-white shadow-[0_7px_18px_rgba(70,130,180,.25)]">
        <Snowflake size={21} strokeWidth={1.8} />
        <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-[#87CEEB] ring-2 ring-[#f5fafc]" />
      </span>
      <span className="leading-none">
        <span className="block font-display text-[17px] font-bold tracking-[-.04em] text-[#173b58]">ElectroFrost</span>
        <span className="mt-1 block font-mono-ui text-[8px] uppercase tracking-[.16em] text-[#5b87a5]">service / sales</span>
      </span>
    </a>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  const links = [
    ['Services', 'services'],
    ['AC cleaning', 'cleaning'],
    ['Sales', 'sales'],
    ['How it works', 'process'],
    ['Contact', 'contact'],
  ];
  return (
    <header className="nav-blur fixed left-0 right-0 top-0 z-40 border-b border-[#dbeaf1]">
      <div className="mx-auto flex h-[76px] max-w-[1240px] items-center justify-between px-5 sm:px-8 lg:px-10">
        <BrandMark />
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
          {links.map(([label, id]) => (
            <a key={id} href={`#${id}`} onClick={() => setOpen(false)} className="text-[12px] font-bold text-[#55758b] transition-colors hover:text-[#214f72]" data-testid={`link-nav-${id}`}>
              {label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-4 lg:flex">
          <a href="tel:0772347328" className="flex items-center gap-2 text-[12px] font-bold text-[#285574]" data-testid="link-nav-phone">
            <Phone size={15} /> 077 234 7328
          </a>
          <button onClick={() => scrollToId('request')} className="group flex items-center gap-2 rounded-full bg-[#173b58] px-5 py-3 text-[11px] font-bold uppercase tracking-[.08em] text-white transition-all hover:bg-[#4682B4]" data-testid="button-nav-request">
            Book a service <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>
        <button className="rounded-lg p-2 text-[#214f72] lg:hidden" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? 'Close menu' : 'Open menu'} data-testid="button-mobile-menu">
          {open ? <X size={23} /> : <Menu size={23} />}
        </button>
      </div>
      {open && (
        <nav className="border-t border-[#dbeaf1] bg-[#f7fbfc] px-5 py-5 lg:hidden" aria-label="Mobile navigation">
          <div className="flex flex-col gap-1">
            {links.map(([label, id]) => (
              <a key={id} href={`#${id}`} onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 text-sm font-bold text-[#285574] hover:bg-[#e9f5f9]" data-testid={`link-mobile-${id}`}>{label}</a>
            ))}
          </div>
          <a href="tel:0772347328" className="mt-3 flex items-center justify-center gap-2 rounded-lg bg-[#4682B4] py-3.5 text-sm font-bold text-white" data-testid="link-mobile-phone"><Phone size={17} /> Call 077 234 7328</a>
        </nav>
      )}
    </header>
  );
}

function SectionLabel({ children, light = false }: { children: string; light?: boolean }) {
  return <div className={`mb-5 flex items-center gap-3 font-mono-ui text-[10px] font-medium uppercase tracking-[.2em] ${light ? 'text-[#b9e8f7]' : 'text-[#4682B4]'}`}><span className={`h-px w-7 ${light ? 'bg-[#87CEEB]' : 'bg-[#4682B4]'}`} />{children}</div>;
}

function Hero() {
  return (
    <section id="top" className="relative min-h-[700px] overflow-hidden bg-[#eef8fb] pt-[76px]">
      <div className="hero-grid absolute inset-0 opacity-70" />
      <div className="absolute -right-40 top-10 h-[560px] w-[560px] rounded-full bg-[#87CEEB]/25 blur-3xl" />
      <div className="relative mx-auto grid max-w-[1240px] items-center gap-10 px-5 pb-20 pt-16 sm:px-8 lg:grid-cols-[.94fr_1.06fr] lg:gap-8 lg:px-10 lg:pb-28 lg:pt-24">
        <div className="relative z-10 max-w-[600px]">
          <div className="reveal inline-flex items-center gap-2 rounded-full border border-[#afd6e6] bg-white/70 px-3 py-2 font-mono-ui text-[9px] uppercase tracking-[.14em] text-[#386b8d] shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#25a5a9]" /> Local help for a cooler, easier home
          </div>
          <h1 className="reveal reveal-delay-1 mt-7 font-display text-[clamp(3.3rem,7.1vw,6.8rem)] font-semibold leading-[.91] tracking-[-.075em] text-[#173b58]">
            Keep your<br /><span className="text-[#4682B4]">home</span> in rhythm.
          </h1>
          <p className="reveal reveal-delay-2 mt-7 max-w-[480px] text-[16px] leading-7 text-[#55758b] sm:text-[18px]">
            Dependable appliance service and sales from ElectroFrost — making the urgent stuff feel calm, clear, and easy to book.
          </p>
          <div className="reveal reveal-delay-3 mt-9 flex flex-col gap-3 sm:flex-row">
            <button onClick={() => scrollToId('request')} className="group flex min-h-[52px] items-center justify-center gap-3 rounded-full bg-[#173b58] px-6 text-[12px] font-bold uppercase tracking-[.09em] text-white shadow-[0_12px_25px_rgba(23,59,88,.18)] transition-all hover:-translate-y-0.5 hover:bg-[#4682B4]" data-testid="button-hero-request">
              Request a service <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
            </button>
            <a href="https://wa.me/94772347328" target="_blank" rel="noreferrer" className="flex min-h-[52px] items-center justify-center gap-3 rounded-full border border-[#a3cede] bg-white/65 px-6 text-[12px] font-bold uppercase tracking-[.09em] text-[#285574] transition-all hover:-translate-y-0.5 hover:border-[#4682B4] hover:bg-white" data-testid="link-hero-whatsapp">
              <MessageCircle size={17} /> WhatsApp us
            </a>
          </div>
          <div className="reveal reveal-delay-4 mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono-ui text-[10px] uppercase tracking-[.08em] text-[#7392a5]">
            <span className="flex items-center gap-2"><BadgeCheck size={15} className="text-[#25a5a9]" /> Authorized Singer service agent</span>
            <span className="flex items-center gap-2"><ShieldCheck size={15} className="text-[#25a5a9]" /> Straightforward advice</span>
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-[560px] lg:ml-auto">
          <div className="absolute -left-5 top-14 z-10 hidden rounded-xl border border-[#b3d7e4] bg-white/90 p-4 shadow-[0_18px_40px_rgba(44,93,119,.14)] sm:block">
            <div className="font-mono-ui text-[9px] uppercase tracking-[.14em] text-[#7392a5]">service signal</div>
            <div className="mt-2 flex items-end gap-1.5"><span className="font-display text-2xl font-bold text-[#173b58]">clear</span><span className="mb-1 text-[11px] text-[#25a5a9]">→ next step</span></div>
          </div>
          <div className="relative aspect-[.88] overflow-hidden rounded-[2rem] bg-[#cbeaf3] shadow-[0_25px_60px_rgba(48,101,132,.18)]">
            <img src="/electrofrost-technician.jpg" alt="Technician carefully inspecting a split air conditioner" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#173b58]/60 via-transparent to-[#87CEEB]/10" />
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-white">
              <div><div className="font-mono-ui text-[9px] uppercase tracking-[.18em] text-[#b9e8f7]">ELECTROFROST / 01</div><div className="mt-1 font-display text-2xl font-semibold">Careful work. Clear words.</div></div>
              <ThermometerSnowflake size={30} strokeWidth={1.2} />
            </div>
          </div>
          <div className="absolute -bottom-5 -right-3 rounded-2xl bg-[#173b58] p-4 text-white shadow-[0_16px_32px_rgba(23,59,88,.2)] sm:-right-6">
            <div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#4682B4]"><ToolCase size={20} /></div><div><div className="font-mono-ui text-[9px] uppercase tracking-[.14em] text-[#b9e8f7]">one number</div><div className="mt-1 text-sm font-bold">077 234 7328</div></div></div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 mx-auto hidden max-w-[1240px] items-center gap-4 px-10 pb-4 font-mono-ui text-[9px] uppercase tracking-[.22em] text-[#8ca9b8] lg:flex"><ArrowDownRight size={15} /> scroll to explore <span className="h-px flex-1 bg-[#c6e1eb]" /></div>
    </section>
  );
}

function TrustStrip() {
  return (
    <section className="border-b border-[#d7e9f0] bg-white" aria-label="ElectroFrost service highlights">
      <div className="mx-auto grid max-w-[1240px] divide-y divide-[#d7e9f0] px-5 sm:px-8 md:grid-cols-3 md:divide-x md:divide-y-0 lg:px-10">
        {[
          ['01', 'Built for real homes', 'We work around the appliance, the space, and the actual problem.'],
          ['02', 'One clear conversation', 'Start with one number and get practical next steps, not guesswork.'],
          ['03', 'Sales + aftercare', 'Choose an appliance with service support in the same conversation.'],
        ].map(([num, title, text]) => (
          <div key={num} className="flex gap-4 py-7 md:px-7 first:md:pl-0 last:md:pr-0">
            <span className="font-mono-ui text-[10px] text-[#4682B4]">{num}</span><div><h2 className="font-display text-sm font-bold text-[#173b58]">{title}</h2><p className="mt-1.5 text-xs leading-5 text-[#7392a5]">{text}</p></div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="bg-[#f7fbfc] py-24 sm:py-32">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[.7fr_1.3fr] lg:gap-24">
          <div>
            <SectionLabel>What we handle</SectionLabel>
            <h2 className="font-display text-[clamp(2.6rem,5vw,4.8rem)] font-semibold leading-[.95] tracking-[-.065em] text-[#173b58]">The everyday<br /><span className="text-[#4682B4]">appliance</span> list.</h2>
            <p className="mt-6 max-w-[330px] text-sm leading-6 text-[#648296]">From a room that will not cool to a machine that will not spin, we start by making the situation easier to understand.</p>
            <button onClick={() => scrollToId('request')} className="mt-8 flex items-center gap-2 border-b border-[#4682B4] pb-2 text-xs font-bold uppercase tracking-[.1em] text-[#285574] transition-colors hover:text-[#4682B4]" data-testid="button-services-request">Talk through a problem <ArrowUpRight size={16} /></button>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {services.map(({ icon: Icon, number, title, text }) => (
              <article key={number} className="card-lift group rounded-2xl border border-[#d5e7ee] bg-white p-6 sm:p-7" data-testid={`card-service-${number}`}>
                <div className="flex items-start justify-between"><div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e6f5f9] text-[#4682B4] transition-colors group-hover:bg-[#4682B4] group-hover:text-white"><Icon size={21} strokeWidth={1.7} /></div><span className="font-mono-ui text-[10px] text-[#a0b8c5]">{number}</span></div>
                <h3 className="mt-7 font-display text-lg font-bold tracking-[-.025em] text-[#173b58]">{title}</h3><p className="mt-2 text-[13px] leading-5 text-[#7392a5]">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CleaningFeature() {
  return (
    <section id="cleaning" className="bg-[#173b58] py-24 text-white sm:py-32">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_.9fr] lg:gap-20">
          <div className="relative order-2 lg:order-1">
            <div className="absolute -left-3 -top-3 h-24 w-24 border-l border-t border-[#87CEEB]/50" />
            <div className="relative aspect-[1.05] overflow-hidden rounded-[1.6rem]">
              <img src="/electrofrost-ac-cleaning.jpg" alt="Close detail of an air conditioner being carefully cleaned" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-[#173b58]/10" />
              <div className="absolute bottom-4 left-4 rounded-lg bg-[#f7fbfc]/90 px-3 py-2 font-mono-ui text-[9px] uppercase tracking-[.15em] text-[#285574]">deep clean / AC-01</div>
            </div>
            <div className="absolute -bottom-7 -right-3 w-[155px] rounded-2xl border border-[#5d88a2] bg-[#285574] p-4 sm:-right-7">
              <Sparkles size={18} className="text-[#87CEEB]" /><p className="mt-3 text-xs leading-5 text-[#d3edf5]">A cleaner unit can make the whole room feel different.</p>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <SectionLabel light>Featured service</SectionLabel>
            <h2 className="font-display text-[clamp(2.7rem,5vw,5rem)] font-semibold leading-[.93] tracking-[-.07em]">Your AC works<br />hard. <span className="text-[#87CEEB]">Reset it.</span></h2>
            <p className="mt-7 max-w-[470px] text-[15px] leading-7 text-[#b6d0dc]">Dust, moisture and everyday use build up inside an air conditioner. Our deep cleaning service focuses on the parts that affect air flow, comfort, and the feeling of a fresh room.</p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {['Indoor unit clean-up', 'Filter and airflow attention', 'Protective, tidy setup', 'Practical aftercare guidance'].map((item) => <div key={item} className="flex items-center gap-2 text-xs text-[#d9edf3]"><Check size={15} className="text-[#87CEEB]" /> {item}</div>)}
            </div>
            <button onClick={() => scrollToId('request')} className="mt-10 group flex items-center gap-3 rounded-full bg-[#87CEEB] px-5 py-3.5 text-xs font-bold uppercase tracking-[.1em] text-[#173b58] transition-all hover:bg-white" data-testid="button-cleaning-request">Request AC cleaning <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" /></button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Authorized() {
  return (
    <section className="bg-[#e9f6fa] py-24 sm:py-32">
      <div className="mx-auto grid max-w-[1240px] gap-12 px-5 sm:px-8 lg:grid-cols-[.85fr_1.15fr] lg:gap-24 lg:px-10">
        <div>
          <SectionLabel>Service clarity</SectionLabel>
          <h2 className="font-display text-[clamp(2.5rem,4.8vw,4.5rem)] font-semibold leading-[.96] tracking-[-.065em] text-[#173b58]">The right kind<br />of <span className="text-[#4682B4]">official.</span></h2>
          <p className="mt-6 max-w-[390px] text-sm leading-6 text-[#648296]">ElectroFrost is an Authorized Singer Service Agent. That means we can help guide eligible Singer service and warranty-related requests with the right care.</p>
        </div>
        <div className="rounded-[1.5rem] border border-[#c8e3ec] bg-white p-7 sm:p-10">
          <div className="flex items-start justify-between gap-6"><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#173b58] text-[#87CEEB]"><BadgeCheck size={24} /></div><span className="font-mono-ui text-[10px] uppercase tracking-[.16em] text-[#89a5b5]">service note / 02</span></div>
          <h3 className="mt-8 font-display text-2xl font-bold tracking-[-.04em] text-[#173b58]">What that means for you</h3>
          <div className="mt-6 divide-y divide-[#e1eef3]">
            {[
              ['A familiar service route', 'For eligible Singer appliances, we can help you understand the next step in the service process.'],
              ['Terms still matter', 'Warranty coverage depends on Singer’s applicable terms, product details, and the nature of the issue.'],
              ['No assumptions', 'We do not promise coverage, turnaround, or outcomes before the request is reviewed.'],
            ].map(([title, text]) => <div key={title} className="grid gap-2 py-5 sm:grid-cols-[.72fr_1.28fr]"><strong className="text-sm text-[#285574]">{title}</strong><span className="text-sm leading-6 text-[#7392a5]">{text}</span></div>)}
          </div>
          <button onClick={() => scrollToId('request')} className="mt-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[.1em] text-[#4682B4] hover:text-[#173b58]" data-testid="button-warranty-request">Ask about a warranty request <ArrowRight size={16} /></button>
        </div>
      </div>
    </section>
  );
}

function Sales() {
  return (
    <section id="sales" className="bg-[#f7fbfc] py-24 sm:py-32">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div><SectionLabel>Appliance sales</SectionLabel><h2 className="max-w-[670px] font-display text-[clamp(2.6rem,5vw,4.8rem)] font-semibold leading-[.93] tracking-[-.07em] text-[#173b58]">Choose for the life<br />you actually <span className="text-[#4682B4]">live.</span></h2></div>
          <p className="max-w-[285px] text-sm leading-6 text-[#7392a5]">Tell us what you need, and we can help you explore the right category without pretending we have a live stock list.</p>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {products.map(({ icon: Icon, title, detail, accent }, index) => (
            <article key={title} className={`card-lift relative min-h-[270px] overflow-hidden rounded-[1.4rem] border border-[#d5e7ee] p-7 ${accent === 'deep' ? 'bg-[#173b58] text-white' : 'bg-white'}`} data-testid={`card-product-${index}`}>
              <div className={`absolute -right-10 -top-10 h-40 w-40 rounded-full ${accent === 'sky' ? 'bg-[#d6f1f7]' : accent === 'blue' ? 'bg-[#e6f1fa]' : 'bg-[#285574]'}`} />
              <div className={`relative flex h-12 w-12 items-center justify-center rounded-2xl ${accent === 'deep' ? 'bg-[#4682B4] text-white' : 'bg-[#e6f5f9] text-[#4682B4]'}`}><Icon size={23} strokeWidth={1.6} /></div>
              <h3 className={`relative mt-12 font-display text-2xl font-bold tracking-[-.04em] ${accent === 'deep' ? 'text-white' : 'text-[#173b58]'}`}>{title}</h3>
              <p className={`relative mt-2 max-w-[230px] text-sm leading-6 ${accent === 'deep' ? 'text-[#c2dbe5]' : 'text-[#7392a5]'}`}>{detail}</p>
              <button onClick={() => scrollToId('request')} className={`absolute bottom-7 right-7 flex h-10 w-10 items-center justify-center rounded-full transition-transform hover:translate-x-1 ${accent === 'deep' ? 'bg-[#87CEEB] text-[#173b58]' : 'bg-[#e9f6fa] text-[#4682B4]'}`} aria-label={`Enquire about ${title}`} data-testid={`button-enquire-${index}`}><ArrowUpRight size={17} /></button>
            </article>
          ))}
        </div>
        <div className="mt-7 flex flex-col items-start justify-between gap-4 border-t border-[#d5e7ee] pt-5 sm:flex-row sm:items-center"><div className="flex items-center gap-2 text-xs text-[#7392a5]"><Package size={16} className="text-[#4682B4]" /> No fake inventory here — enquiry is the first step.</div><button onClick={() => scrollToId('request')} className="text-xs font-bold uppercase tracking-[.1em] text-[#285574] hover:text-[#4682B4]" data-testid="button-sales-enquiry">Start an appliance enquiry <ArrowRight size={15} className="ml-2 inline" /></button></div>
      </div>
    </section>
  );
}

function WhyUs() {
  return (
    <section className="relative overflow-hidden bg-[#d8eff6] py-24 sm:py-32">
      <div className="absolute right-0 top-0 h-full w-1/3 bg-[#c5e7f0]/50" />
      <div className="relative mx-auto grid max-w-[1240px] gap-12 px-5 sm:px-8 lg:grid-cols-[1.15fr_.85fr] lg:gap-20 lg:px-10">
        <div><SectionLabel>Why ElectroFrost</SectionLabel><h2 className="font-display text-[clamp(2.7rem,5vw,5rem)] font-semibold leading-[.93] tracking-[-.07em] text-[#173b58]">Good service is<br />a <span className="text-[#4682B4]">feeling.</span></h2><p className="mt-7 max-w-[470px] text-base leading-7 text-[#55758b]">It is the relief of reaching someone who listens. The confidence of understanding what happens next. The small details that say your home is being treated with respect.</p></div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          {[
            ['01', 'Technically capable', 'We bring a practical eye to cooling systems and everyday appliances.'],
            ['02', 'Refreshingly direct', 'No invented prices, stock lists, promises, or jargon to hide behind.'],
            ['03', 'Careful in your space', 'Tidy setup, clear communication, and respect for the home around the appliance.'],
          ].map(([num, title, text]) => <div key={num} className="border-b border-[#a7d1df] py-5"><div className="flex gap-4"><span className="font-mono-ui text-[10px] text-[#4682B4]">{num}</span><div><h3 className="font-display text-base font-bold text-[#173b58]">{title}</h3><p className="mt-1 text-sm leading-6 text-[#648296]">{text}</p></div></div></div>)}
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section id="process" className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col justify-between gap-7 sm:flex-row sm:items-end"><div><SectionLabel>The simple route</SectionLabel><h2 className="font-display text-[clamp(2.7rem,5vw,4.8rem)] font-semibold leading-[.93] tracking-[-.07em] text-[#173b58]">From “uh-oh”<br />to <span className="text-[#4682B4]">sorted.</span></h2></div><div className="flex items-center gap-2 font-mono-ui text-[10px] uppercase tracking-[.16em] text-[#8aa6b5]"><span className="h-2 w-2 rounded-full bg-[#25a5a9]" /> four useful steps</div></div>
        <div className="relative mt-16 grid gap-10 md:grid-cols-4 md:gap-5">
          <div className="absolute left-8 right-8 top-6 hidden h-px bg-[#c7e2eb] md:block" />
          {steps.map(({ number, icon: Icon, title, text }) => <div key={number} className="relative" data-testid={`step-process-${number}`}><div className="relative flex h-12 w-12 items-center justify-center rounded-full border border-[#9cc9d9] bg-white text-[#4682B4]"><Icon size={18} strokeWidth={1.7} /></div><div className="mt-6 font-mono-ui text-[10px] text-[#4682B4]">{number}</div><h3 className="mt-2 font-display text-lg font-bold text-[#173b58]">{title}</h3><p className="mt-2 max-w-[220px] text-sm leading-6 text-[#7392a5]">{text}</p></div>)}
        </div>
      </div>
    </section>
  );
}

function RequestForm() {
  const [status, setStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');
  const [service, setService] = useState('Air conditioner');
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('pending');
    window.setTimeout(() => setStatus('success'), 900);
  };
  return (
    <section id="request" className="bg-[#eef8fb] py-24 sm:py-32">
      <div className="mx-auto grid max-w-[1240px] gap-12 px-5 sm:px-8 lg:grid-cols-[.72fr_1.28fr] lg:gap-24 lg:px-10">
        <div><SectionLabel>Service request</SectionLabel><h2 className="font-display text-[clamp(2.7rem,5vw,4.8rem)] font-semibold leading-[.93] tracking-[-.07em] text-[#173b58]">Let’s make<br />the next step <span className="text-[#4682B4]">clear.</span></h2><p className="mt-7 max-w-[360px] text-sm leading-6 text-[#648296]">Share a few details and we’ll have a better starting point. For urgent issues, calling or WhatsApp is the quickest route.</p><div className="mt-8 flex flex-col gap-3"><a href="tel:0772347328" className="flex items-center gap-3 text-sm font-bold text-[#285574]" data-testid="link-request-phone"><span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-[#4682B4]"><Phone size={16} /></span>077 234 7328</a><a href="mailto:efrost.lk" className="flex items-center gap-3 text-sm font-bold text-[#285574]" data-testid="link-request-email"><span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-[#4682B4]"><Mail size={16} /></span>efrost.lk</a></div></div>
        <form onSubmit={submit} className="rounded-[1.5rem] border border-[#c9e2eb] bg-white p-6 shadow-[0_18px_48px_rgba(44,93,119,.07)] sm:p-9" data-testid="form-service-request">
          {status === 'success' ? <div className="flex min-h-[390px] flex-col items-center justify-center text-center"><div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#e5f6ef] text-[#258a67]"><CircleCheck size={32} /></div><h3 className="mt-6 font-display text-2xl font-bold text-[#173b58]">Request noted.</h3><p className="mt-3 max-w-[370px] text-sm leading-6 text-[#7392a5]">This demo form does not connect to a backend yet. Please call or WhatsApp ElectroFrost so your request can be acted on.</p><div className="mt-7 flex flex-col gap-3 sm:flex-row"><a href="tel:0772347328" className="rounded-full bg-[#173b58] px-5 py-3 text-xs font-bold uppercase tracking-[.1em] text-white" data-testid="link-success-call">Call ElectroFrost</a><a href="https://wa.me/94772347328" target="_blank" rel="noreferrer" className="rounded-full border border-[#acd4e2] px-5 py-3 text-xs font-bold uppercase tracking-[.1em] text-[#285574]" data-testid="link-success-whatsapp">Open WhatsApp</a></div><button type="button" onClick={() => setStatus('idle')} className="mt-6 text-xs font-bold text-[#4682B4]" data-testid="button-new-request">Send another request</button></div> : <><div className="flex items-center justify-between gap-4 border-b border-[#e0eef3] pb-5"><div><div className="font-mono-ui text-[9px] uppercase tracking-[.16em] text-[#8aa6b5]">form / service-01</div><h3 className="mt-2 font-display text-2xl font-bold tracking-[-.04em] text-[#173b58]">Tell us the essentials</h3></div><ClipboardList size={24} className="text-[#87CEEB]" strokeWidth={1.5} /></div><div className="mt-7 grid gap-5 sm:grid-cols-2"><label className="block"><span className="mb-2 block text-xs font-bold text-[#285574]">Your name</span><input required name="name" className="h-12 w-full rounded-lg border border-[#c9e2eb] bg-[#f9fcfd] px-3 text-sm text-[#173b58] placeholder:text-[#a1b7c2]" placeholder="How should we call you?" data-testid="input-name" /></label><label className="block"><span className="mb-2 block text-xs font-bold text-[#285574]">Phone number</span><input required name="phone" type="tel" className="h-12 w-full rounded-lg border border-[#c9e2eb] bg-[#f9fcfd] px-3 text-sm text-[#173b58] placeholder:text-[#a1b7c2]" placeholder="077 234 7328" data-testid="input-phone" /></label><label className="block sm:col-span-2"><span className="mb-2 block text-xs font-bold text-[#285574]">What can we help with?</span><select value={service} onChange={(event) => setService(event.target.value)} className="h-12 w-full rounded-lg border border-[#c9e2eb] bg-[#f9fcfd] px-3 text-sm text-[#173b58]" data-testid="select-service">{['Air conditioner', 'Refrigerator', 'Washing machine', 'Singer warranty service', 'Installation', 'General repair', 'Appliance sales enquiry'].map((item) => <option key={item}>{item}</option>)}</select></label><label className="block sm:col-span-2"><span className="mb-2 block text-xs font-bold text-[#285574]">A little more detail <span className="font-normal text-[#8aa6b5]">(optional)</span></span><textarea name="detail" rows={4} className="w-full resize-none rounded-lg border border-[#c9e2eb] bg-[#f9fcfd] p-3 text-sm text-[#173b58] placeholder:text-[#a1b7c2]" placeholder="What is happening? Any sound, smell, leak, or error code?" data-testid="textarea-detail" /></label></div><div className="mt-6 flex flex-col justify-between gap-4 border-t border-[#e0eef3] pt-6 sm:flex-row sm:items-center"><p className="max-w-[320px] text-[11px] leading-5 text-[#8aa6b5]">No backend submission is connected yet. This form shows the intended request experience.</p><button type="submit" disabled={status === 'pending'} className="flex min-h-[49px] items-center justify-center gap-2 rounded-full bg-[#4682B4] px-6 text-xs font-bold uppercase tracking-[.1em] text-white transition-all hover:bg-[#173b58] disabled:cursor-wait disabled:opacity-70" data-testid="button-submit-request">{status === 'pending' ? 'Noting request…' : 'Send request'} {status === 'pending' ? <CircleAlert size={15} /> : <Send size={15} />}</button></div>{status === 'error' && <p role="alert" className="mt-4 text-xs text-[#b54339]" data-testid="status-request-error">Something went wrong. Please call us directly.</p>}</>}</form>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="bg-[#173b58] py-20 text-white sm:py-28">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div><SectionLabel light>Contact ElectroFrost</SectionLabel><h2 className="max-w-[650px] font-display text-[clamp(2.8rem,6vw,6rem)] font-semibold leading-[.9] tracking-[-.075em]">When it matters,<br /><span className="text-[#87CEEB]">start here.</span></h2></div>
          <div className="flex flex-col items-start gap-3 lg:items-end"><a href="tel:0772347328" className="group flex items-center gap-3 text-2xl font-bold transition-colors hover:text-[#87CEEB]" data-testid="link-contact-phone">077 234 7328 <Phone size={21} className="text-[#87CEEB]" /></a><a href="https://wa.me/94772347328" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-[#c5dce5] hover:text-white" data-testid="link-contact-whatsapp"><MessageCircle size={16} className="text-[#87CEEB]" /> WhatsApp: +94 77 234 7328</a><a href="mailto:efrost.lk" className="flex items-center gap-2 text-sm text-[#c5dce5] hover:text-white" data-testid="link-contact-email"><Mail size={16} className="text-[#87CEEB]" /> efrost.lk</a></div>
        </div>
        <div className="mt-14 flex flex-col justify-between gap-4 border-t border-[#4b7188] pt-5 text-[11px] text-[#a8c3cf] sm:flex-row"><span>Appliance trouble does not need a complicated beginning.</span><button onClick={() => scrollToId('request')} className="flex items-center gap-2 font-bold uppercase tracking-[.1em] text-[#87CEEB] hover:text-white" data-testid="button-contact-request">Make a service request <ArrowUpRight size={15} /></button></div>
      </div>
    </section>
  );
}

function Footer() {
  return <footer className="bg-[#102d43] px-5 py-8 text-[#a8c3cf] sm:px-8 lg:px-10"><div className="mx-auto flex max-w-[1240px] flex-col justify-between gap-5 sm:flex-row sm:items-center"><BrandMark /><div className="text-[11px] leading-5 sm:text-right"><div>ElectroFrost · Authorized Singer Service Agent &amp; Appliance Experts</div><div className="mt-1 text-[#7696a6]">Service and sales conversations, kept straightforward.</div></div></div><div className="mx-auto mt-8 flex max-w-[1240px] justify-between border-t border-[#294a5e] pt-5 font-mono-ui text-[9px] uppercase tracking-[.14em] text-[#7696a6]"><span>© ElectroFrost</span><span>Steel Blue / Sky Blue / White</span></div></footer>;
}

function MobileBar() {
  return <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-[#c9e2eb] bg-white/95 p-2 shadow-[0_-8px_22px_rgba(44,93,119,.12)] backdrop-blur md:hidden"><div className="grid grid-cols-3 gap-2"><a href="tel:0772347328" className="flex min-h-[46px] flex-col items-center justify-center gap-1 rounded-lg bg-[#173b58] text-[9px] font-bold uppercase tracking-[.08em] text-white" data-testid="mobilebar-call"><Phone size={16} /> Call</a><a href="https://wa.me/94772347328" target="_blank" rel="noreferrer" className="flex min-h-[46px] flex-col items-center justify-center gap-1 rounded-lg bg-[#dff5f4] text-[9px] font-bold uppercase tracking-[.08em] text-[#237a7b]" data-testid="mobilebar-whatsapp"><MessageCircle size={16} /> WhatsApp</a><button onClick={() => scrollToId('request')} className="flex min-h-[46px] flex-col items-center justify-center gap-1 rounded-lg bg-[#4682B4] text-[9px] font-bold uppercase tracking-[.08em] text-white" data-testid="mobilebar-book"><ClipboardList size={16} /> Book</button></div></div>;
}

function Home() {
  return <div className="site-grain min-h-[100dvh] overflow-x-hidden pb-20 md:pb-0"><Nav /><main><Hero /><TrustStrip /><Services /><CleaningFeature /><Authorized /><Sales /><WhyUs /><Process /><RequestForm /><Contact /></main><Footer /><MobileBar /></div>;
}

function Router() {
  return <RoutedErrorBoundary><Switch><Route path="/" component={Home} /><Route component={NotFound} /></Switch></RoutedErrorBoundary>;
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;