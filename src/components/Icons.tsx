/* Iconografía propia de NEXAH — SVG inline, trazo técnico */

interface P {
  className?: string;
}

const base = (className?: string) => ({
  className,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "square" as const,
  strokeLinejoin: "miter" as const,
});

export const IconLogo = ({ className }: P) => (
  <svg {...base(className)}>
    <path d="M12 1.8 21 7v10l-9 5.2L3 17V7l9-5.2Z" />
    <path d="M7 13.5v-3M9.7 15.5v-7M12.3 17v-10M14.9 15v-6M17.6 13v-2" strokeWidth={1.4} />
  </svg>
);

export const IconPlay = ({ className }: P) => (
  <svg {...base(className)}>
    <path d="M7 4.5v15l13-7.5L7 4.5Z" fill="currentColor" stroke="none" />
  </svg>
);

export const IconPause = ({ className }: P) => (
  <svg {...base(className)}>
    <path d="M7 4.5h3.4v15H7zM13.6 4.5H17v15h-3.4z" fill="currentColor" stroke="none" />
  </svg>
);

export const IconVolume = ({ className }: P) => (
  <svg {...base(className)}>
    <path d="M3.5 9.5v5H7l5 4V5.5L7 9.5H3.5Z" />
    <path d="M15.5 9c1.6 1.6 1.6 4.4 0 6M18 6.5c3 3 3 8 0 11" />
  </svg>
);

export const IconMute = ({ className }: P) => (
  <svg {...base(className)}>
    <path d="M3.5 9.5v5H7l5 4V5.5L7 9.5H3.5Z" />
    <path d="m15.5 9.5 5 5M20.5 9.5l-5 5" />
  </svg>
);

export const IconSignal = ({ className }: P) => (
  <svg {...base(className)}>
    <path d="M4 19.5c0-8.5 7.5-15.5 16-15.5" opacity={0.35} />
    <path d="M4 19.5C4 13.7 9.7 8.5 15.5 8.5" opacity={0.65} />
    <path d="M4 19.5c0-3.3 3.2-6.5 6.5-6.5" />
    <circle cx="4.6" cy="19" r="1.4" fill="currentColor" stroke="none" />
  </svg>
);

export const IconBolt = ({ className }: P) => (
  <svg {...base(className)}>
    <path d="M13 2 4.5 13.5H11L9.5 22 19 10h-6.5L13 2Z" />
  </svg>
);

export const IconChip = ({ className }: P) => (
  <svg {...base(className)}>
    <rect x="6" y="6" width="12" height="12" />
    <rect x="9.5" y="9.5" width="5" height="5" />
    <path d="M9 6V2.5M15 6V2.5M9 21.5V18M15 21.5V18M6 9H2.5M6 15H2.5M21.5 9H18M21.5 15H18" strokeWidth={1.3} />
  </svg>
);

export const IconAntenna = ({ className }: P) => (
  <svg {...base(className)}>
    <path d="M12 9.5V22M12 9.5 8 22M12 9.5l4 12.5" strokeWidth={1.4} />
    <circle cx="12" cy="7.5" r="1.6" fill="currentColor" stroke="none" />
    <path d="M7.5 3.5a6.5 6.5 0 0 0 0 8M16.5 3.5a6.5 6.5 0 0 1 0 8" strokeWidth={1.3} />
  </svg>
);

export const IconWave = ({ className }: P) => (
  <svg {...base(className)}>
    <path d="M2 12c1.6-5 3.4-5 5 0s3.4 5 5 0 3.4-5 5 0 3.4 5 5 0" />
  </svg>
);

export const IconGlobe = ({ className }: P) => (
  <svg {...base(className)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.8 2.6 4 5.6 4 9s-1.2 6.4-4 9c-2.8-2.6-4-5.6-4-9s1.2-6.4 4-9Z" strokeWidth={1.3} />
  </svg>
);

export const IconMic = ({ className }: P) => (
  <svg {...base(className)}>
    <rect x="9" y="2.5" width="6" height="11" rx="3" />
    <path d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v3.5M8.5 21.5h7" />
  </svg>
);

export const IconShield = ({ className }: P) => (
  <svg {...base(className)}>
    <path d="M12 2.5 20 5.5v6c0 5-3.4 8.6-8 10-4.6-1.4-8-5-8-10v-6l8-3Z" />
    <path d="m8.5 11.5 2.5 2.5 4.5-4.5" />
  </svg>
);

export const IconData = ({ className }: P) => (
  <svg {...base(className)}>
    <path d="M4 20V10M9.3 20V4M14.6 20v-9M20 20V7" strokeWidth={2} />
    <path d="M2.5 20h19" strokeWidth={1.2} />
  </svg>
);

export const IconChat = ({ className }: P) => (
  <svg {...base(className)}>
    <path d="M3 4.5h18v12H9l-6 4.5v-16.5Z" />
    <path d="M7 9h10M7 12h6" strokeWidth={1.3} />
  </svg>
);

export const IconSpark = ({ className }: P) => (
  <svg {...base(className)}>
    <path d="M12 2.5 14 10l7.5 2L14 14l-2 7.5L10 14l-7.5-2L10 10l2-7.5Z" />
  </svg>
);

export const IconSlider = ({ className }: P) => (
  <svg {...base(className)}>
    <path d="M3 6.5h18M3 12h18M3 17.5h18" strokeWidth={1.3} />
    <rect x="7" y="4.5" width="3" height="4" fill="currentColor" stroke="none" />
    <rect x="14" y="10" width="3" height="4" fill="currentColor" stroke="none" />
    <rect x="5" y="15.5" width="3" height="4" fill="currentColor" stroke="none" />
  </svg>
);

export const IconClock = ({ className }: P) => (
  <svg {...base(className)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 6.5V12l3.5 2.5" />
  </svg>
);

export const IconUp = ({ className }: P) => (
  <svg {...base(className)}>
    <path d="M12 20V5M5.5 11.5 12 5l6.5 6.5" />
  </svg>
);

export const IconDown = ({ className }: P) => (
  <svg {...base(className)}>
    <path d="M12 4v15M5.5 12.5 12 19l6.5-6.5" />
  </svg>
);

export const IconFlat = ({ className }: P) => (
  <svg {...base(className)}>
    <path d="M4 12h16" />
    <path d="m16 8 4 4-4 4" strokeWidth={1.3} />
  </svg>
);

export const IconExt = ({ className }: P) => (
  <svg {...base(className)}>
    <path d="M10 5H5v14h14v-5" />
    <path d="M13 4h7v7M20 4 11.5 12.5" />
  </svg>
);

export const IconSend = ({ className }: P) => (
  <svg {...base(className)}>
    <path d="M21 3 3 10.5l6.5 2.5L12 20l9-17Z" />
    <path d="m9.5 13 11.5-10" strokeWidth={1.2} />
  </svg>
);

export const IconCheck = ({ className }: P) => (
  <svg {...base(className)}>
    <path d="m4 12.5 5 5L20 6.5" />
  </svg>
);

/* ---------- redes ---------- */
export const IconX = ({ className }: P) => (
  <svg {...base(className)}>
    <path d="M4 4l16 16M20 4 4 20" />
  </svg>
);

export const IconIG = ({ className }: P) => (
  <svg {...base(className)}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17" cy="7" r="1.1" fill="currentColor" stroke="none" />
  </svg>
);

export const IconYT = ({ className }: P) => (
  <svg {...base(className)}>
    <rect x="2.5" y="5.5" width="19" height="13" rx="3.5" />
    <path d="m10 9 5 3-5 3V9Z" fill="currentColor" stroke="none" />
  </svg>
);

export const IconTW = ({ className }: P) => (
  <svg {...base(className)}>
    <path d="M4.5 3.5h15v13.5H12l-3.5 3.5V17H4.5v-13.5Z" />
    <path d="M8.5 7v7M12 7v4.5M15.5 7v7" strokeWidth={1.3} />
  </svg>
);

export const AGENT_ICONS = {
  mic: IconMic,
  wave: IconWave,
  slider: IconSlider,
  globe: IconGlobe,
  spark: IconSpark,
  chat: IconChat,
  data: IconData,
  shield: IconShield,
} as const;
