export const SidePattern = ({ side = "both", invert = false }) => {
  const baseContainer = `
    hidden lg:block absolute top-0 bottom-0
    w-[100px] md:w-[150px]
    ${invert ? "opacity-20 md:opacity-10" : "opacity-20 md:opacity-30"}
    pointer-events-none
  `;

  const lineColor = invert ? "rgb(14, 53, 114)" : "white";

  const renderPattern = (position: string) => (
    <div className={`${baseContainer} ${position}`}>
      <div
        className={`absolute ${position} top-0 bottom-0 w-full`}
        style={{
          backgroundImage: `repeating-linear-gradient(${lineColor} 0px, ${lineColor} 1px, transparent 1px, transparent 64px)`,
        }}
      />
      <div
        className={`absolute ${position} top-0 bottom-0 w-[50px] md:w-[100px]`}
        style={{
          backgroundImage: `repeating-linear-gradient(
            transparent 0px,
            transparent 16px,
            ${lineColor} 16px,
            ${lineColor} 17px,
            transparent 17px,
            transparent 32px,
            ${lineColor} 32px,
            ${lineColor} 33px,
            transparent 33px,
            transparent 48px,
            ${lineColor} 48px,
            ${lineColor} 49px,
            transparent 49px,
            transparent 64px
          )`,
        }}
      />
    </div>
  );

  if (side === "left") return renderPattern("left-0");
  if (side === "right") return renderPattern("right-0");

  return (
    <>
      {renderPattern("left-0")}
      {renderPattern("right-0")}
    </>
  );
};
