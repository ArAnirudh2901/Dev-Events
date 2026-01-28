'use client';

import posthog from 'posthog-js';
import { PostHogProvider as PHProvider } from 'posthog-js/react';
import { useEffect } from 'react';

export default function PostHogProvider({ children }) {
    useEffect(() => {
        if (typeof window !== 'undefined' && !posthog.__loaded) {
            posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
                api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
                capture_pageview: true,
                capture_pageleave: true,
                disable_external_dependency_loading: true,
                autocapture: {
                    capture_copied_text: true,
                    web_vitals: false,  // Disable web-vitals to prevent console errors
                },
            });
        }
    }, []);

    return <PHProvider client={posthog}>{children}</PHProvider>;
}
