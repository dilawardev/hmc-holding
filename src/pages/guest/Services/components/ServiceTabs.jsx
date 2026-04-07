import React, { useEffect, useRef, useState } from 'react';

// Helper function to get Tailwind color class
const getColorClass = (color) => {
  const colorMap = {
    primary: 'bg-[#0D354C]',
    secondary: 'bg-[#D6B26F]',
  };
  return colorMap[color] || 'bg-[#0D354C]';
};

function ServiceTabs({ services, activeTabId, onTabChange }) {
  const tabsRef = useRef(null);
  const [stickyTop, setStickyTop] = useState(80);

  useEffect(() => {
    const updateStickyTop = () => {
      // Calculate top offset based on actual header height
      const header = document.querySelector('header');
      if (header) {
        const headerHeight = header.offsetHeight + parseInt(getComputedStyle(header).top);
        setStickyTop(headerHeight);
      } else {
        setStickyTop(80); // Fallback
      }
    };

    updateStickyTop();
    window.addEventListener('resize', updateStickyTop);
    // Also update when DOM is ready
    const timer = setTimeout(updateStickyTop, 100);
    return () => {
      window.removeEventListener('resize', updateStickyTop);
      clearTimeout(timer);
    };
  }, []);

  const handleTabChange = (e, serviceId) => {
    // Prevent default radio button behavior to avoid immediate visual change
    e.preventDefault();
    e.stopPropagation();
    // Call onTabChange which should be the scrollToTab function
    if (onTabChange) {
      onTabChange(serviceId);
    }
  };

  return (
    <div className="bg-white relative z-0 -mt-40 lg:-mt-[160px]">
      <div>
        <div className="px-4 md:px-7 lg:px-9 xl:px-[54px] 2xl:px-[72px]">
          <div className="relative">
            <div
              ref={tabsRef}
              className="sticky left-0 z-[1] transition-all duration-[400ms] ease-in-out"
              style={{ top: `${stickyTop}px` }}
            >
              <div className="bg-white pb-10 md:pb-10 lg:pb-10 px-4 md:px-7 lg:px-0">
                <div
                  role="tablist"
                  aria-label="Services tabs"
                  className="flex w-full gap-3 md:gap-4 overflow-x-auto scrollbar-hide"
                >
                  {services.map((service) => {
                    const isSecondary = service.color === 'secondary';
                    const activeClasses = `${getColorClass(service.color)} ${
                      isSecondary ? 'text-[#0D354C]' : 'text-white'
                    }`;

                    return (
                      <div
                        key={service.id}
                        role="tab"
                        aria-selected={activeTabId === service.id}
                        className="relative flex-1 min-w-0 rounded-lg text-center flex-shrink-0"
                      >
                        {/*
                          Use secondary color for lighter backgrounds so text stays legible.
                        */}
                        <input
                          id={service.id}
                          type="radio"
                          className="peer absolute left-0 top-0 h-full w-full opacity-0 cursor-pointer pointer-events-none"
                          aria-hidden="true"
                          name="service-tabs"
                          checked={activeTabId === service.id}
                          readOnly
                          value={service.id}
                          tabIndex={-1}
                        />
                        <label
                          htmlFor={service.id}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleTabChange(e, service.id);
                          }}
                          className={`block rounded p-3 md:p-4 lg:px-4 lg:py-3 xl:px-5 xl:py-4 transition-all text-[10px] md:text-xs lg:text-sm xl:text-[14px] uppercase font-bold cursor-pointer leading-[120%] whitespace-nowrap overflow-hidden text-ellipsis ${
                            activeTabId === service.id
                              ? activeClasses
                              : 'bg-[#0D354C]/5 text-[#0D354C] hover:bg-[#0D354C]/10 focus:bg-[#0D354C]/10 active:bg-[#0D354C]/15'
                          }`}
                        >
                          {service.name}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceTabs;
