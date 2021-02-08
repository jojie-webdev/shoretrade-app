import React from 'react';

import { useTheme } from 'utils/Theme';

import { SVGProps } from './SVG.props';

const BuyerHotel = (props: SVGProps): JSX.Element => {
  const theme = useTheme();
  const { width, height, fill } = props;

  // Paste converted svg below
  // https://react-svgr.com/playground/?typescript=true
  return (
    <svg
      width={width || '54'}
      height={height || '48'}
      viewBox="0 0 54 48"
      fill={fill || 'none'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M32.5643 12.1125C32.5643 12.1685 32.5643 12.2165 32.5643 12.2725C32.5643 12.3285 32.5643 12.2245 32.5643 12.2245C32.5643 12.2245 32.5163 12.4405 32.5083 12.4725C32.5003 12.5045 32.5083 12.6085 32.4523 12.6165C32.3963 12.6245 32.5403 12.4485 32.4523 12.5765L32.3003 12.8325C32.3883 12.7525 32.2123 12.9685 32.3003 12.8325L32.2203 12.9205L32.1483 12.9925C32.0923 13.0405 32.0843 13.0485 32.1483 12.9925C32.1483 13.0405 31.9803 13.1045 31.9403 13.1285L31.8523 13.1765C32.0043 13.1365 31.7243 13.2485 31.8523 13.1765L31.6123 13.2485C31.6123 13.2965 31.4843 13.2485 31.6123 13.2485C31.6123 13.2005 31.5083 13.2485 31.4843 13.2485H31.2203C31.4043 13.2485 31.1083 13.2485 31.2203 13.2485H31.0683L30.9243 13.2005C30.9243 13.2005 30.7323 13.0965 30.7003 13.0805L30.6043 13.0085C30.7323 13.1285 30.5163 12.9605 30.6043 13.0085C30.4763 12.8885 30.3883 12.8325 30.3963 12.8005C30.4843 12.9285 30.4043 12.7685 30.3963 12.8005C30.3083 12.6725 30.3403 12.7205 30.3163 12.6725L30.3803 12.6485V12.6085C30.3803 12.5365 30.3803 12.5445 30.3803 12.6485C30.3403 12.6485 30.3083 12.4565 30.3003 12.4085V12.3045C30.3003 12.4725 30.3003 12.1605 30.3003 12.3045C30.2923 12.2273 30.2923 12.1496 30.3003 12.0725V12.0165C30.3003 11.9365 30.3003 11.9445 30.3003 12.0645C30.3048 12.0299 30.3048 11.995 30.3003 11.9605C30.3169 11.8784 30.341 11.7981 30.3723 11.7205C30.2843 11.8565 30.4203 11.5525 30.3723 11.7205L30.4443 11.5925C30.4686 11.5569 30.49 11.5195 30.5083 11.4805C30.5083 11.4805 30.6603 11.3205 30.6763 11.3045C30.6923 11.2885 30.7723 11.1765 30.7163 11.2645C30.7163 11.2645 30.9483 11.1045 30.9803 11.1205C30.7963 11.1845 31.0123 11.1365 30.9803 11.1205L31.1243 11.0805H31.2203C31.2203 11.0805 31.4043 11.0405 31.2763 11.0805C31.1483 11.1205 31.2763 11.0805 31.3323 11.0805H31.5963C31.4523 11.0405 31.7643 11.0805 31.5963 11.0805L31.8843 11.1605C31.7883 11.0965 32.0443 11.2085 31.8843 11.1605C31.9332 11.1928 31.9839 11.2221 32.0363 11.2485L32.1243 11.2965L32.2043 11.3605C32.1083 11.2805 32.1163 11.2885 32.2043 11.3605L32.3723 11.5285C32.2923 11.3925 32.4923 11.6485 32.3723 11.5285C32.4523 11.6645 32.4283 11.6085 32.4523 11.6565L32.5243 11.7845C32.5243 11.6405 32.5963 11.9125 32.5243 11.7845C32.5243 11.9285 32.5803 11.9765 32.6043 12.0725C32.6043 12.0725 32.6043 12.2405 32.6043 12.2805C32.5934 12.3852 32.6047 12.491 32.6374 12.5911C32.67 12.6912 32.7233 12.7833 32.7938 12.8615C32.8643 12.9397 32.9505 13.0022 33.0467 13.045C33.1429 13.0878 33.247 13.1099 33.3523 13.1099C33.4576 13.1099 33.5617 13.0878 33.6579 13.045C33.7541 13.0022 33.8402 12.9397 33.9108 12.8615C33.9813 12.7833 34.0346 12.6912 34.0672 12.5911C34.0999 12.491 34.1111 12.3852 34.1003 12.2805C34.0954 11.7337 33.9234 11.2016 33.6073 10.7555C33.2913 10.3093 32.8464 9.97049 32.3323 9.78446C31.8266 9.60936 31.2796 9.5921 30.7638 9.73497C30.248 9.87784 29.7878 10.1741 29.4443 10.5845C29.166 10.9082 28.97 11.2945 28.8732 11.7103C28.7764 12.1262 28.7816 12.5592 28.8884 12.9727C28.9951 13.3861 29.2002 13.7675 29.4862 14.0845C29.7722 14.4015 30.1307 14.6447 30.5309 14.7932C30.9312 14.9418 31.3615 14.9913 31.7851 14.9377C32.2086 14.884 32.6129 14.7288 32.9635 14.4851C33.3141 14.2414 33.6006 13.9166 33.7985 13.5383C33.9965 13.16 34.1 12.7394 34.1003 12.3125C34.1111 12.2077 34.0999 12.1019 34.0672 12.0018C34.0346 11.9017 33.9813 11.8096 33.9108 11.7314C33.8402 11.6532 33.7541 11.5907 33.6579 11.5479C33.5617 11.5051 33.4576 11.483 33.3523 11.483C33.247 11.483 33.1429 11.5051 33.0467 11.5479C32.9505 11.5907 32.8643 11.6532 32.7938 11.7314C32.7233 11.8096 32.67 11.9017 32.6374 12.0018C32.6047 12.1019 32.5934 12.2077 32.6043 12.3125L32.5643 12.1125Z"
        fill="#565A6A"
      />
      <path
        d="M16.8362 28.0087C17.1879 24.2587 18.9714 20.7886 21.8158 18.3197C24.6602 15.8509 28.3467 14.5732 32.1089 14.7525C35.8711 14.9317 39.4194 16.5541 42.0162 19.2822C44.6131 22.0103 46.0585 25.6343 46.0522 29.4007C46.0522 29.6002 46.1314 29.7914 46.2724 29.9325C46.4134 30.0735 46.6047 30.1527 46.8042 30.1527C47.0036 30.1527 47.1949 30.0735 47.3359 29.9325C47.4769 29.7914 47.5562 29.6002 47.5562 29.4007C47.5509 26.1817 46.5835 23.0377 44.7781 20.3726C42.9727 17.7075 40.4118 15.6429 37.4243 14.4441C34.4368 13.2454 31.1591 12.9671 28.0122 13.645C24.8654 14.3229 21.9931 15.9261 19.7642 18.2487C17.2462 20.9185 15.6944 24.3544 15.3562 28.0087C15.2602 28.9687 16.7642 28.9687 16.8602 28.0087H16.8362Z"
        fill="#565A6A"
      />
      <path
        d="M36.9562 19.6327C39.2545 20.9474 41.0205 23.0247 41.9482 25.5047C41.9706 25.604 42.0128 25.6978 42.0725 25.7803C42.1321 25.8628 42.2079 25.9324 42.2952 25.9847C42.3826 26.0371 42.4796 26.0712 42.5805 26.0849C42.6814 26.0987 42.784 26.0918 42.8822 26.0646C42.9803 26.0375 43.0719 25.9908 43.1515 25.9272C43.231 25.8636 43.2968 25.7845 43.3449 25.6948C43.3929 25.605 43.4223 25.5064 43.4311 25.405C43.4399 25.3036 43.4281 25.2014 43.3962 25.1047C42.3642 22.2593 40.3689 19.8648 37.7562 18.3367C37.5844 18.2306 37.3774 18.1971 37.1809 18.2436C36.9843 18.2901 36.8143 18.4128 36.7082 18.5847C36.6022 18.7565 36.5687 18.9635 36.6152 19.16C36.6617 19.3566 36.7844 19.5266 36.9562 19.6327Z"
        fill="#565A6A"
      />
      <path
        d="M47.2282 33.7524C47.8562 33.4305 48.4002 32.9663 48.8169 32.3968C49.2336 31.8273 49.5114 31.1683 49.6282 30.4724C49.65 30.3618 49.6482 30.2479 49.6229 30.1381C49.5976 30.0283 49.5494 29.9251 49.4814 29.8352C49.4134 29.7453 49.3272 29.6708 49.2284 29.6166C49.1297 29.5623 49.0205 29.5296 48.9082 29.5204H13.8842C13.6862 29.5225 13.497 29.6027 13.3577 29.7435C13.2184 29.8843 13.1402 30.0743 13.1402 30.2724C13.1833 30.9205 13.3835 31.5484 13.7236 32.1017C14.0637 32.6551 14.5335 33.1173 15.0922 33.4484C16.0921 33.8463 17.1753 33.9893 18.2442 33.8644H53.0922L52.3402 33.1124V46.0964C52.3402 46.2959 52.4195 46.4871 52.5605 46.6282C52.7015 46.7692 52.8928 46.8484 53.0922 46.8484C53.2917 46.8484 53.4829 46.7692 53.624 46.6282C53.765 46.4871 53.8442 46.2959 53.8442 46.0964V33.0884C53.8328 32.8927 53.7499 32.708 53.6113 32.5694C53.4726 32.4307 53.2879 32.3478 53.0922 32.3364C42.2602 32.3364 31.4282 32.3364 20.5882 32.3364C19.4922 32.3364 18.3962 32.3364 17.3002 32.3364C16.9535 32.3782 16.6018 32.3479 16.2673 32.2474C15.9327 32.1469 15.6226 31.9784 15.3562 31.7524C15.0826 31.4613 14.88 31.1108 14.7642 30.7284C14.7242 30.6084 14.6282 30.0964 14.6442 30.2724L13.8922 31.0244H48.9562L48.2362 30.0724C48.1654 30.5861 47.9683 31.0742 47.6625 31.4931C47.3568 31.9119 46.9519 32.2484 46.4842 32.4724C45.6202 32.8964 46.3802 34.1924 47.2842 33.7684L47.2282 33.7524Z"
        fill="#565A6A"
      />
      <path
        d="M1.66025 46.0964V33.0884L0.90825 33.8404H17.8842C18.0837 33.8404 18.275 33.7612 18.416 33.6202C18.557 33.4791 18.6362 33.2879 18.6362 33.0884C18.6362 32.889 18.557 32.6977 18.416 32.5567C18.275 32.4157 18.0837 32.3364 17.8842 32.3364H0.90825C0.712535 32.3479 0.527831 32.4308 0.389204 32.5694C0.250577 32.708 0.167679 32.8927 0.15625 33.0884V46.0964C0.15625 46.2959 0.235478 46.4871 0.376506 46.6282C0.517533 46.7692 0.708807 46.8484 0.90825 46.8484C1.10769 46.8484 1.29897 46.7692 1.43999 46.6282C1.58102 46.4871 1.66025 46.2959 1.66025 46.0964Z"
        fill="#565A6A"
      />
      <path
        d="M5.61225 30.6326C5.21225 22.6326 5.10291 14.6326 5.28425 6.63257L4.53225 7.38457C10.7594 7.77918 17.0035 7.82992 23.2362 7.53657L22.4922 6.79257C22.3522 9.2866 22.3522 11.7865 22.4922 14.2806C22.4922 15.2406 24.0282 15.2486 23.9882 14.2806C23.8523 11.7864 23.8523 9.28672 23.9882 6.79257C23.9768 6.59685 23.8939 6.41215 23.7553 6.27352C23.6167 6.13489 23.432 6.052 23.2362 6.04057C17.0034 6.33126 10.7592 6.27784 4.53225 5.88057C4.33653 5.892 4.15183 5.97489 4.0132 6.11352C3.87458 6.25215 3.79168 6.43685 3.78025 6.63257C3.60425 14.6326 3.71358 22.6459 4.10825 30.6726C4.15625 31.6326 5.66025 31.6406 5.61225 30.6726V30.6326Z"
        fill="#565A6A"
      />
      <path
        d="M4.74825 7.04857C9.76158 5.25657 14.8282 3.61924 19.9482 2.13657L19.0122 1.40057C18.9162 2.53454 18.9162 3.6746 19.0122 4.80857C19.0762 5.76057 20.5722 5.76857 20.5082 4.80857C20.4162 3.67443 20.4162 2.53471 20.5082 1.40057C20.5121 1.28337 20.4886 1.16687 20.4394 1.0604C20.3903 0.953924 20.3169 0.860418 20.2252 0.78735C20.1335 0.714283 20.026 0.66368 19.9112 0.639583C19.7964 0.615486 19.6776 0.618563 19.5642 0.648569C14.4442 2.13124 9.37758 3.76857 4.36425 5.56057C3.46825 5.88857 3.85225 7.33657 4.76425 7.00857L4.74825 7.04857Z"
        fill="#565A6A"
      />
      <path
        d="M8.10828 12.6485C11.7243 12.7872 15.3376 12.7552 18.9483 12.5525C19.9083 12.4965 19.9163 10.9925 18.9483 11.0485C15.3429 11.2512 11.7296 11.2832 8.10828 11.1445C7.14828 11.1445 7.14828 12.6165 8.10828 12.6485Z"
        fill="#565A6A"
      />
      <path
        d="M10.2603 16.6486C11.9963 16.6486 13.7243 16.6486 15.4603 16.6486C15.6597 16.6486 15.851 16.5694 15.992 16.4284C16.1331 16.2873 16.2123 16.0961 16.2123 15.8966C16.2123 15.6972 16.1331 15.5059 15.992 15.3649C15.851 15.2239 15.6597 15.1446 15.4603 15.1446C13.7243 15.1846 11.9963 15.1926 10.2603 15.1446C10.0752 15.1638 9.90387 15.2509 9.77928 15.389C9.6547 15.5272 9.58574 15.7066 9.58574 15.8926C9.58574 16.0787 9.6547 16.2581 9.77928 16.3962C9.90387 16.5344 10.0752 16.6215 10.2603 16.6406V16.6486Z"
        fill="#565A6A"
      />
      <path
        d="M8.33227 20.7047C10.312 20.7768 12.2943 20.7287 14.2683 20.5607C14.464 20.5493 14.6487 20.4664 14.7873 20.3278C14.9259 20.1892 15.0088 20.0045 15.0203 19.8087C15.0088 19.613 14.9259 19.4283 14.7873 19.2897C14.6487 19.1511 14.464 19.0682 14.2683 19.0567C12.2948 19.2327 10.312 19.2808 8.33227 19.2007C8.13283 19.2007 7.94156 19.28 7.80053 19.421C7.6595 19.562 7.58027 19.7533 7.58027 19.9527C7.58027 20.1522 7.6595 20.3435 7.80053 20.4845C7.94156 20.6255 8.13283 20.7047 8.33227 20.7047Z"
        fill="#565A6A"
      />
      <path
        d="M9.79616 24.6966L13.7962 24.6326C13.8983 24.6338 13.9997 24.6141 14.094 24.5748C14.1883 24.5355 14.2737 24.4774 14.3448 24.4041C14.4159 24.3307 14.4713 24.2436 14.5077 24.1481C14.544 24.0526 14.5605 23.9507 14.5562 23.8486C14.5449 23.6542 14.4632 23.4705 14.3262 23.3321C14.1892 23.1936 14.0064 23.1099 13.8122 23.0966L9.81216 23.1686C9.61409 23.1686 9.42402 23.2467 9.28322 23.386C9.14242 23.5253 9.06226 23.7145 9.06016 23.9126C9.07158 24.1083 9.15448 24.293 9.29311 24.4316C9.43174 24.5703 9.61644 24.6532 9.81216 24.6646L9.79616 24.6966Z"
        fill="#565A6A"
      />
      <path
        d="M30.6602 35.5526C30.8282 39.1846 30.7322 42.8166 30.7322 46.4486C30.7434 46.643 30.8251 46.8267 30.9621 46.9651C31.0991 47.1035 31.2819 47.1873 31.4762 47.2006C35.9402 47.2006 40.4042 47.3686 44.8682 47.3766C45.0639 47.3652 45.2486 47.2823 45.3872 47.1436C45.5258 47.005 45.6087 46.8203 45.6202 46.6246C45.6202 42.3579 45.6202 38.0699 45.6202 33.7606C45.601 33.5755 45.5139 33.4042 45.3758 33.2796C45.2376 33.155 45.0582 33.086 44.8722 33.086C44.6861 33.086 44.5067 33.155 44.3685 33.2796C44.2304 33.4042 44.1433 33.5755 44.1242 33.7606C44.1242 38.0486 44.1242 42.3366 44.1242 46.6246L44.8762 45.8726C40.4122 45.8726 35.9482 45.7046 31.4842 45.6966L32.2362 46.4486C32.2362 42.8166 32.3402 39.1846 32.1722 35.5526C32.1242 34.5926 30.6282 34.5846 30.6682 35.5526H30.6602Z"
        fill="#565A6A"
      />
      <path
        d="M34.0763 43.6246H42.3803C42.5653 43.6055 42.7367 43.5184 42.8613 43.3802C42.9859 43.2421 43.0548 43.0626 43.0548 42.8766C43.0548 42.6906 42.9859 42.5112 42.8613 42.373C42.7367 42.2349 42.5653 42.1478 42.3803 42.1286H34.0763C33.8913 42.1478 33.7199 42.2349 33.5953 42.373C33.4707 42.5112 33.4018 42.6906 33.4018 42.8766C33.4018 43.0626 33.4707 43.2421 33.5953 43.3802C33.7199 43.5184 33.8913 43.6055 34.0763 43.6246Z"
        fill="#565A6A"
      />
    </svg>
  );
};

export default BuyerHotel;