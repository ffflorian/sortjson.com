// @ts-ignore
import React from 'react';

interface Props {
  size: number;
}

export const Logo = ({size}: Props) => (
  <svg viewBox="0 0 256 256" width={size} height={size} fill="none">
    <mask id="a" width="256" height="256" x="0" y="0" maskUnits="userSpaceOnUse">
      <rect width="256" height="256" fill="#fff" rx="64" />
    </mask>
    <g mask="url(#a)">
      <path fill="#F2C94C" d="M205-57l185 77-153 369-185-76z" />
      <path fill="#4E505F" d="M20-133l185 77L52 313l-185-76z" />
      <path
        fill="#F2C94C"
        d="M49 172c-6-2-11-6-13-11s-2-11 1-17l9-23c2-5 3-9 1-13-1-3-5-6-10-9l6-13c5 2 10 3 13 1 4-1 6-5 9-10l9-22c3-7 6-11 11-13s11-2 17 1l22 9-5 13-13-5c-4-2-7-2-10 0-3 1-5 4-7 9l-9 20c-1 5-4 8-8 10s-8 2-13 2c4 3 7 6 8 10s1 9-1 13l-8 20c-2 5-3 9-2 12s3 5 7 7l13 5-5 13-22-9z"
        filter="url(#filter0_d)"
      />
      <path
        fill="#4E505F"
        d="M131 206l5-13 13 5c4 2 7 2 10 1 3-2 5-5 7-10l9-20c1-4 4-8 8-10s8-2 13-1v-1c-4-2-6-6-8-10-1-4-1-8 1-13l8-20c2-5 3-9 2-12s-3-5-7-7l-13-5 5-13 22 9c7 3 11 6 13 11s2 11-1 18l-9 22c-2 5-3 9-1 13 1 3 4 6 10 9l-6 13c-5-2-10-2-13-1-4 2-6 5-9 10l-9 22c-2 7-6 11-11 13s-11 2-17-1l-22-9z"
        filter="url(#filter1_d)"
      />
    </g>
    <defs>
      <filter
        id="filter0_d"
        width="93"
        height="151"
        x="35"
        y="41"
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
        <feOffset dx="2" dy="8" />
        <feGaussianBlur stdDeviation="1" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow" />
        <feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
      </filter>
      <filter
        id="filter1_d"
        width="94"
        height="150"
        x="131"
        y="77"
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
        <feOffset dx="2" dy="8" />
        <feGaussianBlur stdDeviation="1" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow" />
        <feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
      </filter>
    </defs>
  </svg>
);
