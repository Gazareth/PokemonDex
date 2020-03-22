import * as React from "react";

function SvgPokedexV2({ colors, ...props }) {
  const { main, detail, detail2 } = colors;
  console.log("Colors!", main, detail, detail2);
  return (
    <svg viewBox="0 0 640 640" width="1em" height="1em" {...props}>
      <defs>
        <path d="M466.75 540.5h34v12h-34v-12z" id="pokedexV2_svg__h" />
        <path d="M130.78 51.38h377.55v563H130.78v-563z" id="pokedexV2_svg__a" />
        <path
          d="M120 0c-7.37 0-13.33 5.96-13.33 13.33v613.34c0 7.37 5.96 13.33 13.33 13.33h400c7.37 0 13.33-5.96 13.33-13.33V13.33C533.33 5.96 527.37 0 520 0H120zm306.67 66.67c0 7.36-5.97 13.33-13.34 13.33-7.36 0-13.33-5.97-13.33-13.33 0-7.37 5.97-13.34 13.33-13.34 7.37 0 13.34 5.97 13.34 13.34zm-53.34 0c0 7.36-5.97 13.33-13.33 13.33s-13.33-5.97-13.33-13.33c0-7.37 5.97-13.34 13.33-13.34s13.33 5.97 13.33 13.34zm-53.33 0c0 7.36-5.97 13.33-13.33 13.33-7.37 0-13.34-5.97-13.34-13.33 0-7.37 5.97-13.34 13.34-13.34 7.36 0 13.33 5.97 13.33 13.34zm-53.33 40c0 29.4-23.92 53.33-53.34 53.33-29.41 0-53.33-23.93-53.33-53.33s23.92-53.34 53.33-53.34c29.42 0 53.34 23.94 53.34 53.34zm-83.91 316.09a13.335 13.335 0 01-9.43 3.91c-1.71 0-3.45-.34-5.1-1.02a13.322 13.322 0 01-8.23-12.32V360c0-5.39 3.24-10.26 8.23-12.32 5-2 10.72-.93 14.53 2.89l26.67 26.67c5.21 5.21 5.21 13.65 0 18.85l-26.67 26.67zm70.57 163.91c-7.37 0-13.33-5.97-13.33-13.34S245.96 560 253.33 560h133.34c7.37 0 13.33 5.96 13.33 13.33s-5.96 13.34-13.33 13.34H253.33zM480 133.33v53.34h26.67v26.66H480v320h26.67V560H480v53.33h-26.67v-480h-60.19c-17.8 0-34.55 6.93-47.15 19.54-3.31 3.31-29.81 29.81-33.13 33.12-17.64 17.63-41.08 27.34-66 27.34H133.33v-26.66h113.53c17.8 0 34.54-6.93 47.15-19.53 3.31-3.32 29.81-29.82 33.13-33.13 17.64-17.63 41.08-27.34 66-27.34h113.53v26.66H480z"
          id="pokedexV2_svg__c"
        />
        <path
          d="M257 106.75c0 24.01-19.49 43.5-43.5 43.5s-43.5-19.49-43.5-43.5 19.49-43.5 43.5-43.5 43.5 19.49 43.5 43.5z"
          id="pokedexV2_svg__d"
        />
        <path
          d="M500.06 120.1c-50-.11-81.25-.17-93.75-.2l-18.66.41c-5.81.27 1.33-.06-.67.03a75.074 75.074 0 00-48.78 21.08c-3.94 3.81-7.95 7.69-15.04 14.55l-9.12 9.23c-5.55 5.86-6.39 6.75-9.1 9.62a79.523 79.523 0 01-45.4 23.89c-1.75.27 5.06-.8-.37.06-5.59.87-11.24 1.31-16.9 1.31-13.64-.01-47.75-.02-102.33-.05"
          id="pokedexV2_svg__f"
        />
        <path d="M460 119.9h12v486.98h-12V119.9z" id="pokedexV2_svg__g" />
        <path d="M466.75 193.65h34v12h-34v-12z" id="pokedexV2_svg__b" />
        <path
          d="M384.73 568.25c2.63 0 4.77 2.14 4.77 4.77 0 1.05 0-.95 0 0 0 2.89-2.34 5.23-5.23 5.23H256.44c-2.73 0-4.94-2.21-4.94-4.94 0-1.01 0 .99 0 0 0-2.79 2.27-5.06 5.06-5.06h128.17z"
          id="pokedexV2_svg__i"
        />
        <path
          d="M167.18 365.76c0-7.18 8.73-10.72 13.73-5.57 5.23 5.39 12.22 12.59 18.71 19.27 4.14 4.26 4.12 11.06-.06 15.29-6.48 6.56-13.9 14.08-19.26 19.51-4.81 4.87-13.12 1.46-13.12-5.39v-43.11z"
          id="pokedexV2_svg__j"
        />
        <path
          d="M312.8 66.6c0 3.31-2.69 6-6 6-3.32 0-6-2.69-6-6s2.68-6 6-6c3.31 0 6 2.69 6 6z"
          id="pokedexV2_svg__k"
        />
        <path
          d="M365.96 66.6c0 3.31-2.69 6-6 6s-6-2.69-6-6 2.69-6 6-6 6 2.69 6 6z"
          id="pokedexV2_svg__l"
        />
        <path
          d="M419.46 66.6c0 3.31-2.69 6-6 6s-6-2.69-6-6 2.69-6 6-6 6 2.69 6 6z"
          id="pokedexV2_svg__m"
        />
      </defs>
      <use xlinkHref="#pokedexV2_svg__a" fill={detail2} />
      <use xlinkHref="#pokedexV2_svg__b" fill={detail} />
      <use
        xlinkHref="#pokedexV2_svg__c"
        fill={main}
        //fillOpacity={0}
        strokeOpacity={0}
      />
      <use xlinkHref="#pokedexV2_svg__d" fill={detail} />
      <use xlinkHref="#pokedexV2_svg__e" fillOpacity={0} stroke={main} />
      <use
        xlinkHref="#pokedexV2_svg__f"
        fillOpacity={0}
        stroke={detail}
        strokeWidth={12}
      />
      <use xlinkHref="#pokedexV2_svg__g" fill={detail} />
      <use xlinkHref="#pokedexV2_svg__h" fill={detail} />
      <use xlinkHref="#pokedexV2_svg__i" fill={detail} />
      <use xlinkHref="#pokedexV2_svg__j" fill={detail} />
      <use xlinkHref="#pokedexV2_svg__k" fill={detail} />
      <use xlinkHref="#pokedexV2_svg__l" fill={detail} />
      <g>
        <use xlinkHref="#pokedexV2_svg__m" fill={detail} />
      </g>
    </svg>
  );
}

export default SvgPokedexV2;