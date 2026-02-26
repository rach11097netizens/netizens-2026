export const SeparatorPattern = () => {
  return (
    <div
      className="w-full h-10 md:h-14 lg:h-16 bg-[#FFFAFA] border-y border-[rgba(14,53,114,0.1)] overflow-hidden"
      aria-hidden="true"
      style={{
        backgroundImage:
          "linear-gradient(90deg, rgba(14, 53, 114, 0.1) 1px, transparent 1px)",
        backgroundSize: "15px 100%",
        backgroundPosition: "center center",
      }}
    />
  );
};
