import React from 'react';

import { useTheme } from 'utils/Theme';

import { SVGProps } from './SVG.props';

const Retailer = (props: SVGProps): JSX.Element => {
  const theme = useTheme();
  const { width, height, fill } = props;

  // Paste converted svg below
  // https://react-svgr.com/playground/?typescript=true
  return (
    <svg
      width={width || '54'}
      height={height || '58'}
      viewBox="0 0 54 58"
      fill={fill || 'none'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.1755 13.2959C11.9115 10.0959 15.4555 8.35986 18.9035 7.69586C19.8555 7.51986 19.4555 6.09586 18.5035 6.24786C14.6955 6.95986 10.7835 8.99986 8.90354 12.5279C8.43954 13.3759 9.70354 14.1279 10.1915 13.2799L10.1755 13.2959Z"
        fill="#565A6A"
      />
      <path
        d="M9.15159 13.568C10.5278 14.3421 11.946 15.0392 13.3996 15.656L13.0716 14.408C12.3596 15.208 11.6636 16.008 10.9196 16.808C10.8392 16.8893 10.7784 16.9878 10.7419 17.0961C10.7053 17.2045 10.6939 17.3197 10.7086 17.4331C10.7232 17.5464 10.7635 17.655 10.8264 17.7505C10.8893 17.8459 10.9732 17.9258 11.0716 17.984C13.3526 19.1805 15.8878 19.8115 18.4636 19.824C18.663 19.824 18.8543 19.7447 18.9953 19.6037C19.1364 19.4627 19.2156 19.2714 19.2156 19.072C19.2156 18.8725 19.1364 18.6813 18.9953 18.5402C18.8543 18.3992 18.663 18.32 18.4636 18.32C16.1536 18.33 13.8755 17.7811 11.8236 16.72L11.9756 17.904C12.7276 17.104 13.4156 16.304 14.1276 15.504C14.2267 15.4119 14.2991 15.2948 14.3372 15.165C14.3753 15.0352 14.3777 14.8975 14.3441 14.7665C14.3105 14.6354 14.2422 14.5159 14.1464 14.4204C14.0506 14.3249 13.9308 14.2571 13.7996 14.224C12.4693 13.6469 11.1714 12.9979 9.91159 12.28C9.05559 11.832 8.31159 13.08 9.15159 13.576V13.568Z"
        fill="#565A6A"
      />
      <path
        d="M17.9837 7.19221C18.8021 11.0446 18.7172 15.0341 17.7357 18.8482C17.5117 19.7842 18.9517 20.1842 19.1837 19.2482C20.2289 15.1713 20.3138 10.9075 19.4317 6.79221C19.2157 5.84821 17.7677 6.24821 17.9837 7.19221Z"
        fill="#565A6A"
      />
      <path
        d="M33.7196 9.0642C36.351 9.9577 38.8283 11.253 41.0635 12.9042C41.2366 13.0025 41.4415 13.0282 41.6334 12.9757C41.8253 12.9233 41.9886 12.7969 42.0876 12.6242C42.1749 12.4497 42.1955 12.2493 42.1454 12.0607C42.0953 11.8721 41.978 11.7083 41.8155 11.6002C39.472 9.87765 36.876 8.52833 34.1195 7.6002C33.1996 7.2882 32.8075 8.7362 33.7196 9.0482V9.0642Z"
        fill="#565A6A"
      />
      <path
        d="M34.2397 19.0722C36.8438 18.2404 39.3287 17.0732 41.6317 15.6002C42.4317 15.0802 41.6957 13.7842 40.8797 14.3042C38.6866 15.713 36.3203 16.8316 33.8397 17.6322C32.9277 17.9202 33.3197 19.3682 34.2397 19.0722Z"
        fill="#565A6A"
      />
      <path
        d="M33.2317 8.53616C34.2237 11.5682 33.9677 14.8802 33.3757 17.9602C33.1917 18.9042 34.6397 19.3042 34.8237 18.3602C35.4637 15.0162 35.7517 11.4242 34.6717 8.14415C34.3757 7.22415 32.9277 7.61616 33.2317 8.53616Z"
        fill="#565A6A"
      />
      <path
        d="M39.6316 15.8239C40.105 16.9916 40.9377 17.9784 42.0092 18.6414C43.0807 19.3044 44.3353 19.6093 45.5916 19.5119C45.7859 19.4986 45.9687 19.4149 46.1056 19.2764C46.2426 19.138 46.3244 18.9543 46.3356 18.7599C46.3356 18.5618 46.2575 18.3718 46.1182 18.231C45.9789 18.0902 45.7896 18.01 45.5916 18.0079C45.3415 18.0315 45.0897 18.0315 44.8396 18.0079H44.6156C44.4796 18.0079 44.6156 18.0079 44.5516 18.0079L44.1836 17.9359C43.9417 17.8797 43.7039 17.8076 43.4716 17.7199C43.4236 17.7199 43.4236 17.7199 43.4716 17.7199H43.3996L43.1996 17.6239L42.8716 17.4239L42.5596 17.2239L42.4076 17.1119L42.3516 17.0639C42.1607 16.9009 41.9791 16.7273 41.8076 16.5439C41.7196 16.4559 41.6396 16.3599 41.5596 16.2639C41.6396 16.3599 41.5036 16.1679 41.5036 16.1679C41.4644 16.1205 41.4296 16.0696 41.3996 16.0159L41.2316 15.7199L41.1516 15.5599C41.1516 15.5599 41.0556 15.3439 41.1036 15.4639C41.0412 15.2787 40.9132 15.1228 40.7437 15.0255C40.5742 14.9282 40.375 14.8963 40.1836 14.9359C40.0004 14.9931 39.8438 15.1142 39.7425 15.2772C39.6411 15.4402 39.6018 15.6343 39.6316 15.8239Z"
        fill="#565A6A"
      />
      <path
        d="M46.3836 18.5121C45.8236 17.1841 45.3116 15.8321 44.8556 14.4721C44.7932 14.2869 44.6652 14.131 44.4957 14.0337C44.3262 13.9364 44.127 13.9045 43.9356 13.9441C43.7487 14.0066 43.5916 14.1359 43.4941 14.3071C43.3967 14.4784 43.3659 14.6795 43.4076 14.8721C43.8716 16.2321 44.3756 17.5841 44.9356 18.9121C44.9996 19.0974 45.1296 19.2528 45.3006 19.3487C45.4717 19.4445 45.6721 19.4742 45.8636 19.4321C46.0473 19.3682 46.2014 19.2395 46.2971 19.0702C46.3928 18.9008 46.4236 18.7024 46.3836 18.5121Z"
        fill="#565A6A"
      />
      <path
        d="M40.8317 11.2478C41.0326 10.744 41.3017 10.2703 41.6317 9.83984C41.9895 9.39489 42.3916 8.98746 42.8317 8.62384C43.6963 7.88264 44.743 7.38554 45.8637 7.18384C46.054 7.1297 46.2152 7.00278 46.3126 6.83058C46.4099 6.65838 46.4355 6.45476 46.3837 6.26384C46.3198 6.08014 46.1911 5.92602 46.0218 5.83031C45.8525 5.7346 45.6541 5.70386 45.4637 5.74384C44.1009 6.00732 42.8316 6.62543 41.7837 7.53584C40.7073 8.4104 39.8796 9.55257 39.3837 10.8478C39.3414 11.0363 39.3732 11.2338 39.4725 11.3994C39.5718 11.5651 39.731 11.6861 39.9172 11.7376C40.1034 11.789 40.3022 11.7668 40.4724 11.6756C40.6427 11.5845 40.7713 11.4313 40.8317 11.2478Z"
        fill="#565A6A"
      />
      <path
        d="M44.9357 6.26395C44.4157 8.08794 43.9837 9.92795 43.5117 11.7599C43.4721 11.9513 43.504 12.1505 43.6013 12.32C43.6985 12.4895 43.8545 12.6175 44.0397 12.6799C44.2306 12.7317 44.4342 12.7061 44.6064 12.6088C44.7786 12.5115 44.9055 12.3502 44.9597 12.1599C45.4237 10.3279 45.8637 8.47994 46.3837 6.66395C46.426 6.47551 46.3942 6.27801 46.2949 6.11237C46.1956 5.94672 46.0364 5.82565 45.8502 5.77422C45.664 5.72279 45.4652 5.74496 45.295 5.83614C45.1247 5.92731 44.9961 6.08049 44.9357 6.26395Z"
        fill="#565A6A"
      />
      <path
        d="M21.6477 7.54416C24.6747 7.27757 27.7246 7.46633 30.6957 8.10417C31.6317 8.30417 32.0397 6.86417 31.0877 6.66417C27.9899 5.98532 24.8079 5.77498 21.6477 6.04017C21.452 6.05159 21.2673 6.13449 21.1287 6.27312C20.99 6.41175 20.9071 6.59645 20.8957 6.79217C20.9071 6.98788 20.99 7.17258 21.1287 7.31121C21.2673 7.44984 21.452 7.53274 21.6477 7.54416Z"
        fill="#565A6A"
      />
      <path
        d="M21.3036 19.9039C24.6343 20.4132 28.0306 20.2993 31.3196 19.5679C32.2636 19.3519 31.8636 17.9119 30.9276 18.1199C27.8998 18.7975 24.7735 18.9141 21.7036 18.4639C21.5133 18.4239 21.3149 18.4547 21.1455 18.5504C20.9762 18.6461 20.8475 18.8002 20.7836 18.9839C20.7319 19.1748 20.7574 19.3784 20.8548 19.5506C20.9521 19.7228 21.1134 19.8498 21.3036 19.9039Z"
        fill="#565A6A"
      />
      <path
        d="M20.7596 7.02402C21.7915 10.9331 21.7915 15.043 20.7596 18.952C20.5277 19.888 21.9756 20.288 22.2076 19.352C23.3116 15.1812 23.3116 10.7949 22.2076 6.62402C22.1546 6.43306 22.0279 6.271 21.8553 6.17348C21.6828 6.07596 21.4786 6.05098 21.2876 6.10402C21.0967 6.15706 20.9346 6.28379 20.8371 6.45633C20.7396 6.62886 20.7146 6.83307 20.7677 7.02402H20.7596Z"
        fill="#565A6A"
      />
      <path
        d="M30.4316 7.82408C30.6223 8.32491 30.7564 8.84547 30.8316 9.37608C30.9891 10.2723 31.0827 11.1786 31.1116 12.0881C31.231 14.2999 30.985 16.5163 30.3836 18.6481C30.3413 18.8365 30.373 19.034 30.4724 19.1997C30.5717 19.3653 30.7309 19.4864 30.9171 19.5378C31.1032 19.5892 31.302 19.5671 31.4723 19.4759C31.6426 19.3847 31.7712 19.2315 31.8316 19.0481C32.4966 16.7339 32.7671 14.3241 32.6316 11.9201C32.5596 10.3601 32.4796 8.50408 31.7436 7.12008C31.2796 6.22408 29.9836 7.02408 30.4316 7.82408Z"
        fill="#565A6A"
      />
      <path
        d="M24.7757 12.8559C25.6237 12.6559 26.4637 12.4639 27.3117 12.2879C27.7757 12.1839 28.2317 12.0879 28.6957 12.0079L28.9597 11.9599H29.2317C29.1917 11.9599 29.0077 11.9199 28.9357 11.8799C28.8695 11.8323 28.8103 11.7757 28.7597 11.7119C28.6717 11.6159 28.7037 11.6399 28.7597 11.6719C28.8157 11.7039 28.6717 11.4559 28.7117 11.5679C28.7517 11.6799 28.7117 11.6799 28.7117 11.4719C28.7117 11.4719 28.7117 11.5359 28.7117 11.5679C28.7156 11.6371 28.7156 11.7066 28.7117 11.7759C28.7117 11.7759 28.7117 11.8559 28.7117 11.8879C28.7117 11.7839 28.7117 11.7199 28.7117 11.8079C28.7117 11.8959 28.7117 11.8639 28.7117 11.8879C28.6326 12.3233 28.5175 12.7514 28.3677 13.1679L28.2477 13.4879C28.2228 13.5425 28.2015 13.5986 28.1837 13.6559C28.2397 13.5359 28.1357 13.7759 28.1837 13.6559C28.1277 13.7759 27.9997 14.0479 27.8957 14.2399L27.7517 14.4719C27.7205 14.5058 27.6937 14.5434 27.6717 14.5839C27.7757 14.4639 27.6717 14.5039 27.6717 14.5839L27.5997 14.6639C27.5197 14.7519 27.5997 14.6639 27.6557 14.6239C27.5597 14.6879 27.8317 14.5519 27.7197 14.6239C27.8317 14.6239 27.6077 14.6959 27.7197 14.6239H27.5597C27.7357 14.6639 27.4477 14.6239 27.5597 14.6239C27.4458 14.602 27.3336 14.5726 27.2237 14.5359C27.106 14.5016 26.9911 14.4588 26.8797 14.4079C26.7837 14.4079 27.0077 14.4719 26.9197 14.4079L26.8317 14.3359L26.6717 14.2639C26.4077 14.1359 26.1437 13.9919 25.8717 13.8399C25.7006 13.7402 25.4971 13.712 25.3054 13.7615C25.1137 13.8109 24.9492 13.9339 24.8477 14.1039C24.7603 14.2783 24.7397 14.4787 24.7898 14.6673C24.8399 14.8559 24.9572 15.0197 25.1197 15.1279C25.8361 15.6221 26.6578 15.9426 27.5197 16.0639C28.7197 16.1679 29.2397 14.8959 29.6157 13.9759C29.7983 13.5015 29.9376 13.0114 30.0317 12.5119C30.1609 12.0705 30.1909 11.6061 30.1197 11.1519C30.0624 10.9178 29.9178 10.7146 29.7155 10.5837C29.5133 10.4528 29.2686 10.4042 29.0317 10.4479C28.5597 10.5039 28.0877 10.5919 27.6237 10.6879C26.5277 10.9039 25.4397 11.1519 24.3517 11.4079C24.1614 11.462 24.0001 11.5889 23.9028 11.7611C23.8055 11.9333 23.7799 12.1369 23.8317 12.3279C23.8941 12.513 24.0221 12.669 24.1916 12.7663C24.3611 12.8635 24.5603 12.8954 24.7517 12.8559H24.7757Z"
        fill="#565A6A"
      />
      <path
        d="M24.2236 6.74393C24.9354 5.17321 26.1291 3.87017 27.6316 3.02393C28.1354 2.73509 28.6727 2.50939 29.2316 2.35193C29.4066 2.27761 29.5494 2.1434 29.6345 1.97335C29.7195 1.80329 29.7412 1.60852 29.6956 1.42393C29.6379 1.23429 29.5119 1.07283 29.3419 0.970844C29.1719 0.868857 28.9701 0.833608 28.7756 0.871929C27.4962 1.26733 26.3143 1.92753 25.3068 2.80964C24.2993 3.69175 23.4887 4.776 22.9276 5.99193C22.8677 6.07723 22.8262 6.17404 22.8057 6.27624C22.7852 6.37844 22.7862 6.48378 22.8085 6.58558C22.8309 6.68738 22.8742 6.78342 22.9357 6.8676C22.9972 6.95178 23.0754 7.02226 23.1656 7.07458C23.2558 7.12689 23.3558 7.15989 23.4594 7.17148C23.563 7.18307 23.6678 7.173 23.7673 7.14191C23.8668 7.11082 23.9588 7.05938 24.0373 6.99087C24.1159 6.92236 24.1793 6.83827 24.2236 6.74393Z"
        fill="#565A6A"
      />
      <path
        d="M28.3837 1.60795L27.9677 4.80795C27.9663 4.90596 27.9847 5.00326 28.0218 5.09399C28.0589 5.18471 28.114 5.26701 28.1837 5.33595C28.3302 5.4664 28.5195 5.53847 28.7157 5.53847C28.9118 5.53847 29.1011 5.4664 29.2477 5.33595C29.3774 5.18948 29.4535 5.00333 29.4637 4.80795L29.8797 1.60795C29.8811 1.50993 29.8626 1.41264 29.8255 1.32191C29.7884 1.23118 29.7334 1.14888 29.6637 1.07995C29.5944 1.00907 29.5116 0.952756 29.4202 0.914308C29.3289 0.87586 29.2308 0.856055 29.1317 0.856055C29.0325 0.856055 28.9344 0.87586 28.8431 0.914308C28.7517 0.952756 28.6689 1.00907 28.5997 1.07995C28.4688 1.22572 28.3925 1.41228 28.3837 1.60795Z"
        fill="#565A6A"
      />
      <path
        d="M23.6796 19.824C23.9898 20.7861 24.5094 21.6676 25.2011 22.4049C25.8927 23.1422 26.7392 23.717 27.6796 24.088C27.7747 24.1148 27.8741 24.1226 27.9722 24.111C28.0703 24.0994 28.1652 24.0685 28.2514 24.0202C28.3375 23.972 28.4134 23.9072 28.4745 23.8296C28.5356 23.752 28.5809 23.6631 28.6076 23.568C28.6472 23.3766 28.6153 23.1774 28.518 23.0079C28.4208 22.8384 28.2648 22.7104 28.0796 22.648C28.2316 22.712 27.9036 22.576 28.0796 22.648L27.9276 22.584L27.6316 22.392C27.4423 22.2935 27.2605 22.1812 27.0876 22.056L26.9756 21.976L26.9036 21.928H26.9516L26.7116 21.736C26.5518 21.5948 26.3996 21.4453 26.2556 21.288C26.1847 21.2144 26.118 21.1369 26.0556 21.056C26.0556 21.056 25.9436 20.944 25.9516 20.928C26.0316 21.04 25.9596 20.912 25.9516 20.928C25.8716 20.816 25.7116 20.576 25.5996 20.392C25.4876 20.208 25.4076 20.04 25.3196 19.856V19.776C25.3196 19.728 25.3196 19.776 25.3196 19.832L25.2636 19.672C25.2236 19.568 25.1836 19.464 25.1516 19.36C25.0892 19.1748 24.9612 19.0189 24.7917 18.9216C24.6222 18.8243 24.423 18.7924 24.2316 18.832C24.1301 18.8605 24.0351 18.9089 23.9523 18.9743C23.8695 19.0398 23.8005 19.1209 23.7492 19.2131C23.6979 19.3053 23.6653 19.4068 23.6534 19.5116C23.6414 19.6164 23.6504 19.7226 23.6796 19.824Z"
        fill="#565A6A"
      />
      <path
        d="M28.9517 23.3281L28.8957 21.4641C28.891 21.2676 28.8141 21.0796 28.6797 20.9361C28.5761 20.8285 28.4425 20.7545 28.2963 20.7238C28.1501 20.6932 27.998 20.7073 27.8599 20.7642C27.7218 20.8212 27.604 20.9184 27.5219 21.0433C27.4399 21.1681 27.3973 21.3147 27.3997 21.4641L27.4557 23.3281C27.4604 23.5247 27.5373 23.7126 27.6717 23.8561C27.816 23.9953 28.0073 24.0753 28.2077 24.0801C28.402 24.0668 28.5848 23.9831 28.7217 23.8446C28.8587 23.7062 28.9405 23.5226 28.9517 23.3281Z"
        fill="#565A6A"
      />
      <path
        d="M48.2636 41.8482C49.6716 43.0722 49.0636 45.5362 47.9436 46.7202C47.121 47.5242 46.1186 48.1207 45.0195 48.4602C43.9205 48.7996 42.7563 48.8723 41.6236 48.6722C40.5092 48.4666 39.5127 47.8498 38.8316 46.9442C38.2067 45.9732 37.8941 44.8342 37.9356 43.6802C37.9356 41.8322 38.5356 39.6802 39.9916 38.4242C40.4336 37.9988 41.0262 37.7658 41.6396 37.7762C42.1894 37.8964 42.6842 38.1945 43.0476 38.6242C43.4634 39.0436 43.928 39.4116 44.4316 39.7202C45.0326 40.0394 45.6726 40.2788 46.3356 40.4322C46.524 40.4746 46.7215 40.4428 46.8872 40.3435C47.0528 40.2441 47.1739 40.0849 47.2253 39.8987C47.2767 39.7126 47.2546 39.5138 47.1634 39.3435C47.0722 39.1733 46.919 39.0446 46.7356 38.9842C46.0157 38.843 45.3357 38.5453 44.7436 38.1122C44.2236 37.6962 43.7916 37.1922 43.2396 36.8162C42.6648 36.4475 41.9897 36.2663 41.3076 36.2978C40.6254 36.3294 39.9699 36.572 39.4316 36.9922C37.4316 38.4162 36.5356 41.0722 36.4716 43.4482C36.3916 46.3602 37.7996 49.0482 40.6716 49.9682C42.0737 50.3456 43.5478 50.367 44.9602 50.0303C46.3726 49.6936 47.6786 49.0095 48.7596 48.0402C50.6236 46.3202 51.4876 42.6642 49.3356 40.7842C48.6156 40.1522 47.5516 41.2082 48.2796 41.8482H48.2636Z"
        fill="#565A6A"
      />
      <path
        d="M39.9837 42.52C40.1496 42.5544 40.3183 42.5732 40.4877 42.576C40.6513 42.5715 40.8144 42.5555 40.9757 42.528C41.2531 42.4849 41.5226 42.4013 41.7757 42.28C42.2694 42.0388 42.6811 41.6576 42.9597 41.184C43.0196 41.0987 43.0612 41.0019 43.0817 40.8997C43.1022 40.7975 43.1012 40.6922 43.0788 40.5904C43.0564 40.4886 43.0131 40.3925 42.9517 40.3083C42.8902 40.2242 42.8119 40.1537 42.7218 40.1014C42.6316 40.0491 42.5316 40.0161 42.428 40.0045C42.3244 39.9929 42.2195 40.0029 42.12 40.034C42.0205 40.0651 41.9286 40.1166 41.8501 40.1851C41.7715 40.2536 41.7081 40.3377 41.6637 40.432C41.623 40.5017 41.5776 40.5685 41.5277 40.632L41.6477 40.48C41.5374 40.6144 41.4141 40.7377 41.2797 40.848L41.4317 40.728C41.2807 40.8467 41.1137 40.9437 40.9357 41.016L41.1197 40.944C40.9484 41.0078 40.7717 41.056 40.5917 41.088H40.7917C40.6219 41.112 40.4496 41.112 40.2797 41.088H40.4717H40.4157C40.2215 41.0391 40.0159 41.0647 39.8397 41.16C39.6706 41.2583 39.547 41.4193 39.4957 41.608C39.4676 41.7038 39.4594 41.8044 39.4718 41.9035C39.4842 42.0026 39.5169 42.0981 39.5677 42.184C39.615 42.2689 39.6791 42.3432 39.7562 42.4023C39.8332 42.4615 39.9215 42.5043 40.0157 42.528L39.9837 42.52Z"
        fill="#565A6A"
      />
      <path
        d="M39.7197 45.7841C40.9043 45.9908 42.1234 45.7453 43.1357 45.0961C44.0524 44.4815 44.7324 43.5729 45.0637 42.5201C45.1154 42.3292 45.0898 42.1256 44.9925 41.9534C44.8952 41.7812 44.7339 41.6543 44.5437 41.6001C44.3521 41.558 44.1518 41.5877 43.9807 41.6835C43.8096 41.7794 43.6797 41.9348 43.6157 42.1201L43.5197 42.4081C43.5197 42.4881 43.5197 42.3201 43.5197 42.4481L43.4637 42.5681C43.364 42.7568 43.2518 42.9386 43.1277 43.1121C43.2317 42.9841 43.0557 43.2161 43.1277 43.1121C43.1027 43.1503 43.0732 43.1852 43.0397 43.2161C42.9745 43.2946 42.9051 43.3694 42.8317 43.4401L42.6077 43.6401C42.6717 43.6001 42.4477 43.7761 42.6077 43.6401L42.4717 43.7361C42.2885 43.8557 42.0959 43.96 41.8957 44.0481L41.7197 44.1041C41.6126 44.1435 41.503 44.1755 41.3917 44.2001H40.3357C40.0957 44.2001 40.4717 44.2001 40.2397 44.2001C40.1429 44.1683 40.0408 44.1564 39.9393 44.1653C39.8379 44.1741 39.7393 44.2034 39.6495 44.2515C39.5598 44.2996 39.4807 44.3654 39.4171 44.4449C39.3536 44.5244 39.3068 44.616 39.2797 44.7142C39.2526 44.8123 39.2457 44.915 39.2594 45.0159C39.2731 45.1167 39.3072 45.2138 39.3596 45.3011C39.4119 45.3885 39.4815 45.4642 39.564 45.5239C39.6465 45.5835 39.7403 45.6258 39.8397 45.6481L39.7197 45.7841Z"
        fill="#565A6A"
      />
      <path
        d="M44.8556 47.2642C45.5386 47.0376 46.162 46.6603 46.6796 46.1602C47.1485 45.733 47.4798 45.1761 47.6316 44.5602C47.6805 44.366 47.6548 44.1604 47.5596 43.9842C47.457 43.8189 47.2978 43.6966 47.1116 43.6402C46.919 43.5985 46.7178 43.6293 46.5466 43.7267C46.3754 43.8242 46.2461 43.9814 46.1836 44.1682C46.1592 44.298 46.1189 44.4243 46.0636 44.5442L46.1436 44.3682C46.0547 44.5661 45.9447 44.7539 45.8156 44.9282L45.9276 44.7762C45.7462 45.0068 45.5365 45.2138 45.3036 45.3922L45.4556 45.2722C45.1803 45.4894 44.876 45.6671 44.5516 45.8002L44.7356 45.7282L44.4556 45.8322C44.2694 45.8886 44.1101 46.0109 44.0076 46.1762C43.9567 46.2621 43.9241 46.3576 43.9117 46.4567C43.8993 46.5558 43.9074 46.6564 43.9356 46.7522C43.998 46.9374 44.126 47.0933 44.2955 47.1906C44.465 47.2879 44.6642 47.3197 44.8556 47.2802V47.2642Z"
        fill="#565A6A"
      />
      <path
        d="M18.1757 40.3441C17.6116 39.8971 16.9628 39.5689 16.2685 39.3792C15.5742 39.1894 14.8487 39.1421 14.1357 39.2401C12.6717 39.4001 11.2797 40.0401 10.7917 41.5601C10.687 41.9646 10.6663 42.3862 10.731 42.799C10.7956 43.2118 10.9443 43.607 11.1677 43.9601C11.587 44.7169 12.0658 45.4392 12.5997 46.1201C13.0893 46.8439 13.8259 47.3644 14.6717 47.5841C15.4138 47.7508 16.189 47.6894 16.8957 47.4081C17.71 47.0432 18.3898 46.433 18.8402 45.6627C19.2906 44.8924 19.489 44.0007 19.4077 43.1121C19.3944 42.9178 19.3107 42.735 19.1722 42.598C19.0338 42.4611 18.8501 42.3793 18.6557 42.3681C18.4613 42.3793 18.2776 42.4611 18.1392 42.598C18.0007 42.735 17.917 42.9178 17.9037 43.1121C17.9676 43.6279 17.8922 44.1515 17.6854 44.6284C17.4786 45.1053 17.1479 45.5181 16.7277 45.8241C16.3153 46.0965 15.8212 46.2175 15.3296 46.1665C14.838 46.1154 14.3793 45.8955 14.0317 45.5441C13.5791 45.0093 13.1774 44.4334 12.8317 43.8241C12.4473 43.3741 12.2149 42.8141 12.1677 42.2241C12.2637 41.2801 13.2557 40.8401 14.0797 40.7281C15.1399 40.5359 16.2331 40.7718 17.1197 41.3841C17.2657 41.5123 17.4534 41.5831 17.6477 41.5831C17.842 41.5831 18.0297 41.5123 18.1757 41.3841C18.2456 41.3142 18.3011 41.2313 18.3389 41.14C18.3767 41.0487 18.3962 40.9509 18.3962 40.8521C18.3962 40.7533 18.3767 40.6554 18.3389 40.5641C18.3011 40.4729 18.2456 40.3899 18.1757 40.3201V40.3441Z"
        fill="#565A6A"
      />
      <path
        d="M10.2637 47.0801C9.43123 45.7097 8.68058 44.2912 8.01573 42.8321C7.65857 42.1492 7.37434 41.4306 7.16773 40.6881C6.91973 39.5441 7.96773 39.7921 8.66373 39.4401C9.76773 38.9041 9.71173 36.7521 11.0637 36.7601C11.69 36.8801 12.3334 36.8801 12.9597 36.7601C13.6317 36.5281 14.0877 35.8961 14.7837 35.7041C15.4797 35.5121 15.7837 36.0001 16.2797 36.5041C16.4892 36.7115 16.7398 36.8728 17.0154 36.9775C17.2909 37.0822 17.5854 37.1281 17.8797 37.1121C18.4237 37.1121 19.1597 36.6881 19.6877 36.8961C20.0797 37.0561 20.1277 37.5281 20.2397 37.8881C20.3779 38.3226 20.6101 38.7214 20.9198 39.056C21.2295 39.3906 21.6092 39.6529 22.0317 39.8241C22.7277 40.2321 22.2557 40.7761 22.1997 41.4241C22.1613 41.7161 22.1919 42.0129 22.2892 42.2908C22.3864 42.5687 22.5476 42.8199 22.7597 43.0241C23.2557 43.5121 24.1437 43.7441 24.0317 44.6241C23.9197 45.5041 22.9277 46.0401 22.2237 46.4561L16.8877 49.5601C16.8026 49.6127 16.7287 49.6814 16.6702 49.7625C16.6117 49.8436 16.5697 49.9355 16.5467 50.0328C16.5237 50.1301 16.52 50.231 16.536 50.3297C16.5519 50.4284 16.5872 50.523 16.6397 50.6081C16.6923 50.6932 16.761 50.7672 16.8421 50.8257C16.9232 50.8842 17.0151 50.9262 17.1124 50.9492C17.2097 50.9722 17.3106 50.9758 17.4093 50.9599C17.508 50.9439 17.6026 50.9087 17.6877 50.8561C19.6317 49.6961 21.5837 48.6241 23.4797 47.4241C24.7197 46.6241 25.9357 45.3441 25.4717 43.7441C25.2338 43.1198 24.7872 42.5969 24.2077 42.2641C23.8077 41.9681 23.6397 41.8241 23.7677 41.2801C23.9095 40.8691 23.9692 40.4342 23.9437 40.0001C23.8865 39.7047 23.7623 39.4263 23.5806 39.1863C23.3989 38.9464 23.1646 38.7513 22.8957 38.6161C22.2877 38.2481 21.9597 38.2001 21.7277 37.4961C21.3517 36.3601 20.8637 35.4001 19.5037 35.3681C18.7757 35.3681 17.9037 35.8961 17.2717 35.3681C16.6397 34.8401 16.4317 34.3201 15.5437 34.2241C14.826 34.1519 14.1053 34.3299 13.5037 34.7281C13.1792 34.9985 12.8183 35.222 12.4317 35.3921C11.9307 35.4208 11.428 35.3858 10.9357 35.2881C10.5953 35.2979 10.2609 35.38 9.95473 35.529C9.64852 35.6779 9.37752 35.8904 9.15973 36.1521C8.92184 36.4236 8.72016 36.7248 8.55973 37.0481C8.35973 37.4401 8.28773 37.9921 7.83173 38.1681C7.37573 38.3441 7.03173 38.2641 6.62373 38.4801C6.27224 38.6798 5.99239 38.9848 5.82373 39.3521C5.68084 39.7689 5.62557 40.2107 5.66136 40.6498C5.69715 41.089 5.82324 41.516 6.03173 41.9041C6.84507 43.9552 7.8271 45.9354 8.96773 47.8241C9.07381 47.996 9.24383 48.1187 9.44036 48.1652C9.6369 48.2117 9.84387 48.1782 10.0157 48.0721C10.1876 47.966 10.3103 47.796 10.3568 47.5995C10.4033 47.403 10.3698 47.196 10.2637 47.0241V47.0801Z"
        fill="#565A6A"
      />
      <path
        d="M8.98355 47.6721L8.00755 50.2241C7.87408 50.55 7.85605 50.9118 7.95645 51.2494C8.05685 51.587 8.26966 51.8801 8.55955 52.0801C8.84279 52.2531 9.14646 52.3901 9.46355 52.4881L12.4796 53.6481C13.1836 53.9201 13.8716 54.2241 14.5836 54.4481C14.8442 54.5431 15.125 54.5687 15.3985 54.5224C15.672 54.4762 15.9287 54.3596 16.1436 54.1841C16.3817 53.9687 16.556 53.6919 16.6476 53.3841L17.2316 51.9041C17.2707 51.7157 17.2361 51.5194 17.1349 51.3557C17.0337 51.192 16.8736 51.0733 16.6876 51.0241C16.496 50.982 16.2957 51.0117 16.1246 51.1075C15.9535 51.2034 15.8236 51.3588 15.7596 51.5441L15.3276 52.6241C15.3276 52.7121 15.1196 53.0001 15.1436 53.1041C15.1676 53.2081 15.1436 53.0321 15.1436 53.0321C14.9596 52.9681 15.4476 53.0321 15.1436 53.0321L14.9836 52.9841C14.3436 52.7601 13.7276 52.4961 13.1036 52.2561L10.1916 51.1441C9.94355 51.0481 9.69555 50.9681 9.45555 50.8641C9.45555 50.8161 9.66355 50.9601 9.45555 50.8641C9.46264 50.9142 9.48846 50.9598 9.52782 50.9916C9.56717 51.0234 9.61713 51.0392 9.66762 51.0356C9.71811 51.0321 9.76537 51.0095 9.79988 50.9725C9.83439 50.9355 9.85358 50.8867 9.85358 50.8361C9.85358 50.7855 9.83439 50.7368 9.79988 50.6997C9.76537 50.6627 9.71811 50.6402 9.66762 50.6366C9.61713 50.6331 9.56717 50.6488 9.52782 50.6806C9.48846 50.7124 9.46264 50.758 9.45555 50.8081C9.45555 50.7601 9.49555 50.7121 9.51155 50.6721L10.4876 48.1201C10.5138 48.0256 10.5212 47.9268 10.5093 47.8294C10.4974 47.7319 10.4664 47.6378 10.4181 47.5524C10.3698 47.467 10.3052 47.3919 10.2279 47.3315C10.1506 47.271 10.0621 47.2264 9.96755 47.2001C9.873 47.1738 9.7742 47.1665 9.6768 47.1784C9.57939 47.1903 9.48529 47.2213 9.39986 47.2696C9.31443 47.3179 9.23934 47.3825 9.1789 47.4598C9.11845 47.5371 9.07382 47.6256 9.04755 47.7201L8.98355 47.6721Z"
        fill="#565A6A"
      />
      <path
        d="M11.0637 49.2239C11.3454 49.9254 11.7994 50.5444 12.3837 51.0239C12.6141 51.2005 12.8936 51.3012 13.1837 51.3119C13.426 51.3135 13.6677 51.2866 13.9037 51.2319C14.2862 51.167 14.6633 51.0734 15.0317 50.9519C15.1311 50.9296 15.2248 50.8873 15.3074 50.8277C15.3899 50.768 15.4594 50.6923 15.5118 50.6049C15.5642 50.5176 15.5982 50.4205 15.612 50.3197C15.6257 50.2188 15.6188 50.1161 15.5917 50.018C15.5646 49.9198 15.5178 49.8282 15.4543 49.7487C15.3907 49.6692 15.3116 49.6034 15.2218 49.5553C15.1321 49.5072 15.0335 49.4779 14.9321 49.4691C14.8306 49.4602 14.7284 49.4721 14.6317 49.5039C14.3176 49.6098 13.9969 49.6953 13.6717 49.7599H13.3757C13.4902 49.7662 13.5977 49.8168 13.6753 49.9011C13.753 49.9854 13.7947 50.0967 13.7916 50.2113C13.7884 50.3259 13.7407 50.4347 13.6586 50.5146C13.5764 50.5945 13.4663 50.6393 13.3517 50.6393C13.2371 50.6393 13.127 50.5945 13.0449 50.5146C12.9627 50.4347 12.915 50.3259 12.9119 50.2113C12.9088 50.0967 12.9505 49.9854 13.0281 49.9011C13.1058 49.8168 13.2133 49.7662 13.3277 49.7599C13.2801 49.768 13.2314 49.768 13.1837 49.7599C13.2397 49.7599 13.3117 49.7599 13.3597 49.8079L13.2317 49.8239C13.127 49.723 13.0282 49.6162 12.9357 49.5039L12.8637 49.4239C12.825 49.3555 12.7794 49.2912 12.7277 49.2319C12.5536 48.9813 12.4061 48.7132 12.2877 48.4319C12.1888 48.2634 12.0281 48.14 11.8397 48.0879C11.6477 48.0365 11.4432 48.0631 11.2708 48.1621C11.0984 48.261 10.9722 48.4242 10.9197 48.6159C10.8784 48.8114 10.9067 49.0151 10.9997 49.1919L11.0637 49.2239Z"
        fill="#565A6A"
      />
      <path
        d="M15.2076 42.5202L15.3516 42.6082L15.4716 42.7282L15.5196 42.7922C15.5756 42.8482 15.4076 42.6242 15.5196 42.7442L15.5996 42.8722V42.9602C15.6476 43.0322 15.5436 42.8002 15.5996 42.8802C15.639 42.9953 15.6711 43.1129 15.6956 43.2322L15.6316 43.0242C15.6477 43.1543 15.6477 43.286 15.6316 43.4162V43.2162C15.6207 43.3056 15.6019 43.394 15.5756 43.4802C15.5756 43.4802 15.5036 43.6722 15.5756 43.5362C15.6476 43.4002 15.5756 43.5362 15.5756 43.5922C15.5571 43.626 15.5357 43.6581 15.5116 43.6882C15.5012 43.7112 15.4878 43.7327 15.4716 43.7522C15.5516 43.6562 15.5596 43.6322 15.5116 43.6962C15.4516 43.7615 15.3875 43.823 15.3196 43.8802C15.1804 44.0244 15.1005 44.2157 15.0956 44.4162C15.1025 44.6138 15.1823 44.8019 15.3196 44.9442C15.3886 45.0139 15.4708 45.0689 15.5616 45.106C15.6523 45.1432 15.7496 45.1616 15.8476 45.1602C16.0442 45.1555 16.2321 45.0786 16.3756 44.9442C16.6527 44.7114 16.87 44.4155 17.0092 44.0815C17.1484 43.7474 17.2054 43.3848 17.1756 43.0242C17.1389 42.6476 17.0112 42.2855 16.8035 41.9692C16.5959 41.6528 16.3145 41.3917 15.9836 41.2082C15.8083 41.1185 15.606 41.0967 15.4156 41.1469C15.2252 41.1971 15.06 41.3158 14.9516 41.4802C14.8643 41.6547 14.8437 41.8551 14.8938 42.0436C14.9439 42.2322 15.0612 42.396 15.2236 42.5042L15.2076 42.5202Z"
        fill="#565A6A"
      />
      <path
        d="M33.8796 2.12802C40.1249 2.22402 46.3756 2.24802 52.6316 2.20002L51.8796 1.42402C51.8796 9.54402 52.0876 17.656 52.0716 25.776L52.8156 25.024H1.3436C1.14416 25.024 0.952885 25.1033 0.811857 25.2443C0.67083 25.3853 0.591602 25.5766 0.591602 25.776C0.591602 25.9755 0.67083 26.1667 0.811857 26.3078C0.952885 26.4488 1.14416 26.528 1.3436 26.528H52.8156C53.0113 26.5166 53.196 26.4337 53.3347 26.2951C53.4733 26.1564 53.5562 25.9717 53.5676 25.776C53.5676 17.656 53.3596 9.54402 53.3836 1.42402C53.3648 1.23402 53.2787 1.057 53.1407 0.92496C53.0028 0.792916 52.8222 0.714551 52.6316 0.704023C46.3863 0.752023 40.1356 0.725357 33.8796 0.624023C33.6802 0.624023 33.4889 0.703252 33.3479 0.844279C33.2068 0.985306 33.1276 1.17658 33.1276 1.37602C33.1276 1.57547 33.2068 1.76674 33.3479 1.90777C33.4889 2.04879 33.6802 2.12802 33.8796 2.12802Z"
        fill="#565A6A"
      />
      <path
        d="M1.93564 23.24V1.37602L1.18364 2.12802H20.2636C20.4631 2.12802 20.6544 2.04879 20.7954 1.90777C20.9364 1.76674 21.0156 1.57547 21.0156 1.37602C21.0156 1.17658 20.9364 0.985306 20.7954 0.844279C20.6544 0.703252 20.4631 0.624023 20.2636 0.624023H1.18364C0.987926 0.635453 0.803221 0.71835 0.664595 0.856977C0.525968 0.995604 0.44307 1.18031 0.431641 1.37602V23.24C0.431641 23.4395 0.510869 23.6307 0.651896 23.7718C0.792924 23.9128 0.984198 23.992 1.18364 23.992C1.38308 23.992 1.57436 23.9128 1.71538 23.7718C1.85641 23.6307 1.93564 23.4395 1.93564 23.24Z"
        fill="#565A6A"
      />
      <path
        d="M2.52763 46.728V30.104L1.77563 30.856H29.4156L28.6636 30.104V56.504L29.4156 55.752H1.77563L2.52763 56.504V49.904C2.52763 49.7045 2.4484 49.5132 2.30738 49.3722C2.16635 49.2312 1.97508 49.152 1.77563 49.152C1.57619 49.152 1.38492 49.2312 1.24389 49.3722C1.10286 49.5132 1.02363 49.7045 1.02363 49.904V56.504C1.03506 56.6997 1.11796 56.8844 1.25659 57.023C1.39521 57.1616 1.57992 57.2445 1.77563 57.256H29.4156C29.6113 57.2445 29.7961 57.1616 29.9347 57.023C30.0733 56.8844 30.1562 56.6997 30.1676 56.504V30.104C30.1543 29.9097 30.0706 29.7269 29.9322 29.5899C29.7937 29.453 29.6101 29.3712 29.4156 29.36H1.77563C1.58121 29.3712 1.39755 29.453 1.25911 29.5899C1.12067 29.7269 1.03694 29.9097 1.02363 30.104V46.728C1.02363 46.9274 1.10286 47.1187 1.24389 47.2597C1.38492 47.4007 1.57619 47.48 1.77563 47.48C1.97508 47.48 2.16635 47.4007 2.30738 47.2597C2.4484 47.1187 2.52763 46.9274 2.52763 46.728Z"
        fill="#565A6A"
      />
      <path
        d="M40.7357 30.856H52.8237L52.0717 30.104V56.624L52.8237 55.872H33.6237L34.3757 56.624V30.104L33.6237 30.856H38.4237C38.6087 30.8368 38.7801 30.7497 38.9047 30.6116C39.0293 30.4734 39.0982 30.294 39.0982 30.108C39.0982 29.9219 39.0293 29.7425 38.9047 29.6043C38.7801 29.4662 38.6087 29.3791 38.4237 29.36H33.6237C33.4307 29.3731 33.249 29.4556 33.1122 29.5924C32.9754 29.7292 32.8928 29.911 32.8797 30.104V56.624C32.8909 56.8184 32.9727 57.002 33.1097 57.1405C33.2466 57.2789 33.4294 57.3627 33.6237 57.376H52.8237C53.018 57.3627 53.2007 57.2789 53.3377 57.1405C53.4747 57.002 53.5565 56.8184 53.5677 56.624V30.104C53.5546 29.911 53.472 29.7292 53.3352 29.5924C53.1984 29.4556 53.0167 29.3731 52.8237 29.36H40.7357C40.5506 29.3791 40.3793 29.4662 40.2547 29.6043C40.1301 29.7425 40.0611 29.9219 40.0611 30.108C40.0611 30.294 40.1301 30.4734 40.2547 30.6116C40.3793 30.7497 40.5506 30.8368 40.7357 30.856Z"
        fill="#565A6A"
      />
      <path
        d="M43.5676 53.8799C43.5676 53.8799 43.5676 53.8799 43.6156 53.8319C43.5356 53.8799 43.6636 53.7839 43.6156 53.8319L43.7436 53.7519C43.7916 53.7519 43.7916 53.7519 43.7436 53.7519H43.8156L43.9756 53.7039C44.0421 53.6961 44.1092 53.6961 44.1756 53.7039C44.721 53.7626 45.2578 53.8834 45.7756 54.0639C46.3991 54.2147 47.0498 54.2112 47.6716 54.0537C48.2933 53.8962 48.8673 53.5894 49.3436 53.1599C49.4135 53.0901 49.4689 53.0071 49.5067 52.9159C49.5445 52.8246 49.564 52.7267 49.564 52.6279C49.564 52.5291 49.5445 52.4313 49.5067 52.34C49.4689 52.2487 49.4135 52.1658 49.3436 52.0959C49.2738 52.0261 49.1908 51.9707 49.0996 51.9329C49.0083 51.8951 48.9104 51.8756 48.8116 51.8756C48.7128 51.8756 48.615 51.8951 48.5237 51.9329C48.4324 51.9707 48.3495 52.0261 48.2796 52.0959C47.9053 52.4338 47.4302 52.639 46.9276 52.6799C46.3428 52.6225 45.7706 52.4741 45.2316 52.2399C44.0076 51.9439 42.5996 52.1839 42.1036 53.4799C42.0615 53.6715 42.0912 53.8718 42.1871 54.0429C42.2829 54.214 42.4383 54.3439 42.6236 54.408C42.8162 54.4497 43.0174 54.4188 43.1886 54.3214C43.3599 54.224 43.4891 54.0668 43.5516 53.8799H43.5676Z"
        fill="#565A6A"
      />
      <path
        d="M5.62363 34.136C5.62363 34.136 5.55163 34.272 5.62363 34.192C5.69563 34.112 5.51163 34.296 5.62363 34.24H5.57563C5.57563 34.24 5.64763 34.2 5.65563 34.2C5.66363 34.2 5.65563 34.2 5.59963 34.2H5.69563C5.79963 34.2 5.69563 34.2 5.63163 34.2C5.66351 34.2039 5.69575 34.2039 5.72763 34.2H5.82363C5.90363 34.2 5.99163 34.2 6.07163 34.264C6.15163 34.328 6.42363 34.392 6.59963 34.44C7.39412 34.6908 8.25513 34.622 8.99963 34.248C9.16181 34.1425 9.27713 33.9787 9.3216 33.7904C9.36608 33.6021 9.33629 33.404 9.23843 33.2371C9.14058 33.0702 8.98218 32.9475 8.79617 32.8944C8.61015 32.8413 8.41083 32.8619 8.23963 32.952C8.18363 32.952 8.16763 32.952 8.23963 32.952L8.09563 33L7.82363 33.072C7.77563 33.072 7.73563 33.072 7.82363 33.072C7.78375 33.0764 7.7435 33.0764 7.70363 33.072H7.17563C7.27963 33.072 7.23963 33.072 7.17563 33.072L6.89563 33L6.34363 32.808C5.93163 32.6495 5.47397 32.6588 5.06871 32.8338C4.66346 33.0087 4.34286 33.3355 4.17563 33.744C4.12418 33.936 4.15084 34.1405 4.24978 34.3129C4.34872 34.4853 4.5119 34.6115 4.70363 34.664C4.895 34.7035 5.09423 34.6716 5.26372 34.5744C5.43321 34.4771 5.56123 34.3212 5.62363 34.136Z"
        fill="#565A6A"
      />
      <path
        d="M21.5276 53.1201C21.5442 53.0802 21.5657 53.0426 21.5916 53.0081C21.6316 53.0081 21.5196 53.1121 21.5916 53.0081C21.5516 53.0081 21.5916 53.0081 21.6476 53.0081C21.5356 53.0081 21.7036 53.0081 21.6476 53.0081H21.8076C21.7356 53.0081 21.7356 53.0081 21.8076 53.0081H22.0316C21.8876 53.0081 22.1516 53.0081 22.2076 53.0561C22.3141 53.0862 22.4183 53.1236 22.5196 53.1681C22.7836 53.2721 23.0396 53.3921 23.3196 53.4801C23.8681 53.6646 24.4647 53.6447 24.9996 53.4241C25.2556 53.3201 25.4876 53.2001 25.7356 53.0961C25.6716 53.0961 25.7356 53.0961 25.7836 53.0961L25.9276 53.0481C25.9276 53.0481 26.1276 53.0001 26.0556 53.0481C26.1996 53.0481 25.9836 53.0961 26.0556 53.0481C26.2482 53.0898 26.4494 53.059 26.6206 52.9616C26.7919 52.8642 26.9211 52.707 26.9836 52.5201C27.0351 52.3281 27.0084 52.1236 26.9095 51.9512C26.8105 51.7788 26.6474 51.6526 26.4556 51.6001C26.1197 51.5427 25.7751 51.5618 25.4476 51.6561C25.1596 51.7521 24.8796 51.8961 24.6076 52.0161C24.4368 52.0951 24.2518 52.1387 24.0636 52.1441C23.7879 52.0942 23.5193 52.0109 23.2636 51.8961C22.7663 51.6512 22.2179 51.5279 21.6636 51.5361C21.3621 51.543 21.0674 51.6276 20.8081 51.7818C20.5488 51.9359 20.3337 52.1544 20.1836 52.4161C20.1052 52.5943 20.0944 52.795 20.1533 52.9806C20.2122 53.1661 20.3368 53.3238 20.5036 53.4241C20.6781 53.5115 20.8785 53.532 21.0671 53.4819C21.2557 53.4318 21.4195 53.3146 21.5276 53.1521V53.1201Z"
        fill="#565A6A"
      />
      <path
        d="M45.6876 34.8L45.7596 34.672C45.7596 34.672 45.6876 34.832 45.7596 34.72H46.0316C46.1596 34.72 45.9836 34.72 45.9836 34.72H46.1436C46.2499 34.7475 46.3541 34.7823 46.4556 34.824C46.4556 34.824 46.6396 34.896 46.5516 34.824H46.6476C46.7996 34.888 46.9436 34.96 47.1036 35.016C47.3286 35.1198 47.572 35.1777 47.8197 35.1864C48.0673 35.195 48.3141 35.1542 48.5458 35.0663C48.7774 34.9784 48.9892 34.8452 49.1688 34.6745C49.3484 34.5038 49.4921 34.299 49.5916 34.072C49.6183 33.9775 49.6261 33.8786 49.6143 33.781C49.6026 33.6835 49.5717 33.5892 49.5234 33.5037C49.475 33.4181 49.4102 33.343 49.3327 33.2827C49.2551 33.2223 49.1664 33.1779 49.0716 33.152C48.8813 33.1121 48.6829 33.1428 48.5135 33.2385C48.3442 33.3342 48.2156 33.4883 48.1516 33.672C48.1516 33.6 48.2156 33.496 48.1516 33.672C48.2636 33.544 48.1516 33.744 48.1516 33.672C48.2476 33.672 48.0396 33.8 48.1516 33.672L48.0556 33.728H48.1196H47.9516C48.1116 33.728 47.7996 33.728 47.9516 33.728H47.7756C47.7196 33.728 47.7756 33.728 47.8556 33.728C47.8184 33.7235 47.7808 33.7235 47.7436 33.728C47.6374 33.7006 47.5331 33.6658 47.4316 33.624L47.2476 33.552C47.3036 33.552 47.3116 33.552 47.2476 33.552L46.8316 33.352C46.0316 33.04 44.7996 33.128 44.3836 34.04C44.3337 34.1246 44.301 34.2182 44.2872 34.3154C44.2735 34.4126 44.279 34.5116 44.3036 34.6067C44.3281 34.7018 44.3711 34.7911 44.4301 34.8696C44.4892 34.9481 44.5631 35.0141 44.6476 35.064C44.7322 35.1139 44.8258 35.1467 44.923 35.1604C45.0202 35.1742 45.1192 35.1686 45.2143 35.1441C45.3094 35.1196 45.3987 35.0766 45.4772 35.0176C45.5557 34.9585 45.6217 34.8846 45.6716 34.8H45.6876Z"
        fill="#565A6A"
      />
      <path
        d="M38.5037 22.9441C38.5053 22.9228 38.5053 22.9014 38.5037 22.8801H38.5437C38.4557 22.9441 38.4397 22.9601 38.4877 22.9281L38.5517 22.8881C38.6557 22.8241 38.5037 22.8881 38.5037 22.8881L38.6477 22.8481C38.5357 22.8481 38.7757 22.8081 38.6477 22.8481H38.9037C38.9037 22.8481 39.0237 22.8481 39.0557 22.8481C39.0877 22.8481 39.2637 22.9121 39.3677 22.9441C39.4717 22.9761 39.7997 23.0961 40.0237 23.1601C40.4641 23.2963 40.9354 23.2963 41.3757 23.1601C41.625 23.078 41.8503 22.9358 42.0317 22.746C42.213 22.5563 42.3449 22.3248 42.4157 22.0721C42.4574 21.8795 42.4266 21.6784 42.3292 21.5071C42.2318 21.3359 42.0746 21.2066 41.8877 21.1441C41.6964 21.1045 41.4971 21.1364 41.3276 21.2337C41.1582 21.331 41.0301 21.4869 40.9677 21.6721C40.9677 21.6721 40.9117 21.8241 40.9677 21.7121C41.1037 21.6401 40.8557 21.8241 40.9677 21.7121L40.8637 21.7681C41.0157 21.7281 40.7997 21.8161 40.8637 21.7681H40.5037C40.5437 21.7681 40.6077 21.7681 40.5037 21.7681L40.3437 21.7281L39.7197 21.5201C39.2878 21.3304 38.8033 21.2968 38.3493 21.4253C37.8954 21.5538 37.5002 21.8362 37.2317 22.2241C37.1718 22.3094 37.1303 22.4062 37.1098 22.5084C37.0893 22.6106 37.0903 22.7159 37.1127 22.8177C37.135 22.9195 37.1783 23.0156 37.2398 23.0998C37.3013 23.1839 37.3796 23.2544 37.4697 23.3067C37.5599 23.359 37.6599 23.392 37.7635 23.4036C37.8671 23.4152 37.9719 23.4052 38.0714 23.3741C38.1709 23.343 38.2629 23.2915 38.3414 23.223C38.42 23.1545 38.4834 23.0704 38.5277 22.9761L38.5037 22.9441Z"
        fill="#565A6A"
      />
      <path
        d="M5.31962 5.54383C5.31962 5.36783 5.25562 5.59183 5.23162 5.63183C5.33562 5.58383 5.20762 5.67183 5.23162 5.63183C5.32203 5.5988 5.42121 5.5988 5.51162 5.63183L5.77562 5.72783C5.94362 5.79183 6.11162 5.87183 6.27962 5.92783C6.64569 6.02327 7.02828 6.0369 7.40022 5.96777C7.77215 5.89864 8.12429 5.74843 8.43162 5.52783C8.63962 5.43183 8.69562 5.38383 8.88762 5.52783C9.16805 5.73344 9.46507 5.9154 9.77562 6.07183C10.1457 6.20429 10.5442 6.23632 10.9307 6.16465C11.3171 6.09298 11.6777 5.92017 11.9756 5.66383C12.0455 5.59399 12.101 5.51106 12.1388 5.41978C12.1767 5.32849 12.1961 5.23065 12.1961 5.13183C12.1961 5.03302 12.1767 4.93517 12.1388 4.84389C12.101 4.7526 12.0455 4.66967 11.9756 4.59983C11.8296 4.47158 11.6419 4.40085 11.4476 4.40085C11.2533 4.40085 11.0656 4.47158 10.9196 4.59983C10.4476 4.97583 9.96762 4.39983 9.55962 4.17583C8.75962 3.74383 8.07162 4.06383 7.33562 4.44783C7.2313 4.50901 7.11255 4.54126 6.99162 4.54126C6.87068 4.54126 6.75194 4.50901 6.64762 4.44783C6.30372 4.29488 5.9443 4.17955 5.57562 4.10383C5.21408 4.04405 4.8431 4.11619 4.5303 4.30709C4.21751 4.498 3.98374 4.79496 3.87162 5.14383C3.82928 5.33227 3.86105 5.52977 3.96037 5.69541C4.05969 5.86105 4.21893 5.98213 4.40509 6.03356C4.59125 6.08498 4.79006 6.06281 4.96032 5.97164C5.13058 5.88047 5.25923 5.72728 5.31962 5.54383Z"
        fill="#565A6A"
      />
      <path
        d="M9.04762 22.3841C9.0614 22.3445 9.08022 22.3069 9.10362 22.2721C9.14362 22.2081 9.14362 22.2001 9.10362 22.2721C9.15962 22.2161 9.16762 22.2161 9.10362 22.2721L9.20762 22.2161C9.06362 22.3041 9.26362 22.2161 9.31962 22.2161C9.39962 22.2161 9.37562 22.2161 9.31962 22.2161H9.56762C9.46362 22.2161 9.46362 22.2161 9.56762 22.2161C9.67357 22.238 9.77784 22.2674 9.87962 22.3041C10.0876 22.3681 10.2876 22.4481 10.4956 22.5201C11.4373 22.8028 12.4469 22.7576 13.3596 22.3921C13.5476 22.3215 13.7022 22.1827 13.7926 22.0034C13.883 21.824 13.9026 21.6173 13.8476 21.4241C13.7836 21.2388 13.6536 21.0834 13.4826 20.9875C13.3115 20.8917 13.1111 20.862 12.9196 20.9041C12.4973 21.0753 12.0472 21.1675 11.5916 21.1761H11.4236C11.4236 21.1761 11.2396 21.1761 11.3276 21.1761C11.2192 21.157 11.1123 21.1303 11.0076 21.0961C10.7756 21.0241 10.5516 20.9361 10.3116 20.8561C9.43962 20.5601 8.18362 20.6401 7.75162 21.6161C7.66427 21.7906 7.64371 21.991 7.69381 22.1796C7.7439 22.3682 7.8612 22.532 8.02362 22.6401C8.19469 22.7398 8.39815 22.7679 8.58986 22.7185C8.78157 22.6691 8.94605 22.546 9.04762 22.3761V22.3841Z"
        fill="#565A6A"
      />
      <path
        d="M15.3357 12.5201C15.7864 12.5201 16.1517 12.1547 16.1517 11.7041C16.1517 11.2534 15.7864 10.8881 15.3357 10.8881C14.8851 10.8881 14.5197 11.2534 14.5197 11.7041C14.5197 12.1547 14.8851 12.5201 15.3357 12.5201Z"
        fill="#565A6A"
      />
    </svg>
  );
};

export default Retailer;