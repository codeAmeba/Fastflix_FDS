import { Component, OnInit, Input } from "@angular/core";
import { MoviePreview } from "../../models/movie-preview";

// interface Movies {
//   id: number;
//   title: string;
//   url: string;
// }

@Component({
  selector: "app-slider",
  templateUrl: "./slider.component.html",
  styleUrls: ["./slider.component.css"]
})
export class SliderComponent implements OnInit {
  constructor() {}
  ngOnInit() {
    this.tabArray();
    // console.log(this.tabLength);
    // console.log(this.tab);
  }
  // @Input() moviesList: MoviePreview[];
  moviesList: MoviePreview[] = [
    {
      id: 1,
      title: "맘마미아2",
      url:
        "https://occ-0-3446-1007.1.nflxso.net/dnm/api/v6/0DW6CdE4gYtYx8iy3aj8gs9WtXE/AAAABXaGwBEssmNrvhe5QvscpnzAA8FQmntR5fI0WYL6QcYZLhCvPkCWNiU7GZjlHhWlBvH_RTljgJhVbh8cPamCt4Cd281fVkhJ.webp?r=1f3"
    },
    {
      id: 2,
      title: "타이타닉",
      url:
        "https://occ-0-3446-1007.1.nflxso.net/dnm/api/v6/0DW6CdE4gYtYx8iy3aj8gs9WtXE/AAAABSutMRiJg2Zr7FKCHrNO4_sfkGbbPSdCKN5lWVXhUMkpy8MTSshI6_tTSPzHwo5uWErPGTJh3k5B2pohz2-D6Sae8EJ3Rj4l.webp?r=48b"
    },
    {
      id: 3,
      title: "건축학개론",
      url:
        "https://occ-0-3446-1007.1.nflxso.net/dnm/api/v6/0DW6CdE4gYtYx8iy3aj8gs9WtXE/AAAABaHz8fTzwa2_UxsWPUCpUzSjB_tpTBYiTBpHRO77CkoXB-IbXM_rveYRCv8N6zkr-onKgqm4iR6XkxeDBb4FXfTlWlZ6XEhD.jpg?r=283"
    },
    {
      id: 4,
      title: "call me by your name",
      url:
        "https://occ-0-3446-1007.1.nflxso.net/dnm/api/v6/0DW6CdE4gYtYx8iy3aj8gs9WtXE/AAAABUOADmsGnDEBa9vFBwJZIjJkYYPngtOpl5wHeNmbQe6Hd9BOccuVFHzoG256PQmJxmxPFTv8nPRDm9LQsgn0CGeWHNurdO5A.webp?r=6b9"
    },
    {
      id: 5,
      title: "월터의 상상은 현실이 된다",
      url:
        "https://occ-0-3446-1007.1.nflxso.net/dnm/api/v6/0DW6CdE4gYtYx8iy3aj8gs9WtXE/AAAABdyrpIMkdiFb7ml5Lgjnxr_FA_vVjiVFgQ_ZDu08SnC8KU3KbkDE5l7znCVTw8miwgizzghciJxDfNWUsI8Kr0MgP_CvGpA4.webp?r=54a"
    },
    {
      id: 6,
      title: "500일의 썸머",
      url:
        "https://occ-0-3446-1007.1.nflxso.net/dnm/api/v6/0DW6CdE4gYtYx8iy3aj8gs9WtXE/AAAABbiKZiwAN3U9UX0NZHhYRCEpGrs0_E7U6_1UMHSi_xahiIGGJ2TEATVYKEkLxgthrNcX-N218mXt_3AFS5qcXxWwyi1M2YnY.webp?r=1ba"
    },
    {
      id: 7,
      title: "위대한 개츠비",
      url:
        "https://occ-0-3446-1007.1.nflxso.net/dnm/api/v6/0DW6CdE4gYtYx8iy3aj8gs9WtXE/AAAABVeL6k-GWe---AxBQgF4_oSbskK_hAmjCQArTnGWNFcZp3SduDrRsnLfU9SH32g582FH9Mz4lYSv6dPQinjM85-7DcUHP0Wg.jpg?r=d12"
    },
    {
      id: 8,
      title: "내가 사랑했던 모든 남자들에게",
      url:
        "https://occ-0-3446-1007.1.nflxso.net/dnm/api/v6/0DW6CdE4gYtYx8iy3aj8gs9WtXE/AAAABZuP4XdcnjAJSDd_6DL2cwR6aHzqOpiyflFfM1qX2fQhSRMchyMss9diRYpu1Ek3OshwHim6I_9rlCplPYEhDMfjy3uqyrQg5Pw2cDPB_wbSGByg6LBqyxv8t9fT.jpg?r=50b"
    },
    {
      id: 9,
      title: "그는 당신에게 반하지 않았다",
      url:
        "https://occ-0-3446-1007.1.nflxso.net/dnm/api/v6/0DW6CdE4gYtYx8iy3aj8gs9WtXE/AAAABXb4BS73-tleippRxINV7OxnM3QlrQ-3-n_Q7XUbcCYfleXx6fBuufaaHTU5JNfcBIWa-75Fb84uY32QSxGC7YKcvwBgGgoq.webp?r=92c"
    },
    {
      id: 10,
      title: "신세계",
      url:
        "https://occ-0-3446-1007.1.nflxso.net/dnm/api/v6/0DW6CdE4gYtYx8iy3aj8gs9WtXE/AAAABeAp9reKrj37zvazUUAO2uBw-0dPJ6o5TSjLRkrFfJI0DPytgbBpS_zDp_GzdigA2XD5Juhx_khBW9Ubs8VzYkC52ey_J_7d.webp?r=176"
    },
    {
      id: 11,
      title: "인셉션",
      url:
        "https://occ-0-3446-1007.1.nflxso.net/dnm/api/v6/0DW6CdE4gYtYx8iy3aj8gs9WtXE/AAAABWxYavVxYcvtSITeIMV-EqqXoBwb1neYRHTjQfsJBmtHqC4YXZnojT8cI5BBu2TO-RlGLfKgwG5ysh7MeVD389kbaplCuA1e.webp?r=c60"
    },
    {
      id: 12,
      title: "노트북",
      url:
        "https://occ-0-3446-1007.1.nflxso.net/dnm/api/v6/0DW6CdE4gYtYx8iy3aj8gs9WtXE/AAAABckxaeOPQRAGWsN1ff4sBBHbxzi3VWDuvo_Zsoc-hx1yxzOzkDuEnQ8d5MOPVk11Bt8uMrxiU69sbEtCu7gXw5doGLnRMn0N.webp?r=679"
    },
    {
      id: 13,
      title: "행오버",
      url:
        "https://occ-0-3446-1007.1.nflxso.net/dnm/api/v6/0DW6CdE4gYtYx8iy3aj8gs9WtXE/AAAABSirfG_SWIlcGh4Pq3wAVesJj1tCng3xoOqs3xG5fIkEjkM3cZm_k93aYwWRaJqhPA-xL-roOFvbJcHaLy4_b55lFBUTwZSt.webp?r=386"
    },
    {
      id: 14,
      title: "럭키원",
      url:
        "https://occ-0-3446-1007.1.nflxso.net/dnm/api/v6/0DW6CdE4gYtYx8iy3aj8gs9WtXE/AAAABXlsUN18SBvFD75849pucNXeYsA48y-mZUSdvD9_hZgSsfj2QN-5ONQkdVNUOW-F_HzKctaXiRU7PK9BYCyW1xT7ExRtF0S7.webp?r=bd4"
    },
    {
      id: 15,
      title: "리틀 포레스트",
      url:
        "https://occ-0-3446-1007.1.nflxso.net/dnm/api/v6/0DW6CdE4gYtYx8iy3aj8gs9WtXE/AAAABW4bN5rSs9XChwHXaL77GJSYDOyYkrhojXK66Vdb3MRJMOZVTewhXoDiMcoGPXP4wdeU48dAWSpClLStPbvV2hjBqnSbXaH6.webp?r=452"
    },
    {
      id: 16,
      title: "암수살인",
      url:
        "https://occ-0-3446-1007.1.nflxso.net/dnm/api/v6/0DW6CdE4gYtYx8iy3aj8gs9WtXE/AAAABQrLGJoWj6d-CXNOUuNx5kdgQHeY5mDui2x-0q0qLGJEqbPrfaVMX4mq91L3AsRo228RWaTSvwLqF1op4RFB4Uh8EMRuXh1P.webp?r=2fb"
    },
    {
      id: 17,
      title: "신과 함께-인과 연",
      url:
        "https://occ-0-3446-1007.1.nflxso.net/dnm/api/v6/0DW6CdE4gYtYx8iy3aj8gs9WtXE/AAAABSAdyNuhArmQ3GH3aFqwFP4gNee6dAbWJs2p2LXaukjJT0CAIUd1P-BKBgzYLPlFCTFUPe7v4dbis38O8urO7hKqBCZgeLVs.webp?r=2bf"
    },
    {
      id: 18,
      title: "블랙팬서",
      url:
        "https://occ-0-3446-1007.1.nflxso.net/dnm/api/v6/0DW6CdE4gYtYx8iy3aj8gs9WtXE/AAAABYSkjw8IEYs4nGPNBXSwX-LEWpmkbgAeV-QYaEGsbW2LcHwkQNwa1u5MHc9q0iAJTs0UEDbN16iLWACw6RZFSbP3JgvbH0ce.webp?r=7bc"
    }
  ];
  tabShow: boolean = false;
  movies: MoviePreview[] = [...this.moviesList];
  // slider의 총 개수
  slider = this.movies.length / 6;
  // Tab 배열
  tab = [];
  tabLength;
  tabArray() {
    for (let i = 1; i <= this.slider; i++) {
      this.tab = [...this.tab, i];
    }
    // Tab의 길이
    this.tabLength = this.tab.length;
  }
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
      this.sliderZero = this.movies.slice(this.movies.length - 7);
      this.sliderForth = this.movies.slice(0, 7);
      this.movies = this.sliderZero
        .concat(this.movies)
        .concat(this.sliderForth);

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
  // hover한 카드 id
  bobup: number;
  // 슬라이더 당 카드 개수
  cardCount: number = 6;
  // hover한 카드 0 ~ 7
  hoverCard: number = 8;
  cardTransform: any;
  cardTransition: any;
  bobScale = "scale(0.52222)";
  toRight: boolean = false;
  cardHover(movieId) {
    this.bobup = movieId;
    this.hoverCard =
      movieId % this.cardCount !== 0 ? movieId % this.cardCount : 6;
    setTimeout(() => {
      this.bobScale = "scale(0.99999)";
    }, 200);
    this.toRight = true;
    // console.log(this.toRight);
  }

  cardHoverLeave() {
    this.bobScale = "scale(0.52222)";
    setTimeout(() => {
      this.bobup = 0;
    }, 300);
    this.toRight = false;
  }

  cardShowNumber;
  // 보여주고 있는 카드 숫자 부여
  showNumber(movieId) {
    const showNumber = movieId % this.cardCount;
    const quotient =
      Math.floor(movieId / this.cardCount) === this.sliderState - 1
        ? showNumber
        : 0;
    // console.log(quotient);
    if (this.sliderState === 1 && movieId === 18) {
      this.cardShowNumber = showNumber;
      return this.cardShowNumber;
    }
    if (this.sliderState === 1 && (movieId === 6 || movieId === 7)) {
      this.cardShowNumber = showNumber + 6;
      return this.cardShowNumber;
    }
    if (this.sliderState === 2 && (movieId === 12 || movieId === 13)) {
      this.cardShowNumber = showNumber + 6;
      return this.cardShowNumber;
    }
    if (this.sliderState === 3 && (movieId === 18 || movieId === 1)) {
      this.cardShowNumber = showNumber + 6;
      return this.cardShowNumber;
    }
    this.cardShowNumber = quotient;
    return this.cardShowNumber;
  }
  // bobup 시 left 값 주기
  bobupLeft() {
    if (this.hoverCard === 1) return 0;
    else if (this.hoverCard === 6) return -94.5;
    return -47.5;
  }
  // 어디서 bobup이 될 것인지 정해주기
  bobupTransformOrigin() {
    if (this.hoverCard === 1) return "left";
    else if (this.hoverCard === 6) return "right";
    return;
  }
}
