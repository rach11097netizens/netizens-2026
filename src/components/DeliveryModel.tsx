import { SidePattern } from "./SidePattern";

interface DeliveryCard {
    number: number;
    title: string;
    description: string;
    image: string;
}

interface DeliveryModelProps {
    badge?: string;
    heading?: string;
    cards: DeliveryCard[];
}

export function DeliveryModel({ badge = "Delivery Model", heading = "Predictable Delivery, Not Random Fixes", cards }: DeliveryModelProps) {
    const mainCard = cards[0];
    const sideCards = cards.slice(1);

    return (
        <section className="relative w-full bg-[#FFFAFA] py-16 md:py-20 overflow-hidden">
            <SidePattern invert />

            <div className="max-w-[1096px] mx-auto px-4 flex flex-col items-center gap-8 md:gap-[34px] relative z-10">
                <div className="flex flex-col items-center gap-2 text-center">
                    <div className="bg-regal-navy/5 border border-regal-navy/10 flex items-center justify-center px-3 py-[8px] rounded-[4px]">
                        <span className="font-sans font-bold text-[12px] text-regal-navy text-center">
                            {badge}
                        </span>
                    </div>
                    <h2 className="font-headings font-normal text-2xl md:text-3xl leading-snug text-carbon-black">
                        {heading}
                    </h2>
                </div>

                {/* Desktop: 3-col 2-row grid, card 1 spans 2 cols */}
                <div className="hidden md:grid grid-cols-3 grid-rows-2 gap-2 w-full h-[500px] rounded-[10px] overflow-hidden">
                    {mainCard && (
                        <div className="col-span-2 row-span-2 bg-white rounded-[10px] p-[34px] flex flex-col gap-[10px] overflow-hidden">
                            <div className="flex flex-col gap-[10px]">
                                <h3 className="font-headings font-normal text-[24px] text-carbon-black leading-normal">
                                    <span className="text-gray-600/40 mr-1">{mainCard.number}.</span> {mainCard.title}
                                </h3>
                                <p className="font-sans font-medium text-sm text-gray-600/75 leading-[22px]">
                                    {mainCard.description}
                                </p>
                            </div>
                            <div className="flex-1 flex items-end justify-center">
                                <img
                                    src={mainCard.image}
                                    alt={mainCard.title}
                                    className="w-full max-w-[580px] h-auto object-contain"
                                />
                            </div>
                        </div>
                    )}

                    {sideCards.map((card) => (
                        <div
                            key={card.number}
                            className="bg-white rounded-[10px] p-[18px] flex flex-col gap-[10px] overflow-hidden"
                        >
                            <div className="flex flex-col gap-[10px]">
                                <h3 className="font-headings font-normal text-[18px] text-carbon-black leading-[25px]">
                                    <span className="text-gray-600/40 mr-1">{card.number}.</span> {card.title}
                                </h3>
                                <p className="font-sans font-medium text-sm text-gray-600/75 leading-[22px]">
                                    {card.description}
                                </p>
                            </div>
                            <div className="flex-1 flex items-end justify-center">
                                <img
                                    src={card.image}
                                    alt={card.title}
                                    className="w-full h-auto object-contain"
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Mobile: stacked list */}
                <div className="flex flex-col gap-2 w-full md:hidden">
                    {cards.map((card) => (
                        <div
                            key={card.number}
                            className="bg-white rounded-[10px] p-5 flex flex-col gap-2 overflow-hidden"
                        >
                            <h3 className="font-headings font-normal text-lg text-carbon-black leading-snug">
                                <span className="text-gray-600/40 mr-1">{card.number}.</span> {card.title}
                            </h3>
                            <p className="font-sans font-medium text-[13px] text-gray-600/75 leading-[20px]">
                                {card.description}
                            </p>
                            <div className="flex items-center justify-center mt-2">
                                <img
                                    src={card.image}
                                    alt={card.title}
                                    className="w-full max-w-[280px] h-auto object-contain"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
