import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MoviePreview } from '../../models/movie-preview';
import { MovieDetail } from 'src/app/models/movies-detail';

import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-original-slider',
  templateUrl: './original-slider.component.html',
  styleUrls: ['./original-slider.component.css'],
})
export class OriginalSliderComponent implements OnInit {
  @Input() moviesList: MoviePreview[];
  @Input() category: string;
  @Input() openCategory: string;
  @Input() isContinue: boolean;
  @Output() sliderOpen = new EventEmitter();
  @Output() sliderClose = new EventEmitter();
  @Output() toggleMyList = new EventEmitter();

  tabShow: boolean = false;

  originalMovies: MoviePreview[] = [
    {
      id: 255,
      title: '내가 사랑했던 모든 남자들에게',
      url:
        'https://occ-0-3446-1007.1.nflxso.net/dnm/api/v6/0DW6CdE4gYtYx8iy3aj8gs9WtXE/AAAABZuP4XdcnjAJSDd_6DL2cwR6aHzqOpiyflFfM1qX2fQhSRMchyMss9diRYpu1Ek3OshwHim6I_9rlCplPYEhDMfjy3uqyrQg5Pw2cDPB_wbSGByg6LBqyxv8t9fT.jpg?r=50b',
      tallUrl:
        'https://occ-0-3446-1007.1.nflxso.net/dnm/api/v6/CFXrEYtXxhcqF3ItF4DehdUbQjk/AAAABZJe3jDIX-9WNvTxywhS0iuvPdzpABDFSVBDMiw0zLKD-R1strcMm0NrnLIz9bnUdnEl0jM-H2ZwA-fTonjtUx_jQiwcC1ZEASKeCGncXnD4AjnIo5yHb2afbZam2LStwgL23NPTUPLZQGtsWPQlT9QQl0wMau6jNDsA0qqvDqlthGJkH9vzhvgXGJbL6q7XiFW9257D.webp?r=873',
      marked: false,
    },
    {
      id: 245,
      title: '버드 박스',
      url:
        'https://occ-0-3446-1007.1.nflxso.net/dnm/api/v6/0DW6CdE4gYtYx8iy3aj8gs9WtXE/AAAABXaGwBEssmNrvhe5QvscpnzAA8FQmntR5fI0WYL6QcYZLhCvPkCWNiU7GZjlHhWlBvH_RTljgJhVbh8cPamCt4Cd281fVkhJ.webp?r=1f3',
      tallUrl:
        'https://occ-0-3446-1007.1.nflxso.net/dnm/api/v6/CFXrEYtXxhcqF3ItF4DehdUbQjk/AAAABa8OdY6CLaZ3AY4OyJ1eR6QjurSEp6V8N8EcFIEA6y1eBhdvPYC0Dlr0rh6B_3BmN3VZIerI_d5aXpgYQuTS6zWs2Ex2Y2844-Rrs2Fuupw6sI6ukrsFx6tFPP92UjAvu3ZOcrdx7k1XQPUhdCp6Xo9S8IoHU5YKAEW_3-XEypByL_ZCSkXk5Tarp2klaBozDIACGe5b.webp?r=7ef',
      marked: false,
    },
    {
      id: 235,
      title: '키싱 부스',
      url:
        'https://occ-0-3446-1007.1.nflxso.net/dnm/api/v6/0DW6CdE4gYtYx8iy3aj8gs9WtXE/AAAABZuP4XdcnjAJSDd_6DL2cwR6aHzqOpiyflFfM1qX2fQhSRMchyMss9diRYpu1Ek3OshwHim6I_9rlCplPYEhDMfjy3uqyrQg5Pw2cDPB_wbSGByg6LBqyxv8t9fT.jpg?r=50b',
      tallUrl:
        'https://occ-0-3446-1007.1.nflxso.net/dnm/api/v6/CFXrEYtXxhcqF3ItF4DehdUbQjk/AAAABejKc8kbengdmm5qedtNT21Kn40He7M-WFt_Wthvny8FbLEG6ustDA6NIS_aJMPk0lvPTrD6PAZG7khJ6mW22qmYDn4CbEPLa4grhOJ0DAHOhckxNjHW0AhA_ZNeOc51Y5Oef7ez4aSak6ilrM7oON_69Xm0g3KiXIaAoSSkdCdfL0jOhZ4HeFzFYKijuxO_kNWI46_-.webp?r=e2a',
      marked: false,
    },
    {
      id: 226,
      title: '시애라 연애 대작전',
      url:
        'https://occ-0-3446-1007.1.nflxso.net/dnm/api/v6/0DW6CdE4gYtYx8iy3aj8gs9WtXE/AAAABZuP4XdcnjAJSDd_6DL2cwR6aHzqOpiyflFfM1qX2fQhSRMchyMss9diRYpu1Ek3OshwHim6I_9rlCplPYEhDMfjy3uqyrQg5Pw2cDPB_wbSGByg6LBqyxv8t9fT.jpg?r=50b',
      tallUrl:
        'https://occ-0-3446-1007.1.nflxso.net/dnm/api/v6/CFXrEYtXxhcqF3ItF4DehdUbQjk/AAAABXgS5mQySoDlKg55PxUIrsmQ--XgfPR2WXuEujgyyNVQ6jGu3_YFuOSbuhwx63i3lhgXKohTmlIfn38gGKCOOUKFwB2JSraVVM3xSPKbRJtpgDXJ57mHjGYlNZAVcXJETw1DQmdhs_6p2mTkuG01LT5vz0c3NCqbbkYSnzsdYInsPaPxDGPe837596jbrzjhaa8svsSd.webp?r=d05',
      marked: false,
    },
    {
      id: 247,
      title: '어쩌다 로맨스',
      url:
        'https://occ-0-3446-1007.1.nflxso.net/dnm/api/v6/0DW6CdE4gYtYx8iy3aj8gs9WtXE/AAAABZuP4XdcnjAJSDd_6DL2cwR6aHzqOpiyflFfM1qX2fQhSRMchyMss9diRYpu1Ek3OshwHim6I_9rlCplPYEhDMfjy3uqyrQg5Pw2cDPB_wbSGByg6LBqyxv8t9fT.jpg?r=50b',
      tallUrl:
        'https://occ-0-3446-1007.1.nflxso.net/dnm/api/v6/CFXrEYtXxhcqF3ItF4DehdUbQjk/AAAABfyq6DZrJTHDkZlDyRqslzg_8mkeMbFd2Sn5SjKXEmk5eTED3tBG42zWeSYWj_lrlfl87iNQu9E6YFom1uiq86bCQCL7DZJXyMRZRavU3hlDM65UkNBrF8msgkDrkjzXRUkx0_hAkYTONd1tyivEODa1T5JC5W4J38MiPmC5gTxooWdMU5mGPi2b8UWPHIn7NcG42v0E.webp?r=fcd',
      marked: false,
    },
    {
      id: 162,
      title: '퍼펙트 데이트',
      url:
        'https://occ-0-3446-1007.1.nflxso.net/dnm/api/v6/0DW6CdE4gYtYx8iy3aj8gs9WtXE/AAAABZuP4XdcnjAJSDd_6DL2cwR6aHzqOpiyflFfM1qX2fQhSRMchyMss9diRYpu1Ek3OshwHim6I_9rlCplPYEhDMfjy3uqyrQg5Pw2cDPB_wbSGByg6LBqyxv8t9fT.jpg?r=50b',
      tallUrl:
        'https://occ-0-3446-1007.1.nflxso.net/dnm/api/v6/CFXrEYtXxhcqF3ItF4DehdUbQjk/AAAABRmURYm1pPVnRznvqFzhKW8jk751MgDg04OD2w0Fwln6pwnLufTO0A8TdOONkbZyDaJkyha_irLu_Dv5Q4BUmhIRZLDWgUC7khO5FQUa3c0VTIwDusTbEDyJX13yhq8GHrxS9fDuswuF_-Z0J7ZHK-6n1Mg7M_20OrGmg7Zl_mPdc0fnEW2iDrGzyZExa_P3u_s6ZWJO.webp?r=ca2',
      marked: false,
    },
    {
      id: 163,
      title: '리얼리티하이',
      url:
        'https://occ-0-3446-1007.1.nflxso.net/dnm/api/v6/0DW6CdE4gYtYx8iy3aj8gs9WtXE/AAAABZuP4XdcnjAJSDd_6DL2cwR6aHzqOpiyflFfM1qX2fQhSRMchyMss9diRYpu1Ek3OshwHim6I_9rlCplPYEhDMfjy3uqyrQg5Pw2cDPB_wbSGByg6LBqyxv8t9fT.jpg?r=50b',
      tallUrl:
        'https://occ-0-3446-1007.1.nflxso.net/dnm/api/v6/CFXrEYtXxhcqF3ItF4DehdUbQjk/AAAABYVUjYgZqSqtd8ET95UssYk-fCXkVS2AGV5uXGykwsnOE-zboW0zVw4FQ0mQhNm6D3rWyrBAV3-8g-nnSpnkGLAFWfn6IFUs7ZxaJ1Pk4VCMkhCftQyZgxCQqYl7Q4uDiI8VTZ-ao8hPiz6k6LPFKt1-DWxbkPyW5bVvrY4_daXPIkBWTkUHiLEYUcP03wjqxSTvKq6t.webp?r=e65',
      marked: false,
    },
    {
      id: 274,
      title: '캠 걸스',
      url:
        'https://occ-0-3446-1007.1.nflxso.net/dnm/api/v6/0DW6CdE4gYtYx8iy3aj8gs9WtXE/AAAABZuP4XdcnjAJSDd_6DL2cwR6aHzqOpiyflFfM1qX2fQhSRMchyMss9diRYpu1Ek3OshwHim6I_9rlCplPYEhDMfjy3uqyrQg5Pw2cDPB_wbSGByg6LBqyxv8t9fT.jpg?r=50b',
      tallUrl:
        'https://occ-0-3446-1007.1.nflxso.net/dnm/api/v6/CFXrEYtXxhcqF3ItF4DehdUbQjk/AAAABTy9L_MhXruQNVf9pSaSdmREMwbjhGfkcLLmA9FBtyU-NF4oJoM-vJZh0zrQ0p-JugLVCfHM1qu-3MX3tNmyWZ-9utmBf1UaJ9Gw23_XhrhWGIuuLprq0b6f-6wVHc3WQBpeGfPdE7TIxdrhHJR_VfAeYNyTB6jpUcgBM7sChz0cVYODPQJfa88ITm9VXW6U9CmXab5T.webp?r=a1e',
      marked: false,
    },
    {
      id: 368,
      title: '리얼리티하이',
      url:
        'https://occ-0-3446-1007.1.nflxso.net/dnm/api/v6/0DW6CdE4gYtYx8iy3aj8gs9WtXE/AAAABZuP4XdcnjAJSDd_6DL2cwR6aHzqOpiyflFfM1qX2fQhSRMchyMss9diRYpu1Ek3OshwHim6I_9rlCplPYEhDMfjy3uqyrQg5Pw2cDPB_wbSGByg6LBqyxv8t9fT.jpg?r=50b',
      tallUrl:
        'https://occ-0-3446-1007.1.nflxso.net/dnm/api/v6/CFXrEYtXxhcqF3ItF4DehdUbQjk/AAAABYVUjYgZqSqtd8ET95UssYk-fCXkVS2AGV5uXGykwsnOE-zboW0zVw4FQ0mQhNm6D3rWyrBAV3-8g-nnSpnkGLAFWfn6IFUs7ZxaJ1Pk4VCMkhCftQyZgxCQqYl7Q4uDiI8VTZ-ao8hPiz6k6LPFKt1-DWxbkPyW5bVvrY4_daXPIkBWTkUHiLEYUcP03wjqxSTvKq6t.webp?r=e65',
      marked: false,
    },
    {
      id: 256,
      title: '라스트 썸머',
      url:
        'https://occ-0-3446-1007.1.nflxso.net/dnm/api/v6/0DW6CdE4gYtYx8iy3aj8gs9WtXE/AAAABZuP4XdcnjAJSDd_6DL2cwR6aHzqOpiyflFfM1qX2fQhSRMchyMss9diRYpu1Ek3OshwHim6I_9rlCplPYEhDMfjy3uqyrQg5Pw2cDPB_wbSGByg6LBqyxv8t9fT.jpg?r=50b',
      tallUrl:
        'https://occ-0-3446-1007.1.nflxso.net/dnm/api/v6/CFXrEYtXxhcqF3ItF4DehdUbQjk/AAAABcux1meG7t-ssCbNgBld-nIsCrRLG8wM08CBcXCThhiRDJpzqiG7h0kPrDDK705oq90DC8rM8xoVWkCmaXJ04drGkhvAV1lQa5cvL9yXm0xJHk2ij1lxZGYW1HyGFsE_HqnYOyhevlZPV7E3xrzpKzSO1VOAkYagaURcQaDP67A3s1jZi-vs95orAuJGrK1oe1FgRk2n.webp?r=3dc',
      marked: false,
    },
    {
      id: 362,
      title: '상사에 대처하는 로맨틱한 자세',
      url:
        'https://occ-0-3446-1007.1.nflxso.net/dnm/api/v6/0DW6CdE4gYtYx8iy3aj8gs9WtXE/AAAABZuP4XdcnjAJSDd_6DL2cwR6aHzqOpiyflFfM1qX2fQhSRMchyMss9diRYpu1Ek3OshwHim6I_9rlCplPYEhDMfjy3uqyrQg5Pw2cDPB_wbSGByg6LBqyxv8t9fT.jpg?r=50b',
      tallUrl:
        'https://occ-0-3446-1007.1.nflxso.net/dnm/api/v6/CFXrEYtXxhcqF3ItF4DehdUbQjk/AAAABbchHR-WS8DKPEaScx9JjORg-MuMTbHXLYpYAB3NIg1JMrJt4OTMlYBfIjHM7f3moVY9KM05MYEyrLiTBrOANlMv2uH-HHzxj2NSTl9SMx_pmqhoGUGzEa3rC1BCzJzFJmLQ2hna-slmXHbAtrrbXLkKvCKPuTKzNeIm6v72paW-iSNQnAg-69hppXLE0TOKOaRCvANX.webp?r=936',
      marked: false,
    },
    {
      id: 274,
      title: '옥자',
      url:
        'https://occ-0-3446-1007.1.nflxso.net/dnm/api/v6/0DW6CdE4gYtYx8iy3aj8gs9WtXE/AAAABZuP4XdcnjAJSDd_6DL2cwR6aHzqOpiyflFfM1qX2fQhSRMchyMss9diRYpu1Ek3OshwHim6I_9rlCplPYEhDMfjy3uqyrQg5Pw2cDPB_wbSGByg6LBqyxv8t9fT.jpg?r=50b',
      tallUrl:
        'https://occ-0-3446-1007.1.nflxso.net/dnm/api/v6/CFXrEYtXxhcqF3ItF4DehdUbQjk/AAAABbwpSvK4mJwLG01cTcMjypbqmEpw3xtn5yyxYtZXAJ0GKyjugh7VNTwUjguw0K1EdPwT9VOoDzhGeztLg2Qcmxt85kCfZtwXRecNK-53zmJlGaxgvXGNvCtoO-TpkwK7mobVPB7brIHNqruhG33xmQ2VlAdaAeAYBoibMMCCsmF8XUHBDJY3r3ZHr93EQWV0NCoszq_C.webp?r=22e',
      marked: false,
    },
    {
      id: 263,
      title: '먼 훗날 우리',
      url:
        'https://occ-0-3446-1007.1.nflxso.net/dnm/api/v6/0DW6CdE4gYtYx8iy3aj8gs9WtXE/AAAABZuP4XdcnjAJSDd_6DL2cwR6aHzqOpiyflFfM1qX2fQhSRMchyMss9diRYpu1Ek3OshwHim6I_9rlCplPYEhDMfjy3uqyrQg5Pw2cDPB_wbSGByg6LBqyxv8t9fT.jpg?r=50b',
      tallUrl:
        'https://occ-0-3446-1007.1.nflxso.net/dnm/api/v6/CFXrEYtXxhcqF3ItF4DehdUbQjk/AAAABeeVT35LefYnqJy7hgOf9SPY1hwskOBycmsKOYiCQtgyFH-onRxziNJ0FgCB7g7lyCioOWyg8kaQ_uqa_rwOsXX2CYpnXfuqCZ70oUC5xavL8sdk408R21epyagfGOMeAI7No33N4X9FhlL9XWbbJtd9H017kOu-AmFdfp8jcnV4bR-lPAzBSd1G-LX7Ef6k2_Fm8R7L.webp?r=c2e',
      marked: false,
    },
    {
      id: 235,
      title: '배드 맘스',
      url:
        'https://occ-0-3446-1007.1.nflxso.net/dnm/api/v6/0DW6CdE4gYtYx8iy3aj8gs9WtXE/AAAABZuP4XdcnjAJSDd_6DL2cwR6aHzqOpiyflFfM1qX2fQhSRMchyMss9diRYpu1Ek3OshwHim6I_9rlCplPYEhDMfjy3uqyrQg5Pw2cDPB_wbSGByg6LBqyxv8t9fT.jpg?r=50b',
      tallUrl:
        'https://occ-0-988-993.1.nflxso.net/dnm/api/v6/CFXrEYtXxhcqF3ItF4DehdUbQjk/AAAABc_5_wzL0rpkPkR6_gXg4qhLuPovOEqqbTHV2cXjunPqUMa2sSC39LJ8w2yamwXIfA2MCUBwv1YBga9OXgyiSElf43n6aHsHMezqumzKiaGPRyMEXslbh_NjRiW0L1qMJxzPABaaiiOeL4si9QG4DmJF57Nx9Tu7BjidpVngFoXeoli6NkZNLf2-eng4WEBBw2M_T1c-.webp?r=4b0',
      marked: false,
    },
    {
      id: 343,
      title: '오! 라모나',
      url:
        'https://occ-0-3446-1007.1.nflxso.net/dnm/api/v6/0DW6CdE4gYtYx8iy3aj8gs9WtXE/AAAABZuP4XdcnjAJSDd_6DL2cwR6aHzqOpiyflFfM1qX2fQhSRMchyMss9diRYpu1Ek3OshwHim6I_9rlCplPYEhDMfjy3uqyrQg5Pw2cDPB_wbSGByg6LBqyxv8t9fT.jpg?r=50b',
      tallUrl:
        'https://occ-0-988-993.1.nflxso.net/dnm/api/v6/CFXrEYtXxhcqF3ItF4DehdUbQjk/AAAABS_t3gx665hnnQ2YMvid4V541Gw5Hvq8Ea7irUhq_qIh10IvPWIB4d7Me62kDzlfT_Y0cMXAgKr356x6eirIERT3Hs47L0_kSCrKcBXYy5FeAvrLG-xXveemXcVjKnWjUIoK2EvKn4uzjMZfGIwaQ3q_LZbGWEggVwYGhr9E4jY1b10VGicNc0s_WoS3xJC8jBahMFjS.webp?r=5a5',
      marked: false,
    },
    {
      id: 123,
      title: '나의 마더',
      url:
        'https://occ-0-3446-1007.1.nflxso.net/dnm/api/v6/0DW6CdE4gYtYx8iy3aj8gs9WtXE/AAAABZuP4XdcnjAJSDd_6DL2cwR6aHzqOpiyflFfM1qX2fQhSRMchyMss9diRYpu1Ek3OshwHim6I_9rlCplPYEhDMfjy3uqyrQg5Pw2cDPB_wbSGByg6LBqyxv8t9fT.jpg?r=50b',
      tallUrl:
        'https://occ-0-988-993.1.nflxso.net/dnm/api/v6/CFXrEYtXxhcqF3ItF4DehdUbQjk/AAAABXiI2ANwRbZ-_NoLn92BN7c3DvbwBu77M_4ZIj31YLYutt58-wh7y9V0iJlQlSQJAHXx91LDBudewYVGPD0Pl2CFYE4xciRtTKBVwESMLC55Hi2TSHTl7ly4lT7OxYQXptsoPpY4kIrRExoQWPAiwrRcFuScTYCpjMEU87iIbfrzniUgbnEbUuoJscV3fuGFZIWXfrRQ.webp?r=2e0',
      marked: false,
    },
    {
      id: 461,
      title: '나는 악마를 사랑했다',
      url:
        'https://occ-0-3446-1007.1.nflxso.net/dnm/api/v6/0DW6CdE4gYtYx8iy3aj8gs9WtXE/AAAABZuP4XdcnjAJSDd_6DL2cwR6aHzqOpiyflFfM1qX2fQhSRMchyMss9diRYpu1Ek3OshwHim6I_9rlCplPYEhDMfjy3uqyrQg5Pw2cDPB_wbSGByg6LBqyxv8t9fT.jpg?r=50b',
      tallUrl:
        'https://occ-0-988-993.1.nflxso.net/dnm/api/v6/CFXrEYtXxhcqF3ItF4DehdUbQjk/AAAABUrg4QSzdFsILgSY206U4CuG-QFUbCIOTaZJ0lKWeJn6jTj7YHSN91WhJglDnmojzaT7f1KIQNyXF6LLhqeNeV-WVsuVyhv4RubCT5do2ROHHF-1kzs68FFj1G6ItcGdlTgwpxJBryyqvn352RHEIz8MxzQrCZ7xkH1n1iwJpgzqS8aw6xV0vSN5iKsqZQ6hICkHKoM3.webp?r=dc4',
      marked: false,
    },
    {
      id: 367,
      title: '썸원 그레이트',
      url:
        'https://occ-0-3446-1007.1.nflxso.net/dnm/api/v6/0DW6CdE4gYtYx8iy3aj8gs9WtXE/AAAABZuP4XdcnjAJSDd_6DL2cwR6aHzqOpiyflFfM1qX2fQhSRMchyMss9diRYpu1Ek3OshwHim6I_9rlCplPYEhDMfjy3uqyrQg5Pw2cDPB_wbSGByg6LBqyxv8t9fT.jpg?r=50b',
      tallUrl:
        'https://occ-0-988-993.1.nflxso.net/dnm/api/v6/CFXrEYtXxhcqF3ItF4DehdUbQjk/AAAABaLkdgYQBQCeFBf9AztXzeqDjGvkajlLFAQ8AUbbF-lVxpgtRHlz9v8ADc0yRlzXZVm3ojKnHT9JWdBFOU-D1p2XrHoreVSuBlm2AWE-9iKeSk-a7OTKdnL2yNj0w1LrH7rU3rssgJah4mxUjpidnHbG8GkSCRgcXCB1NbMt-b-1mChZxNHXGzC1zfyOt6iA4p-WWVLb.webp?r=c39',
      marked: false,
    },
  ];
  movies: MoviePreview[] = this.originalMovies.map((movie, index) => ({
    ...movie,
    order: index + 1,
  }));
  moviesLength: number = this.originalMovies.length;

  // Tab 배열
  tab = [];
  tabLength;
  // 현재 slider
  sliderState = 1;
  // 현재 슬라이더 위치
  sliderPosition = 0;
  // padding 제거 후 기본 x 좌표
  XState = -16.897;
  // 한 slider 당 길이
  OneSliderLength = 99.8766666666667;
  // default 버튼, padding 삭제
  default = false;
  // transform, transition
  transform: any;
  transition: any;
  // slice 배열 저장
  sliderZero;
  sliderForth;
  // hover한 카드 id
  bobup: number;
  // 슬라이더 당 카드 개수
  cardCount: number = 6;
  // slider의 총 개수
  slider: number = this.movies.length / this.cardCount;
  // hover한 카드 0 ~ 7
  hoverCard: number = 8;
  cardTransform: any;
  cardTransition: any;
  bobScaleTall = 'scale(0.836)';
  cardMove: boolean = false;
  cardShowNumber;
  isOpen: boolean = false;
  moviesDetail: MovieDetail;
  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.tabArray();
    this.moviesDetail = {
      actors: [],
      author: [],
      big_image_path: '',
      can_i_store: false,
      circle_image: '',
      degree: {},
      directors: [],
      feature: [],
      genre: [],
      horizontal_image_path: '',
      id: 0,
      like: 0,
      logo_image_path: '',
      marked: false,
      match_rate: 0,
      name: '',
      production_date: '',
      real_running_time: 0,
      remaining_time: 0,
      running_time: 0,
      sample_video_file: '',
      similar_movies: [],
      synopsis: '',
      to_be_continue: 0,
      total_minute: 0,
      uploaded_date: '',
      vertical_image: '',
      vertical_sample_video_file: '',
      video_file: '',
    };
  }

  // ngOnChanges() {
  //   this.movies = this.moviesList.map((movie, index) => ({
  //     ...movie,
  //     order: index + 1
  //   }));
  //   console.log(this.movies);

  //   this.moviesLength = this.moviesList.length;
  //   console.log(this.moviesLength);

  //   if (this.default) {
  //     this.moviesClone();
  //   }
  //   this.slider = this.movies.length / this.cardCount;
  //   // console.log(this.category, this.movies);

  //   this.isOpen = this.category === this.openCategory;
  // }

  tabArray() {
    for (let i = 1; i <= this.slider; i++) {
      this.tab = [...this.tab, i];
    }
    // Tab의 길이
    this.tabLength = this.tab.length;
  }

  moviesClone() {
    this.sliderZero = this.movies.slice(this.movies.length - 7);
    this.sliderForth = this.movies.slice(0, 7);
    this.movies = this.sliderZero.concat(this.movies).concat(this.sliderForth);
  }

  prev() {
    this.transform = `translate3d(${this.sliderPosition +
      this.OneSliderLength}%, 0px, 0px)`;
    this.transition = `transform 0.75s ease 0s`;
    this.sliderPosition = this.sliderPosition + this.OneSliderLength;
    // console.log(this.sliderPosition + this.OneSliderLength);

    this.sliderState--;
    if (this.sliderState === 0) {
      this.sliderState = this.tabLength;
      // settimeout
      setTimeout(() => {
        this.transform = `translate3d(${this.XState -
          this.OneSliderLength * this.sliderState}%, 0px, 0px)`;
        this.transition = `none`;
        this.sliderPosition =
          this.XState - this.OneSliderLength * this.sliderState;
        // console.log(this.XState - this.OneSliderLength * this.sliderState);
      }, 750);
    }
  }

  next() {
    this.sliderState++;
    if (this.default) {
      this.transform = `translate3d(${this.sliderPosition -
        this.OneSliderLength}%, 0px, 0px)`;
      this.transition = `transform 0.75s ease 0s`;
      this.sliderPosition = this.sliderPosition - this.OneSliderLength;
      // console.log(this.sliderPosition - this.OneSliderLength);
    } else {
      // movies 뒷부분 clone
      this.moviesClone();
      // console.log(this.movies);

      this.transform = `translate3d(${this.XState -
        this.OneSliderLength * this.sliderState}%, 0px, 0px)`;
      this.transition = `transform 0.75s ease 0s`;
      this.default = true;
      this.sliderPosition =
        this.XState - this.OneSliderLength * this.sliderState;
      // console.log(this.XState - this.OneSliderLength * this.sliderState);
    }
    // console.log(this.sliderState);

    if (this.sliderState === this.tabLength + 1) {
      this.sliderState = 1;

      // settimeout
      setTimeout(() => {
        this.transform = `translate3d(${this.XState -
          this.OneSliderLength * this.sliderState}%, 0px, 0px)`;
        this.transition = `none`;
        this.sliderPosition =
          this.XState - this.OneSliderLength * this.sliderState;
      }, 750);
    }
  }
  timer;
  hoverTimeout(movieOrder) {
    this.timer = setTimeout(() => {
      this.cardHover(movieOrder);
    }, 600);
  }
  hoverTimeoutClear() {
    clearTimeout(this.timer);
    this.cardHoverLeave();
  }
  cardHover(movieOrder) {
    if (!this.isOpen) {
      // console.log("안열렸당");

      this.bobup = movieOrder;
      // console.log(this.movies);

      // console.log(this.bobup);
      // console.log(movieOrder);

      setTimeout(() => {
        this.bobScaleTall = 'scale(0.977777)';
      }, 300);
    }
    this.cardMove = true;
    // console.log("호버됬당");
    this.hoverCard =
      movieOrder % this.cardCount !== 0 ? movieOrder % this.cardCount : 6;
    // if (this.cardMove) return;
    // this.hoverMoviesDetail(movieId);
  }

  cardHoverLeave() {
    // console.log(this.moviesDetail);
    this.cardMove = false;
    this.bobScaleTall = 'scale(0.836)';
    setTimeout(() => {
      this.bobup = 0;
      this.moviesDetail = {
        actors: [],
        author: [],
        big_image_path: '',
        can_i_store: false,
        circle_image: '',
        degree: {},
        directors: [],
        feature: [],
        genre: [],
        horizontal_image_path: '',
        id: 0,
        like: 0,
        logo_image_path: '',
        marked: false,
        match_rate: 0,
        name: '',
        production_date: '',
        real_running_time: 0,
        remaining_time: 0,
        running_time: 0,
        sample_video_file: '',
        similar_movies: [],
        synopsis: '',
        to_be_continue: 0,
        total_minute: 0,
        uploaded_date: '',
        vertical_image: '',
        vertical_sample_video_file: '',
        video_file: '',
      };
    }, 300);

    // console.log("호버 나갔당");
    // console.log(this.isOpen);
  }

  // 보여주고 있는 카드 숫자 부여
  showNumber(movieOrder) {
    const showNumber = movieOrder % this.cardCount;
    const quotient =
      Math.floor(movieOrder / this.cardCount) === this.sliderState - 1
        ? showNumber
        : 0;
    // console.log(quotient);
    if (this.sliderState === 1 && movieOrder === 18) {
      this.cardShowNumber = showNumber;
      return this.cardShowNumber;
    }
    if (this.sliderState === 1 && (movieOrder === 6 || movieOrder === 7)) {
      this.cardShowNumber = showNumber + 6;
      return this.cardShowNumber;
    }
    if (this.sliderState === 2 && (movieOrder === 12 || movieOrder === 13)) {
      this.cardShowNumber = showNumber + 6;
      return this.cardShowNumber;
    }
    if (this.sliderState === 3 && (movieOrder === 18 || movieOrder === 1)) {
      this.cardShowNumber = showNumber + 6;
      return this.cardShowNumber;
    }
    this.cardShowNumber = quotient;
    return this.cardShowNumber;
  }

  // bobup 시 left 값 주기
  bobupLeft() {
    if (this.hoverCard === 1) return 0;
    else if (this.hoverCard === 6) return -20;
    return -10;
  }

  // 어디서 bobup이 될 것인지 정해주기
  bobupTransformOrigin() {
    if (this.hoverCard === 1) return 'left';
    else if (this.hoverCard === 6) return 'right';
    return;
  }

  showDetail() {
    // console.log(this.default);
    // console.log(this.bobup === order);
    this.bobup = 0;
    this.isOpen = true;
    this.sliderOpen.emit(this.category);
  }

  detailClosed() {
    this.sliderClose.emit(this.category);
    this.cardMove = false;
  }

  // hoverMoviesDetail(movieId) {
  //   this.movieService.getMovieDetail(movieId).subscribe(
  //     detail => (this.moviesDetail = detail),
  //     error => {
  //       console.log(error);
  //     }
  //   );
  // }

  myList(movie: MovieDetail) {
    this.movieService.myList(movie.id).subscribe(({ marked }) => {
      console.log('myList', movie.id, marked);
      movie.marked = marked;
      this.toggleMyList.emit();
    });
  }
}
