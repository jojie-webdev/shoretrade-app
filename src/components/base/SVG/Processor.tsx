import React from 'react';

import { useTheme } from 'utils/Theme';

import { SVGProps } from './SVG.props';

const Processor = (props: SVGProps): JSX.Element => {
  const theme = useTheme();
  const { width, height, fill } = props;

  // Paste converted svg below
  // https://react-svgr.com/playground/?typescript=true
  return (
    <svg
      width={width || '68'}
      height={height || '66'}
      viewBox="0 0 68 66"
      fill={fill || 'none'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M44.9479 28.5479C43.2552 31.7045 40.4882 34.1508 37.1479 35.4439C33.3239 36.7719 29.2279 36.2439 26.4359 33.1639V34.2199C27.5893 32.7097 29.1365 31.5464 30.9076 30.8578C32.6787 30.1691 34.6052 29.9816 36.4759 30.3159C40.2439 31.0199 43.1639 33.4439 45.9879 35.9159C46.0729 35.9883 46.1721 36.0422 46.2792 36.074C46.3862 36.1059 46.4988 36.1149 46.6096 36.1006C46.7204 36.0863 46.8269 36.0489 46.9224 35.9909C47.0179 35.9329 47.1001 35.8556 47.1639 35.7639C48.4119 33.4999 48.1159 29.9479 45.9719 28.2999C45.1719 27.7159 44.4599 29.0199 45.2199 29.5959C46.7079 30.6919 46.7079 33.5159 45.9079 34.9879L47.0919 34.8359C43.8919 32.0599 40.5799 29.3959 36.2599 28.7639C34.2261 28.486 32.155 28.746 30.253 29.518C28.351 30.29 26.6846 31.5471 25.4199 33.1639C25.2916 33.3098 25.2209 33.4975 25.2209 33.6919C25.2209 33.8862 25.2916 34.0739 25.4199 34.2199C28.4759 37.5719 33.0279 38.3399 37.2759 36.9959C41.1301 35.6426 44.3418 32.9016 46.2839 29.3079C46.7079 28.4599 45.4119 27.6999 44.9479 28.5479Z"
        fill="#565A6A"
      />
      <path
        d="M31.1879 34.0359C31.6385 34.0359 32.0039 33.6705 32.0039 33.2199C32.0039 32.7692 31.6385 32.4039 31.1879 32.4039C30.7372 32.4039 30.3719 32.7692 30.3719 33.2199C30.3719 33.6705 30.7372 34.0359 31.1879 34.0359Z"
        fill="#565A6A"
      />
      <path
        d="M16.0679 39.1237C17.1353 40.1534 17.9887 41.3838 18.5791 42.7444C19.1694 44.1049 19.4851 45.5688 19.5079 47.0517C19.4849 48.6438 18.9708 50.1899 18.0357 51.4787C17.1006 52.7675 15.7903 53.7359 14.2839 54.2517L15.1319 54.6037C14.1473 53.2542 13.6416 51.6145 13.6952 49.9448C13.7489 48.2751 14.3587 46.6712 15.4279 45.3877C17.3239 42.9877 20.1639 41.6437 22.8439 40.3317C22.9423 40.2735 23.0261 40.1936 23.089 40.0982C23.152 40.0027 23.1923 39.8942 23.2069 39.7808C23.2216 39.6674 23.2102 39.5522 23.1736 39.4439C23.1371 39.3355 23.0763 39.237 22.9959 39.1557C21.3959 37.5557 18.2439 36.7957 16.2119 37.9477C16.0497 38.0531 15.9344 38.217 15.8899 38.4053C15.8454 38.5935 15.8752 38.7917 15.9731 38.9586C16.0709 39.1254 16.2293 39.2482 16.4154 39.3013C16.6014 39.3544 16.8007 39.3338 16.9719 39.2437C18.4119 38.4437 20.8359 39.0917 21.9399 40.2197L22.0919 39.0357C19.0039 40.5477 15.8679 42.1397 13.8359 45.0197C12.7606 46.5284 12.1826 48.335 12.1826 50.1877C12.1826 52.0404 12.7606 53.847 13.8359 55.3557C13.9251 55.4929 14.0542 55.5994 14.2058 55.6609C14.3575 55.7224 14.5243 55.736 14.6839 55.6997C16.4165 55.1206 17.9386 54.0409 19.0578 52.5971C20.177 51.1532 20.8431 49.41 20.9719 47.5877C21.3079 44.0917 19.5079 40.4837 17.1079 38.0677C16.9623 37.9666 16.7856 37.9201 16.6091 37.9366C16.4326 37.953 16.2675 38.0313 16.1431 38.1577C16.0187 38.284 15.9429 38.4502 15.9292 38.6269C15.9154 38.8037 15.9645 38.9796 16.0679 39.1237Z"
        fill="#565A6A"
      />
      <path
        d="M15.6119 51.0038C16.0626 51.0038 16.4279 50.6385 16.4279 50.1878C16.4279 49.7372 16.0626 49.3718 15.6119 49.3718C15.1612 49.3718 14.7959 49.7372 14.7959 50.1878C14.7959 50.6385 15.1612 51.0038 15.6119 51.0038Z"
        fill="#565A6A"
      />
      <path
        d="M50.8039 9.09188C52.6679 11.2759 54.0039 14.4119 53.6119 17.3399C53.445 18.9103 52.8025 20.3923 51.7702 21.5875C50.738 22.7827 49.3653 23.6342 47.8359 24.0279L48.6839 24.3719C47.8177 22.9652 47.442 21.3111 47.6157 19.6682C47.7894 18.0253 48.5027 16.4863 49.6439 15.2919C51.6839 13.0599 54.5639 11.9079 57.3079 10.8119C57.4268 10.767 57.5333 10.6945 57.6186 10.6003C57.7039 10.5061 57.7655 10.3929 57.7983 10.2701C57.8312 10.1474 57.8343 10.0185 57.8075 9.89434C57.7806 9.77013 57.7245 9.65411 57.6439 9.55587C56.1719 7.81987 53.0519 6.92387 50.9559 7.95587C50.0839 8.36387 50.8439 9.65987 51.7079 9.25187C53.2119 8.53988 55.5799 9.46788 56.5799 10.6519L56.9159 9.39587C53.7159 10.6839 50.3639 12.0359 48.1159 14.7959C46.9157 16.2317 46.1979 18.009 46.0643 19.8757C45.9308 21.7424 46.3883 23.6038 47.3719 25.1959C47.4611 25.3331 47.5903 25.4396 47.7419 25.5011C47.8935 25.5626 48.0604 25.5761 48.2199 25.5399C49.9937 25.0797 51.5898 24.1008 52.804 22.7284C54.0182 21.356 54.7953 19.6525 55.0359 17.8359C55.5559 14.3479 54.0839 10.7159 51.8359 8.09988C51.2359 7.29188 50.1719 8.36387 50.8039 9.09188Z"
        fill="#565A6A"
      />
      <path
        d="M49.508 21.0519C49.9587 21.0519 50.324 20.6865 50.324 20.2359C50.324 19.7852 49.9587 19.4199 49.508 19.4199C49.0573 19.4199 48.692 19.7852 48.692 20.2359C48.692 20.6865 49.0573 21.0519 49.508 21.0519Z"
        fill="#565A6A"
      />
      <path
        d="M1.61993 38.7078L45.4999 2.13979C46.2439 1.51579 45.1799 0.45979 44.4439 1.07579L0.555932 37.6438C-0.180068 38.2678 0.883932 39.3238 1.61993 38.7078Z"
        fill="#565A6A"
      />
      <path
        d="M23.5639 65.1718L67.4439 28.6038C68.1799 27.9878 67.1159 26.9318 66.3799 27.5398L27.9399 59.5718L22.4999 64.0918C21.7559 64.7158 22.8199 65.7718 23.5639 65.1558V65.1718Z"
        fill="#565A6A"
      />
      <path
        d="M19.3719 54.9157L23.0039 59.2437L23.5079 59.8517C23.5777 59.9216 23.6606 59.9771 23.7519 60.0149C23.8432 60.0528 23.941 60.0722 24.0399 60.0722C24.1387 60.0722 24.2365 60.0528 24.3278 60.0149C24.4191 59.9771 24.502 59.9216 24.5719 59.8517C24.7023 59.7052 24.7744 59.5159 24.7744 59.3197C24.7744 59.1236 24.7023 58.9342 24.5719 58.7877L20.4359 53.8837C20.2894 53.7533 20.1 53.6812 19.9039 53.6812C19.7077 53.6812 19.5184 53.7533 19.3719 53.8837C19.2414 54.0302 19.1693 54.2196 19.1693 54.4157C19.1693 54.6119 19.2414 54.8012 19.3719 54.9477V54.9157Z"
        fill="#565A6A"
      />
      <path
        d="M5.97186 38.9399L10.3079 44.0919L10.9239 44.8199C11.0646 44.9587 11.2542 45.0365 11.4519 45.0365C11.6495 45.0365 11.8391 44.9587 11.9799 44.8199C12.1103 44.6734 12.1824 44.4841 12.1824 44.2879C12.1824 44.0918 12.1103 43.9024 11.9799 43.7559L7.64386 38.6039L7.03586 37.8759C6.96602 37.806 6.88309 37.7506 6.79181 37.7127C6.70052 37.6749 6.60268 37.6554 6.50386 37.6554C6.40505 37.6554 6.3072 37.6749 6.21592 37.7127C6.12463 37.7506 6.0417 37.806 5.97186 37.8759C5.84141 38.0224 5.76934 38.2118 5.76934 38.4079C5.76934 38.6041 5.84141 38.7934 5.97186 38.9399Z"
        fill="#565A6A"
      />
      <path
        d="M22.9079 43.2919L30.4199 52.2439L31.5079 53.4839C32.1319 54.2279 33.1879 53.1639 32.5639 52.4279L23.9719 42.2119C23.3479 41.4759 22.2919 42.5399 22.9079 43.2759V43.2919Z"
        fill="#565A6A"
      />
      <path
        d="M13.908 32.5719L16.436 35.5879L16.788 36.0119C16.9345 36.1424 17.1239 36.2144 17.32 36.2144C17.5162 36.2144 17.7055 36.1424 17.852 36.0119C17.9825 35.8654 18.0545 35.6761 18.0545 35.4799C18.0545 35.2837 17.9825 35.0944 17.852 34.9479L15.356 31.9319L14.996 31.5079C14.8553 31.3691 14.6656 31.2914 14.468 31.2914C14.2704 31.2914 14.0807 31.3691 13.94 31.5079C13.8096 31.6544 13.7375 31.8437 13.7375 32.0399C13.7375 32.2361 13.8096 32.4254 13.94 32.5719H13.908Z"
        fill="#565A6A"
      />
      <path
        d="M33.3559 40.1798L38.2199 45.9878L38.9079 46.7878C38.9777 46.8577 39.0607 46.9131 39.1519 46.951C39.2432 46.9888 39.3411 47.0083 39.4399 47.0083C39.5387 47.0083 39.6365 46.9888 39.7278 46.951C39.8191 46.9131 39.902 46.8577 39.9719 46.7878C40.1001 46.6418 40.1709 46.4541 40.1709 46.2598C40.1709 46.0654 40.1001 45.8778 39.9719 45.7318L35.0999 39.9238L34.4199 39.1238C34.2764 39.0009 34.0919 38.9365 33.9031 38.9434C33.7143 38.9504 33.5351 39.0281 33.401 39.1612C33.2669 39.2943 33.1878 39.4729 33.1794 39.6617C33.1711 39.8504 33.2341 40.0354 33.3559 40.1798Z"
        fill="#565A6A"
      />
      <path
        d="M21.3719 25.8918L24.3799 29.4758L24.8039 29.9798C24.873 30.0495 24.9553 30.1048 25.0459 30.1425C25.1365 30.1802 25.2337 30.1997 25.3319 30.1997C25.43 30.1997 25.5272 30.1802 25.6178 30.1425C25.7084 30.1048 25.7907 30.0495 25.8599 29.9798C25.9881 29.8338 26.0588 29.6462 26.0588 29.4518C26.0588 29.2575 25.9881 29.0698 25.8599 28.9238L22.8519 25.3318L22.4279 24.8278C22.2871 24.6891 22.0975 24.6113 21.8999 24.6113C21.7022 24.6113 21.5126 24.6891 21.3719 24.8278C21.2414 24.9743 21.1693 25.1637 21.1693 25.3598C21.1693 25.556 21.2414 25.7453 21.3719 25.8918Z"
        fill="#565A6A"
      />
      <path
        d="M45.6119 38.9397L46.7079 40.2517L46.8599 40.4437C47.0054 40.58 47.1966 40.657 47.3959 40.6597C47.5925 40.6551 47.7804 40.5782 47.9239 40.4437C48.0631 40.2994 48.143 40.1081 48.1479 39.9077V39.7077C48.116 39.5825 48.0494 39.4689 47.9559 39.3797L46.8519 38.0597L46.6919 37.8757C46.5511 37.7372 46.3615 37.6596 46.1639 37.6597C45.9673 37.6644 45.7794 37.7413 45.6359 37.8757C45.5651 37.9443 45.5088 38.0263 45.4704 38.117C45.4319 38.2077 45.412 38.3052 45.4119 38.4037V38.6037C45.4437 38.7313 45.5101 38.8476 45.6039 38.9397H45.6119Z"
        fill="#565A6A"
      />
      <path
        d="M29.332 19.5237L35.052 26.3477L35.852 27.3077C35.9964 27.4295 36.1814 27.4925 36.3701 27.4842C36.5588 27.4758 36.7375 27.3967 36.8706 27.2626C37.0037 27.1286 37.0814 26.9493 37.0883 26.7605C37.0953 26.5717 37.0309 26.3872 36.908 26.2437L31.188 19.4277L30.388 18.4677C30.3181 18.3978 30.2352 18.3424 30.1439 18.3045C30.0526 18.2667 29.9548 18.2472 29.856 18.2472C29.7572 18.2472 29.6593 18.2667 29.568 18.3045C29.4768 18.3424 29.3938 18.3978 29.324 18.4677C29.1957 18.6137 29.125 18.8014 29.125 18.9957C29.125 19.1901 29.1957 19.3777 29.324 19.5237H29.332Z"
        fill="#565A6A"
      />
      <path
        d="M49.7959 27.9396L54.2839 33.2916L54.9159 34.0436C55.0566 34.1824 55.2463 34.2602 55.4439 34.2602C55.6415 34.2602 55.8312 34.1824 55.9719 34.0436C56.1024 33.8971 56.1744 33.7078 56.1744 33.5116C56.1744 33.3155 56.1024 33.1262 55.9719 32.9796L51.5079 27.6276L50.8759 26.8756C50.8067 26.806 50.7245 26.7507 50.6339 26.713C50.5433 26.6752 50.4461 26.6558 50.3479 26.6558C50.2497 26.6558 50.1526 26.6752 50.0619 26.713C49.9713 26.7507 49.8891 26.806 49.8199 26.8756C49.6895 27.0222 49.6174 27.2115 49.6174 27.4076C49.6174 27.6038 49.6895 27.7931 49.8199 27.9396H49.7959Z"
        fill="#565A6A"
      />
      <path
        d="M37.3719 13.1319L43.0919 19.948C43.2353 20.0708 43.4198 20.1352 43.6086 20.1283C43.7974 20.1214 43.9767 20.0436 44.1108 19.9105C44.2449 19.7775 44.3239 19.5988 44.3323 19.4101C44.3407 19.2213 44.2777 19.0364 44.1559 18.892L39.1399 12.8919L38.4359 12.0919C38.366 12.022 38.2831 11.9666 38.1918 11.9287C38.1005 11.8909 38.0027 11.8714 37.9039 11.8714C37.805 11.8714 37.7072 11.8909 37.6159 11.9287C37.5246 11.9666 37.4417 12.022 37.3719 12.0919C37.2414 12.2385 37.1693 12.4278 37.1693 12.6239C37.1693 12.8201 37.2414 13.0094 37.3719 13.1559V13.1319Z"
        fill="#565A6A"
      />
      <path
        d="M56.3959 19.5239L62.1079 26.3479L62.9079 27.3079C63.0544 27.4383 63.2437 27.5104 63.4399 27.5104C63.636 27.5104 63.8253 27.4383 63.9719 27.3079C64.1023 27.1614 64.1744 26.972 64.1744 26.7759C64.1744 26.5797 64.1023 26.3904 63.9719 26.2439L58.2519 19.4279L57.4519 18.4679C57.3825 18.3985 57.3002 18.3435 57.2096 18.306C57.119 18.2685 57.0219 18.2492 56.9239 18.2492C56.8258 18.2492 56.7287 18.2685 56.6381 18.306C56.5475 18.3435 56.4652 18.3985 56.3959 18.4679C56.3265 18.5372 56.2715 18.6195 56.234 18.7101C56.1965 18.8007 56.1771 18.8978 56.1771 18.9959C56.1771 19.0939 56.1965 19.191 56.234 19.2816C56.2715 19.3722 56.3265 19.4545 56.3959 19.5239Z"
        fill="#565A6A"
      />
      <path
        d="M45.3799 6.38785L47.0999 8.44385L47.3399 8.73185C47.4455 8.83599 47.5795 8.90658 47.7252 8.93472C47.8708 8.96287 48.0215 8.94732 48.1583 8.89002C48.2951 8.83273 48.412 8.73626 48.4941 8.61274C48.5762 8.48922 48.62 8.34417 48.6199 8.19585C48.6097 8.00047 48.5336 7.81432 48.4039 7.66785L46.7079 5.61985L46.4599 5.33185C46.3888 5.2577 46.303 5.1994 46.2078 5.1608C46.1127 5.12219 46.0105 5.10415 45.9079 5.10785C45.8093 5.10794 45.7118 5.12782 45.6211 5.1663C45.5304 5.20477 45.4484 5.26107 45.3799 5.33185C45.3087 5.4001 45.2522 5.4821 45.2137 5.57286C45.1752 5.66362 45.1555 5.76126 45.1559 5.85985C45.1689 6.05607 45.2478 6.24214 45.3799 6.38785Z"
        fill="#565A6A"
      />
    </svg>
  );
};

export default Processor;
