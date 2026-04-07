import React, { forwardRef } from 'react';
import ServiceCard from './ServiceCard';

const ServiceCardGrid = forwardRef(function ServiceCardGrid(
  { services, activeTabId, onTabChange },
  ref
) {
  return (
    <div
      ref={ref}
      className="bg-white px-4 py-16 md:px-7 lg:px-9 xl:px-[54px] 2xl:px-[72px] relative z-10"
    >
      <div className="flex w-full flex-col gap-10 bg-white pt-16 lg:pt-20">
        {/* Header Section */}
        <div className="mx-auto pb-3 max-w-[433px] md:max-w-[629px] lg:max-w-[852px]">
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-[56px] font-semibold text-[#0D354C] text-center leading-none tracking-tight mb-4">
            Services built for launching, operating, and growing in the UAE
          </h2>
          <p className="text-base md:text-lg lg:text-xl xl:text-[22px] text-[#0D354C] opacity-80 text-center leading-[130%] mt-4">
            Explore each category, then drill into the exact service that fits your business, property, compliance, or immigration needs.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-5 lg:gap-5">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onClick={onTabChange}
              isActive={activeTabId === service.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
});

export default ServiceCardGrid;
