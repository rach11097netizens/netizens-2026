import React from 'react';

type BreadcrumbItem = {
    label: string;
    href?: string;
};

type BreadcrumbProps = {
    items: BreadcrumbItem[];
    className?: string;
};

// Separator line from Figma: 120 deg rotated thin line
const BreadcrumbSeparator = () => (
    <div className="flex h-[13.472px] items-center justify-center shrink-0 w-[7.778px]">
        <div className="flex-none rotate-120">
            <div className="h-0 relative w-[15.556px]">
                <div className="absolute inset-[-2px_0_0_0]">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="2"
                        viewBox="0 0 16 2"
                        fill="none"
                        className="block max-w-none size-full"
                    >
                        <path d="M0 1H16" stroke="#D1D1D1" strokeWidth="1.5" />
                    </svg>
                </div>
            </div>
        </div>
    </div>
);

export function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
    if (!items || items.length === 0) return null;

    return (
        <div className={`flex flex-wrap items-center gap-[16px] w-full ${className}`}>
            {items.map((item, index) => {
                const isLast = index === items.length - 1;
                const isFirst = index === 0;

                // First item (Home) uses full charcoal color, subsequent items use 40% opacity
                const textColorClass = isFirst ? 'text-gray-600' : 'text-gray-600/40';

                return (
                    <React.Fragment key={index}>
                        <div className="flex gap-[4px] items-center shrink-0">
                            {item.href && !isLast ? (
                                <a
                                    href={item.href}
                                    className={`font-sans font-medium text-[12px] uppercase transition-colors hover:text-gray-600 ${textColorClass}`}
                                >
                                    {item.label}
                                </a>
                            ) : (
                                <p
                                    className={`font-sans font-medium text-[12px] uppercase ${textColorClass}`}
                                >
                                    {item.label}
                                </p>
                            )}
                        </div>
                        {!isLast && <BreadcrumbSeparator />}
                    </React.Fragment>
                );
            })}
        </div>
    );
}
