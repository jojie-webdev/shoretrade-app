import * as React from 'react';

import { SVGProps } from './SVG.props';

function SvgComponent(props: SVGProps) {
  const { sizeMultiplier = 1, fill } = props;

  return (
    <svg
      width={props.width || 52 * sizeMultiplier}
      height={props.height || 26 * sizeMultiplier}
      viewBox="0 0 52 26"
      fill="none"
    >
      <path
        d="M41.38.807c-2.534.33-2.414 2.88-2.46 4.845-.014 1.365-.494 2.535-1.304 3.6-.735.975-1.2 1.77-1.29 3-.12 1.44-.735 2.34-1.515 3.51-.615.93-1.17 2.01-1.035 3.15.12 1.065.9 1.68 1.395 2.565.585 1.065.87 2.115 1.995 2.745.915.525 1.86.51 2.88.405.705-.075 1.335-.12 2.04.03.57.12 1.11.315 1.695.39.9.12 1.59-.105 2.295-.645 1.02-.795 2.385-.825 3.315-1.77.6-.615.99-1.44 1.05-2.295.045-.6-.15-1.2-.12-1.8.045-.72.6-1.215.87-1.845 1.005-2.4-1.05-4.725-1.335-7.035-.15-1.245-.42-2.16-1.365-3.045-.915-.855-1.65-1.62-2.31-2.67-1.155-1.83-2.535-3.63-4.935-3.12-.705.15-.405 1.23.3 1.08 2.01-.42 3.03 1.62 3.945 3.045.405.615.84 1.215 1.365 1.725.795.75 1.605 1.26 1.8 2.415.18.975.24 1.875.615 2.805.39.99.93 1.965 1.035 3.045.105 1.095-.495 1.68-.9 2.595-.435.975.045 1.92-.12 2.925-.165 1.05-.945 1.755-1.905 2.1-.39.135-.795.24-1.155.42-.465.225-.81.63-1.26.855-.84.405-1.875-.105-2.715-.285-.99-.21-1.875-.015-2.865.03-1.08.06-1.995-.315-2.565-1.26-.27-.45-.405-.96-.66-1.41-.24-.435-.585-.795-.855-1.215-1.32-1.98 1.185-3.87 1.845-5.625.39-1.02.135-2.22.675-3.18.51-.915 1.275-1.62 1.695-2.61.42-.96.57-1.965.555-3-.015-1.095-.225-3.165 1.335-3.36.675-.075.69-1.2-.03-1.11z"
        fill={fill || '#7F8498'}
      />
      <path
        d="M36.686 18.447c.435.135.525.84.705 1.2.21.435.54.75.99.93 1.11.435 2.115-.285 3.21-.195 1.08.09 2.04.795 3.15.435.525-.165.825-.57 1.26-.885.48-.36 1.05-.465 1.65-.42.72.06.72-1.065 0-1.125-1.035-.09-1.965.3-2.73.99-.48.435-.915.495-1.545.33-.555-.15-1.065-.36-1.635-.42-.525-.06-1.035.06-1.545.18-.45.105-1.08.3-1.515.03-.39-.255-.45-.84-.66-1.245-.225-.42-.57-.735-1.035-.87-.69-.24-.99.855-.3 1.065zM37.99 14.682c.39 1.275 1.68 1.545 2.835 1.696.66.09 1.185.33 1.816.524.555.165 1.095.105 1.575-.21.434-.285.72-.704 1.124-1.02.45-.33 1.05-.255 1.59-.36 1.14-.21 1.906-1.304 1.56-2.444-.21-.69-1.29-.39-1.08.3.316 1.035-.9 1.05-1.574 1.14-.916.135-1.365.704-2.026 1.274-.3.27-.555.33-.945.21-.48-.165-.9-.374-1.395-.45-.734-.12-2.114-.06-2.384-.96-.225-.69-1.305-.39-1.096.3zM39.46 11.262c.316.045.496.27.706.465.27.255.555.48.915.615.78.285 1.575.03 2.19-.48.615-.495 1.065-1.02 1.875-1.14.84-.135 1.74-.15 2.22-1.005.345-.63-.615-1.2-.975-.57-.15.27-.435.33-.72.375-.39.06-.795.075-1.185.18-.705.21-1.23.645-1.77 1.14-.42.39-.96.69-1.5.315-.51-.345-.81-.885-1.47-.99-.3-.045-.6.075-.69.39-.06.285.105.66.405.705zM40.42 5.727c-.12.66.15 1.335.736 1.695.27.165.6.225.915.21.27-.015.645-.12.87-.03.255.09.57.27.885.315.345.045.69-.015.99-.18.645-.345.915-1.11.75-1.8-.075-.3-.405-.465-.69-.39-.3.075-.465.39-.39.69.045.165 0-.045.015.06v.15c.015-.09-.03.075-.03.075 0 .03-.03.075-.015.03 0 0-.09.135-.045.075l-.075.075a.893.893 0 01-.09.06c-.015.015-.03.015-.06.03.03-.015.03-.015 0 0-.03 0-.135.03-.06.015-.045.015-.105 0-.15 0s-.045 0 0 0c-.015 0-.045-.015-.06-.015-.03-.015-.105-.03-.12-.045-.21-.09-.45-.225-.705-.27a2.615 2.615 0 00-.765 0c-.195.03-.405.045-.57 0 .105.03-.15-.105-.075-.045-.045-.03-.075-.075-.12-.12.045.06 0-.015-.015-.045-.015-.015-.06-.12-.03-.03a1.032 1.032 0 00-.045-.12c-.015-.06-.015.06 0-.03 0-.03.015-.18 0-.06.06-.3-.09-.6-.39-.69-.24-.09-.6.09-.66.39zM28.886 21.462c.015-.045.03-.105.045-.15.03-.09-.06.12-.015.045.015-.03.03-.045.03-.075l.09-.135c-.075.12-.06.075-.015.03.015-.015.03-.045.06-.06l.12-.12.06-.06c.09-.075-.105.075-.015.015a2.22 2.22 0 01.315-.195c.03-.015.06-.03.075-.045.045-.015.135-.045-.015 0 .06-.015.12-.045.165-.06.12-.045.225-.075.345-.09.045-.015.135 0-.03 0 .03 0 .06 0 .09-.015h.15c.06 0 .105 0 .165.015.06 0-.165-.03-.045 0 .03 0 .06.015.09.015.285.075.63-.09.69-.39.06-.285-.09-.615-.39-.69-.63-.15-1.305 0-1.86.285-.54.27-1.05.765-1.185 1.38-.06.285.09.615.39.69.285.075.63-.075.69-.39z"
        fill={fill || '#7F8498'}
      />
      <path
        d="M32.066 24.327c2.07-1.005 1.335-3.375.735-5.04-.51-1.44-.48-2.775 0-4.215.39-1.185.48-2.055.18-3.285-.39-1.545.15-2.73.435-4.23.195-.96.24-2.04-.255-2.925-.51-.93-1.545-1.305-2.28-2.025-.87-.855-1.56-1.65-2.85-1.8-1.065-.135-1.905.255-2.835.69-1.215.57-2.4.405-3.645.735-.915.225-1.35.765-1.875 1.5-.63.9-1.725 1.305-2.28 2.28-.48.81-.63 1.83-.405 2.745.15.585.525 1.08.705 1.665.195.66-.12 1.23-.195 1.875-.3 2.565 2.19 3.975 3.3 5.94.585 1.035.915 2.04 1.995 2.655.57.33 1.215.495 1.8.795.6.3 1.125.705 1.65 1.125 1.695 1.35 3.645 2.805 5.82 1.515.615-.375.06-1.35-.57-.975-1.86 1.11-3.54-.645-4.935-1.725-.645-.495-1.29-.9-2.04-1.2-1.05-.435-1.785-.795-2.295-1.86-.405-.825-.825-1.545-1.425-2.25-.72-.855-1.605-1.635-2.01-2.7-.375-1.005.15-1.755.12-2.745-.015-1.02-.81-1.785-.885-2.775-.075-1.05.48-1.845 1.275-2.46.33-.255.66-.48.945-.78.3-.33.48-.765.78-1.08.63-.66 1.74-.54 2.565-.63.9-.09 1.635-.42 2.46-.795 1.155-.54 2.28-.645 3.285.27.345.315.63.69.975 1.02.39.36.84.6 1.26.915 1.905 1.425.105 4.11.075 5.97-.015 1.17.63 2.22.345 3.405-.255 1.11-.72 2.1-.72 3.27s.39 2.19.78 3.285c.345.99.615 2.34-.555 2.895-.66.285-.09 1.245.57.945z"
        fill={fill || '#7F8498'}
      />
      <path
        d="M26.441 15.897c-.585.36-1.515.3-2.115-.015-.855-.45-1.41-1.395-1.815-2.235a8.872 8.872 0 01-.855-3.09c-.06-.72-.18-2.04.525-2.52.345-.24.84-.21 1.215-.435.345-.21.615-.525.855-.84.465-.63.87-1.455 1.785-1.41.975.045 1.395.945 1.635 1.77.12.405.21.825.345 1.23.165.525.435 1.005.615 1.53.225.615.21 1.26.165 1.905-.045.63-.075 1.275-.255 1.89-.285.975-1.005 1.815-1.965 2.175-.675.255-.375 1.335.3 1.08 2.535-.96 3.18-3.63 3.06-6.105-.03-.66-.21-1.26-.48-1.875a14.23 14.23 0 01-.645-1.905c-.3-1.065-.75-2.16-1.83-2.625a2.538 2.538 0 00-2.865.63c-.33.375-.57.81-.885 1.185-.15.18-.315.345-.525.45-.33.15-.705.15-1.035.33-.945.54-1.185 1.755-1.185 2.745 0 1.335.285 2.685.81 3.915.51 1.2 1.275 2.535 2.46 3.165.945.495 2.325.585 3.255.015.615-.36.06-1.335-.57-.96z"
        fill={fill || '#7F8498'}
      />
      <path
        d="M23.201 9.747c.42-.33.945-.615 1.485-.555.195.015.42.09.6.225.21.165.315.39.435.63.135.3.3.57.525.795.195.21.42.375.63.585.33.345.495.855.405 1.32-.06.3.075.6.39.69.27.075.645-.09.69-.39.135-.765-.015-1.545-.48-2.16-.24-.315-.54-.54-.81-.81-.255-.255-.36-.6-.525-.9-.39-.675-1.11-1.065-1.875-1.11-.84-.045-1.605.39-2.25.885-.24.18-.195.6 0 .795.225.24.54.18.78 0zM6.851.912c-1.995 1.32-1.665 3.735-2.76 5.595-.555.945-1.38 1.695-1.785 2.745-.465 1.215-.42 2.535-.705 3.78-.255 1.125-.795 2.175-.99 3.315a5.306 5.306 0 00.51 3.315c.27.525.645.99.9 1.53.195.435.285.9.42 1.35.24.81.66 1.59 1.515 1.89.495.165 1.005.12 1.53.15.585.03 1.095.165 1.65.375 1.14.42 2.25.975 3.495.825.885-.105 1.575-.615 2.16-1.26.345-.375.645-.81 1.02-1.17.45-.435.99-.675 1.53-.96 2.025-1.05 2.445-2.895 1.905-5.01-.345-1.335-.69-2.49-.75-3.87-.045-1.245-.42-2.28-1.05-3.345-.3-.51-.615-1.035-.99-1.5-.39-.465-.915-.645-1.32-1.065-.84-.84-.48-2.565-.675-3.63-.315-1.725-1.995-4.29-4.065-3.69-.69.195-.405 1.29.3 1.08.87-.255 1.725.75 2.13 1.41.585.945.615 2.01.66 3.09.03.66.075 1.335.39 1.935.39.75 1.17.96 1.695 1.575.63.735 1.23 1.77 1.56 2.685.375 1.08.165 2.22.39 3.33.36 1.8 1.845 4.47-.225 5.775-.69.435-1.47.69-2.085 1.23-.66.585-1.095 1.425-1.83 1.935-1.68 1.155-3.855-.705-5.61-.855-.465-.03-.99.06-1.425-.12-.495-.21-.645-.63-.795-1.11-.255-.81-.465-1.53-.9-2.25-.585-.945-1.035-1.86-.96-3 .075-1.065.54-2.025.855-3.03.33-1.095.36-2.205.585-3.315.24-1.23.9-2.04 1.62-3.03.615-.84.93-1.74 1.185-2.745.285-1.095.525-2.295 1.53-2.97.555-.42 0-1.395-.615-.99z"
        fill={fill || '#7F8498'}
      />
      <path
        d="M3.58 18.687c.99-.12 1.576 1.185 2.356 1.605.915.48 1.785.135 2.655-.27.45-.21.87-.405 1.38-.39.555.015 1.11.18 1.68.15a2.728 2.728 0 002.34-1.53c.315-.645-.645-1.215-.975-.57-.495 1.005-1.38 1.02-2.37.885-.99-.135-1.74.06-2.625.48-.345.165-.72.375-1.11.36-.435-.015-.75-.33-1.05-.615-.615-.63-1.305-1.35-2.28-1.23-.705.09-.72 1.215 0 1.125zM4.856 14.607c.57-.57 1.455-.27 2.13-.09.81.21 1.575.315 2.4.135.84-.18 1.455-.675 2.175-1.11.72-.42 1.53-.495 2.325-.24.69.226.99-.87.3-1.08a3.943 3.943 0 00-2.625.075c-.87.345-1.53 1.08-2.475 1.275-1.695.36-3.57-1.23-5.04.256-.495.495.3 1.29.81.78zM4.841 9.402c.195.615.75.93 1.365.96.63.045 1.14-.33 1.755-.405.57-.075 1.11.315 1.665.39.75.12 1.395-.21 1.995-.615.6-.405.03-1.38-.57-.975-.39.27-.81.585-1.32.48-.51-.105-.975-.36-1.5-.405-.57-.045-1.05.195-1.575.345-.195.06-.66.135-.735-.075-.21-.69-1.305-.405-1.08.3zM6.941 5.517c.495.315 1.095.48 1.68.45a2.928 2.928 0 001.725-.66c.225-.18.21-.6 0-.795-.24-.225-.555-.195-.795 0 .03-.03.075-.06.015-.015-.015.015-.045.03-.06.045-.045.03-.105.06-.15.09s-.09.045-.135.075c.135-.045-.06.03 0 0-.03.015-.045.015-.075.03-.105.03-.21.06-.33.09-.03 0-.045.015-.075.015-.075.015.105-.015.03 0-.06 0-.12.015-.18.015-.105 0-.21 0-.315-.015-.105-.015.075.015.015 0-.03 0-.045-.015-.075-.015-.045-.015-.105-.015-.15-.03-.06-.015-.12-.03-.165-.045-.03-.015-.045-.015-.075-.03-.075-.03.015-.015.03.015-.015-.03-.135-.06-.165-.075-.045-.03-.105-.06-.15-.09-.24-.165-.63-.06-.765.195-.195.255-.105.57.165.75z"
        fill={fill || '#7F8498'}
      />
    </svg>
  );
}

export default SvgComponent;
