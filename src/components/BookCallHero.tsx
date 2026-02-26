import iconNavyTick from '../assets/images/navy-dark-tick.svg';
import { Button } from './Button';


const FEATURES = [
    "30–45 minute call with a senior consultant",
    "Focused on understanding your requirements, not selling",
    "Clear next steps after the call",
    "Completely free, no obligation",
];

export function BookCallHero() {
    return (
        <section className="relative w-full max-w-7xl mx-auto px-4 py-12 md:py-[70px] flex flex-col lg:flex-row gap-8 lg:gap-6 items-center">
            {/* Left Content */}
            <div className="flex-1 flex flex-col gap-5 items-start justify-center">
                {/* Badge */}
                <div className="flex items-center justify-center px-[18px] py-[8px] bg-[#0E3572]/5 border border-[#0E3572]/10 rounded-[4px]">
                    <span className="font-sans font-bold text-[12px] text-regal-navy text-center uppercase tracking-wide">
                        Book a Free Discovery Call
                    </span>
                </div>

                {/* Heading */}
                <h2 className="font-headings font-normal text-2xl md:text-3xl leading-[1.2] text-carbon-black capitalize">
                    Book A Discovery Call To Start Your Software Project The Right Way
                </h2>

                {/* Description */}
                <div className="font-sans font-medium text-sm leading-[22px] text-charcoal">
                    <p>Not sure how to start your software project?</p>
                    <p>This free discovery call gives you clarity on scope, timeline, budget, and fit.</p>
                </div>

                {/* Feature Pills */}
                <div className="flex flex-wrap gap-2 items-start w-full">
                    {FEATURES.map((feature, i) => (
                        <div
                            key={i}
                            className="flex items-center gap-2 bg-white border border-[#0E3572]/40 rounded-full px-3 py-1.5"
                        >
                            <img src={iconNavyTick} alt="" className="w-6 h-6 shrink-0" />
                            <span className="font-sans font-medium text-sm leading-[22px] text-regal-navy">
                                {feature}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Column — Form Card */}
            <div className="flex items-center justify-center w-full lg:w-auto shrink-0">
                <div
                    className="w-full max-w-[424px] rounded-[10px] pt-[34px] pb-[18px] px-[18px] flex flex-col gap-6 items-start"
                    style={{
                        background: 'linear-gradient(90deg, #fff 0%, #fff 100%), linear-gradient(90deg, rgba(14,53,114,0.05) 0%, rgba(14,53,114,0.05) 100%)',
                        boxShadow: '0px 8px 19px 0px rgba(0,0,0,0.05), 0px 34px 34px 0px rgba(0,0,0,0.04), 0px 76px 46px 0px rgba(0,0,0,0.03)',
                    }}
                >
                    {/* Form Title */}
                    <h3 className="font-headings font-normal text-xl md:text-2xl text-regal-navy text-center w-full">
                        Request your discovery call
                    </h3>

                    {/* Form Fields */}
                    <form className="flex flex-col gap-[11px] w-full" onSubmit={(e) => e.preventDefault()}>
                        <input
                            type="text"
                            placeholder="Name"
                            className="w-full h-[52px] px-4 py-3 rounded-[10px] border border-black/10 bg-white text-sm font-sans text-charcoal placeholder:text-charcoal focus:outline-none focus:ring-2 focus:ring-regal-navy/20 focus:border-regal-navy/30 transition-all"
                        />
                        <input
                            type="email"
                            placeholder="Email Address"
                            className="w-full h-[52px] px-4 py-3 rounded-[10px] border border-black/10 bg-white text-sm font-sans text-charcoal placeholder:text-charcoal focus:outline-none focus:ring-2 focus:ring-regal-navy/20 focus:border-regal-navy/30 transition-all"
                        />
                        <input
                            type="tel"
                            placeholder="Phone No"
                            className="w-full h-[52px] px-4 py-3 rounded-[10px] border border-black/10 bg-white text-sm font-sans text-charcoal placeholder:text-charcoal focus:outline-none focus:ring-2 focus:ring-regal-navy/20 focus:border-regal-navy/30 transition-all"
                        />
                        <textarea
                            placeholder="Message"
                            rows={2}
                            className="w-full min-h-[80px] px-4 py-4 rounded-[10px] border border-black/10 bg-white text-sm font-sans text-charcoal placeholder:text-charcoal focus:outline-none focus:ring-2 focus:ring-regal-navy/20 focus:border-regal-navy/30 transition-all resize-none"
                        />


                        <Button type="submit" variant="primary" className="!w-full h-[52px] px-8 py-4 bg-button-gradient text-white text-sm rounded-button transition-colors flex items-center justify-center gap-2 font-medium">
                            Book a Discovery Call
                        </Button>
                    </form>
                </div>
            </div>
        </section>
    );
}
