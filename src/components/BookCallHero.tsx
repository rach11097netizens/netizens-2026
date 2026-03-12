"use client";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef, FC, FormEvent } from 'react';
import iconNavyTick from '../assets/images/navy-dark-tick.svg';
import { Button } from './Button';
import ReCAPTCHA from 'react-google-recaptcha';

// ─── Constants ────────────────────────────────────────────────────────────────

const FEATURES: string[] = [
    "30–45 minute call with a senior consultant",
    "Focused on understanding your requirements, not selling",
    "Clear next steps after the call",
    "Completely free, no obligation",
];

const SERVICES: string[] = [
    "Product Development",
    "Workflow Digitization",
    "Support & Scale",
    "Staff Augmentation",
    "AI Consulting & Automation",
];

// ─── Types ────────────────────────────────────────────────────────────────────

interface Country {
    name: string;
    cca2: string;
    dialCode: string;
    flag: string;
}

interface RestCountryRaw {
    name: { common: string };
    cca2: string;
    idd: { root: string; suffixes: string[] };
    flags: { svg?: string; png?: string };
}

interface CountryCodeDropdownProps {
    countries: Country[];
    loading: boolean;
    selected: Country | null;
    onSelect: (country: Country) => void;
}

interface FormFields {
    name: string;
    email: string;
    phone: string;
    companyName: string;
    companyWebsite: string;
    services: string[];
    recaptchaToken: string;
}

type FormErrors = Partial<Record<keyof FormFields, string>>;

// ─── Validation ───────────────────────────────────────────────────────────────

function validateFields(fields: FormFields): FormErrors {
    const errors: FormErrors = {};
    if (!fields.name.trim()) errors.name = "Name is required.";
    if (!fields.email.trim()) errors.email = "Email address is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
        errors.email = "Please enter a valid email address.";
    if (!fields.phone.trim()) errors.phone = "Phone number is required.";
    else if (!/^\d{5,15}$/.test(fields.phone.replace(/\s/g, "")))
        errors.phone = "Please enter a valid phone number (digits only).";
    if (!fields.companyName.trim()) errors.companyName = "Company name is required.";
    if (!fields.companyWebsite.trim()) errors.companyWebsite = "Company website is required.";
    else {
        try { new URL(fields.companyWebsite); }
        catch { errors.companyWebsite = "Please enter a valid URL (include https://)."; }
    }
    if (fields.services.length === 0) errors.services = "Please select at least one service.";
    return errors;
}

// ─── Hook: fetch countries ────────────────────────────────────────────────────

function useCountryCodes(): { countries: Country[]; loading: boolean } {
    const [countries, setCountries] = useState<Country[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetch('https://restcountries.com/v3.1/all?fields=name,idd,flags,cca2')
            .then((res) => res.json())
            .then((data: RestCountryRaw[]) => {
                const parsed: Country[] = data
                    .filter((c) => c.idd?.root && c.idd?.suffixes?.length)
                    .map((c) => {
                        const suffix = c.idd.suffixes.length === 1 ? c.idd.suffixes[0] : '';
                        const dialCode = `${c.idd.root}${suffix}`;
                        return {
                            name: c.name.common,
                            cca2: c.cca2.toLowerCase(),
                            dialCode,
                            flag: c.flags?.svg || c.flags?.png || `https://flagcdn.com/${c.cca2.toLowerCase()}.svg`,
                        };
                    })
                    .filter((c) => c.dialCode && c.dialCode !== '+')
                    .sort((a, b) => a.name.localeCompare(b.name));
                setCountries(parsed);
            })
            .catch(() => {
                setCountries([
                    { name: 'United States', cca2: 'us', dialCode: '+1', flag: 'https://flagcdn.com/us.svg' },
                    { name: 'United Kingdom', cca2: 'gb', dialCode: '+44', flag: 'https://flagcdn.com/gb.svg' },
                    { name: 'India', cca2: 'in', dialCode: '+91', flag: 'https://flagcdn.com/in.svg' },
                    { name: 'Australia', cca2: 'au', dialCode: '+61', flag: 'https://flagcdn.com/au.svg' },
                    { name: 'Canada', cca2: 'ca', dialCode: '+1', flag: 'https://flagcdn.com/ca.svg' },
                ]);
            })
            .finally(() => setLoading(false));
    }, []);

    return { countries, loading };
}

// ─── Shared input className ───────────────────────────────────────────────────

function inputClass(hasError: boolean): string {
    return `w-full h-[52px] px-4 py-3 rounded-[10px] border text-sm font-sans text-charcoal bg-white focus:outline-none focus:ring-2 transition-all ${hasError
        ? 'border-red-400 focus:ring-red-200 focus:border-red-400'
        : 'border-black/10 focus:ring-regal-navy/20 focus:border-regal-navy/30'
        }`;
}

// ─── Floating Label ───────────────────────────────────────────────────────────

const FloatingLabel: FC<{
    htmlFor: string;
    children: React.ReactNode;
    hasError?: boolean;
    floated: boolean;
}> = ({ htmlFor, children, hasError, floated }) => (
    <label
        htmlFor={htmlFor}
        className={`
            absolute left-4 font-sans pointer-events-none select-none transition-all duration-200 origin-left
            ${floated
                ? 'top-0 -translate-y-1/2 text-[10px] font-semibold uppercase tracking-wide bg-white px-1 rounded'
                : 'top-1/2 -translate-y-1/2 text-sm'
            }
            ${hasError
                ? 'text-red-400'
                : floated
                    ? 'text-regal-navy'
                    : 'text-charcoal/50'
            }
        `}
    >
        {children}
    </label>
);

// ─── Inline field error ───────────────────────────────────────────────────────

const FieldError: FC<{ message?: string }> = ({ message }) =>
    message ? <p className="text-xs text-red-500 mt-0.5 ml-1">{message}</p> : null;

// ─── Country Code Dropdown ────────────────────────────────────────────────────

const CountryCodeDropdown: FC<CountryCodeDropdownProps> = ({ countries, loading, selected, onSelect }) => {
    const [open, setOpen] = useState<boolean>(false);
    const [search, setSearch] = useState<string>('');
    const dropdownRef = useRef<HTMLDivElement>(null);
    const searchRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (countries.length && !selected) {
            const india = countries.find((c) => c.cca2 === 'in' && c.dialCode === '+91');
            onSelect(india ?? countries[0]);
        }
    }, [countries, selected, onSelect]);

    useEffect(() => {
        function handleClickOutside(e: globalThis.MouseEvent): void {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setOpen(false);
                setSearch('');
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (open) setTimeout(() => searchRef.current?.focus(), 50);
    }, [open]);

    const filtered = countries.filter(
        (c) =>
            c.name.toLowerCase().includes(search.toLowerCase()) ||
            c.dialCode.includes(search) ||
            c.cca2.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div ref={dropdownRef} className="relative shrink-0">
            <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                disabled={loading}
                aria-haspopup="listbox"
                aria-expanded={open}
                className="h-[52px] px-3 flex items-center gap-2 rounded-[10px] border border-black/10 bg-white text-sm font-sans text-charcoal focus:outline-none focus:ring-2 focus:ring-regal-navy/20 focus:border-regal-navy/30 transition-all cursor-pointer min-w-[110px] disabled:opacity-60"
            >
                {loading ? (
                    <span className="text-xs text-charcoal/40 animate-pulse">Loading…</span>
                ) : selected ? (
                    <>
                        <img src={selected.flag} alt={selected.cca2.toUpperCase()} className="w-5 h-[14px] object-cover rounded-[2px] border border-black/5 shrink-0" />
                        <span className="font-medium text-charcoal whitespace-nowrap">{selected.dialCode}</span>
                    </>
                ) : null}
                <svg className={`w-3 h-3 ml-auto text-charcoal/40 transition-transform duration-200 shrink-0 ${open ? 'rotate-180' : ''}`} viewBox="0 0 12 8" fill="none">
                    <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
            </button>

            {open && (
                <div role="listbox" className="absolute z-50 top-[56px] left-0 w-[290px] bg-white rounded-[10px] border border-black/10 overflow-hidden" style={{ boxShadow: '0px 8px 30px rgba(0,0,0,0.13)' }}>
                    <div className="p-2 border-b border-black/5 sticky top-0 bg-white">
                        <div className="relative">
                            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-charcoal/30" viewBox="0 0 16 16" fill="none">
                                <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.5" />
                                <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                            <input
                                ref={searchRef}
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search country or code…"
                                className="w-full h-9 pl-8 pr-3 rounded-[7px] border border-black/10 bg-[#f7f8fa] text-sm font-sans text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:ring-2 focus:ring-regal-navy/20"
                            />
                        </div>
                    </div>
                    <ul className="max-h-[220px] overflow-y-auto">
                        {filtered.length === 0 ? (
                            <li className="px-4 py-4 text-sm text-charcoal/40 text-center">No results found</li>
                        ) : filtered.map((c) => {
                            const isActive = selected?.cca2 === c.cca2 && selected?.dialCode === c.dialCode;
                            return (
                                <li key={`${c.cca2}-${c.dialCode}`} role="option" aria-selected={isActive}>
                                    <button
                                        type="button"
                                        onClick={() => { onSelect(c); setOpen(false); setSearch(''); }}
                                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm font-sans transition-colors hover:bg-[#0E3572]/5 ${isActive ? 'bg-[#0E3572]/8 text-regal-navy font-semibold' : 'text-charcoal'}`}
                                    >
                                        <img src={c.flag} alt={c.cca2.toUpperCase()} className="w-6 h-4 object-cover rounded-[2px] border border-black/5 shrink-0" />
                                        <span className="flex-1 truncate">{c.name}</span>
                                        <span className="text-charcoal/50 font-medium shrink-0 tabular-nums">{c.dialCode}</span>
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
};

// ─── Multi-Select Services Dropdown ──────────────────────────────────────────

interface ServicesDropdownProps {
    selected: string[];
    onChange: (services: string[]) => void;
    hasError: boolean;
}

const ServicesDropdown: FC<ServicesDropdownProps> = ({ selected, onChange, hasError }) => {
    const [open, setOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(e: globalThis.MouseEvent): void {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggle = (service: string): void => {
        onChange(
            selected.includes(service)
                ? selected.filter((s) => s !== service)
                : [...selected, service]
        );
    };

    const isFloated = selected.length > 0 || open;
    const displayValue = selected.join(", ");

    return (
        <div ref={dropdownRef} className="relative w-full">
            <button
                id="services-dropdown"
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                aria-haspopup="listbox"
                aria-expanded={open}
                className={`
                    w-full h-[52px] px-4 flex items-center justify-between gap-2 rounded-[10px] border
                    text-sm font-sans bg-white focus:outline-none focus:ring-2 transition-all cursor-pointer text-left
                    ${hasError
                        ? 'border-red-400 focus:ring-red-200 focus:border-red-400'
                        : open
                            ? 'border-regal-navy/30 ring-2 ring-regal-navy/20'
                            : 'border-black/10 focus:ring-regal-navy/20 focus:border-regal-navy/30'
                    }
                `}
            >
                <span className={`flex-1 truncate text-charcoal transition-opacity duration-150 ${isFloated ? 'opacity-100 pt-1' : 'opacity-0'}`}>
                    {displayValue}
                </span>
                <svg
                    className={`w-3 h-3 text-charcoal/40 transition-transform duration-200 shrink-0 ${open ? 'rotate-180' : ''}`}
                    viewBox="0 0 12 8"
                    fill="none"
                >
                    <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
            </button>

            <label
                htmlFor="services-dropdown"
                className={`
                    absolute left-4 font-sans pointer-events-none select-none transition-all duration-200 origin-left
                    ${isFloated
                        ? 'top-0 -translate-y-1/2 text-[10px] font-semibold uppercase tracking-wide bg-white px-1 rounded'
                        : 'top-1/2 -translate-y-1/2 text-sm'
                    }
                    ${hasError
                        ? 'text-red-400'
                        : isFloated
                            ? 'text-regal-navy'
                            : 'text-charcoal/50'
                    }
                `}
            >
                Services Interested In
            </label>

            {open && (
                <div
                    role="listbox"
                    aria-multiselectable="true"
                    className="absolute z-50 top-[56px] left-0 w-full bg-white rounded-[10px] border border-black/10 overflow-hidden"
                    style={{ boxShadow: '0px 8px 30px rgba(0,0,0,0.13)' }}
                >
                    <div className="px-4 py-2.5 border-b border-black/5 flex items-center justify-between">
                        <span className="text-xs font-semibold text-charcoal/50 uppercase tracking-wide">
                            Select all that apply
                        </span>
                        {selected.length > 0 && (
                            <button
                                type="button"
                                onClick={() => onChange([])}
                                className="text-xs text-regal-navy/60 hover:text-regal-navy font-medium transition-colors"
                            >
                                Clear all
                            </button>
                        )}
                    </div>

                    <ul className="py-1">
                        {SERVICES.map((service) => {
                            const isChecked = selected.includes(service);
                            return (
                                <li key={service} role="option" aria-selected={isChecked}>
                                    <button
                                        type="button"
                                        onClick={() => toggle(service)}
                                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm font-sans transition-colors hover:bg-[#0E3572]/5 ${isChecked ? 'text-regal-navy' : 'text-charcoal'}`}
                                    >
                                        <span className={`w-4 h-4 rounded-[4px] border flex items-center justify-center shrink-0 transition-colors ${isChecked ? 'bg-regal-navy border-regal-navy' : 'bg-white border-black/20'}`}>
                                            {isChecked && (
                                                <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                                                    <path d="M1 3.5L3.5 6L8 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            )}
                                        </span>
                                        <span className="flex-1">{service}</span>
                                    </button>
                                </li>
                            );
                        })}
                    </ul>

                    <div className="px-4 py-2.5 border-t border-black/5 flex items-center justify-between">
                        <span className="text-xs text-charcoal/40 font-medium">
                            {selected.length === 0 ? 'None selected' : `${selected.length} of ${SERVICES.length} selected`}
                        </span>
                        <button
                            type="button"
                            onClick={() => setOpen(false)}
                            className="text-xs font-semibold text-regal-navy hover:text-regal-navy/70 transition-colors"
                        >
                            Done
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

// ─── Main Component ───────────────────────────────────────────────────────────

export const BookCallHero: FC = () => {
    const router = useRouter();
    const { countries, loading: countriesLoading } = useCountryCodes();
    const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

    const recaptchaRef = useRef<ReCAPTCHA>(null);

    const [fields, setFields] = useState<FormFields>({
        name: '',
        email: '',
        phone: '',
        companyName: '',
        companyWebsite: '',
        services: [],
        recaptchaToken: "",
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [submitError, setSubmitError] = useState<string>('');

    // ── Focus tracking for floating labels ─────────────────────────────────
    const [focusedField, setFocusedField] = useState<keyof FormFields | null>(null);

    const isFloated = (field: keyof FormFields, value: string | string[]): boolean => {
        const hasValue = Array.isArray(value) ? value.length > 0 : !!value;
        return hasValue || focusedField === field;
    };

    const handleChange = (field: keyof FormFields, value: string | string[]): void => {
        setFields((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
        if (submitError) setSubmitError('');
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setSubmitError('');
        const validationErrors = validateFields(fields);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setSubmitting(true);
        try {
            const res = await fetch('/api/send-inquiry', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...fields,
                    countryCode: selectedCountry?.dialCode ?? '',
                }),
            });
            const data = await res.json();
            if (res.ok && data.success) {
                router.push('/thank-you');
            } else if (data.errors) {
                setErrors(data.errors);
            } else {
                setSubmitError('Something went wrong. Please try again or contact us directly.');
            }
        } catch {
            setSubmitError('Something went wrong. Please try again or contact us directly.');
        } finally {
            setSubmitting(false);
        }
    };

    const handleCaptchaChange = (token: string | null) => {
        setFields((prev) => ({ ...prev, recaptchaToken: token || "" }));
    };

    return (
        <section
            id="book-call-hero"
            className="relative w-full max-w-7xl mx-auto px-4 py-12 md:py-[70px] flex flex-col lg:flex-row gap-8 lg:gap-6 xl:gap-24 items-center"
        >
            {/* Left Content */}
            <div className="flex-1 flex flex-col gap-5 items-center lg:items-start justify-center text-center lg:text-left">
                <div className="flex items-center justify-center px-[18px] py-[8px] bg-[#0E3572]/5 border border-[#0E3572]/10 rounded-[4px]">
                    <span className="font-sans font-bold text-[12px] text-regal-navy text-center uppercase tracking-wide">
                        Book a Free Discovery Call
                    </span>
                </div>
                <h2 className="font-headings font-normal text-2xl md:text-4xl xl:text-[46px] leading-[1.1] md:leading-[1.2] text-carbon-black capitalize">
                    Book A Discovery Call To Start Your Software Project The Right Way
                </h2>
                <div className="font-sans font-medium text-sm leading-[22px] text-charcoal">
                    <p>Not sure how to start your software project?</p>
                    <p>This free discovery call gives you clarity on scope, timeline, budget, and fit.</p>
                </div>
                <div className="flex flex-wrap gap-2 items-start justify-center lg:justify-start w-full">
                    {FEATURES.map((feature, i) => (
                        <div key={i} className="flex items-center gap-2 bg-white border border-[#0E3572]/40 rounded-full px-3 py-1.5">
                            <Image src={iconNavyTick} alt="" className="w-6 h-6 shrink-0" />
                            <span className="text-left font-sans font-medium text-sm leading-[22px] text-regal-navy">{feature}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Column — Form Card */}
            <div className="w-full max-w-[424px] flex-none flex items-center justify-center w-full">
                <div
                    className="w-full max-wfull rounded-[10px] pt-[34px] pb-[18px] px-[18px] flex flex-col gap-6 items-start"
                    style={{
                        background: 'linear-gradient(90deg, #fff 0%, #fff 100%)',
                        boxShadow: '0px 8px 19px 0px rgba(0,0,0,0.05), 0px 34px 34px 0px rgba(0,0,0,0.04), 0px 76px 46px 0px rgba(0,0,0,0.03)',
                    }}
                >
                    <h3 className="font-headings font-normal text-xl md:text-2xl text-regal-navy text-center w-full">
                        Request your discovery call
                    </h3>

                    {submitError && (
                        <div className="w-full bg-red-50 border border-red-200 rounded-[10px] px-4 py-3 text-sm text-red-600 font-medium">
                            ❌ {submitError}
                        </div>
                    )}

                    <form className="flex flex-col gap-[11px] w-full" onSubmit={handleSubmit} noValidate>

                        {/* Name */}
                        <div className="flex flex-col gap-0.5">
                            <div className="relative">
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    value={fields.name}
                                    onChange={(e) => handleChange('name', e.target.value)}
                                    onFocus={() => setFocusedField('name')}
                                    onBlur={() => setFocusedField(null)}
                                    className={inputClass(!!errors.name)}
                                    placeholder=""
                                />
                                <FloatingLabel htmlFor="name" hasError={!!errors.name} floated={isFloated('name', fields.name)}>
                                    Name
                                </FloatingLabel>
                            </div>
                            <FieldError message={errors.name} />
                        </div>

                        {/* Email */}
                        <div className="flex flex-col gap-0.5">
                            <div className="relative">
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={fields.email}
                                    onChange={(e) => handleChange('email', e.target.value)}
                                    onFocus={() => setFocusedField('email')}
                                    onBlur={() => setFocusedField(null)}
                                    className={inputClass(!!errors.email)}
                                    placeholder=""
                                />
                                <FloatingLabel htmlFor="email" hasError={!!errors.email} floated={isFloated('email', fields.email)}>
                                    Email Address
                                </FloatingLabel>
                            </div>
                            <FieldError message={errors.email} />
                        </div>

                        {/* Phone */}
                        <div className="flex flex-col gap-0.5">
                            <div className="flex gap-2 w-full">
                                <CountryCodeDropdown
                                    countries={countries}
                                    loading={countriesLoading}
                                    selected={selectedCountry}
                                    onSelect={setSelectedCountry}
                                />
                                <div className="relative flex-1">
                                    <input
                                        id="phone"
                                        type="tel"
                                        name="phone"
                                        value={fields.phone}
                                        onChange={(e) => handleChange('phone', e.target.value)}
                                        onFocus={() => setFocusedField('phone')}
                                        onBlur={() => setFocusedField(null)}
                                        className={inputClass(!!errors.phone)}
                                        placeholder=""
                                    />
                                    <FloatingLabel htmlFor="phone" hasError={!!errors.phone} floated={isFloated('phone', fields.phone)}>
                                        Phone Number
                                    </FloatingLabel>
                                </div>
                            </div>
                            <FieldError message={errors.phone} />
                        </div>

                        {/* Company Name */}
                        <div className="flex flex-col gap-0.5">
                            <div className="relative">
                                <input
                                    id="companyName"
                                    type="text"
                                    name="companyName"
                                    value={fields.companyName}
                                    onChange={(e) => handleChange('companyName', e.target.value)}
                                    onFocus={() => setFocusedField('companyName')}
                                    onBlur={() => setFocusedField(null)}
                                    className={inputClass(!!errors.companyName)}
                                    placeholder=""
                                />
                                <FloatingLabel htmlFor="companyName" hasError={!!errors.companyName} floated={isFloated('companyName', fields.companyName)}>
                                    Company Name
                                </FloatingLabel>
                            </div>
                            <FieldError message={errors.companyName} />
                        </div>

                        {/* Company Website */}
                        <div className="flex flex-col gap-0.5">
                            <div className="relative">
                                <input
                                    id="companyWebsite"
                                    type="url"
                                    name="companyWebsite"
                                    value={fields.companyWebsite}
                                    onChange={(e) => handleChange('companyWebsite', e.target.value)}
                                    onFocus={() => setFocusedField('companyWebsite')}
                                    onBlur={() => setFocusedField(null)}
                                    className={inputClass(!!errors.companyWebsite)}
                                    placeholder=""
                                />
                                <FloatingLabel htmlFor="companyWebsite" hasError={!!errors.companyWebsite} floated={isFloated('companyWebsite', fields.companyWebsite)}>
                                    Company Website
                                </FloatingLabel>
                            </div>
                            <FieldError message={errors.companyWebsite} />
                        </div>

                        {/* Services */}
                        <div className="flex flex-col gap-0.5">
                            <ServicesDropdown
                                selected={fields.services}
                                onChange={(services) => handleChange('services', services)}
                                hasError={!!errors.services}
                            />
                            <FieldError message={errors.services} />
                        </div>

                        <div className="w-full flex justify-center mt-2">
                            <ReCAPTCHA
                                ref={recaptchaRef}
                                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
                                size="normal"
                                onChange={handleCaptchaChange}
                            />
                        </div>

                        <Button
                            type="submit"
                            variant="primary"
                            disabled={submitting}
                            className="!w-full h-[52px] px-8 py-4 bg-button-gradient text-white text-sm rounded-button transition-colors flex items-center justify-center gap-2 font-medium disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {submitting ? 'Sending…' : 'Book a Discovery Call'}
                        </Button>
                    </form>
                </div>
            </div>
        </section>
    );
};