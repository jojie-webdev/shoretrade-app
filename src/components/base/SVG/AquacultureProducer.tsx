import React from 'react';

import { SVGProps } from './SVG.props';

const AquacultureProducer = (props: SVGProps): JSX.Element => {
  const { width, height, fill } = props;

  // Paste converted svg below
  // https://react-svgr.com/playground/?typescript=true
  return (
    <svg
      width={width || '66'}
      height={height || '58'}
      viewBox="0 0 66 58"
      fill={fill || 'none'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M37.4586 12.8564C38.3456 12.0588 39.4255 11.5064 40.5914 11.2538C41.7573 11.0013 42.969 11.0573 44.1066 11.4164C45.544 11.9891 46.8444 12.8587 47.9226 13.9684C48.6426 14.6084 49.7066 13.5524 48.9786 12.9124C47.5226 11.6164 46.0746 10.3444 44.1786 9.84045C42.8299 9.49399 41.416 9.4896 40.0651 9.82766C38.7143 10.1657 37.4691 10.8356 36.4426 11.7764C35.7226 12.4164 36.7866 13.4804 37.4986 12.8324L37.4586 12.8564Z"
        fill="#565A6A"
      />
      <path
        d="M47.9226 10.4003C46.7706 11.5443 45.6906 12.7043 44.1146 13.2723C42.9815 13.6615 41.7641 13.7361 40.592 13.4881C39.4199 13.2402 38.337 12.679 37.4586 11.8643C36.7386 11.2243 35.6746 12.2803 36.4026 12.9203C37.4218 13.8778 38.6705 14.5566 40.0282 14.8915C41.3859 15.2264 42.807 15.206 44.1546 14.8323C46.1626 14.2323 47.5386 12.8963 48.9546 11.4563C49.0946 11.3163 49.1733 11.1264 49.1733 10.9283C49.1733 10.7303 49.0946 10.5404 48.9546 10.4003C48.8145 10.2603 48.6246 10.1816 48.4266 10.1816C48.2285 10.1816 48.0386 10.2603 47.8986 10.4003H47.9226Z"
        fill="#565A6A"
      />
      <path
        d="M41.9066 34.6163C42.8824 33.7337 44.0722 33.1217 45.3576 32.841C46.6431 32.5604 47.9797 32.6208 49.2346 33.0163C50.8161 33.6577 52.2445 34.6254 53.4266 35.8563C54.1466 36.4963 55.2186 35.4323 54.4906 34.7923C52.8906 33.3923 51.3386 32.0083 49.2346 31.4563C47.7717 31.0816 46.2386 31.077 44.7735 31.4429C43.3084 31.8089 41.9575 32.5338 40.8426 33.5523C40.1306 34.2003 41.1946 35.2563 41.9066 34.6163Z"
        fill="#565A6A"
      />
      <path
        d="M53.4266 32.0246C52.1626 33.2886 50.9786 34.5606 49.2426 35.2246C47.9894 35.6461 46.6453 35.7199 45.3535 35.4381C44.0617 35.1564 42.8705 34.5296 41.9066 33.6246C41.1866 32.9846 40.1226 34.0406 40.8426 34.6806C41.9487 35.7182 43.3027 36.4544 44.7749 36.8186C46.2472 37.1828 47.7883 37.1628 49.2506 36.7606C51.4346 36.0966 52.9226 34.6406 54.4906 33.0806C54.6124 32.9362 54.6754 32.7512 54.667 32.5625C54.6587 32.3737 54.5796 32.1951 54.4455 32.062C54.3114 31.9289 54.1321 31.8512 53.9433 31.8442C53.7545 31.8373 53.5701 31.9017 53.4266 32.0246Z"
        fill="#565A6A"
      />
      <path
        d="M27.9946 23.1044C26.9129 22.1102 25.5994 21.4026 24.1741 21.0463C22.7488 20.69 21.2569 20.6962 19.8346 21.0644C17.7946 21.6004 16.2746 22.9444 14.7386 24.3044C14.0106 24.9444 15.0746 26.0004 15.7946 25.3604C16.9378 24.1754 18.3168 23.2433 19.8426 22.6243C21.0518 22.2422 22.3398 22.183 23.579 22.4524C24.8181 22.7218 25.9653 23.3106 26.9066 24.1604C27.6266 24.8084 28.6906 23.7524 27.9706 23.1044H27.9946Z"
        fill="#565A6A"
      />
      <path
        d="M14.7386 22.6805C16.2506 24.1925 17.6987 25.6005 19.8186 26.2405C21.2393 26.6347 22.7374 26.6571 24.1692 26.3054C25.6009 25.9538 26.9182 25.24 27.9946 24.2325C28.7146 23.5925 27.6506 22.5365 26.9306 23.1685C25.998 24.0353 24.8478 24.6329 23.6025 24.8978C22.3571 25.1626 21.0633 25.0848 19.8586 24.6725C18.1866 24.0725 17.0427 22.8405 15.8187 21.6245C15.6786 21.4845 15.4887 21.4058 15.2907 21.4058C15.0926 21.4058 14.9027 21.4845 14.7626 21.6245C14.6226 21.7646 14.5439 21.9545 14.5439 22.1525C14.5439 22.3506 14.6226 22.5405 14.7626 22.6805H14.7386Z"
        fill="#565A6A"
      />
      <path
        d="M51.8666 1.96843L58.6186 1.92043L57.8666 1.16843C58.8887 10.0463 59.0655 19.0011 58.3946 27.9124C58.0986 31.6564 57.4666 35.6884 54.9386 38.6244C52.2026 41.8244 47.9866 43.0804 44.1066 44.2244C42.1361 44.7547 40.197 45.3957 38.2986 46.1444C37.5634 46.4407 36.8588 46.8077 36.1946 47.2404C35.8834 47.4465 35.5867 47.6737 35.3066 47.9204C34.8826 48.3044 34.7786 48.7204 34.2026 48.3524C30.8666 46.2884 27.0026 45.6164 23.2426 44.8244C19.8426 44.1044 16.2666 43.0964 13.5226 40.8644C10.4826 38.3924 9.30664 34.6804 8.92264 30.8964C8.58123 26.1579 8.48777 21.4047 8.64264 16.6564C8.64264 11.4991 8.76264 6.34176 9.00264 1.18443L8.25064 1.93643C20.4186 1.81643 32.5866 1.93643 44.7626 1.93643C44.9484 1.92162 45.122 1.83839 45.2498 1.70286C45.3777 1.56734 45.4507 1.38917 45.4547 1.20289C45.4587 1.01661 45.3934 0.835488 45.2714 0.694619C45.1495 0.55375 44.9796 0.463169 44.7946 0.440431C32.5946 0.424431 20.4266 0.296431 8.25864 0.416431C8.06292 0.42786 7.87822 0.510758 7.73959 0.649385C7.60097 0.788012 7.51807 0.972716 7.50664 1.16843C7.29864 6.08043 7.19464 10.9924 7.19464 15.9044C7.19464 20.5444 7.05064 25.2404 7.38664 29.8724C7.65064 33.5604 8.43464 37.3284 10.8426 40.2724C13.1226 43.0324 16.5226 44.5684 19.8906 45.5364C23.8906 46.6964 28.1226 47.0164 31.9706 48.7364C33.5706 49.4644 34.4346 50.9444 36.0186 49.3684C37.6026 47.7924 39.7946 47.1284 41.8506 46.4804C45.8906 45.1684 50.2346 44.2804 53.7546 41.7124C56.7186 39.452 58.7051 36.1431 59.3066 32.4644C60.2826 27.6644 60.2826 22.5604 60.2906 17.6724C60.2912 12.1583 59.9841 6.64837 59.3706 1.16843C59.371 0.964318 59.2933 0.767784 59.1535 0.619062C59.0137 0.470339 58.8224 0.380677 58.6186 0.368431C56.3626 0.368431 54.1146 0.368431 51.8666 0.408431C51.6672 0.408431 51.4759 0.487659 51.3349 0.628687C51.1939 0.769714 51.1146 0.960988 51.1146 1.16043C51.1146 1.35987 51.1939 1.55115 51.3349 1.69218C51.4759 1.8332 51.6672 1.91243 51.8666 1.91243V1.96843Z"
        fill="#565A6A"
      />
      <path
        d="M1.92262 6.60862C2.07462 6.52062 2.22662 6.44862 2.38662 6.36862H2.44262L2.69062 6.28862C2.83214 6.24019 2.97639 6.20012 3.12262 6.16862L3.37862 6.11262H3.50662H3.46662C3.77816 6.08863 4.09108 6.08863 4.40262 6.11262C4.40262 6.11262 4.70662 6.11262 4.52262 6.11262H4.71462C4.88467 6.14679 5.05288 6.18951 5.21862 6.24062C5.40954 6.29236 5.61316 6.2668 5.78536 6.16947C5.95756 6.07214 6.08448 5.91087 6.13862 5.72062C6.17952 5.52599 6.14645 5.32311 6.04588 5.15154C5.9453 4.97997 5.78442 4.85201 5.59462 4.79262C4.85733 4.5686 4.08174 4.49916 3.31638 4.58864C2.55102 4.67811 1.81236 4.92458 1.14662 5.31262C0.98629 5.4246 0.872528 5.59142 0.826834 5.78157C0.781139 5.97172 0.806677 6.17202 0.898621 6.34462C1.00796 6.50568 1.17228 6.62134 1.36078 6.66994C1.54928 6.71854 1.74904 6.69674 1.92262 6.60862Z"
        fill="#565A6A"
      />
      <path
        d="M9.69863 7.06446C11.0876 7.79974 12.6941 8.01262 14.2266 7.66446C15.6506 7.27246 17.1226 6.21646 18.6506 6.40046C19.4461 6.58506 20.2002 6.91603 20.8746 7.37646C21.5282 7.76092 22.2424 8.03145 22.9866 8.17646C24.7353 8.38558 26.5052 8.03551 28.0426 7.17646C28.8986 6.74446 28.1466 5.44846 27.2426 5.88046C26.5016 6.3204 25.6761 6.59909 24.8201 6.69834C23.964 6.7976 23.0967 6.71517 22.2746 6.45646C21.0586 5.96846 20.0506 5.00846 18.6506 4.89646C17.3635 4.91656 16.0985 5.23417 14.9546 5.82446C14.2984 6.12863 13.5949 6.31804 12.8746 6.38446C12.0392 6.35695 11.22 6.14668 10.4746 5.76846C9.59463 5.39246 8.79463 6.68846 9.69863 7.06446Z"
        fill="#565A6A"
      />
      <path
        d="M30.4826 6.35232C33.0186 5.47232 35.0346 7.28032 37.5066 7.29632C39.6506 7.29632 41.4266 5.87232 43.5066 5.69632C45.5866 5.52032 47.0346 7.58432 49.1066 7.48832C50.131 7.35069 51.115 6.99908 51.9946 6.45632C52.6851 6.10173 53.4487 5.91279 54.2249 5.90446C55.0011 5.89612 55.7686 6.06863 56.4666 6.40832C57.3306 6.82432 58.0666 5.53632 57.2186 5.11232C54.9226 3.99232 52.8906 4.37632 50.6826 5.44832C49.0826 6.19232 48.1866 5.88032 46.7706 5.08032C45.9189 4.53326 44.941 4.21375 43.9306 4.15232C41.6586 4.15232 39.7546 5.82432 37.5306 5.79232C36.2186 5.79232 35.0346 5.06432 33.7626 4.78432C32.5558 4.48596 31.2896 4.53029 30.1066 4.91232C29.2026 5.22432 29.5866 6.67232 30.5066 6.35232H30.4826Z"
        fill="#565A6A"
      />
      <path
        d="M60.8347 7.2483C61.4634 7.53792 62.1489 7.68321 62.841 7.67352C63.5331 7.66383 64.2143 7.49941 64.8347 7.1923C64.9198 7.13977 64.9937 7.071 65.0522 6.9899C65.1107 6.90881 65.1527 6.81698 65.1757 6.71967C65.1987 6.62235 65.2024 6.52145 65.1864 6.42273C65.1704 6.32401 65.1352 6.2294 65.0827 6.1443C65.0301 6.05921 64.9613 5.98529 64.8803 5.92677C64.7992 5.86826 64.7073 5.82628 64.61 5.80325C64.5127 5.78023 64.4118 5.77659 64.3131 5.79256C64.2144 5.80852 64.1198 5.84377 64.0347 5.8963L63.9387 5.9683C64.0427 5.9203 64.0347 5.9683 63.9387 5.9683H63.8107C63.6929 6.01032 63.5727 6.04505 63.4507 6.0723L63.2347 6.1203H63.1307H63.2267C63.0917 6.14441 62.9536 6.14441 62.8187 6.1203C62.6935 6.12845 62.5679 6.12845 62.4427 6.1203H62.3947C62.3336 6.12792 62.2718 6.12792 62.2107 6.1203C62.0863 6.09856 61.9634 6.06917 61.8427 6.0323L61.6667 5.9683C61.6667 5.9683 61.3947 5.8563 61.5947 5.9683C61.4173 5.86828 61.2084 5.83967 61.0107 5.8883C60.8245 5.94468 60.6652 6.06698 60.5627 6.2323C60.473 6.40764 60.4512 6.60987 60.5014 6.80029C60.5516 6.9907 60.6703 7.15591 60.8347 7.2643V7.2483Z"
        fill="#565A6A"
      />
      <path
        d="M33.9146 51.4964C33.9792 52.5005 33.9146 53.5087 33.7226 54.4964C33.5668 55.2826 33.1664 55.9995 32.5786 56.5444C32.4568 56.6888 32.3938 56.8738 32.4022 57.0625C32.4106 57.2512 32.4896 57.4299 32.6237 57.563C32.7578 57.6961 32.9371 57.7738 33.1259 57.7807C33.3147 57.7877 33.4992 57.7233 33.6426 57.6004C35.3546 56.0564 35.4506 53.6004 35.4106 51.4964C35.3915 51.3114 35.3044 51.14 35.1663 51.0154C35.0281 50.8908 34.8487 50.8219 34.6626 50.8219C34.4766 50.8219 34.2972 50.8908 34.159 51.0154C34.0209 51.14 33.9338 51.3114 33.9146 51.4964Z"
        fill="#565A6A"
      />
      <path
        d="M16.9946 4.07259C16.7399 9.25648 16.7533 14.4501 17.0346 19.6326C17.0906 20.5926 18.5866 20.6006 18.5386 19.6326C18.2506 14.4503 18.2346 9.25653 18.4906 4.07259C18.5386 3.10459 17.0426 3.11259 16.9946 4.07259Z"
        fill="#565A6A"
      />
      <path
        d="M51.9306 26.2326C52.4331 21.2866 52.6441 16.3153 52.5626 11.3446C52.5626 11.1451 52.4834 10.9538 52.3423 10.8128C52.2013 10.6718 52.01 10.5926 51.8106 10.5926C51.6112 10.5926 51.4199 10.6718 51.2789 10.8128C51.1378 10.9538 51.0586 11.1451 51.0586 11.3446C51.1468 16.3152 50.9384 21.2867 50.4346 26.2326C50.3386 27.1926 51.8346 27.1846 51.9306 26.2326Z"
        fill="#565A6A"
      />
      <path
        d="M11.8106 18.2805H19.5466C19.746 18.2805 19.9373 18.2013 20.0783 18.0603C20.2194 17.9193 20.2986 17.728 20.2986 17.5285C20.2986 17.3291 20.2194 17.1378 20.0783 16.9968C19.9373 16.8558 19.746 16.7765 19.5466 16.7765H11.8106C11.6112 16.7765 11.4199 16.8558 11.2788 16.9968C11.1378 17.1378 11.0586 17.3291 11.0586 17.5285C11.0586 17.728 11.1378 17.9193 11.2788 18.0603C11.4199 18.2013 11.6112 18.2805 11.8106 18.2805Z"
        fill="#565A6A"
      />
      <path
        d="M23.6827 18.2805H31.0107C31.2101 18.2805 31.4014 18.2013 31.5424 18.0603C31.6834 17.9193 31.7627 17.728 31.7627 17.5285C31.7627 17.3291 31.6834 17.1378 31.5424 16.9968C31.4014 16.8558 31.2101 16.7765 31.0107 16.7765H23.6827C23.4832 16.7765 23.2919 16.8558 23.1509 16.9968C23.0099 17.1378 22.9307 17.3291 22.9307 17.5285C22.9307 17.728 23.0099 17.9193 23.1509 18.0603C23.2919 18.2013 23.4832 18.2805 23.6827 18.2805Z"
        fill="#565A6A"
      />
      <path
        d="M36.7946 18.2805H45.5946C45.794 18.2805 45.9853 18.2013 46.1263 18.0603C46.2673 17.9193 46.3466 17.728 46.3466 17.5285C46.3466 17.3291 46.2673 17.1378 46.1263 16.9968C45.9853 16.8558 45.794 16.7765 45.5946 16.7765H36.7946C36.5951 16.7765 36.4039 16.8558 36.2628 16.9968C36.1218 17.1378 36.0426 17.3291 36.0426 17.5285C36.0426 17.728 36.1218 17.9193 36.2628 18.0603C36.4039 18.2013 36.5951 18.2805 36.7946 18.2805Z"
        fill="#565A6A"
      />
      <path
        d="M48.8747 18.3364H56.2027C56.4021 18.3364 56.5934 18.2572 56.7344 18.1161C56.8754 17.9751 56.9546 17.7838 56.9546 17.5844C56.9546 17.385 56.8754 17.1937 56.7344 17.0527C56.5934 16.9116 56.4021 16.8324 56.2027 16.8324H48.8747C48.6752 16.8324 48.4839 16.9116 48.3429 17.0527C48.2019 17.1937 48.1227 17.385 48.1227 17.5844C48.1227 17.7838 48.2019 17.9751 48.3429 18.1161C48.4839 18.2572 48.6752 18.3364 48.8747 18.3364Z"
        fill="#565A6A"
      />
      <path
        d="M11.6906 29.7683H15.5626C15.6673 29.7792 15.7731 29.7679 15.8732 29.7353C15.9733 29.7026 16.0655 29.6493 16.1437 29.5788C16.2218 29.5083 16.2844 29.4221 16.3271 29.3259C16.3699 29.2297 16.392 29.1256 16.392 29.0203C16.392 28.915 16.3699 28.8109 16.3271 28.7147C16.2844 28.6185 16.2218 28.5324 16.1437 28.4619C16.0655 28.3914 15.9733 28.3381 15.8732 28.3054C15.7731 28.2728 15.6673 28.2615 15.5626 28.2723H11.6906C11.4933 28.2723 11.304 28.3507 11.1645 28.4902C11.025 28.6298 10.9466 28.819 10.9466 29.0163C10.9578 29.2108 11.0396 29.3944 11.1765 29.5329C11.3135 29.6713 11.4963 29.755 11.6906 29.7683Z"
        fill="#565A6A"
      />
      <path
        d="M21.3546 29.7526H29.5946C29.7797 29.7335 29.951 29.6464 30.0756 29.5082C30.2002 29.3701 30.2692 29.1906 30.2692 29.0046C30.2692 28.8186 30.2002 28.6392 30.0756 28.501C29.951 28.3629 29.7797 28.2758 29.5946 28.2566H21.3546C21.1696 28.2758 20.9982 28.3629 20.8736 28.501C20.749 28.6392 20.6801 28.8186 20.6801 29.0046C20.6801 29.1906 20.749 29.3701 20.8736 29.5082C20.9982 29.6464 21.1696 29.7335 21.3546 29.7526Z"
        fill="#565A6A"
      />
      <path
        d="M36.7067 29.7682H45.5947C45.7797 29.7491 45.9511 29.662 46.0757 29.5239C46.2003 29.3857 46.2692 29.2063 46.2692 29.0202C46.2692 28.8342 46.2003 28.6548 46.0757 28.5166C45.9511 28.3785 45.7797 28.2914 45.5947 28.2722H36.7067C36.5216 28.2914 36.3503 28.3785 36.2257 28.5166C36.1011 28.6548 36.0321 28.8342 36.0321 29.0202C36.0321 29.2063 36.1011 29.3857 36.2257 29.5239C36.3503 29.662 36.5216 29.7491 36.7067 29.7682Z"
        fill="#565A6A"
      />
      <path
        d="M51.8266 29.8245H56.0906C56.285 29.8133 56.4687 29.7315 56.6071 29.5945C56.7456 29.4576 56.8293 29.2748 56.8426 29.0805C56.8312 28.8848 56.7483 28.7001 56.6097 28.5614C56.471 28.4228 56.2863 28.3399 56.0906 28.3285H51.8266C51.6286 28.3306 51.4393 28.4108 51.3 28.5516C51.1607 28.6924 51.0826 28.8824 51.0826 29.0805C51.0957 29.2735 51.1783 29.4552 51.3151 29.592C51.4519 29.7288 51.6336 29.8114 51.8266 29.8245Z"
        fill="#565A6A"
      />
      <path
        d="M17.7866 40.0003H28.2986C28.4837 39.9811 28.6551 39.894 28.7796 39.7559C28.9042 39.6177 28.9732 39.4383 28.9732 39.2523C28.9732 39.0662 28.9042 38.8868 28.7796 38.7487C28.6551 38.6105 28.4837 38.5234 28.2986 38.5043H17.7866C17.6016 38.5234 17.4302 38.6105 17.3056 38.7487C17.1811 38.8868 17.1121 39.0662 17.1121 39.2523C17.1121 39.4383 17.1811 39.6177 17.3056 39.7559C17.4302 39.894 17.6016 39.9811 17.7866 40.0003Z"
        fill="#565A6A"
      />
      <path
        d="M38.8987 40.0003H49.5227C49.7077 39.9811 49.8791 39.894 50.0037 39.7559C50.1282 39.6177 50.1972 39.4383 50.1972 39.2523C50.1972 39.0662 50.1282 38.8868 50.0037 38.7487C49.8791 38.6105 49.7077 38.5234 49.5227 38.5043H38.8987C38.7136 38.5234 38.5422 38.6105 38.4177 38.7487C38.2931 38.8868 38.2241 39.0662 38.2241 39.2523C38.2241 39.4383 38.2931 39.6177 38.4177 39.7559C38.5422 39.894 38.7136 39.9811 38.8987 40.0003Z"
        fill="#565A6A"
      />
      <path
        d="M17.2666 27.7284C17.1786 31.2324 17.3466 35.3124 20.5786 37.4644C21.3786 38.0004 22.1386 36.6644 21.3386 36.1684C18.6186 34.3604 18.6986 30.5684 18.7626 27.7284C18.7434 27.5434 18.6564 27.372 18.5182 27.2474C18.3801 27.1228 18.2006 27.0539 18.0146 27.0539C17.8286 27.0539 17.6491 27.1228 17.511 27.2474C17.3728 27.372 17.2858 27.5434 17.2666 27.7284Z"
        fill="#565A6A"
      />
      <path
        d="M26.5546 42.0163C28.1546 42.9123 29.6906 43.8723 31.1626 44.8963C31.3347 44.9953 31.5388 45.0222 31.7306 44.9713C31.9225 44.9203 32.0864 44.7956 32.1866 44.6243C32.284 44.4474 32.3109 44.2403 32.2619 44.0445C32.2129 43.8486 32.0917 43.6785 31.9226 43.5683C30.4266 42.5443 28.8826 41.5843 27.3146 40.6883C27.2294 40.6329 27.1338 40.5953 27.0336 40.5779C26.9335 40.5605 26.8308 40.5635 26.7318 40.5869C26.6329 40.6103 26.5397 40.6535 26.4579 40.7139C26.3762 40.7743 26.3075 40.8507 26.256 40.9384C26.2046 41.0261 26.1715 41.1233 26.1587 41.2242C26.1459 41.325 26.1537 41.4274 26.1816 41.5252C26.2095 41.623 26.257 41.7141 26.3211 41.793C26.3852 41.8719 26.4646 41.937 26.5546 41.9843V42.0163Z"
        fill="#565A6A"
      />
      <path
        d="M30.2827 35.6403H36.7947C36.9941 35.6403 37.1854 35.5611 37.3264 35.4201C37.4674 35.279 37.5467 35.0878 37.5467 34.8883C37.5467 34.6889 37.4674 34.4976 37.3264 34.3566C37.1854 34.2155 36.9941 34.1363 36.7947 34.1363H30.2827C30.0832 34.1363 29.8919 34.2155 29.7509 34.3566C29.6099 34.4976 29.5307 34.6889 29.5307 34.8883C29.5307 35.0878 29.6099 35.279 29.7509 35.4201C29.8919 35.5611 30.0832 35.6403 30.2827 35.6403Z"
        fill="#565A6A"
      />
      <path
        d="M35.6826 46.1286C36.2838 45.3634 36.9957 44.6921 37.7946 44.1366C38.6635 43.535 39.5634 42.9796 40.4906 42.4726C40.5763 42.4232 40.6513 42.3575 40.7115 42.2791C40.7717 42.2007 40.8159 42.1112 40.8416 42.0158C40.8672 41.9203 40.8738 41.8207 40.8609 41.7227C40.8481 41.6247 40.816 41.5302 40.7666 41.4446C40.7173 41.359 40.6515 41.2839 40.5731 41.2237C40.4947 41.1635 40.4053 41.1193 40.3098 41.0937C40.2144 41.0681 40.1148 41.0615 40.0168 41.0743C39.9188 41.0872 39.8243 41.1192 39.7386 41.1686C37.7466 42.3046 35.7387 43.4966 34.3867 45.3686C34.2985 45.5422 34.2767 45.7419 34.3253 45.9304C34.3739 46.1189 34.4896 46.2833 34.6506 46.3926C34.826 46.4822 35.0282 46.504 35.2186 46.4538C35.409 46.4037 35.5743 46.285 35.6826 46.1206V46.1286Z"
        fill="#565A6A"
      />
      <path
        d="M32.7946 1.16827V13.4643C32.8138 13.6493 32.9009 13.8207 33.039 13.9453C33.1772 14.0699 33.3566 14.1388 33.5426 14.1388C33.7287 14.1388 33.9081 14.0699 34.0462 13.9453C34.1844 13.8207 34.2715 13.6493 34.2906 13.4643V1.16827C34.2715 0.983224 34.1844 0.811852 34.0462 0.687266C33.9081 0.562681 33.7287 0.493726 33.5426 0.493726C33.3566 0.493726 33.1772 0.562681 33.039 0.687266C32.9009 0.811852 32.8138 0.983224 32.7946 1.16827Z"
        fill="#565A6A"
      />
      <path
        d="M32.9706 17.7766V21.5286C32.9706 21.728 33.0498 21.9193 33.1909 22.0603C33.3319 22.2014 33.5232 22.2806 33.7226 22.2806C33.922 22.2806 34.1133 22.2014 34.2543 22.0603C34.3954 21.9193 34.4746 21.728 34.4746 21.5286V17.7766C34.4632 17.5809 34.3803 17.3962 34.2416 17.2575C34.103 17.1189 33.9183 17.036 33.7226 17.0246C33.5269 17.036 33.3422 17.1189 33.2036 17.2575C33.0649 17.3962 32.982 17.5809 32.9706 17.7766Z"
        fill="#565A6A"
      />
      <path
        d="M32.9706 25.8485V32.2485C32.9706 32.4479 33.0498 32.6392 33.1909 32.7802C33.3319 32.9212 33.5232 33.0005 33.7226 33.0005C33.922 33.0005 34.1133 32.9212 34.2543 32.7802C34.3954 32.6392 34.4746 32.4479 34.4746 32.2485V25.8485C34.4746 25.649 34.3954 25.4577 34.2543 25.3167C34.1133 25.1757 33.922 25.0965 33.7226 25.0965C33.5232 25.0965 33.3319 25.1757 33.1909 25.3167C33.0498 25.4577 32.9706 25.649 32.9706 25.8485Z"
        fill="#565A6A"
      />
      <path
        d="M32.9706 38.1606V41.8246C32.9706 42.024 33.0498 42.2153 33.1909 42.3563C33.3319 42.4973 33.5232 42.5766 33.7226 42.5766C33.922 42.5766 34.1133 42.4973 34.2543 42.3563C34.3954 42.2153 34.4746 42.024 34.4746 41.8246V38.1606C34.4746 37.9611 34.3954 37.7699 34.2543 37.6288C34.1133 37.4878 33.922 37.4086 33.7226 37.4086C33.5232 37.4086 33.3319 37.4878 33.1909 37.6288C33.0498 37.7699 32.9706 37.9611 32.9706 38.1606Z"
        fill="#565A6A"
      />
      <path
        d="M45.3226 23.5684L55.1946 23.6564C55.394 23.6564 55.5853 23.5772 55.7263 23.4361C55.8674 23.2951 55.9466 23.1038 55.9466 22.9044C55.9466 22.705 55.8674 22.5137 55.7263 22.3727C55.5853 22.2316 55.394 22.1524 55.1946 22.1524L45.3386 22.0324C45.1536 22.0516 44.9822 22.1386 44.8576 22.2768C44.733 22.4149 44.6641 22.5944 44.6641 22.7804C44.6641 22.9664 44.733 23.1459 44.8576 23.284C44.9822 23.4222 45.1536 23.5092 45.3386 23.5284L45.3226 23.5684Z"
        fill="#565A6A"
      />
    </svg>
  );
};

export default AquacultureProducer;
