import * as React from 'react';

import { SVGProps } from './SVG.props';

function SvgComponent(props: SVGProps) {
  const { sizeMultiplier = 1 } = props;

  return (
    <svg
      width={props.width || 48 * sizeMultiplier}
      height={props.height || 28 * sizeMultiplier}
      viewBox="0 0 48 28"
      fill="none"
    >
      <path
        d="M2.058 16.123c.945-3.105 3.57-5.55 6.42-6.944 2.715-1.335 5.895-1.485 8.85-1.155 2.4.27 4.8.885 7.065 1.77 2.175.854 4.155 2.114 6.27 3.074 3.135 1.425 6.405 2.115 9.855 1.95.72-.03.72-1.154 0-1.124-3.375.164-6.57-.526-9.615-1.95-2.16-1.005-4.2-2.265-6.435-3.12-5.07-1.92-11.355-2.88-16.425-.48-3.18 1.515-6.03 4.26-7.065 7.68-.225.705.87 1.004 1.08.3z"
        fill="#7F8498"
      />
      <path
        d="M10.263 11.234a5.946 5.946 0 01-.015 8.91c-.54.48.255 1.275.795.795 1.485-1.32 2.385-3.255 2.385-5.25s-.9-3.93-2.37-5.25c-.54-.48-1.335.315-.795.795z"
        fill="#7F8498"
      />
      <path
        d="M2.433 18.974c3.495 4.064 8.91 5.97 14.175 5.97 5.505 0 10.23-2.386 15.165-4.53 2.805-1.216 5.685-2.07 8.76-2.026.72.015.72-1.11 0-1.125-5.04-.09-9.315 2.265-13.815 4.2-5.025 2.16-10.455 3.12-15.795 1.546-2.97-.87-5.655-2.476-7.695-4.83-.465-.555-1.26.24-.795.795z"
        fill="#7F8498"
      />
      <path
        d="M1.233 16.468c1.5.66 3.045 1.186 4.59 1.726.285.105.615-.12.69-.39.09-.316-.105-.585-.39-.69-.81-.286-1.635-.57-2.445-.87-.33-.12-.675-.255-1.005-.376-.345-.135-.555-.225-.87-.36-.285-.12-.6-.074-.765.196-.15.24-.09.645.195.764zM37.983 14.383c2.355-1.994 5.415-3.044 8.49-3 .72.016.72-1.11 0-1.124a14.011 14.011 0 00-9.285 3.33c-.555.48.24 1.26.795.794zM37.263 18.389a17.7 17.7 0 007.395 3.945c.704.18 1.005-.9.3-1.08a16.532 16.532 0 01-6.9-3.66c-.54-.48-1.336.314-.795.794z"
        fill="#7F8498"
      />
      <path
        d="M45.993 10.664c-.885 1.485-1.845 2.925-2.745 4.395-.375.615.6 1.185.975.57.9-1.47 1.86-2.91 2.745-4.396.375-.615-.6-1.184-.975-.57zM42.828 17.459c.525 1.485.975 3 1.515 4.485.105.285.375.48.69.39.27-.075.495-.405.39-.69-.555-1.485-.99-3-1.515-4.485-.105-.285-.39-.48-.69-.39-.285.075-.495.405-.39.69zM7.008 15.118c-.825 0-1.485-.69-1.485-1.53 0-.84.66-1.53 1.485-1.53.825 0 1.485.69 1.485 1.53 0 .84-.675 1.53-1.485 1.53zm0-2.16c-.33 0-.585.285-.585.63 0 .346.27.63.585.63.315 0 .585-.284.585-.63 0-.345-.27-.63-.585-.63zM17.928 15.643c.99-.165 1.98-.33 2.955-.48.99-.165 1.92-.315 2.85-.405.06 0 .135 0 .195-.014.135-.03-.045-.015-.09-.046-.06-.03-.24-.3-.15-.15.03.046.015-.134-.015-.03v.165c-.015.15.03-.12 0 .046-.015.045-.015.105-.03.15l-.09.315c-.075.254-.165.48-.27.704a6.813 6.813 0 01-.795 1.335c-.06.075-.12.15-.195.21a.857.857 0 01-.12.105c-.12.106.075-.074-.045.03-.015.015-.15.076-.015.015a.438.438 0 01-.135.03c-.15.03.12 0-.045 0h-.165a4.198 4.198 0 01-.795-.135c-.285-.075-.555-.165-.84-.255a8.606 8.606 0 01-.66-.255c-.03-.015-.165-.075-.015 0-.03-.015-.075-.03-.105-.045-.03-.014-.045-.014-.075-.03-.27-.12-.6-.075-.765.196-.135.24-.075.645.195.764.885.405 1.83.75 2.79.87.57.06 1.065-.044 1.5-.434.435-.405.78-.945 1.05-1.47a6.635 6.635 0 00.66-1.696c.105-.464.18-1.124-.3-1.424-.33-.195-.765-.09-1.11-.06-.6.075-1.185.165-1.785.255-1.305.194-2.595.42-3.9.63-.3.044-.465.42-.39.69.105.33.405.464.705.42zM13.713 7.334c.51-1.125 1.305-2.13 2.115-3.045.81-.915 1.695-1.86 2.79-2.4.27-.135.345-.525.195-.765-.165-.285-.495-.33-.765-.195-1.17.57-2.16 1.605-3.015 2.58-.87.99-1.755 2.07-2.295 3.285-.12.27-.075.6.195.765.255.12.66.06.78-.225z"
        fill="#7F8498"
      />
      <path
        d="M17.808 1.558c.51 1.635 1.44 2.895 2.94 3.765 1.2.69 2.55.93 3.795 1.515.99.465 1.74 1.155 2.265 2.1.36.63 1.32.06.975-.57-.525-.945-1.245-1.725-2.19-2.25-1.17-.675-2.52-.885-3.735-1.47-.825-.405-1.635-.93-2.175-1.68-.39-.54-.6-1.08-.795-1.695-.21-.705-1.305-.42-1.08.285zM17.133 24.779c.735.99 1.875 1.605 3.03 1.98 1.245.404 2.655.54 3.915.165.69-.21.39-1.29-.3-1.08-1.05.314-2.19.194-3.24-.136-.885-.27-1.905-.764-2.445-1.484-.18-.24-.495-.36-.765-.195-.24.12-.375.494-.195.75z"
        fill="#7F8498"
      />
      <path
        d="M24.318 25.979l-.015-.015c.03.045.06.075.09.12-.36-.465-.63-1.006-.885-1.546a.557.557 0 00-.33-.255.626.626 0 00-.435.06.557.557 0 00-.255.33.637.637 0 00.06.436c.27.6.585 1.154.99 1.68.075.104.27.164.405.164s.3-.06.405-.165a.58.58 0 00.165-.404c0-.046-.015-.105-.015-.15-.06-.106-.105-.196-.18-.256zM2.988 19.108c.915-.27 1.83-.54 2.73-.81.135-.044.27-.074.405-.12.285-.09.495-.405.39-.69-.09-.285-.39-.48-.69-.39-.915.27-1.83.54-2.73.81-.135.045-.27.075-.405.12-.285.09-.495.405-.39.69.09.285.375.48.69.39z"
        fill="#7F8498"
      />
    </svg>
  );
}

export default SvgComponent;
