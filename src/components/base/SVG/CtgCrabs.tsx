import * as React from 'react';

import { SVGProps } from './SVG.props';

function SvgComponent(props: SVGProps) {
  const { sizeMultiplier = 1 } = props;

  return (
    <svg
      width={props.width || 48 * sizeMultiplier}
      height={props.height || 46 * sizeMultiplier}
      viewBox="0 0 48 46"
      fill="none"
    >
      <path
        d="M22.446 15.12c-4.62.046-9.96 1.92-11.79 6.57-.78 1.98-.63 4.38.54 6.18 1.38 2.116 4.035 2.506 5.67 4.35.885 1.006 1.635 2.16 2.82 2.88 1.2.72 2.625.916 4.005.9.72 0 .72-1.124 0-1.124-1.56.015-3.06-.27-4.23-1.365-.915-.855-1.56-1.965-2.505-2.805-.99-.87-2.235-1.32-3.33-2.01-1.155-.735-1.905-1.86-2.19-3.18-.615-2.775.945-5.43 3.165-7.005 2.28-1.62 5.085-2.25 7.845-2.265.72-.015.72-1.14 0-1.125z"
        fill="#7F8498"
      />
      <path
        d="M24.951 16.246c2.865.03 5.895.6 8.28 2.265 2.22 1.56 3.78 4.23 3.165 7.005-.285 1.275-.975 2.37-2.07 3.105-1.125.765-2.43 1.185-3.45 2.085-.945.825-1.59 1.935-2.505 2.805-1.155 1.095-2.685 1.38-4.23 1.365-.72 0-.72 1.125 0 1.125 1.185 0 2.385-.135 3.48-.63 1.08-.495 1.86-1.35 2.595-2.25.87-1.08 1.725-1.935 2.955-2.58 1.065-.57 2.175-1.095 2.97-2.025 3.15-3.705.945-8.85-2.715-11.205-2.49-1.59-5.58-2.16-8.49-2.19-.705-.015-.705 1.11.015 1.125zM17.946 32.896a13.192 13.192 0 00-4.47 1.56c-.45.255-.96.555-.945 1.155.015.495.33.99.63 1.365.3.39.69.75 1.17.9.525.15 1.05-.03 1.545-.225.495-.195.975-.42 1.44-.66a15.001 15.001 0 002.91-2.01c.54-.48-.255-1.275-.795-.795-.81.705-1.68 1.305-2.625 1.815-.435.225-.87.435-1.335.615-.225.09-.48.21-.72.195-.21-.015-.36-.15-.51-.285a2.77 2.77 0 01-.45-.585c-.045-.075-.075-.195-.12-.255-.015-.15-.045-.135-.075.03l.135-.09c.45-.27.915-.525 1.395-.735.99-.435 2.04-.735 3.105-.9.3-.045.465-.42.39-.69-.075-.33-.375-.45-.675-.405z"
        fill="#7F8498"
      />
      <path
        d="M12.426 35.266c-.705.465-1.365 1.005-1.92 1.65-.3.33-.57.69-.81 1.065-.225.36-.48.75-.615 1.155-.315.96.765 1.755 1.545 2.04.495.195.945.045 1.29-.345.3-.315.585-.645.87-.975.675-.795 1.26-1.635 1.635-2.61.105-.285-.12-.615-.39-.69-.315-.09-.585.105-.69.39-.24.615-.63 1.2-1.035 1.725-.21.285-.45.54-.675.81a7.84 7.84 0 01-.345.375c-.075.09-.225.195-.27.3h.075a.278.278 0 01-.105-.03c-.06-.015-.105-.045-.15-.06-.135-.06-.27-.15-.375-.24-.09-.075-.255-.195-.3-.315-.03-.09-.015 0-.015-.03 0-.045.06-.12.075-.18.285-.57.645-1.11 1.065-1.59a7.914 7.914 0 011.695-1.47c.63-.405.06-1.38-.555-.975z"
        fill="#7F8498"
      />
      <path
        d="M10.191 39.63c-.06-.06-.12-.134-.18-.194-.27-.3-.855-.165-.945.255-.33 1.53-.06 3.24.855 4.53.27.375.735.72 1.215.465.45-.24.435-.795.495-1.23.135-.9.27-1.785.42-2.685.045-.3-.075-.6-.39-.69-.27-.075-.645.09-.69.39-.105.72-.225 1.455-.33 2.175-.06.36-.105.72-.165 1.095 0 .03-.015.06-.015.09-.06.225.105.18.495-.15-.06-.03-.06-.03-.015 0-.105-.105-.18-.27-.24-.39a4.717 4.717 0 01-.51-3.3c-.315.09-.63.165-.945.255.06.06.12.135.18.195.21.225.585.21.795 0a.616.616 0 00-.03-.81zM29.316 34.366c1.065.165 2.13.45 3.105.9.465.21.915.435 1.35.705.06.03.12.075.18.12-.03-.165-.045-.18-.075-.03-.045.075-.075.18-.12.255-.12.225-.27.405-.45.585-.135.135-.3.285-.51.285-.225.015-.465-.105-.66-.18-.48-.18-.93-.405-1.38-.645a13.205 13.205 0 01-2.625-1.815c-.54-.48-1.335.315-.795.795.795.69 1.635 1.305 2.55 1.815.45.255.915.48 1.395.69.48.21.99.45 1.53.45 1.005 0 1.83-1.05 2.13-1.92.42-1.17-1.08-1.71-1.905-2.085a12.988 12.988 0 00-3.435-1.035c-.3-.045-.6.075-.69.39-.06.3.105.675.405.72z"
        fill="#7F8498"
      />
      <path
        d="M34.566 36.63a7.89 7.89 0 012.625 2.82c.06.106.21.286.21.406 0 .045-.045.075-.09.135-.195.225-.45.42-.72.51-.03.015-.075.015-.105.03-.09.06.03-.03.045.015 0-.015-.045-.045-.045-.06-.09-.15-.24-.27-.36-.405a17.46 17.46 0 01-.69-.795c-.48-.585-.93-1.245-1.215-1.95-.105-.285-.375-.48-.69-.39-.27.075-.51.405-.39.69.345.855.825 1.605 1.395 2.31.285.345.585.69.885 1.02.33.36.66.735 1.185.675.45-.06.885-.315 1.23-.6.33-.285.705-.675.705-1.14.015-.45-.27-.9-.51-1.275-.225-.375-.48-.72-.75-1.065a9.035 9.035 0 00-2.145-1.92c-.615-.375-1.17.6-.57.99z"
        fill="#7F8498"
      />
      <path
        d="M38.166 40.816c.06-.06.12-.135.18-.195-.315-.09-.63-.165-.945-.255.24 1.11.045 2.31-.51 3.3-.075.12-.15.285-.24.39.06-.06-.015 0-.015 0 .375.315.54.375.495.18 0-.045-.015-.075-.015-.12-.06-.36-.105-.72-.165-1.095-.105-.72-.225-1.455-.33-2.175-.045-.3-.42-.465-.69-.39-.315.09-.435.39-.39.69.135.9.27 1.785.42 2.685.06.435.06 1.005.495 1.23.48.255.945-.09 1.215-.465.915-1.29 1.185-3 .855-4.53-.09-.405-.66-.555-.945-.255-.06.06-.12.135-.18.195a.566.566 0 000 .795c.18.225.555.24.765.015zM20.526 21.03c-.405.96-.465 2.056-.225 3.076.075.285.405.48.69.39.3-.09.465-.39.39-.69-.03-.105-.045-.225-.075-.33 0-.03-.015-.06-.015-.09.015.075.015.075 0 0 0-.045-.015-.09-.015-.15a5.294 5.294 0 010-.69c0-.045.015-.09.015-.15.015-.06.015-.06 0 0 0-.03.015-.06.015-.09.015-.105.045-.225.075-.33.06-.225.135-.435.21-.645.12-.27-.12-.63-.39-.69-.315-.075-.555.105-.675.39zM26.046 21.45c.06.09.105.18.15.286.015.045.075.12 0 .015.03.045.045.105.06.15.03.09.06.18.075.27.015.045.03.105.03.15 0 .015.03.18.015.075-.015-.09 0 .06.015.09 0 .06.015.105.015.165v.285c0 .06-.015.105-.015.165-.015.12.03-.12 0 .015-.015.105-.045.21-.075.315-.075.285.09.63.39.69.3.075.615-.09.69-.39.255-.945.12-1.98-.39-2.805-.15-.255-.51-.375-.765-.195a.5.5 0 00-.195.72zM34.926 19.14c.87-.69 1.41-1.65 1.8-2.67.21-.524.36-1.064.51-1.62.015-.06.225-.72.195-.734-.03.015-.045.045-.075.06-.09.06-.105.075-.015.06.06.03.18 0 .24 0 .15 0 .3.015.45.045.975.165 2.28.75 2.655 1.755.39 1.035-.645 2.19-1.305 2.88a5.593 5.593 0 01-2.985 1.59c-.705.15-.405 1.23.3 1.08a6.75 6.75 0 003.33-1.74c.93-.885 1.965-2.175 1.86-3.525-.105-1.44-1.44-2.415-2.685-2.895-.63-.24-1.395-.39-2.07-.3-.765.105-.84.915-1.005 1.53-.375 1.365-.84 2.76-1.995 3.675-.24.195-.195.6 0 .795.225.255.555.195.795.015z"
        fill="#7F8498"
      />
      <path
        d="M37.341 13.77c-.855-1.44-1.965-2.654-3.375-3.57-.735-.48-1.53-.87-2.34-1.214-.15-.06-.525-.135-.615-.27.045.06-.405.255.135-.06.075-.045.15-.09.24-.135.495-.24 1.08-.36 1.62-.45 1.095-.18 2.16-.09 3.24.135.96.195 1.665-.09 2.385-.72.33-.3.63-.66 1.05-.84.57-.255.885.21 1.185.63.54.765.915 1.62 1.095 2.535.42 2.01-.03 4.155-.84 6-.285.66.675 1.23.975.57.855-1.95 1.35-4.08 1.065-6.21a7.679 7.679 0 00-1.035-3.015c-.51-.84-1.215-1.845-2.325-1.695-.51.06-.96.345-1.35.675-.405.345-.78.87-1.32 1.035-.495.15-1.185-.165-1.695-.225a8.063 8.063 0 00-1.995-.03c-1.08.105-2.445.315-3.27 1.095-.33.315-.495.78-.27 1.2.255.48.84.645 1.305.84 2.16.915 3.945 2.28 5.145 4.32.39.585 1.365.03.99-.6z"
        fill="#7F8498"
      />
      <path
        d="M36.816 7.23c-1.86-2.384-4.485-4.11-7.41-4.92l.135 1.036c1.725-1.26 3.96-1.71 6.015-1.065 1.875.585 3.435 2.07 4.155 3.9.255.66 1.35.375 1.08-.3-.84-2.16-2.58-3.885-4.785-4.635-2.34-.81-5.055-.345-7.035 1.125-.375.27-.375.885.135 1.035 2.76.75 5.16 2.37 6.915 4.62.45.57 1.23-.225.795-.795zM13.386 17.926c-1.035-.84-1.155-2.13-1.41-3.36-.12-.585-.375-1.065-.84-1.455-.57-.48-1.215-.45-1.92-.33-1.35.225-2.88 1.08-3.405 2.4-.57 1.425.405 2.895 1.365 3.87a7.77 7.77 0 004.02 2.19c.705.15 1.005-.945.3-1.08a6.761 6.761 0 01-3.03-1.44c-.765-.645-1.845-1.755-1.695-2.85.15-1.125 1.65-1.815 2.625-1.995.24-.045.6-.135.84-.06.12.03.315.24.39.345.285.345.3.84.39 1.275.24 1.23.57 2.445 1.575 3.27.24.195.555.225.795 0 .21-.18.24-.585 0-.78z"
        fill="#7F8498"
      />
      <path
        d="M11.631 14.1c1.71-1.71 3.855-2.64 6.225-3.044.465-.075.99-.12 1.335-.48.36-.39.285-.9.015-1.305-.66-.99-2.025-1.56-3.135-1.89a9.96 9.96 0 00-1.77-.33c-.69-.06-1.215.075-1.665-.555-.6-.84-1.065-2.025-2.31-1.95-.825.06-1.605.825-2.175 1.38a8.607 8.607 0 00-1.44 1.845c-1.2 2.13-1.305 4.665-1.02 7.035.09.705 1.215.72 1.125 0-.225-1.86-.24-3.81.45-5.595.495-1.275 1.38-2.355 2.475-3.18.435-.33.795-.495 1.215-.06.345.345.525.84.81 1.23.63.84 1.335.9 2.325.96 1.185.06 2.37.435 3.375 1.035.24.15.465.315.675.51.21.21.18.135-.09.18-.51.06-1.035.165-1.545.285-2.16.51-4.08 1.545-5.655 3.12-.525.525.27 1.32.78.81z"
        fill="#7F8498"
      />
      <path
        d="M14.646 7.89c2.235-1.65 4.92-.824 7.38-.224.51.12.84-.39.63-.825-1.095-2.355-3.42-4.11-6.015-4.41-2.295-.27-4.95.48-6.375 2.385-.435.585.54 1.14.975.57 1.17-1.56 3.555-2.085 5.4-1.83 2.22.3 4.11 1.86 5.055 3.855.21-.27.42-.555.63-.825-2.745-.675-5.76-1.515-8.25.33-.57.42-.015 1.41.57.975zM37.251 23.91c1.695-.21 3.525-.644 4.905-1.694.075-.06.15-.12.24-.18.03-.015.105-.045.135-.075.03-.045.075.03 0-.015-.09-.06.015.09.015.09.045.12.135.225.195.33.18.39.3.87.225 1.305-.105.765-1.26 1.005-1.875 1.095-1.065.165-2.205.135-3.285.15-.72.015-.72 1.14 0 1.125 1.155-.015 2.34 0 3.48-.165.96-.15 2.19-.54 2.625-1.5.435-.96.105-2.445-.63-3.195-.42-.435-1.02-.405-1.5-.075-.39.27-.75.54-1.17.75-1.035.51-2.205.795-3.36.945-.3.045-.57.225-.57.57 0 .255.255.585.57.54z"
        fill="#7F8498"
      />
      <path
        d="M43.641 21.81c1.17-1.2 2.115-2.58 2.805-4.094-.255.06-.51.135-.765.195.375.24.375.945.375 1.335 0 .57-.105 1.11-.315 1.635a4.48 4.48 0 01-2.145 2.37c-.645.33-.075 1.305.57.975 1.29-.66 2.25-1.845 2.715-3.21.225-.66.33-1.38.27-2.085-.06-.765-.24-1.56-.915-1.995-.24-.15-.645-.075-.765.195A13.374 13.374 0 0142.846 21c-.51.54.285 1.335.795.81zM36.906 27.946c1.305.24 2.625.27 3.945.09.315-.045.615-.105.93-.165.15-.03.3-.075.375.06.09.165.015.495-.03.675-.06.24-.165.465-.33.66-.72.87-2.16.705-3.165.57-1.11-.15-2.22-.525-3.075-1.275-.54-.48-1.335.315-.795.795.855.75 1.89 1.215 2.985 1.455 1.095.225 2.37.375 3.465.075 1.08-.3 1.89-1.17 2.055-2.28.075-.495.06-1.125-.3-1.515-.39-.42-.975-.405-1.485-.315-1.425.255-2.85.33-4.29.075-.69-.105-1.005.975-.285 1.095z"
        fill="#7F8498"
      />
      <path
        d="M43.146 28.26c.705-.36 1.365-.794 1.98-1.304.3-.24.585-.51.855-.78.135-.135.27-.285.39-.435.06-.06.105-.12.165-.195.03-.045.06-.075.09-.12.09-.09.045-.075-.135.045-.09-.03-.195-.045-.285-.075 0 0-.045-.045-.03-.045 0 .045.045.18.06.21.03.105.045.21.045.33.015.27 0 .525-.045.78-.12.51-.345 1.005-.705 1.395-.765.855-1.92 1.23-3.045 1.215-.72 0-.72 1.125 0 1.125 1.83.015 3.75-.87 4.545-2.595.375-.84.525-1.8.255-2.685-.15-.525-.645-1.005-1.215-.675-.21.12-.33.315-.48.495-.15.18-.315.345-.48.51a9.77 9.77 0 01-2.52 1.83c-.27.135-.345.525-.195.765.15.285.48.345.75.21zM31.926 31.036c.57.84 1.26 1.575 2.01 2.25.375.345.765.675 1.17.99.39.315.855.585 1.38.555.525-.03.945-.33 1.35-.645.36-.285.795-.645.99-1.08a.77.77 0 00-.09-.78c-.165-.21-.405-.3-.63-.405a9.718 9.718 0 01-1.29-.705c-.9-.57-1.71-1.275-2.415-2.07-.48-.54-1.275.255-.795.795.6.69 1.29 1.305 2.04 1.845.36.255.735.495 1.125.72.195.105.405.225.615.315.09.045.18.09.27.12.06.03.12.06.18.075.09.045.105.045.045 0-.03-.09-.045-.195-.075-.285 0-.045.045-.06-.015-.03s-.12.135-.165.18l-.315.315c-.195.165-.405.345-.63.45-.45.225-.93-.315-1.245-.585-.93-.765-1.815-1.605-2.505-2.595-.165-.255-.495-.36-.765-.195-.285.15-.42.525-.24.765z"
        fill="#7F8498"
      />
      <path
        d="M38.3 33.75c.916.18 1.846.27 2.776.24.225 0 .435-.014.66-.044.09-.015.195 0 .285-.015-.03-.015-.03-.015.015 0 .18.06.12-.09-.195-.42-.105.075-.195.3-.285.405-.12.135-.24.255-.375.36-1.095.87-2.7.765-3.705-.195-.525-.495-1.32.3-.795.795a4.01 4.01 0 004.365.78c.69-.3 1.275-.81 1.695-1.44.24-.36.345-.825-.015-1.17-.315-.3-.735-.24-1.125-.21-1.005.075-2.01.03-2.985-.165-.3-.06-.6.09-.69.39-.09.27.075.63.375.69zM10.746 22.786c-1.02-.135-2.055-.375-3-.78a5.964 5.964 0 01-1.245-.69c-.435-.315-.93-.66-1.485-.375-.48.24-.735.825-.915 1.305a3.427 3.427 0 00-.165 1.695c.195 1.095 1.38 1.65 2.355 1.875 1.26.27 2.61.225 3.885.24.72.015.72-1.11 0-1.125-.99-.015-1.98 0-2.97-.105a4.757 4.757 0 01-1.215-.27c-.315-.12-.705-.3-.885-.6-.195-.33-.105-.84 0-1.2.06-.225.15-.42.27-.615.03-.06.09-.105.105-.165.015-.03-.06 0-.075 0 .045.015.09.03.135.06.33.195.615.45.96.645.375.21.765.375 1.17.54.975.375 2.01.585 3.045.72.3.045.57-.285.57-.57.03-.36-.24-.54-.54-.585z"
        fill="#7F8498"
      />
      <path
        d="M5.151 21.016a13.374 13.374 0 01-2.625-3.87c-.12-.27-.54-.36-.765-.195-.675.435-.855 1.2-.915 1.95-.06.705.045 1.455.27 2.13.465 1.365 1.425 2.565 2.715 3.21.645.33 1.215-.645.57-.975a4.48 4.48 0 01-2.145-2.37c-.195-.51-.3-1.05-.315-1.59 0-.39 0-1.14.375-1.38-.255-.06-.51-.135-.765-.195.69 1.515 1.65 2.91 2.805 4.095.495.51 1.29-.285.795-.81zM10.791 26.866c-1.26.225-2.58.24-3.84.015-.525-.09-1.08-.27-1.59-.03-.525.255-.69.825-.69 1.365 0 1.08.66 2.1 1.665 2.535 1.065.465 2.355.345 3.48.165 1.26-.195 2.445-.69 3.405-1.53.54-.48-.255-1.275-.795-.795-.84.735-1.935 1.11-3.03 1.26-1.005.135-2.49.315-3.21-.57-.225-.27-.54-.93-.36-1.305.075-.15.15-.12.33-.09.3.045.615.12.915.165 1.35.195 2.685.15 4.02-.09.705-.135.405-1.215-.3-1.095z"
        fill="#7F8498"
      />
      <path
        d="M5.421 27.286a9.732 9.732 0 01-2.25-1.56c-.345-.33-.645-.675-.96-1.035-.39-.465-1.05-.42-1.365.12-.225.39-.27.915-.27 1.35 0 .45.09.9.255 1.32.33.87.915 1.59 1.695 2.115.87.585 1.95.84 3 .825.72 0 .72-1.125 0-1.125-1.125.015-2.28-.36-3.045-1.215-.36-.39-.6-.885-.705-1.395-.06-.24-.06-.48-.06-.735 0-.12.03-.24.06-.36.015-.06.075-.165.06-.21 0 0-.045.045-.03.045-.09.03-.195.045-.285.075-.18-.12-.225-.135-.135-.045.03.03.06.075.09.12.06.06.105.12.165.195.12.15.255.285.39.435.27.285.555.54.855.78.615.51 1.275.945 1.98 1.305.27.135.615.075.765-.195.135-.285.06-.66-.21-.81zM15.096 30.48c-.69.99-1.575 1.83-2.505 2.596-.3.24-.78.78-1.2.6a3.045 3.045 0 01-.645-.435c-.12-.09-.225-.195-.33-.3-.06-.06-.105-.135-.165-.18-.06-.06-.03-.09-.045 0-.03.09-.045.195-.075.285-.06.045-.045.045.045 0 .06-.03.12-.045.18-.075.09-.045.18-.075.27-.12.21-.105.405-.21.615-.315.39-.21.765-.45 1.125-.72.75-.54 1.425-1.155 2.04-1.845.48-.54-.315-1.335-.795-.795a11.156 11.156 0 01-2.085 1.86c-.405.27-.825.525-1.275.75-.435.225-1.035.36-1.14.915-.09.51.405.945.735 1.26.36.33.78.66 1.23.825 1.035.375 1.95-.57 2.67-1.185.87-.75 1.665-1.575 2.325-2.52.18-.255.045-.63-.195-.765-.285-.21-.6-.09-.78.165z"
        fill="#7F8498"
      />
      <path
        d="M9.396 32.656c-.87.165-1.755.225-2.625.195-.375-.015-.795-.12-1.155 0-.465.15-.675.63-.48 1.08.285.675.96 1.245 1.59 1.59.66.36 1.425.525 2.175.45a4.01 4.01 0 002.43-1.11c.525-.495-.27-1.29-.795-.795-1.005.96-2.595 1.065-3.705.195a2.818 2.818 0 01-.375-.36c-.06-.06-.24-.39-.285-.405-.075.135-.15.285-.225.42.06-.015.075-.03.045-.015.06.015.165.015.225.015l.705.045c.93.03 1.86-.06 2.775-.24.3-.06.465-.42.39-.69-.09-.285-.405-.435-.69-.375z"
        fill="#7F8498"
      />
    </svg>
  );
}

export default SvgComponent;
