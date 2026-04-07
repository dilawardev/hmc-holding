import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useAppReady } from "@/context/AppReadyContext";
import services from "@/pages/guest/Services/data/services";
import ServiceCardGrid from "@/pages/guest/Services/components/ServiceCardGrid";
import ServiceTabs from "@/pages/guest/Services/components/ServiceTabs";
import TabContent from "@/pages/guest/Services/components/TabContent";

gsap.registerPlugin(ScrollTrigger);

function Services() {
  const initialServiceId = services[0]?.id || "";
  const [activeTabId, setActiveTabId] = useState(initialServiceId);
  const [isDesktopTall, setIsDesktopTall] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth >= 1024 && window.innerHeight >= 760;
  });
  const sectionRef = useRef(null);
  const cardsRef = useRef(null);
  const pinnedSectionRef = useRef(null);
  const pinStartPositionRef = useRef(null);
  const scrollParamsRef = useRef(null);
  const tabSwitchTriggerRef = useRef(null);
  const ready = useAppReady();

  const handleTabChange = (serviceId) => {
    setActiveTabId(serviceId);
  };

  const scrollToTab = (serviceId) => {
    const tabIndex = services.findIndex((service) => service.id === serviceId);

    // Fallback: if we are not in the tall-desktop layout, just scroll to the stacked section
    if (!isDesktopTall) {
      const target = document.getElementById(`service-section-${serviceId}`);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      setActiveTabId(serviceId);
      return;
    }

    if (tabIndex === -1 || !tabSwitchTriggerRef.current) return;

    // Get the ScrollTrigger instance that handles tab switching
    const trigger = tabSwitchTriggerRef.current;
    
    // Refresh ScrollTrigger to ensure start/end values are accurate
    ScrollTrigger.refresh();
    
    // Calculate target progress (reverse of the tab switching algorithm)
    // Tab switching uses: tabIndex = Math.floor(progress * services.length)
    // So for a given tabIndex, progress = tabIndex / services.length
    const targetProgress = tabIndex / services.length;
    
    // Calculate target scroll position using the ScrollTrigger's start and end
    // This matches exactly how the tab switching algorithm works
    const scrollDistance = trigger.end - trigger.start;
    const targetScrollPosition = trigger.start + (targetProgress * scrollDistance);
    
    // Add half of the scroll duration that triggers the next tab to ensure accurate calculation
    // Each tab's scroll duration = scrollDistance / services.length
    // Half of that = scrollDistance / (services.length * 2)
    const offset = scrollDistance / (services.length * 2);
    const adjustedScrollPosition = targetScrollPosition + offset;
    
    // Ensure we don't scroll to negative positions
    const finalScrollPosition = Math.max(0, adjustedScrollPosition);
    
    // Scroll to the target position smoothly
    window.scrollTo({
      top: finalScrollPosition,
      behavior: 'smooth',
    });
  };

  const activeService = services.find((service) => service.id === activeTabId) || services[0] || null;

  if (!activeService) {
    return null;
  }

  // Keep a single source of truth for when to enable the pinned desktop layout
  useEffect(() => {
    const handleResize = () => {
      const nextIsDesktopTall =
        typeof window !== 'undefined' && window.innerWidth >= 1024 && window.innerHeight >= 760;

      setIsDesktopTall(nextIsDesktopTall);

      if (nextIsDesktopTall) {
        ScrollTrigger.refresh();
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useLayoutEffect(() => {
    if (!ready) return;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) return;

    // Only set up the pinned/timeline behavior when the viewport is both wide and tall enough
    if (!isDesktopTall) return;

    const ctx = gsap.context(() => {
      if (cardsRef.current && sectionRef.current && pinnedSectionRef.current) {
        // Calculate header height dynamically
        const header = document.querySelector('header');
        const headerTop = header ? parseInt(getComputedStyle(header).top) || 16 : 16;
        const headerHeight = header ? header.offsetHeight + headerTop : 80;
        
        const viewportHeight = window.innerHeight;
        const scrollDistance = viewportHeight * 2.5; // 250vh = 2.5 * viewport height

        // Animate cards section scrolling up (without opacity change) - desktop only
        gsap.to(cardsRef.current, {
          y: -100,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: `+=${scrollDistance}`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        });

        // Pin the tabs and content section during scroll
        // Start pinning later - allow more scrolling before locking
        const pinDelay = 200; // Increased by 100 more (100 + 100 = 200)
        const unlockOffset = -200; // Increased by 100 more (-300 + 100 = -200)
        const effectiveScrollDistance = scrollDistance - unlockOffset;
        
        // Store scroll parameters for scrollToTab function
        scrollParamsRef.current = {
          headerHeight,
          pinDelay,
          effectiveScrollDistance,
        };
        
        const pinTrigger = ScrollTrigger.create({
          trigger: pinnedSectionRef.current,
          start: `top-=${headerHeight + pinDelay} top`,
          end: `+=${effectiveScrollDistance}`,
          pin: true,
          pinSpacing: true, // Enable spacing to allow proper scrolling
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onEnter: () => {
            // Store the actual scroll position when pinning starts
            pinStartPositionRef.current = pinTrigger.start;
          },
        });

        // Scroll-based tab switching - single ScrollTrigger that handles all tabs
        let lastTabIndex = -1;
        const tabSwitchTrigger = ScrollTrigger.create({
          trigger: pinnedSectionRef.current,
          start: `top-=${headerHeight + pinDelay} top`, // Match pin start
          end: `+=${effectiveScrollDistance}`, // Match pin end
          scrub: false,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const progress = self.progress;
            const tabIndex = Math.min(
              Math.floor(progress * services.length),
              services.length - 1
            );
            // Only update if tab index changed
            if (tabIndex !== lastTabIndex) {
              lastTabIndex = tabIndex;
              const targetService = services[tabIndex];
              if (targetService) {
                setActiveTabId(targetService.id);
              }
            }
          },
        });
        
        // Store the ScrollTrigger instance for scrollToTab function
        tabSwitchTriggerRef.current = tabSwitchTrigger;
      }
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, [ready, isDesktopTall]);

  return (
    <section ref={sectionRef} className="relative bg-white">
      <ServiceCardGrid
        ref={cardsRef}
        services={services}
        activeTabId={activeTabId}
        onTabChange={scrollToTab}
      />
      <div ref={pinnedSectionRef} className="relative bg-white lg:min-h-screen">
        {isDesktopTall ? (
          <div className="pt-6 md:pt-8 lg:pt-10 flex flex-col h-full" style={{ height: 'calc(100vh - 220px)', minHeight: '640px' }}>
            <ServiceTabs
              services={services}
              activeTabId={activeTabId}
              onTabChange={scrollToTab}
            />
            <TabContent activeService={activeService} />
          </div>
        ) : (
          <div className="pt-8 pb-16 space-y-12">
            {services.map((service, index) => (
              <div
                key={service.id}
                id={`service-section-${service.id}`}
                className={index > 0 ? 'pt-8 border-t border-slate-200' : ''}
              >
                <TabContent activeService={service} />
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Spacer to provide additional scroll distance (adjusted for unlock offset) */}
    </section>
  );
}

export default Services;
