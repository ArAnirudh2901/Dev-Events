'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import posthog from 'posthog-js';

const ExploreBtn = () => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleMouseEnter = () => {
    setIsAnimating(true);
    // Reset animation after it completes
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleClick = () => {
    posthog.capture('explore_events_clicked', {
      button_location: 'hero_section',
    });
  };

  return (
    <button
      type='button'
      id="explore-btn"
      className='mt-7 mx-auto'
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
    >
        <a href="#events">
            Explore Events
            <Image 
              src="/icons/arrow-down.svg" 
              alt="arrow-down" 
              width={20} 
              height={20} 
              className={isAnimating ? "arrow-icon animate-bounce-down" : "arrow-icon"}
            />
        </a>
    </button>
  );
};

export default ExploreBtn;