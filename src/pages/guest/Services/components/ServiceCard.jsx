import React from 'react';

function ServiceCard({ service, onClick, isActive = false }) {
  const handleClick = () => {
    if (onClick) {
      onClick(service.id);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`flex flex-col items-center justify-center rounded-lg transition-all duration-200 py-6 px-4 gap-3 md:py-8 md:px-6 md:gap-4 lg:h-[230px] lg:px-14 lg:gap-5 xl:h-[298px] xl:gap-6 ${
        isActive
          ? 'bg-white ring-2 ring-[#D6B26F]'
          : 'bg-[#0D354C]/5 hover:bg-[#0D354C]/10'
      }`}
      aria-label={`Select ${service.name}`}
    >
      {/* Icon placeholder - can be replaced with actual icons */}
      <div className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full bg-[#D6B26F]/20 flex items-center justify-center flex-shrink-0">
        <span className="text-[#0D354C] text-xs md:text-sm lg:text-base font-semibold">
          {service.name.charAt(0)}
        </span>
      </div>

      <p className="text-center text-[#0D354C] text-base md:text-lg lg:text-xl font-semibold leading-[110%]">
        {service.name}
      </p>

      <p className="text-center text-[#0D354C] opacity-80 text-[10px] md:text-xs lg:text-sm leading-[130%] max-w-[200px] md:max-w-none">
        {service.description}
      </p>
    </button>
  );
}

export default ServiceCard;
