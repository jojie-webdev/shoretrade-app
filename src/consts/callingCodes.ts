const CALLING_CODES = [
  {
    name: 'Afghanistan',
    callingCode: '93',
    flag: '🇦🇫',
  },
  {
    name: 'Albania',
    callingCode: '355',
    flag: '🇦🇱',
  },
  {
    name: 'Algeria',
    callingCode: '213',
    flag: '🇩🇿',
  },
  {
    name: 'American Samoa',
    callingCode: '1684',
    flag: '🇦🇸',
  },
  {
    name: 'Andorra',
    callingCode: '376',
    flag: '🇦🇩',
  },
  {
    name: 'Angola',
    callingCode: '244',
    flag: '🇦🇴',
  },
  {
    name: 'Anguilla',
    callingCode: '1264',
    flag: '🇦🇮',
  },
  {
    name: 'Antarctica',
    callingCode: '672',
    flag: '🇦🇶',
  },
  {
    name: 'Antigua and Barbuda',
    callingCode: '1268',
    flag: '🇦🇬',
  },
  {
    name: 'Argentina',
    callingCode: '54',
    flag: '🇦🇷',
  },
  {
    name: 'Armenia',
    callingCode: '374',
    flag: '🇦🇲',
  },
  {
    name: 'Aruba',
    callingCode: '297',
    flag: '🇦🇼',
  },
  {
    name: 'Australia',
    callingCode: '61',
    flag: '🇦🇺',
  },
  {
    name: 'Austria',
    callingCode: '43',
    flag: '🇦🇹',
  },
  {
    name: 'Azerbaijan',
    callingCode: '994',
    flag: '🇦🇿',
  },
  {
    name: 'Bahamas',
    callingCode: '1242',
    flag: '🇧🇸',
  },
  {
    name: 'Bahrain',
    callingCode: '973',
    flag: '🇧🇭',
  },
  {
    name: 'Bangladesh',
    callingCode: '880',
    flag: '🇧🇩',
  },
  {
    name: 'Barbados',
    callingCode: '1246',
    flag: '🇧🇧',
  },
  {
    name: 'Belarus',
    callingCode: '375',
    flag: '🇧🇾',
  },
  {
    name: 'Belgium',
    callingCode: '32',
    flag: '🇧🇪',
  },
  {
    name: 'Belize',
    callingCode: '501',
    flag: '🇧🇿',
  },
  {
    name: 'Benin',
    callingCode: '229',
    flag: '🇧🇯',
  },
  {
    name: 'Bermuda',
    callingCode: '1441',
    flag: '🇧🇲',
  },
  {
    name: 'Bhutan',
    callingCode: '975',
    flag: '🇧🇹',
  },
  {
    name: 'Bolivia',
    callingCode: '591',
    flag: '🇧🇴',
  },
  {
    name: 'Bosnia and Herzegovina',
    callingCode: '387',
    flag: '🇧🇦',
  },
  {
    name: 'Botswana',
    callingCode: '267',
    flag: '🇧🇼',
  },
  {
    name: 'Bouvet Island',
    callingCode: '55',
    flag: '🇧🇻',
  },
  {
    name: 'Brazil',
    callingCode: '55',
    flag: '🇧🇷',
  },
  {
    name: 'British Indian Ocean Territory',
    callingCode: '246',
    flag: '🇮🇴',
  },
  {
    name: 'Brunei',
    callingCode: '673',
    flag: '🇧🇳',
  },
  {
    name: 'Bulgaria',
    callingCode: '359',
    flag: '🇧🇬',
  },
  {
    name: 'Burkina Faso',
    callingCode: '226',
    flag: '🇧🇫',
  },
  {
    name: 'Burundi',
    callingCode: '257',
    flag: '🇧🇮',
  },
  {
    name: 'Cambodia',
    callingCode: '855',
    flag: '🇰🇭',
  },
  {
    name: 'Cameroon',
    callingCode: '237',
    flag: '🇨🇲',
  },
  {
    name: 'Canada',
    callingCode: '1',
    flag: '🇨🇦',
  },
  {
    name: 'Cape Verde',
    callingCode: '238',
    flag: '🇨🇻',
  },
  {
    name: 'Caribbean Netherlands',
    callingCode: '599',
    flag: '🇧🇶',
  },
  {
    name: 'Cayman Islands',
    callingCode: '1345',
    flag: '🇰🇾',
  },
  {
    name: 'Central African Republic',
    callingCode: '236',
    flag: '🇨🇫',
  },
  {
    name: 'Chad',
    callingCode: '235',
    flag: '🇹🇩',
  },
  {
    name: 'Chile',
    callingCode: '56',
    flag: '🇨🇱',
  },
  {
    name: 'China',
    callingCode: '86',
    flag: '🇨🇳',
  },
  {
    name: 'Christmas Island',
    callingCode: '61',
    flag: '🇨🇽',
  },
  {
    name: 'Cocos (Keeling) Islands',
    callingCode: '61',
    flag: '🇨🇨',
  },
  {
    name: 'Colombia',
    callingCode: '57',
    flag: '🇨🇴',
  },
  {
    name: 'Comoros',
    callingCode: '269',
    flag: '🇰🇲',
  },
  {
    name: 'Congo',
    callingCode: '242',
    flag: '🇨🇬',
  },
  {
    name: 'Cook Islands',
    callingCode: '682',
    flag: '🇨🇰',
  },
  {
    name: 'Costa Rica',
    callingCode: '506',
    flag: '🇨🇷',
  },
  {
    name: 'Croatia',
    callingCode: '385',
    flag: '🇭🇷',
  },
  {
    name: 'Cuba',
    callingCode: '53',
    flag: '🇨🇺',
  },
  {
    name: 'Cyprus',
    callingCode: '357',
    flag: '🇨🇼',
  },
  {
    name: 'Czech Republic',
    callingCode: '420',
    flag: '🇨🇿',
  },
  {
    name: 'Denmark',
    callingCode: '45',
    flag: '🇩🇰',
  },
  {
    name: 'Djibouti',
    callingCode: '253',
    flag: '🇩🇯',
  },
  {
    name: 'Dominica',
    callingCode: '1767',
    flag: '🇩🇲',
  },
  {
    name: 'Dominican Republic',
    callingCode: '1849',
    flag: '🇩🇴',
  },
  {
    name: 'East Timor',
    callingCode: '670',
    flag: '🇹🇱',
  },
  {
    name: 'Ecuador',
    callingCode: '593',
    flag: '🇪🇨',
  },
  {
    name: 'Egypt',
    callingCode: '20',
    flag: '🇪🇬',
  },
  {
    name: 'El Salvador',
    callingCode: '503',
    flag: '🇸🇻',
  },
  {
    name: 'England',
    callingCode: '44',
    flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
  },
  {
    name: 'Equatorial Guinea',
    callingCode: '240',
    flag: '🇬🇶',
  },
  {
    name: 'Eritrea',
    callingCode: '291',
    flag: '🇪🇷',
  },
  {
    name: 'Estonia',
    callingCode: '372',
    flag: '🇪🇪',
  },
  {
    name: 'Ethiopia',
    callingCode: '251',
    flag: '🇪🇪',
  },
  {
    name: 'Falkland Islands',
    callingCode: '500',
    flag: '🇫🇰',
  },
  {
    name: 'Faroe Islands',
    callingCode: '298',
    flag: '🇫🇴',
  },
  {
    name: 'Fiji Islands',
    callingCode: '679',
    flag: '🇫🇯',
  },
  {
    name: 'Finland',
    callingCode: '358',
    flag: '🇫🇮',
  },
  {
    name: 'France',
    callingCode: '33',
    flag: '🇫🇷',
  },
  {
    name: 'French Guiana',
    callingCode: '594',
    flag: '🇬🇫',
  },
  {
    name: 'French Polynesia',
    callingCode: '689',
    flag: '🇵🇫',
  },
  {
    name: 'French Southern territories',
    callingCode: '262',
    flag: '🇹🇫',
  },
  {
    name: 'Gabon',
    callingCode: '241',
    flag: '🇬🇦',
  },
  {
    name: 'Gambia',
    callingCode: '220',
    flag: '🇬🇲',
  },
  {
    name: 'Georgia',
    callingCode: '995',
    flag: '🇬🇪',
  },
  {
    name: 'Germany',
    callingCode: '49',
    flag: '🇩🇪',
  },
  {
    name: 'Ghana',
    callingCode: '233',
    flag: '🇬🇭',
  },
  {
    name: 'Gibraltar',
    callingCode: '350',
    flag: '🇬🇮',
  },
  {
    name: 'Greece',
    callingCode: '30',
    flag: '🇬🇷',
  },
  {
    name: 'Greenland',
    callingCode: '299',
    flag: '🇬🇱',
  },
  {
    name: 'Grenada',
    callingCode: '1473',
    flag: '🇬🇩',
  },
  {
    name: 'Guadeloupe',
    callingCode: '590',
    flag: '🇬🇵',
  },
  {
    name: 'Guam',
    callingCode: '1671',
    flag: '🇬🇺',
  },
  {
    name: 'Guatemala',
    callingCode: '502',
    flag: '🇬🇹',
  },
  {
    name: 'Guinea',
    callingCode: '224',
    flag: '🇬🇬',
  },
  {
    name: 'Guinea-Bissau',
    callingCode: '245',
    flag: '🇬🇼',
  },
  {
    name: 'Guyana',
    callingCode: '592',
    flag: '🇬🇾',
  },
  {
    name: 'Haiti',
    callingCode: '509',
    flag: '🇭🇹',
  },
  {
    name: 'Heard Island and McDonald Islands',
    callingCode: '0',
    flag: '🇭🇲',
  },
  {
    name: 'Holy See (Vatican City State)',
    callingCode: '379',
    flag: '🇻🇦',
  },
  {
    name: 'Honduras',
    callingCode: '504',
    flag: '🇭🇳',
  },
  {
    name: 'Hong Kong',
    callingCode: '852',
    flag: '🇭🇰',
  },
  {
    name: 'Hungary',
    callingCode: '36',
    flag: '🇭🇺',
  },
  {
    name: 'Iceland',
    callingCode: '354',
    flag: '🇮🇸',
  },
  {
    name: 'India',
    callingCode: '91',
    flag: '🇮🇳',
  },
  {
    name: 'Indonesia',
    callingCode: '62',
    flag: '🇮🇩',
  },
  {
    name: 'Iran',
    callingCode: '98',
    flag: '🇮🇷',
  },
  {
    name: 'Iraq',
    callingCode: '964',
    flag: '🇮🇶',
  },
  {
    name: 'Ireland',
    callingCode: '353',
    flag: '🇮🇪',
  },
  {
    name: 'Israel',
    callingCode: '972',
    flag: '🇮🇱',
  },
  {
    name: 'Italy',
    callingCode: '39',
    flag: '🇮🇹',
  },
  {
    name: 'Ivory Coast',
    callingCode: '225',
    flag: '🇨🇮',
  },
  {
    name: 'Jamaica',
    callingCode: '1876',
    flag: '🇯🇲',
  },
  {
    name: 'Japan',
    callingCode: '81',
    flag: '🇯🇵',
  },
  {
    name: 'Jordan',
    callingCode: '962',
    flag: '🇯🇴',
  },
  {
    name: 'Kazakhstan',
    callingCode: '7',
    flag: '🇰🇿',
  },
  {
    name: 'Kenya',
    callingCode: '254',
    flag: '🇰🇪',
  },
  {
    name: 'Kiribati',
    callingCode: '686',
    flag: '🇰🇮',
  },
  {
    name: 'Kuwait',
    callingCode: '965',
    flag: '🇰🇼',
  },
  {
    name: 'Kyrgyzstan',
    callingCode: '996',
    flag: '🇰🇬',
  },
  {
    name: 'Laos',
    callingCode: '856',
    flag: '🇱🇦',
  },
  {
    name: 'Latvia',
    callingCode: '371',
    flag: '🇱🇻',
  },
  {
    name: 'Lebanon',
    callingCode: '961',
    flag: '🇱🇧',
  },
  {
    name: 'Lesotho',
    callingCode: '266',
    flag: '🇱🇸',
  },
  {
    name: 'Liberia',
    callingCode: '231',
    flag: '🇱🇷',
  },
  {
    name: 'Libyan Arab Jamahiriya',
    callingCode: '218',
    flag: '🇱🇾',
  },
  {
    name: 'Liechtenstein',
    callingCode: '423',
    flag: '🇱🇮',
  },
  {
    name: 'Lithuania',
    callingCode: '370',
    flag: '🇱🇹',
  },
  {
    name: 'Luxembourg',
    callingCode: '352',
    flag: '🇱🇺',
  },
  {
    name: 'Macao',
    callingCode: '853',
    flag: '🇲🇴',
  },
  {
    name: 'North Macedonia',
    callingCode: '389',
    flag: '🇲🇰',
  },
  {
    name: 'Madagascar',
    callingCode: '261',
    flag: '🇲🇬',
  },
  {
    name: 'Malawi',
    callingCode: '265',
    flag: '🇲🇼',
  },
  {
    name: 'Malaysia',
    callingCode: '60',
    flag: '🇲🇾',
  },
  {
    name: 'Maldives',
    callingCode: '960',
    flag: '🇲🇻',
  },
  {
    name: 'Mali',
    callingCode: '223',
    flag: '🇲🇱',
  },
  {
    name: 'Malta',
    callingCode: '356',
    flag: '🇲🇹',
  },
  {
    name: 'Marshall Islands',
    callingCode: '692',
    flag: '🇲🇭',
  },
  {
    name: 'Martinique',
    callingCode: '596',
    flag: '🇲🇶',
  },
  {
    name: 'Mauritania',
    callingCode: '222',
    flag: '🇲🇷',
  },
  {
    name: 'Mauritius',
    callingCode: '230',
    flag: '🇲🇺',
  },
  {
    name: 'Mayotte',
    callingCode: '262',
    flag: '🇾🇹',
  },
  {
    name: 'Mexico',
    callingCode: '52',
    flag: '🇲🇽',
  },
  {
    name: 'Micronesia, Federated States of',
    callingCode: '691',
    flag: '🇫🇲',
  },
  {
    name: 'Moldova',
    callingCode: '373',
    flag: '🇲🇩',
  },
  {
    name: 'Monaco',
    callingCode: '377',
    flag: '🇲🇨',
  },
  {
    name: 'Mongolia',
    callingCode: '976',
    flag: '🇲🇳',
  },
  {
    name: 'Montserrat',
    callingCode: '1664',
    flag: '🇲🇪',
  },
  {
    name: 'Morocco',
    callingCode: '212',
    flag: '🇲🇦',
  },
  {
    name: 'Mozambique',
    callingCode: '258',
    flag: '🇲🇿',
  },
  {
    name: 'Myanmar',
    callingCode: '95',
    flag: '🇲🇲',
  },
  {
    name: 'Namibia',
    callingCode: '264',
    flag: '🇳🇦',
  },
  {
    name: 'Nauru',
    callingCode: '674',
    flag: '🇳🇷',
  },
  {
    name: 'Nepal',
    callingCode: '977',
    flag: '🇳🇵',
  },
  {
    name: 'Netherlands',
    callingCode: '31',
    flag: '🇳🇱',
  },
  {
    name: 'New Caledonia',
    callingCode: '687',
    flag: '🇳🇨',
  },
  {
    name: 'New Zealand',
    callingCode: '64',
    flag: '🇳🇿',
  },
  {
    name: 'Nicaragua',
    callingCode: '505',
    flag: '🇳🇮',
  },
  {
    name: 'Niger',
    callingCode: '227',
    flag: '🇳🇪',
  },
  {
    name: 'Nigeria',
    callingCode: '234',
    flag: '🇳🇬',
  },
  {
    name: 'Niue',
    callingCode: '683',
    flag: '🇳🇺',
  },
  {
    name: 'Norfolk Island',
    callingCode: '672',
    flag: '🇳🇫',
  },
  {
    name: 'North Korea',
    callingCode: '850',
    flag: '🇰🇵',
  },
  {
    name: 'Northern Ireland',
    callingCode: '44',
    flag: '🇬🇧',
  },
  {
    name: 'Northern Mariana Islands',
    callingCode: '1670',
    flag: '🇲🇵',
  },
  {
    name: 'Norway',
    callingCode: '47',
    flag: '🇳🇴',
  },
  {
    name: 'Oman',
    callingCode: '968',
    flag: '🇴🇲',
  },
  {
    name: 'Pakistan',
    callingCode: '92',
    flag: '🇵🇰',
  },
  {
    name: 'Palau',
    callingCode: '680',
    flag: '🇵🇼',
  },
  {
    name: 'Palestine',
    callingCode: '970',
    flag: '🇵🇸',
  },
  {
    name: 'Panama',
    callingCode: '507',
    flag: '🇵🇦',
  },
  {
    name: 'Papua New Guinea',
    callingCode: '675',
    flag: '🇵🇬',
  },
  {
    name: 'Paraguay',
    callingCode: '595',
    flag: '🇵🇾',
  },
  {
    name: 'Peru',
    callingCode: '51',
    flag: '🇵🇪',
  },
  {
    name: 'Philippines',
    callingCode: '63',
    flag: '🇵🇭',
  },
  {
    name: 'Pitcairn',
    callingCode: '64',
    flag: '🇵🇳',
  },
  {
    name: 'Poland',
    callingCode: '48',
    flag: '🇵🇱',
  },
  {
    name: 'Portugal',
    callingCode: '351',
    flag: '🇵🇹',
  },
  {
    name: 'Puerto Rico',
    callingCode: '1939',
    flag: '🇵🇷',
  },
  {
    name: 'Qatar',
    callingCode: '974',
    flag: '🇶🇦',
  },
  {
    name: 'Reunion',
    callingCode: '262',
    flag: '🇷🇪',
  },
  {
    name: 'Romania',
    callingCode: '40',
    flag: '🇷🇴',
  },
  {
    name: 'Russian Federation',
    callingCode: '7',
    flag: '🇷🇺',
  },
  {
    name: 'Rwanda',
    callingCode: '250',
    flag: '🇷🇼',
  },
  {
    name: 'Saint Helena',
    callingCode: '290',
    flag: '🇸🇭',
  },
  {
    name: 'Saint Kitts and Nevis',
    callingCode: '1869',
    flag: '🇰🇳',
  },
  {
    name: 'Saint Lucia',
    callingCode: '1758',
    flag: '🇱🇨',
  },
  {
    name: 'Saint Pierre and Miquelon',
    callingCode: '508',
    flag: '🇵🇲',
  },
  {
    name: 'Saint Vincent and the Grenadines',
    callingCode: '1784',
    flag: '🇻🇨',
  },
  {
    name: 'Samoa',
    callingCode: '685',
    flag: '🇼🇸',
  },
  {
    name: 'San Marino',
    callingCode: '378',
    flag: '🇸🇲',
  },
  {
    name: 'Sao Tome and Principe',
    callingCode: '239',
    flag: '🇸🇹',
  },
  {
    name: 'Saudi Arabia',
    callingCode: '966',
    flag: '🇸🇦',
  },
  {
    name: 'Scotland',
    callingCode: '44',
    flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
  },
  {
    name: 'Senegal',
    callingCode: '221',
    flag: '🇸🇳',
  },
  {
    name: 'Seychelles',
    callingCode: '248',
    flag: '🇸🇨',
  },
  {
    name: 'Sierra Leone',
    callingCode: '232',
    flag: '🇸🇱',
  },
  {
    name: 'Singapore',
    callingCode: '65',
    flag: '🇸🇬',
  },
  {
    name: 'Slovakia',
    callingCode: '421',
    flag: '🇸🇰',
  },
  {
    name: 'Slovenia',
    callingCode: '386',
    flag: '🇸🇮',
  },
  {
    name: 'Solomon Islands',
    callingCode: '677',
    flag: '🇸🇧',
  },
  {
    name: 'Somalia',
    callingCode: '252',
    flag: '🇸🇴',
  },
  {
    name: 'South Africa',
    callingCode: '27',
    flag: '🇿🇦',
  },
  {
    name: 'South Georgia and the South Sandwich Islands',
    callingCode: '500',
    flag: '🇬🇸',
  },
  {
    name: 'South Korea',
    callingCode: '82',
    flag: '🇰🇷',
  },
  {
    name: 'South Sudan',
    callingCode: '211',
    flag: '🇸🇸',
  },
  {
    name: 'Spain',
    callingCode: '34',
    flag: '🇪🇸',
  },
  {
    name: 'SriLanka',
    callingCode: '94',
    flag: '🇱🇰',
  },
  {
    name: 'Sudan',
    callingCode: '249',
    flag: '🇸🇩',
  },
  {
    name: 'Suriname',
    callingCode: '597',
    flag: '🇸🇷',
  },
  {
    name: 'Svalbard and Jan Mayen',
    callingCode: '47',
    flag: '🇸🇯',
  },
  {
    name: 'Swaziland',
    callingCode: '268',
    flag: '🇸🇿',
  },
  {
    name: 'Sweden',
    callingCode: '46',
    flag: '🇸🇪',
  },
  {
    name: 'Switzerland',
    callingCode: '41',
    flag: '🇨🇭',
  },
  {
    name: 'Syria',
    callingCode: '963',
    flag: '🇸🇾',
  },
  { name: 'Taiwan', callingCode: '886', flag: '🇹🇼' },
  {
    name: 'Tajikistan',
    callingCode: '992',
    flag: '🇹🇯',
  },
  {
    name: 'Tanzania',
    callingCode: '255',
    flag: '🇹🇿',
  },
  {
    name: 'Thailand',
    callingCode: '66',
    flag: '🇹🇭',
  },
  {
    name: 'The Democratic Republic of Congo',
    callingCode: '243',
    flag: '🇨🇩',
  },
  {
    name: 'Togo',
    callingCode: '228',
    flag: '🇹🇬',
  },
  {
    name: 'Tokelau',
    callingCode: '690',
    flag: '🇹🇰',
  },
  {
    name: 'Tonga',
    callingCode: '676',
    flag: '🇹🇴',
  },
  {
    name: 'Trinidad and Tobago',
    callingCode: '1868',
    flag: '🇹🇹',
  },
  {
    name: 'Tunisia',
    callingCode: '216',
    flag: '🇹🇳',
  },
  {
    name: 'Turkey',
    callingCode: '90',
    flag: '🇹🇷',
  },
  {
    name: 'Turkmenistan',
    callingCode: '993',
    flag: '🇹🇲',
  },
  {
    name: 'Turks and Caicos Islands',
    callingCode: '1649',
    flag: '🇹🇨',
  },
  {
    name: 'Tuvalu',
    callingCode: '688',
    flag: '🇹🇻',
  },
  {
    name: 'Uganda',
    callingCode: '256',
    flag: '🇺🇬',
  },
  {
    name: 'Ukraine',
    callingCode: '380',
    flag: '🇺🇦',
  },
  {
    name: 'United Arab Emirates',
    callingCode: '971',
    flag: '🇦🇪',
  },
  {
    name: 'United Kingdom',
    callingCode: '44',
    flag: '🇬🇧',
  },
  {
    name: 'United States',
    callingCode: '1',
    flag: '🇺🇸',
  },
  {
    name: 'United States Minor Outlying Islands',
    callingCode: '246',
    flag: '🇺🇲',
  },
  {
    name: 'Uruguay',
    callingCode: '598',
    flag: '🇺🇾',
  },
  {
    name: 'Uzbekistan',
    callingCode: '998',
    flag: '🇺🇿',
  },
  {
    name: 'Vanuatu',
    callingCode: '678',
    flag: '🇻🇺',
  },
  {
    name: 'Venezuela',
    callingCode: '58',
    flag: '🇻🇪',
  },
  {
    name: 'Vietnam',
    callingCode: '84',
    flag: '🇻🇬',
  },
  {
    name: 'Virgin Islands, British',
    callingCode: '1284',
    flag: '🇻🇬',
  },
  {
    name: 'Virgin Islands, U.S.',
    callingCode: '1',
    flag: '🇻🇮',
  },
  {
    name: 'Wales',
    callingCode: '44',
    flag: '🏴󠁧󠁢󠁷󠁬󠁳󠁿',
  },
  {
    name: 'Wallis and Futuna',
    callingCode: '681',
    flag: '🇼🇫',
  },
  {
    name: 'Western Sahara',
    callingCode: '212',
    flag: '🇪🇭',
  },
  {
    name: 'Yemen',
    callingCode: '967',
    flag: '🇾🇪',
  },
  {
    name: 'Yugoslavia',
    callingCode: '38',
    flag: '🇷🇺',
  },
  {
    name: 'Zambia',
    callingCode: '260',
    flag: '🇿🇲',
  },
  {
    name: 'Zimbabwe',
    callingCode: '263',
    flag: '🇿🇼',
  },
];

export default CALLING_CODES;
