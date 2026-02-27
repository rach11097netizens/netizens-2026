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

export function DeliveryModel({
    badge = "Delivery Model",
    heading = "Predictable Delivery, Not Random Fixes",
    cards,
}: DeliveryModelProps) {
    const mainCard = cards[0];
    const sideCards = cards.slice(1);

    return (
        <section className="relative w-full bg-[#FFFAFA] py-16 md:py-20 overflow-hidden">
            <SidePattern invert />

            <div className="max-w-[1096px] mx-auto px-4 flex flex-col items-center gap-8 md:gap-[34px] relative z-10">
                {/* Header */}
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

                {/*
                  Single card grid — one DOM tree, responsive layout via Tailwind.

                  Mobile  : flex-col  → all cards stacked vertically
                  Desktop : CSS grid  → card 1 spans 2 cols × 2 rows, rest fill right column
                */}
                <div className="flex flex-col gap-2 w-full md:grid md:grid-cols-3 md:grid-rows-2 md:h-[500px] rounded-[10px] overflow-hidden">

                    {/* ── Main card (card 0) ── */}
                    {mainCard && (
                        <div className="
                            bg-white rounded-[10px] overflow-hidden
                            p-5 md:p-[34px]
                            flex flex-col gap-2 md:gap-[10px]
                            md:col-span-2 md:row-span-2
                        ">
                            <div className="flex flex-col gap-[10px]">
                                <h3 className="font-headings font-normal text-lg md:text-[24px] text-carbon-black leading-snug md:leading-normal">
                                    <span className="text-gray-600/40 mr-1">{mainCard.number}.</span>
                                    {mainCard.title}
                                </h3>
                                <p className="font-sans font-medium text-[13px] md:text-sm text-gray-600/75 leading-[20px] md:leading-[22px]">
                                    {mainCard.description}
                                </p>
                            </div>
                            <div className="flex items-center justify-center mt-2 md:flex-1 md:items-end md:mt-0">
                                <img
                                    src={mainCard.image}
                                    alt={mainCard.title}
                                    className="w-full max-w-[280px] md:max-w-[580px] h-auto object-contain"
                                />
                            </div>
                        </div>
                    )}

                    {/* ── Side cards (cards 1+) ── */}
                    {sideCards.map((card) => (
                        <div
                            key={card.number}
                            className="
                                bg-white rounded-[10px] overflow-hidden
                                p-5 md:p-[18px]
                                flex flex-col gap-2 md:gap-[10px]
                            "
                        >
                            <div className="flex flex-col gap-[10px]">
                                <h3 className="font-headings font-normal text-lg md:text-[18px] text-carbon-black leading-snug md:leading-[25px]">
                                    <span className="text-gray-600/40 mr-1">{card.number}.</span>
                                    {card.title}
                                </h3>
                                <p className="font-sans font-medium text-[13px] md:text-sm text-gray-600/75 leading-[20px] md:leading-[22px]">
                                    {card.description}
                                </p>
                            </div>
                            <div className="flex items-center justify-center mt-2 md:flex-1 md:items-end md:mt-0">
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
