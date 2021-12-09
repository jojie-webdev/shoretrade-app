import * as React from 'react';

import { SVGProps } from './SVG.props';

function SvgComponent(props: SVGProps) {
  const { sizeMultiplier = 1 } = props;

  return (
    <svg
      width={props.width || 30 * sizeMultiplier}
      height={props.height || 30 * sizeMultiplier}
      viewBox="0 0 30 30"
      fill="none"
    >
      <path
        d="M11.406 29.16a168.58 168.58 0 019.54.046c.72.03.72-1.095 0-1.125-3.165-.105-6.36-.12-9.54-.045-.735.015-.735 1.14 0 1.125zM10.13 28.41c-.344-1.23-.48-2.49-.404-3.78.015-.3-.27-.57-.57-.57-.315 0-.54.256-.57.57-.09 1.366.06 2.76.45 4.08.09.286.39.48.69.39a.57.57 0 00.405-.69z"
        fill="#7F8498"
      />
      <path
        d="M21.576 28.726c.345-1.335.48-2.715.39-4.08-.015-.3-.24-.57-.57-.57-.285 0-.585.255-.57.57.09 1.275-.03 2.55-.36 3.78-.075.3.105.615.39.69.315.075.645-.09.72-.39z"
        fill="#7F8498"
      />
      <path
        d="M9.246 23.88c-1.44-.66-3.075-1.2-4.41-2.04-.495-.3-.54-.51-.615-1.05-.03-.21-.045-.404-.15-.6-.225-.434-.675-.63-1.065-.884-.705-.45-.435-1.215-.495-1.92-.06-.72-.63-1.275-.615-1.995.015-.645.285-1.17.15-1.83-.105-.51-.33-.84-.06-1.365.165-.33.435-.585.615-.9.27-.465.33-.975.405-1.5.06-.45.075-.9.39-1.245.24-.24.6-.39.87-.6 1.035-.795.795-2.28 1.995-2.97.57-.33 1.26-.375 1.815-.72.495-.3.84-.765 1.26-1.155.645-.615 1.065-.27 1.815-.165.525.075.975-.105 1.425-.36.72-.405 1.08-.72 1.95-.465.57.165 1.08.285 1.68.165.84-.18 1.29-.57 2.025.135.39.39.81.63 1.38.645.72.015 1.17-.255 1.665.405.315.435.51.78 1.035 1.005.405.18 1.035.195 1.395.465.405.3.48 1.005.825 1.38.33.345.75.585 1.125.87.21.165.48.33.585.6.15.36-.015.78.045 1.17.15 1.08 1.59 1.635 1.245 2.73-.15.495-.3.885-.105 1.395.27.69.87.87.405 1.635-.24.39-.54.66-.63 1.125-.12.615.315 1.245.195 1.815-.12.555-.645.825-.69 1.425-.03.465.135.945.09 1.395-.015.195.15-.18-.015 0-.105.105-.225.21-.33.3-.33.285-.705.525-1.065.78-1.365.93-2.79 1.875-4.275 2.61-.645.315-.075 1.29.57.975 1.515-.75 2.97-1.71 4.35-2.655.57-.39 1.38-.84 1.74-1.44.39-.645-.195-1.425.06-2.07.075-.18.375-.375.48-.555.105-.195.165-.405.18-.63.09-.87-.45-1.47.12-2.28.3-.42.63-.795.615-1.35-.03-.615-.525-.87-.72-1.395-.225-.6.36-1.245.21-1.89-.12-.57-.555-.975-.93-1.38-.285-.315-.405-.51-.42-.93-.015-.345.075-.645-.015-.975-.135-.51-.525-.885-.93-1.2-.495-.39-1.065-.66-1.35-1.245-.27-.57-.405-.975-1.02-1.275-.465-.225-1.095-.21-1.515-.54-.51-.39-.57-1.095-1.215-1.38-.6-.255-1.14.06-1.74-.03-.705-.12-1.02-.945-1.755-1.095-.645-.135-1.215.195-1.815.33-.81.195-1.53-.375-2.34-.315-.615.045-1.08.405-1.575.705-.825.48-1.365-.105-2.22 0-.495.06-.9.345-1.26.675-.63.585-1.035 1.11-1.89 1.38-1.38.45-2.19 1.2-2.655 2.565-.18.51-.345.78-.765 1.08-.21.135-.42.27-.6.435-.51.45-.69 1.035-.765 1.68-.075.54-.09 1.005-.36 1.485-.21.345-.495.645-.66 1.02-.39.84.12 1.455.09 2.295-.03.84-.405 1.455-.045 2.28.24.555.45.915.45 1.545 0 .345-.045.675.015 1.005.135.66.57 1.02 1.125 1.35.735.435.435 1.245.96 1.875.51.615 1.35.9 2.055 1.23 1.035.48 2.085.96 3.12 1.425.645.27 1.215-.69.555-.99z"
        fill="#7F8498"
      />
      <path
        d="M10.941 25.11c1.575.66 2.625 2.326 4.485 2.25.795-.03 1.5-.42 2.145-.884.765-.555 1.485-1.155 2.34-1.56.66-.315.09-1.275-.57-.975-.795.375-1.455.9-2.16 1.425-.54.405-1.155.87-1.86.87-.735 0-1.32-.405-1.89-.84-.705-.54-1.365-1.035-2.19-1.38-.285-.12-.615.12-.69.39-.09.33.12.585.39.705zM13.956 12.84c-2.265.06-4.305 1.576-5.1 3.706-.405 1.11-.45 2.475.225 3.48.69 1.035 1.98 1.755 3.09 2.25 1.185.525 2.445.705 3.705.375 1.245-.33 2.355-1.05 3.375-1.815.93-.705 2.13-1.455 2.145-2.76.015-1.23-.915-2.34-1.455-3.375-.63-1.2-1.44-2.1-2.85-2.25-1.08-.12-2.07.315-3.135.39-.72.06-.72 1.185 0 1.125 1.365-.105 3.105-1.02 4.26.12.375.375.615.87.855 1.335.24.465.51.9.765 1.35.225.42.495.9.435 1.38-.075.525-.54.87-.945 1.185-1.56 1.26-3.48 2.7-5.61 2.265-1.035-.21-1.98-.765-2.835-1.38-.93-.66-1.35-1.53-1.14-2.685.375-1.98 2.205-3.525 4.215-3.585.72 0 .72-1.125 0-1.11zM3.111 15.106c.975.615 1.95 1.245 2.925 1.86.255.165.63.06.765-.195.15-.285.06-.6-.195-.765-.975-.615-1.95-1.245-2.925-1.86a.558.558 0 00-.765.195.564.564 0 00.195.765zM4.011 10.23a27.408 27.408 0 002.505 2.926c.21.21.585.225.795 0a.566.566 0 000-.795c-.42-.435-.84-.885-1.23-1.35-.195-.225-.39-.465-.57-.69-.09-.12-.18-.24-.285-.36.03.045.015.015-.015-.015-.015-.03-.045-.06-.06-.09l-.165-.21c-.18-.24-.495-.375-.765-.195-.24.165-.405.525-.21.78zM6.996 6.18c.765 1.44 1.545 2.866 2.31 4.306.15.27.51.345.765.195a.561.561 0 00.195-.765c-.765-1.44-1.545-2.865-2.31-4.305-.15-.27-.51-.345-.765-.195a.59.59 0 00-.195.765zM11.736 4.41c.255 1.336.525 2.656.78 3.99.06.3.42.466.69.39.316-.09.45-.39.39-.69-.255-1.334-.524-2.654-.78-3.99-.06-.3-.42-.464-.69-.39-.3.076-.45.39-.39.69zM17.691 4.05a37.188 37.188 0 01-1.29 4.17c-.105.286.12.616.39.69.315.09.585-.104.69-.39.51-1.364.945-2.76 1.29-4.17.075-.3-.09-.614-.39-.69-.285-.074-.615.09-.69.39zM22.296 6.39c-.63.916-1.26 1.83-1.89 2.76-.165.24-.06.63.195.766.285.15.585.06.765-.195.63-.915 1.26-1.83 1.89-2.76.165-.24.06-.63-.195-.765-.27-.165-.585-.06-.765.195zM23.601 17.04c.435-.24.87-.48 1.32-.69.21-.104.435-.21.66-.3.06-.03.12-.06.195-.074-.105.045.03-.015.06-.03.12-.06.255-.105.39-.15.27-.105.495-.375.39-.69-.09-.27-.405-.51-.69-.39-.99.39-1.95.84-2.88 1.365a.553.553 0 00.555.96zM23.211 13.246c.765-.54 1.53-1.095 2.295-1.635.12-.09.21-.18.255-.33a.626.626 0 00-.06-.435c-.15-.24-.51-.39-.765-.195-.765.54-1.53 1.095-2.295 1.635-.12.09-.21.18-.255.33a.626.626 0 00.06.435c.135.24.51.375.765.195z"
        fill="#7F8498"
      />
      <path
        d="M13.791 19.786c-.495-.525-1.23-1.32-1.035-2.115.18-.75 1.23-1.2 1.875-1.47.735-.315 1.62-.48 2.31-.015.315.21.48.525.54.885.075.39.12.87.045 1.26-.045.21-.165.3-.345.405l-.765.45c-.525.3-1.05.585-1.59.87-.645.345-.075 1.305.57.975.6-.315 1.2-.645 1.785-.99.525-.3 1.095-.585 1.335-1.17.225-.54.165-1.185.09-1.755-.075-.615-.27-1.2-.735-1.62-.885-.81-2.16-.87-3.24-.51-1.02.345-2.325.96-2.82 1.98-.645 1.335.3 2.64 1.17 3.585.495.57 1.29-.225.81-.765z"
        fill="#7F8498"
      />
    </svg>
  );
}

export default SvgComponent;
