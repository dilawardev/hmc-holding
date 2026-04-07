import React from 'react';

function TabContent({ activeService }) {
  if (!activeService || !activeService.tabContent) {
    return null;
  }

  const { title, description, features } = activeService.tabContent;
  const { image, imageAlt, name } = activeService;

  return (
    <div className="px-4 md:px-7 lg:px-9 xl:px-[54px] 2xl:px-[72px] pb-12 md:pb-16 lg:pb-20 xl:pb-24 flex-1 flex items-center md:min-h-0">
      <div className="max-w-6xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 xl:gap-12">
          {/* Content Section */}
          <div className="flex-1 space-y-6 md:space-y-4 lg:space-y-6">
              <div className="space-y-6 md:space-y-4 lg:space-y-6 xl:space-y-8">
                <div className="overflow-hidden">
                  <h3 className="text-3xl md:text-4xl lg:text-5xl xl:text-[56px] font-semibold text-[#0D354C] leading-none tracking-tight max-w-[560px] lg:max-w-[600px]">
                    {title}
                  </h3>
                </div>
                {description && (
                  <div className="overflow-hidden">
                    <p className="text-base md:text-lg lg:text-xl xl:text-[18px] text-[#0D354C] opacity-80 leading-[130%] max-w-[420px]">
                      {description}
                    </p>
                  </div>
                )}
              </div>

            {/* Features List */}
            {features && features.length > 0 && (
              <div className="overflow-hidden">
                <ul className="space-y-3 md:space-y-3 lg:space-y-3 list-none pl-0 max-w-[300px] md:max-w-[500px] lg:max-w-[550px]">
                  {features.map((feature, index) => (
                    <li key={index}>
                      <p className="text-base md:text-lg lg:text-[18px] text-[#0D354C] flex items-start gap-2 leading-[130%]">
                        <span className="shrink-0 mt-1">
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M8.02592 1.47342C7.95636 1.19519 7.70637 1 7.41958 1C7.13279 1 6.8828 1.19519 6.81324 1.47342L6.66621 2.06155C6.09936 4.32896 4.32896 6.09936 2.06155 6.66621L1.47341 6.81324C1.19519 6.8828 1 7.13279 1 7.41958C1 7.70637 1.19519 7.95636 1.47341 8.02592L2.06155 8.17296C4.32896 8.73981 6.09936 10.5102 6.66621 12.7776L6.81324 13.3657C6.8828 13.644 7.13279 13.8392 7.41958 13.8392C7.70637 13.8392 7.95636 13.644 8.02592 13.3657L8.17296 12.7776C8.73981 10.5102 10.5102 8.73981 12.7776 8.17296L13.3657 8.02592C13.644 7.95636 13.8392 7.70637 13.8392 7.41958C13.8392 7.13279 13.644 6.8828 13.3657 6.81324L12.7776 6.66621C10.5102 6.09936 8.73981 4.32896 8.17296 2.06155L8.02592 1.47342ZM3.67696 7.41958C5.33273 6.66302 6.66302 5.33273 7.41958 3.67696C8.17615 5.33273 9.50644 6.66302 11.1622 7.41958C9.50644 8.17615 8.17615 9.50644 7.41958 11.1622C6.66302 9.50644 5.33273 8.17615 3.67696 7.41958Z"
                              fill="#D6B26F"
                            />
                          </svg>
                        </span>
                        <span>{feature}</span>
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Image/Visual Section */}
          <div className="flex-1 flex items-center justify-center lg:justify-end">
            <div className="relative w-full lg:w-4/5 aspect-[4/5] rounded-2xl overflow-hidden bg-[#0D354C]/5 ring-1 ring-[#0D354C]/10 shadow-xl shadow-[#0D354C]/10">
              {image ? (
                <img
                  src={image}
                  alt={imageAlt || `${name} visual`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-[#0D354C]/60">
                  {name}
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D354C]/60 via-transparent to-transparent" aria-hidden="true" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div className="rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-[#0D354C] shadow">
                  {name}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TabContent;
