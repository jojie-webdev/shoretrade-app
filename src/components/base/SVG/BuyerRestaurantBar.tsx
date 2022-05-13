import React from 'react';

import { useTheme } from 'utils/Theme';

import { SVGProps } from './SVG.props';

const BuyerRestaurantBar = (props: SVGProps): JSX.Element => {
  const theme = useTheme();
  const { width, height, fill } = props;

  // Paste converted svg below
  // https://react-svgr.com/playground/?typescript=true
  return (
    <svg
      width={width || '66'}
      height={height || '44'}
      viewBox="0 0 66 44"
      fill={fill || 'none'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M55.5802 26.5605C55.3304 25.9723 55.1193 25.3683 54.9482 24.7525C54.8762 24.4725 54.8202 24.1925 54.7722 23.9525C54.7722 23.8725 54.7722 23.8005 54.7722 23.7285V23.6085C54.7722 23.4165 54.7242 23.2165 54.7002 23.0245C54.6888 22.8288 54.6059 22.6441 54.4673 22.5055C54.3286 22.3669 54.1439 22.284 53.9482 22.2725C53.7502 22.2746 53.5609 22.3548 53.4216 22.4956C53.2823 22.6364 53.2042 22.8265 53.2042 23.0245C53.2529 23.721 53.3491 24.4132 53.4922 25.0965C53.6673 25.7313 53.8838 26.354 54.1402 26.9605C54.2026 27.1457 54.3306 27.3017 54.5001 27.3989C54.6696 27.4962 54.8688 27.5281 55.0602 27.4885C55.247 27.426 55.4042 27.2967 55.5017 27.1255C55.5991 26.9543 55.6299 26.7531 55.5882 26.5605H55.5802Z"
        fill={fill || theme.grey.shade7}
      />
      <path
        d="M56.4681 15.9844C55.2268 17.13 54.1953 18.4837 53.4201 19.9844C53.314 20.1563 53.2805 20.3632 53.327 20.5598C53.3735 20.7563 53.4962 20.9263 53.6681 21.0324C53.8399 21.1385 54.0469 21.172 54.2434 21.1255C54.44 21.079 54.61 20.9563 54.7161 20.7844C55.075 20.0634 55.5009 19.3778 55.9881 18.7364L56.0681 18.6244C56.0681 18.6644 56.0201 18.6884 56.0681 18.6244L56.2601 18.3924L56.6521 17.9364C56.9321 17.6244 57.2201 17.3364 57.5241 17.0484C57.5934 16.9791 57.6484 16.8968 57.6859 16.8062C57.7235 16.7156 57.7428 16.6185 57.7428 16.5204C57.7428 16.4224 57.7235 16.3253 57.6859 16.2347C57.6484 16.1441 57.5934 16.0618 57.5241 15.9924C57.4547 15.9231 57.3724 15.8681 57.2818 15.8305C57.1912 15.793 57.0941 15.7737 56.9961 15.7737C56.898 15.7737 56.8009 15.793 56.7103 15.8305C56.6197 15.8681 56.5374 15.9231 56.4681 15.9924V15.9844Z"
        fill={fill || theme.grey.shade7}
      />
      <path
        d="M10.9722 21.4324C17.9562 15.6804 27.7722 14.7764 36.3322 16.5044C40.9302 17.4788 45.3962 18.9961 49.6362 21.0244C50.5002 21.4324 51.2362 20.1364 50.3882 19.7284C39.1882 14.5124 25.5882 11.5364 14.1082 17.5844C12.6186 18.3686 11.2139 19.3042 9.91617 20.3764C9.16417 20.9844 10.2362 22.0404 10.9722 21.4324Z"
        fill={fill || theme.grey.shade7}
      />
      <path
        d="M12.0601 25.4325C24.4761 30.0085 38.8281 29.7765 50.6681 23.6725C51.5241 23.2245 50.7721 21.9365 49.9081 22.3765C38.4121 28.3045 24.5001 28.4245 12.4601 23.9765C11.5561 23.6485 11.1641 25.0965 12.0601 25.4245V25.4325Z"
        fill={fill || theme.grey.shade7}
      />
      <path
        d="M9.91606 21.4325C10.9597 22.2607 12.0732 22.9968 13.2441 23.6325C13.4183 23.7291 13.6222 23.7571 13.816 23.7113C14.0099 23.6654 14.1796 23.5489 14.2921 23.3845C14.3794 23.21 14.4 23.0096 14.3499 22.821C14.2998 22.6325 14.1825 22.4687 14.0201 22.3605C13.4761 22.0645 12.9481 21.7445 12.4201 21.4085C12.1561 21.2485 11.9001 21.0725 11.6201 20.8965L11.2441 20.6325L11.1561 20.5605C11.1561 20.5605 11.0361 20.4725 11.1161 20.5605L11.0041 20.4805C10.8618 20.3432 10.6737 20.2634 10.4761 20.2565C10.3775 20.2562 10.2798 20.2758 10.1891 20.3143C10.0983 20.3528 10.0163 20.4094 9.94806 20.4805C9.87839 20.5497 9.82311 20.6319 9.78538 20.7226C9.74765 20.8132 9.72822 20.9104 9.72822 21.0085C9.72822 21.1067 9.74765 21.2039 9.78538 21.2945C9.82311 21.3851 9.87839 21.4674 9.94806 21.5365L9.91606 21.4325Z"
        fill={fill || theme.grey.shade7}
      />
      <path
        d="M12.9321 25.0564C13.0535 24.7901 13.2037 24.5379 13.3801 24.3044L13.2681 24.4564C13.4606 24.208 13.6837 23.9849 13.9321 23.7924L13.7801 23.9124C13.8514 23.8546 13.9262 23.8011 14.0041 23.7524C14.1694 23.6499 14.2917 23.4906 14.3481 23.3044C14.3919 23.1597 14.3906 23.0051 14.3443 22.8612C14.2981 22.7173 14.2091 22.5909 14.0892 22.4988C13.9693 22.4067 13.8243 22.3533 13.6733 22.3457C13.5223 22.3382 13.3726 22.3768 13.2441 22.4564C12.5463 22.9083 11.9914 23.5492 11.6441 24.3044C11.5876 24.3869 11.557 24.4844 11.5561 24.5844C11.5283 24.6811 11.5283 24.7837 11.5561 24.8804C11.6125 25.0666 11.7348 25.2259 11.9001 25.3284C12.0754 25.418 12.2777 25.4398 12.4681 25.3896C12.6585 25.3395 12.8237 25.2208 12.9321 25.0564Z"
        fill={fill || theme.grey.shade7}
      />
      <path
        d="M17.3561 20.8966C17.3643 20.9469 17.3643 20.9983 17.3561 21.0486L17.4361 20.8646L17.3641 20.9926L17.4761 20.8406C17.4455 20.8792 17.4106 20.9141 17.3721 20.9446L17.5241 20.8246C17.4861 20.8562 17.4428 20.8806 17.3961 20.8966L17.5801 20.8246L17.4361 20.8646H17.6361C17.5884 20.8727 17.5398 20.8727 17.4921 20.8646H17.6921L17.4921 20.8246L17.6681 20.8966C17.6222 20.8788 17.5791 20.8545 17.5401 20.8246L17.6921 20.9366C17.6542 20.9079 17.6217 20.8727 17.5961 20.8326L17.7081 20.9846L17.6361 20.8646L17.7161 21.0406C17.6954 20.995 17.6819 20.9464 17.6761 20.8966V21.0966V20.9606V21.1606C17.6808 21.1081 17.6944 21.0567 17.7161 21.0086L17.6361 21.1926C17.658 21.1471 17.6848 21.1042 17.7161 21.0646L17.5961 21.2166C17.6266 21.1781 17.6615 21.1432 17.7001 21.1126L17.5481 21.2246L17.6761 21.1526L17.5001 21.2326L17.6361 21.1926H17.4441H17.5801H17.3801L17.5241 21.2326L17.3481 21.1606C17.3948 21.1767 17.4381 21.2011 17.4761 21.2326L17.3241 21.1126C17.3626 21.1432 17.3975 21.1781 17.4281 21.2166L17.3081 21.0646C17.338 21.1037 17.3623 21.1468 17.3801 21.1926L17.3081 21.0166C17.3156 21.0643 17.3156 21.1129 17.3081 21.1606V20.9606C17.316 21.0056 17.316 21.0516 17.3081 21.0966C17.3044 21.1965 17.3265 21.2957 17.3721 21.3846C17.4002 21.4768 17.4528 21.5597 17.5241 21.6246C17.6684 21.7638 17.8597 21.8437 18.0601 21.8486C18.1586 21.8485 18.2561 21.8286 18.3468 21.7902C18.4375 21.7517 18.5196 21.6954 18.5881 21.6246L18.7081 21.4726C18.7715 21.3571 18.8071 21.2283 18.8121 21.0966C18.8146 20.9701 18.8012 20.8438 18.7721 20.7206C18.7758 20.6941 18.7758 20.6672 18.7721 20.6406C18.7396 20.5532 18.7022 20.4678 18.6601 20.3846C18.6601 20.3286 18.5881 20.2806 18.5561 20.2326C18.5204 20.1837 18.4802 20.1381 18.4361 20.0966C18.3724 20.034 18.3027 19.9777 18.2281 19.9286L18.1481 19.8806C18.0412 19.8193 17.925 19.7761 17.8041 19.7526H17.5241C17.4281 19.7526 17.3321 19.7526 17.2441 19.7526C17.1223 19.782 17.0043 19.8249 16.8921 19.8806L16.8201 19.9286C16.7414 19.9755 16.6689 20.0319 16.6041 20.0966L16.5401 20.1606L16.3801 20.3766C16.3401 20.4566 16.3081 20.5446 16.2761 20.6246C16.2727 20.6565 16.2727 20.6887 16.2761 20.7206C16.256 20.8478 16.256 20.9774 16.2761 21.1046C16.2816 21.1963 16.295 21.2873 16.3161 21.3766C16.3424 21.4651 16.3773 21.5508 16.4201 21.6326C16.4726 21.7401 16.5399 21.8398 16.6201 21.9286L16.6841 21.9926C16.7512 22.0523 16.8235 22.1058 16.9001 22.1526C16.9266 22.1733 16.9564 22.1895 16.9881 22.2006C17.0699 22.2435 17.1556 22.2783 17.2441 22.3046C17.3334 22.3257 17.4244 22.3391 17.5161 22.3446H17.6201C17.717 22.3391 17.8133 22.3258 17.9081 22.3046C17.9987 22.2769 18.087 22.2421 18.1721 22.2006C18.2885 22.1484 18.3942 22.0751 18.4841 21.9846C18.5329 21.9395 18.5759 21.8884 18.6121 21.8326C18.6539 21.7854 18.6913 21.7345 18.7241 21.6806C18.7681 21.5956 18.8056 21.5074 18.8361 21.4166C18.8398 21.3794 18.8398 21.3419 18.8361 21.3046C18.8639 21.2079 18.8639 21.1053 18.8361 21.0086C18.8314 20.9092 18.8011 20.8128 18.7481 20.7286C18.6455 20.5633 18.4863 20.441 18.3001 20.3846C18.2029 20.3567 18.1011 20.3488 18.0008 20.3611C17.9004 20.3735 17.8036 20.406 17.7161 20.4566L17.5641 20.5766C17.47 20.6649 17.3986 20.7747 17.3561 20.8966Z"
        fill={fill || theme.grey.shade7}
      />
      <path
        d="M32.3721 24.7363L36.5561 19.1363C36.6551 18.9643 36.682 18.7601 36.6311 18.5683C36.5801 18.3765 36.4554 18.2126 36.2841 18.1123C36.1106 18.0242 35.9108 18.0024 35.7223 18.051C35.5338 18.0996 35.3695 18.2153 35.2601 18.3763L31.0921 23.9763C30.9914 24.1471 30.9626 24.351 31.0121 24.543C31.0616 24.735 31.1853 24.8995 31.3561 25.0003C31.5269 25.1011 31.7308 25.1299 31.9228 25.0804C32.1149 25.0309 32.2794 24.9071 32.3801 24.7363H32.3721Z"
        fill={fill || theme.grey.shade7}
      />
      <path
        d="M37.4921 24.6324L40.6921 20.2484C40.791 20.0764 40.818 19.8722 40.767 19.6804C40.7161 19.4886 40.5914 19.3247 40.4201 19.2244C40.2465 19.1363 40.0467 19.1145 39.8582 19.1631C39.6697 19.2117 39.5054 19.3274 39.3961 19.4884L36.1961 23.8644C36.1457 23.9489 36.1125 24.0425 36.0985 24.1398C36.0845 24.2371 36.0899 24.3363 36.1145 24.4315C36.139 24.5267 36.1822 24.6161 36.2415 24.6946C36.3008 24.773 36.3751 24.8389 36.4601 24.8884C36.6336 24.9796 36.8345 25.0039 37.0248 24.9567C37.215 24.9095 37.3813 24.7941 37.4921 24.6324Z"
        fill={fill || theme.grey.shade7}
      />
      <path
        d="M27.8921 24.3206L31.6361 19.2646C31.6867 19.1795 31.72 19.0853 31.7341 18.9873C31.7482 18.8894 31.7428 18.7896 31.7183 18.6937C31.6938 18.5979 31.6506 18.5078 31.5911 18.4286C31.5317 18.3495 31.4573 18.2829 31.3721 18.2326C31.1976 18.1452 30.9972 18.1246 30.8086 18.1747C30.62 18.2248 30.4562 18.3421 30.3481 18.5046L26.6041 23.5526C26.5044 23.7236 26.4762 23.9271 26.5257 24.1188C26.5751 24.3105 26.6981 24.475 26.8681 24.5766C27.0407 24.6654 27.2399 24.6885 27.4283 24.6414C27.6167 24.5943 27.7815 24.4803 27.8921 24.3206Z"
        fill={fill || theme.grey.shade7}
      />
      <path
        d="M49.3561 20.1124C50.1144 19.2908 51.0463 18.6485 52.0841 18.2324C53.6034 17.5713 55.2293 17.1892 56.8841 17.1044C57.8441 17.0484 57.8521 15.5524 56.8841 15.6084C54.9925 15.7065 53.1338 16.1428 51.3961 16.8964C50.2192 17.3715 49.162 18.1009 48.3001 19.0324C48.1696 19.1789 48.0976 19.3683 48.0976 19.5644C48.0976 19.7606 48.1696 19.9499 48.3001 20.0964C48.4408 20.2352 48.6305 20.313 48.8281 20.313C49.0257 20.313 49.2154 20.2352 49.3561 20.0964V20.1124Z"
        fill={fill || theme.grey.shade7}
      />
      <path
        d="M48.5001 24.3843C49.2814 25.2904 50.2432 26.0234 51.3241 26.5363C52.4213 27.1097 53.6252 27.4502 54.8601 27.5363C55.0452 27.5172 55.2166 27.4301 55.3411 27.2919C55.4657 27.1538 55.5347 26.9744 55.5347 26.7883C55.5347 26.6023 55.4657 26.4229 55.3411 26.2847C55.2166 26.1466 55.0452 26.0595 54.8601 26.0403C54.3955 26.0103 53.9362 25.9243 53.4921 25.7843C52.9804 25.6399 52.4846 25.4442 52.0121 25.2003C51.0887 24.7497 50.2708 24.109 49.6121 23.3203C49.4714 23.1816 49.2818 23.1038 49.0841 23.1038C48.8865 23.1038 48.6969 23.1816 48.5561 23.3203C48.4257 23.4668 48.3536 23.6562 48.3536 23.8523C48.3536 24.0485 48.4257 24.2378 48.5561 24.3843H48.5001Z"
        fill={fill || theme.grey.shade7}
      />
      <path
        d="M21.8202 18.8406C21.8202 18.7606 21.8762 18.9686 21.8202 18.8406C21.8202 18.9206 21.8202 18.9366 21.8762 18.9926C21.9322 19.0486 21.9322 19.1846 21.9562 19.2806C22.0176 19.5065 22.063 19.7364 22.0922 19.9686C22.0922 19.8566 22.0922 20.0326 22.0922 20.0486V20.6726C22.0922 20.9526 22.0922 21.2246 22.0922 21.4726C22.1025 22.4652 21.9345 23.4515 21.5962 24.3846C21.5545 24.5772 21.5853 24.7784 21.6827 24.9496C21.7801 25.1208 21.9373 25.2501 22.1242 25.3126C22.3183 25.3672 22.5259 25.3464 22.7054 25.2544C22.8849 25.1625 23.023 25.0061 23.0922 24.8166C23.474 23.7293 23.6687 22.5851 23.6682 21.4326C23.7344 20.286 23.5374 19.1394 23.0922 18.0806C22.9838 17.9162 22.8186 17.7976 22.6281 17.7474C22.4377 17.6972 22.2355 17.719 22.0602 17.8086C21.8971 17.9182 21.7801 18.084 21.7314 18.2743C21.6827 18.4646 21.7058 18.6662 21.7962 18.8406H21.8202Z"
        fill={fill || theme.grey.shade7}
      />
      <path
        d="M27.3401 15.3044C29.2586 13.2014 31.7236 11.6726 34.4601 10.8884L33.5321 9.96041L32.4681 13.1604C32.1641 14.0804 33.6121 14.4724 33.9161 13.5604L34.9801 10.3604C35.0157 10.2326 35.0169 10.0975 34.9835 9.9691C34.95 9.84065 34.8832 9.72334 34.7898 9.62908C34.6963 9.53483 34.5796 9.46698 34.4514 9.43244C34.3233 9.39789 34.1883 9.39788 34.0601 9.43241C31.0773 10.2845 28.3886 11.9459 26.2921 14.2324C25.6441 14.9444 26.7001 16.0084 27.3481 15.2964L27.3401 15.3044Z"
        fill={fill || theme.grey.shade7}
      />
      <path
        d="M27.5242 28.6326C28.6202 30.9846 31.2362 31.9766 33.6202 32.4566C34.1402 32.5606 34.7482 32.1126 34.5482 31.5286C34.3534 30.9614 34.1984 30.3813 34.0842 29.7926C34.0301 29.6023 33.9032 29.441 33.731 29.3437C33.5588 29.2464 33.3551 29.2208 33.1642 29.2726C32.9706 29.3354 32.8082 29.4696 32.7101 29.648C32.612 29.8263 32.5856 30.0354 32.6362 30.2326C32.7504 30.8213 32.9054 31.4014 33.1002 31.9686L34.0202 31.0326C31.9562 30.6166 29.7482 29.8806 28.8122 27.8966C28.7107 27.7266 28.5462 27.6036 28.3545 27.5542C28.1628 27.5047 27.9593 27.5329 27.7882 27.6326C27.633 27.741 27.5212 27.901 27.4729 28.0842C27.4245 28.2673 27.4427 28.4616 27.5242 28.6326Z"
        fill={fill || theme.grey.shade7}
      />
      <path
        d="M51.0122 29.4324C49.4674 33.1533 46.8443 36.3267 43.4807 38.5443C40.1171 40.7619 36.1668 41.9221 32.1382 41.8756C28.1096 41.8292 24.1871 40.5782 20.8755 38.2836C17.5639 35.989 15.0148 32.7559 13.5562 29.0004C13.2122 28.1124 11.7642 28.4964 12.1082 29.4004C13.6579 33.4703 16.3975 36.9792 19.97 39.47C23.5424 41.9607 27.7822 43.3177 32.137 43.3643C36.4918 43.411 40.7597 42.145 44.3847 39.7313C48.0097 37.3177 50.8237 33.8682 52.4602 29.8324C52.8282 28.9364 51.3802 28.5524 51.0122 29.4324Z"
        fill={fill || theme.grey.shade7}
      />
      <path
        d="M13.2921 15.7045C14.3103 12.7617 15.9956 10.0944 18.2162 7.91131C20.4368 5.72821 23.1324 4.08851 26.0921 3.12049C29.1513 2.13861 32.3988 1.89057 35.5717 2.39646C38.7445 2.90234 41.7538 4.14794 44.3561 6.03249C47.2393 8.16955 49.5055 11.0319 50.9241 14.3285C51.3161 15.2085 52.6041 14.4485 52.2201 13.5685C50.8495 10.4621 48.77 7.72022 46.1484 5.56265C43.5268 3.40507 40.4361 1.8919 37.1241 1.14449C33.7853 0.411939 30.3215 0.469498 27.0089 1.31258C23.6963 2.15567 20.6264 3.76096 18.0441 6.00049C15.2142 8.50974 13.0928 11.718 11.8921 15.3045C11.5721 16.2245 13.0201 16.6165 13.3321 15.7045H13.2921Z"
        fill={fill || theme.grey.shade7}
      />
      <path
        d="M46.5082 27.6487C45.6898 29.5367 44.5046 31.2435 43.0214 32.6699C41.5382 34.0964 39.7865 35.2141 37.8679 35.9583C35.9494 36.7025 33.9022 37.0584 31.845 37.0052C29.7879 36.952 27.7618 36.4909 25.8842 35.6487C25.0122 35.2567 24.2842 36.5527 25.1242 36.9447C27.2029 37.8948 29.4511 38.4178 31.7357 38.4828C34.0203 38.5478 36.2947 38.1534 38.424 37.323C40.5533 36.4927 42.4942 35.2432 44.1316 33.6487C45.769 32.0542 47.0696 30.1472 47.9562 28.0407C48.3242 27.1527 46.8762 26.7687 46.5082 27.6487Z"
        fill={fill || theme.grey.shade7}
      />
      <path
        d="M36.5081 7.42456C38.174 7.89808 39.75 8.64417 41.1721 9.63256C41.3432 9.73221 41.5466 9.76038 41.7383 9.71095C41.9301 9.66153 42.0945 9.5385 42.1961 9.36856C42.2857 9.19322 42.3075 8.99099 42.2573 8.80058C42.2072 8.61017 42.0885 8.44495 41.9241 8.33656C40.3926 7.28243 38.6979 6.48779 36.9081 5.98456C36.7172 5.93152 36.5129 5.95651 36.3404 6.05403C36.1679 6.15154 36.0411 6.31361 35.9881 6.50456C35.9351 6.69552 35.96 6.89973 36.0576 7.07226C36.1551 7.24479 36.3172 7.37152 36.5081 7.42456Z"
        fill={fill || theme.grey.shade7}
      />
      <path
        d="M19.7321 13.3686C21.1617 11.3617 23.0488 9.72429 25.2371 8.59185C27.4255 7.45942 29.8521 6.86459 32.3161 6.85661C32.5155 6.85661 32.7068 6.77738 32.8478 6.63636C32.9889 6.49533 33.0681 6.30406 33.0681 6.10461C33.0681 5.90517 32.9889 5.7139 32.8478 5.57287C32.7068 5.43184 32.5155 5.35261 32.3161 5.35261C29.5896 5.37134 26.9072 6.04189 24.4927 7.30831C22.0781 8.57472 20.0015 10.4003 18.4361 12.6326C17.8841 13.4326 19.1801 14.1766 19.7321 13.3926V13.3686Z"
        fill={fill || theme.grey.shade7}
      />
      <path
        d="M60.6281 21.2564V33.7924C60.6281 35.3924 60.5401 36.9924 60.6281 38.5924C60.6281 39.2013 60.87 39.7853 61.3006 40.2159C61.7312 40.6465 62.3152 40.8884 62.9241 40.8884C63.533 40.8884 64.117 40.6465 64.5476 40.2159C64.9782 39.7853 65.2201 39.2013 65.2201 38.5924C65.3801 35.5284 65.2201 32.4164 65.2201 29.3604V2.61636C65.2118 2.45457 65.1546 2.29911 65.056 2.17054C64.9575 2.04198 64.8222 1.94637 64.6681 1.89636C63.0921 1.38436 61.8601 3.83236 61.1881 4.91236C60.1135 6.61217 59.4127 8.52105 59.1321 10.5124C58.6281 14.1684 58.9801 18.3764 60.7321 21.7124C61.1801 22.5604 62.4761 21.8084 62.0201 20.9124C60.6281 18.2724 60.3321 15.0484 60.4841 12.1124C60.5435 10.5073 60.9045 8.92786 61.5481 7.45636C61.875 6.73292 62.2603 6.03729 62.7001 5.37636C62.8681 5.12836 64.0281 3.30436 64.3001 3.37636L63.7481 2.65636V37.2004C63.7721 37.5947 63.7721 37.9901 63.7481 38.3844C63.7561 38.4588 63.7561 38.5339 63.7481 38.6084C63.7481 38.8205 63.6638 39.024 63.5138 39.174C63.3638 39.3241 63.1603 39.4084 62.9481 39.4084C62.7359 39.4084 62.5325 39.3241 62.3824 39.174C62.2324 39.024 62.1481 38.8205 62.1481 38.6084C62.0321 37.2215 62.0321 35.8273 62.1481 34.4404V21.2564C62.1481 21.0548 62.068 20.8615 61.9255 20.719C61.783 20.5764 61.5897 20.4964 61.3881 20.4964C61.1865 20.4964 60.9932 20.5764 60.8507 20.719C60.7082 20.8615 60.6281 21.0548 60.6281 21.2564Z"
        fill={fill || theme.grey.shade7}
      />
      <path
        d="M2.84423 17.1126V37.3686C2.84423 38.6406 2.79623 39.9686 4.15623 40.6326C6.03623 41.5366 7.42023 39.8326 7.43623 38.1126C7.43623 34.5286 7.43623 30.9126 7.43623 27.3686V17.1046C7.43623 16.9052 7.357 16.7139 7.21597 16.5729C7.07495 16.4318 6.88367 16.3526 6.68423 16.3526C6.48479 16.3526 6.29351 16.4318 6.15249 16.5729C6.01146 16.7139 5.93223 16.9052 5.93223 17.1046V36.1766C6.00209 36.9751 6.00209 37.7781 5.93223 38.5766C5.93223 38.7888 5.84795 38.9923 5.69792 39.1423C5.54789 39.2923 5.3444 39.3766 5.13223 39.3766C4.92006 39.3766 4.71657 39.2923 4.56655 39.1423C4.41652 38.9923 4.33223 38.7888 4.33223 38.5766C4.32824 38.502 4.32824 38.4272 4.33223 38.3526C4.31223 37.9555 4.31223 37.5577 4.33223 37.1606V17.1606C4.31307 16.9756 4.226 16.8042 4.08784 16.6796C3.94969 16.555 3.77026 16.4861 3.58423 16.4861C3.3982 16.4861 3.21877 16.555 3.08062 16.6796C2.94246 16.8042 2.85539 16.9756 2.83623 17.1606L2.84423 17.1126Z"
        fill={fill || theme.grey.shade7}
      />
      <path
        d="M3.98815 16.4485C2.63615 15.5125 2.29215 13.5285 2.22015 12.0085C2.14823 9.96713 2.36367 7.92582 2.86015 5.94447C3.09215 5.00047 1.63615 4.63247 1.41215 5.54447C0.823196 7.81727 0.60173 10.1697 0.756146 12.5125C0.948146 14.4885 1.55615 16.5605 3.22815 17.7445C4.02815 18.2965 4.77215 16.9925 4.02815 16.4485H3.98815Z"
        fill={fill || theme.grey.shade7}
      />
      <path
        d="M6.90812 17.7445C8.61212 16.5605 9.18812 14.4885 9.37212 12.5125C9.52674 10.1683 9.29705 7.81455 8.69212 5.54447C8.50012 4.63247 7.09212 5.00047 7.27612 5.94447C7.76452 7.92696 7.97188 9.96826 7.89212 12.0085C7.80412 13.5285 7.47612 15.5125 6.12412 16.4485C5.32412 16.9925 6.08412 18.2965 6.88412 17.7445H6.90812Z"
        fill={fill || theme.grey.shade7}
      />
      <path
        d="M3.27607 5.0886V10.4566C3.27607 10.656 3.3553 10.8473 3.49633 10.9883C3.63736 11.1294 3.82863 11.2086 4.02807 11.2086C4.22752 11.2086 4.41879 11.1294 4.55982 10.9883C4.70085 10.8473 4.78007 10.656 4.78007 10.4566V5.0886C4.78007 4.98984 4.76062 4.89206 4.72283 4.80082C4.68504 4.70958 4.62965 4.62668 4.55982 4.55685C4.48999 4.48702 4.40709 4.43163 4.31585 4.39384C4.22462 4.35605 4.12683 4.3366 4.02807 4.3366C3.92932 4.3366 3.83153 4.35605 3.7403 4.39384C3.64906 4.43163 3.56616 4.48702 3.49633 4.55685C3.4265 4.62668 3.37111 4.70958 3.33332 4.80082C3.29553 4.89206 3.27607 4.98984 3.27607 5.0886Z"
        fill={fill || theme.grey.shade7}
      />
      <path
        d="M5.28418 5.08832V10.4563C5.30334 10.6414 5.39041 10.8127 5.52856 10.9373C5.66672 11.0619 5.84614 11.1309 6.03218 11.1309C6.21821 11.1309 6.39764 11.0619 6.53579 10.9373C6.67394 10.8127 6.76101 10.6414 6.78018 10.4563V5.08832C6.79102 4.98359 6.77975 4.87776 6.7471 4.77766C6.71445 4.67756 6.66115 4.58544 6.59064 4.50725C6.52012 4.42906 6.43398 4.36655 6.33778 4.32376C6.24158 4.28097 6.13746 4.25886 6.03218 4.25886C5.92689 4.25886 5.82277 4.28097 5.72657 4.32376C5.63037 4.36655 5.54423 4.42906 5.47372 4.50725C5.40321 4.58544 5.3499 4.67756 5.31725 4.77766C5.2846 4.87776 5.27333 4.98359 5.28418 5.08832Z"
        fill={fill || theme.grey.shade7}
      />
    </svg>
  );
};

export default BuyerRestaurantBar;
