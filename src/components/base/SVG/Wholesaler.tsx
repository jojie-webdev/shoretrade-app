import React from 'react';

import { useTheme } from 'utils/Theme';

import { SVGProps } from './SVG.props';

const Wholesaler = (props: SVGProps): JSX.Element => {
  const theme = useTheme();
  const { width, height, fill } = props;

  // Paste converted svg below
  // https://react-svgr.com/playground/?typescript=true
  return (
    <svg
      width={width || '66'}
      height={height || '62'}
      viewBox="0 0 66 62"
      fill={fill || 'none'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M44.393 16.9621C42.369 11.5221 40.121 6.14611 38.025 0.722112C37.9689 0.530989 37.8435 0.367672 37.6733 0.264104C37.5032 0.160536 37.3005 0.124168 37.105 0.162112C28.481 3.05811 20.025 6.40211 11.505 9.57811C11.3075 9.64254 11.1429 9.78123 11.0458 9.96487C10.9488 10.1485 10.927 10.3627 10.985 10.5621C12.881 16.2021 15.129 21.7621 17.553 27.1541C17.6358 27.2977 17.7642 27.4096 17.9178 27.4719C18.0715 27.5342 18.2415 27.5435 18.401 27.4981C26.881 24.2981 35.385 21.1461 43.865 17.8981C44.761 17.5621 44.369 16.1141 43.465 16.4501C34.993 19.6501 26.481 22.8021 18.009 26.0501L18.849 26.3941C16.449 21.0741 14.289 15.6741 12.449 10.1541L11.929 11.0821C20.441 7.88211 28.897 4.55411 37.529 1.66611L36.577 1.12211C38.649 6.56211 40.921 11.9141 42.945 17.3781C43.273 18.2741 44.729 17.8821 44.393 16.9621Z"
        fill="#565A6A"
      />
      <path
        d="M59.1291 36.6502C56.8171 30.3222 54.6491 23.9462 52.3131 17.6182C52.2505 17.4314 52.1213 17.2742 51.95 17.1767C51.7788 17.0793 51.5776 17.0485 51.3851 17.0902C40.4731 20.9622 29.4571 24.6742 19.0091 29.6982C18.8592 29.7792 18.7417 29.9092 18.6762 30.0665C18.6107 30.2238 18.6011 30.3987 18.6491 30.5622C20.9531 36.8502 23.3957 43.0902 25.9771 49.2822C26.041 49.4659 26.1697 49.62 26.339 49.7157C26.5083 49.8114 26.7067 49.8422 26.8971 49.8022C37.6171 45.9702 48.3211 42.0502 58.7691 37.5142C59.6491 37.1302 58.8891 35.8342 57.9691 36.2182C47.6411 40.6982 37.0571 44.5622 26.4571 48.3542L27.3851 48.8822C24.8091 42.6955 22.3664 36.4555 20.0571 30.1622L19.7051 31.0102C30.0411 26.0422 40.9451 22.3862 51.7051 18.5542L50.7851 18.0342C53.0971 24.3622 55.2891 30.7382 57.6011 37.0662C58.0091 37.9462 59.4491 37.5622 59.1291 36.6502Z"
        fill="#565A6A"
      />
      <path
        d="M45.4811 32.8501C42.5131 31.5781 39.1291 30.8741 35.9691 31.8581C34.6399 32.2392 33.4191 32.9282 32.4058 33.8691C31.3926 34.8101 30.6153 35.9767 30.1371 37.2741C30.0851 37.464 30.1095 37.6667 30.2053 37.8387C30.301 38.0107 30.4604 38.1383 30.6491 38.1941C32.1202 38.7432 33.6941 38.9619 35.2591 38.8347C36.8241 38.7075 38.342 38.2375 39.7051 37.4581C42.1695 35.9196 43.9263 33.4698 44.5931 30.6421C44.8171 29.7061 43.3691 29.3061 43.1531 30.2501C42.5855 32.6967 41.0765 34.8208 38.9531 36.1621C37.7625 36.8382 36.4369 37.2419 35.0716 37.3442C33.7063 37.4466 32.3352 37.2451 31.0571 36.7541L31.5771 37.6741C31.9999 36.5936 32.6727 35.6285 33.5405 34.8582C34.4082 34.0878 35.4461 33.534 36.5691 33.2421C39.2731 32.4421 42.1691 33.0581 44.7291 34.1461C45.6011 34.5221 46.3291 33.2261 45.4811 32.8501Z"
        fill="#565A6A"
      />
      <path
        d="M36.097 11.4583C33.145 10.1543 29.761 9.42627 26.593 10.3783C25.261 10.7495 24.0346 11.4277 23.012 12.3585C21.9895 13.2894 21.1994 14.4469 20.705 15.7383C20.6655 15.9296 20.6974 16.1289 20.7946 16.2984C20.8919 16.4679 21.0478 16.5959 21.233 16.6583C22.6972 17.2233 24.268 17.4582 25.8334 17.3462C27.3988 17.2342 28.9202 16.778 30.289 16.0103C32.7688 14.4988 34.5514 12.0693 35.249 9.25027C35.2914 9.06184 35.2596 8.86434 35.1603 8.6987C35.061 8.53305 34.9017 8.41197 34.7156 8.36055C34.5294 8.30912 34.3306 8.33129 34.1603 8.42247C33.9901 8.51364 33.8614 8.66682 33.801 8.85027C33.2088 11.2909 31.6762 13.3986 29.537 14.7143C28.3383 15.3762 27.008 15.7647 25.6415 15.8518C24.275 15.939 22.9061 15.7226 21.633 15.2183L22.153 16.1623C22.5877 15.0874 23.2711 14.131 24.1473 13.3717C25.0235 12.6123 26.0673 12.0717 27.193 11.7943C29.905 11.0423 32.793 11.6663 35.345 12.7783C36.217 13.1703 36.985 11.8743 36.097 11.4823V11.4583Z"
        fill="#565A6A"
      />
      <path
        d="M26.969 56.8899C26.9681 57.6006 26.7487 58.2937 26.3405 58.8754C25.9322 59.4571 25.355 59.8992 24.687 60.1417C24.0191 60.3841 23.2927 60.4153 22.6064 60.231C21.9201 60.0466 21.3071 59.6557 20.8505 59.1111C20.3939 58.5666 20.1159 57.8947 20.0541 57.1868C19.9923 56.4789 20.1497 55.7691 20.505 55.1536C20.8603 54.5382 21.3963 54.0469 22.0403 53.7465C22.6843 53.446 23.4051 53.3508 24.105 53.4739C24.9046 53.6225 25.6277 54.0445 26.1502 54.6678C26.6728 55.291 26.9622 56.0766 26.969 56.8899C26.9882 57.075 27.0752 57.2463 27.2134 57.3709C27.3515 57.4955 27.531 57.5645 27.717 57.5645C27.903 57.5645 28.0825 57.4955 28.2206 57.3709C28.3588 57.2463 28.4458 57.075 28.465 56.8899C28.4567 55.8756 28.141 54.8877 27.5598 54.0565C26.9785 53.2253 26.1588 52.5898 25.209 52.2339C24.2459 51.8778 23.1961 51.8293 22.2043 52.0951C21.2125 52.361 20.3277 52.9281 19.6719 53.7182C19.0161 54.5083 18.6217 55.4824 18.5431 56.5062C18.4645 57.53 18.7055 58.553 19.233 59.4339C19.7903 60.366 20.6376 61.0899 21.6454 61.4946C22.6531 61.8994 23.7657 61.9628 24.813 61.6751C25.8602 61.3875 26.7843 60.7646 27.4438 59.9018C28.1034 59.039 28.4621 57.9839 28.465 56.8979C28.4468 56.7128 28.3607 56.5409 28.2232 56.4156C28.0857 56.2902 27.9066 56.2203 27.7206 56.2193C27.5345 56.2183 27.3547 56.2863 27.2159 56.4102C27.0771 56.534 26.9891 56.705 26.969 56.8899Z"
        fill="#565A6A"
      />
      <path
        d="M23.9371 56.322C24.0071 56.3826 24.0714 56.4496 24.1291 56.522L24.0091 56.37C24.0835 56.4701 24.1478 56.5773 24.2011 56.69L24.1211 56.506C24.1741 56.6345 24.2117 56.7687 24.2331 56.906V56.706C24.2491 56.8335 24.2491 56.9625 24.2331 57.09V56.89C24.2182 57.02 24.1831 57.1469 24.1291 57.266L24.2091 57.09C24.1604 57.201 24.0986 57.3057 24.0251 57.402L24.1371 57.25C24.0595 57.3502 23.9709 57.4415 23.8731 57.522L24.0251 57.402C23.9288 57.4756 23.824 57.5374 23.7131 57.586L23.8891 57.514C23.7608 57.5659 23.6264 57.6008 23.4891 57.618H23.6891C23.5616 57.634 23.4326 57.634 23.3051 57.618H23.5051C23.3759 57.5994 23.2495 57.5645 23.1291 57.514L23.3131 57.586C23.1997 57.5373 23.0923 57.4755 22.9931 57.402L23.1451 57.522C23.0493 57.4422 22.9609 57.3539 22.8811 57.258L22.9931 57.41C22.9241 57.308 22.8626 57.201 22.8091 57.09L22.8891 57.274C22.836 57.1456 22.7984 57.0113 22.7771 56.874V57.074C22.7611 56.9465 22.7611 56.8175 22.7771 56.69V56.89C22.7995 56.7616 22.8343 56.6357 22.8811 56.514L22.8091 56.69C22.8578 56.5791 22.9195 56.4743 22.9931 56.378L22.8811 56.53C22.9543 56.4261 23.0434 56.3343 23.1451 56.258L22.9931 56.378C23.0894 56.3045 23.1941 56.2427 23.3051 56.194L23.1291 56.266C23.2574 56.2142 23.3918 56.1793 23.5291 56.162H23.3291C23.4566 56.1461 23.5856 56.1461 23.7131 56.162H23.5131C23.6421 56.1817 23.7683 56.2166 23.8891 56.266L23.6971 56.162C23.8096 56.2125 23.9169 56.2741 24.0171 56.346L23.8651 56.226L23.9371 56.29C24.0806 56.4245 24.2685 56.5014 24.4651 56.506C24.6644 56.5033 24.8556 56.4263 25.0011 56.29C25.1315 56.1435 25.2036 55.9542 25.2036 55.758C25.2036 55.5619 25.1315 55.3725 25.0011 55.226C24.8385 55.0799 24.6552 54.9585 24.4571 54.866C24.205 54.7482 23.9343 54.6751 23.6571 54.65C23.2262 54.6192 22.7955 54.7137 22.4171 54.922C22.0276 55.1312 21.7119 55.4552 21.5131 55.85C21.3 56.2895 21.2301 56.7847 21.3131 57.266C21.3932 57.6955 21.5984 58.0917 21.903 58.4048C22.2077 58.718 22.598 58.9341 23.0251 59.026C23.5066 59.114 24.0035 59.0525 24.4491 58.85C24.8449 58.6619 25.1742 58.3577 25.3931 57.978C25.6453 57.5405 25.7422 57.0306 25.6681 56.531C25.594 56.0315 25.3534 55.5716 24.9851 55.226C24.8396 55.0898 24.6484 55.0127 24.4491 55.01C24.3014 55.0115 24.1575 55.0564 24.0352 55.1391C23.9129 55.2218 23.8176 55.3387 23.7613 55.4752C23.705 55.6117 23.6902 55.7618 23.7186 55.9067C23.747 56.0516 23.8174 56.1849 23.9211 56.29L23.9371 56.322Z"
        fill="#565A6A"
      />
      <path
        d="M63.6411 42.0339L34.6491 53.0739C33.7451 53.4259 31.3451 54.8179 30.4571 53.9939C28.7931 52.4419 32.6011 51.4979 33.4491 51.1779L62.1611 40.2339C62.3291 40.1699 62.5051 40.0819 62.6731 40.0339C64.1531 39.6899 64.9131 41.3939 63.4731 42.1059C62.6091 42.5299 63.3611 43.8259 64.2731 43.4019C64.7353 43.1853 65.1241 42.8382 65.3915 42.4034C65.6589 41.9685 65.7933 41.4649 65.778 40.9546C65.7626 40.4444 65.5984 39.9497 65.3054 39.5317C65.0124 39.1136 64.6035 38.7904 64.1291 38.6019C63.3526 38.3682 62.516 38.4427 61.7931 38.8099L35.3131 48.9059C33.7131 49.5219 32.0571 50.0899 30.4571 50.7539C30.1212 50.8638 29.8113 51.0409 29.5462 51.2745C29.2811 51.5082 29.0664 51.7934 28.9152 52.1127C28.7641 52.4321 28.6796 52.7789 28.6669 53.1321C28.6543 53.4852 28.7137 53.8372 28.8417 54.1665C28.9696 54.4959 29.1633 54.7957 29.411 55.0477C29.6587 55.2997 29.9552 55.4986 30.2823 55.6322C30.6094 55.7658 30.9603 55.8313 31.3136 55.8247C31.6669 55.8181 32.0151 55.7396 32.3371 55.5939C37.5611 53.7459 42.7371 51.6419 47.8731 49.6739L64.0891 43.4819C64.9371 43.1379 64.5451 41.6899 63.6411 42.0339Z"
        fill="#565A6A"
      />
      <path
        d="M23.1531 49.618L9.95305 16.394L8.24905 12.162C7.99536 11.354 7.64339 10.5802 7.20105 9.85801C4.96905 6.80201 -0.198948 8.71401 0.249052 12.578C0.441052 14.09 1.72905 15.778 3.39305 15.69C3.72357 15.7067 4.05342 15.6461 4.35639 15.5129C4.65936 15.3798 4.92711 15.1778 5.13836 14.9231C5.34961 14.6684 5.49853 14.3679 5.5733 14.0455C5.64806 13.7231 5.64661 13.3877 5.56905 13.066C5.34505 12.13 3.89705 12.53 4.12105 13.466C4.34505 14.402 3.21705 14.266 2.75305 13.994C2.34882 13.7314 2.04163 13.3437 1.8784 12.8901C1.71517 12.4365 1.70486 11.942 1.84905 11.482C1.99508 11.0392 2.26692 10.6486 2.63135 10.3578C2.99578 10.067 3.43702 9.88863 3.90116 9.8445C4.3653 9.80038 4.83224 9.8924 5.24494 10.1093C5.65763 10.3263 5.99821 10.6587 6.22505 11.066C6.44377 11.5147 6.63349 11.977 6.79305 12.45L10.1131 20.818L19.4491 44.25L21.7371 50.018C22.0891 50.906 23.5371 50.514 23.1851 49.618H23.1531Z"
        fill="#565A6A"
      />
    </svg>
  );
};

export default Wholesaler;