import { Component, OnInit, OnChanges } from "@angular/core";

@Component({
  selector: "app-profile-slider",
  templateUrl: "./profile-slider.component.html",
  styleUrls: ["./profile-slider.component.css"]
})
export class ProfileSliderComponent implements OnInit {
  tabShow: boolean = false;
  movies;
  moviesLength: number;
  // slider의 총 개수
  slider: number;
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
  // hover한 카드 0 ~ 7
  hoverCard: number = 8;
  cardTransform: any;
  cardTransition: any;
  bobScale = "scale(0.52222)";
  cardMove: boolean = false;
  cardShowNumber;
  isOpen: boolean = false;
  profileData = {
    "대표 아이콘": [
      {
        name: "보라색 슈퍼히어로",
        image_path:
          "https://occ-0-2794-2219.1.nflxso.net/art/6f579/22a7771cd88f0743bbdc28030498013d9cf6f579.png"
      },
      {
        name: "콧수염",
        image_path:
          "https://occ-0-2794-2219.1.nflxso.net/art/16763/5ef8a49350c96ef8ef702b554285b23e4f616763.png"
      },
      {
        name: "개",
        image_path:
          "https://occ-0-2794-2219.1.nflxso.net/art/917f4/6374d83520e290fd7731e7d9fbb57c1d770917f4.png"
      },
      {
        name: "빨간색 슈퍼히어로",
        image_path:
          "https://occ-0-2794-2219.1.nflxso.net/art/59fbc/1ce9bcd3d6f26195c1ab49cd2c691f5fc8f59fbc.png"
      },
      {
        name: "보라색 펭귄",
        image_path:
          "https://occ-0-2794-2219.1.nflxso.net/art/ecfae/3ea10459b6f40173f068bea5ce20b578505ecfae.png"
      },
      {
        name: "분홍색 깔깔 웃음",
        image_path:
          "https://occ-0-2794-2219.1.nflxso.net/art/2b3fe/fffc0a1389068ba3f6eb6dab1812d3867b52b3fe.png"
      },
      {
        name: "닭",
        image_path:
          "https://occ-0-2794-2219.1.nflxso.net/art/179a8/514618e1d7554648a39e294f43585ddba07179a8.png"
      },
      {
        name: "애꾸눈",
        image_path:
          "https://occ-0-2794-2219.1.nflxso.net/art/da147/5a205b0510286b0ce3a5a4b79c4f1ab6510da147.png"
      },
      {
        name: "외계인",
        image_path:
          "https://occ-0-2794-2219.1.nflxso.net/art/40f84/7ad9973040eb5073ac58dd4b0854ac6da9840f84.png"
      },
      {
        name: "로봇",
        image_path:
          "https://occ-0-2794-2219.1.nflxso.net/art/1a036/00e902c321180b125d94f5d8e8a0bd03bf01a036.png"
      },
      {
        name: "미라",
        image_path:
          "https://occ-0-2794-2219.1.nflxso.net/art/5410e/d6bc705b8107d2f8263c74b02fe519a3d355410e.png"
      },
      {
        name: "헬멧",
        image_path:
          "https://occ-0-2794-2219.1.nflxso.net/art/4a68c/010c7b9061ece2fbf7bbb8d9bb6d2bee16f4a68c.png"
      },
      {
        name: "보라색 미소",
        image_path:
          "https://occ-0-2794-2219.1.nflxso.net/art/c60c3/e3a02ef54d008db8544100a9a142d0d4064c60c3.png"
      }
    ],
    "기묘한 이야기": [
      {
        name: "일레븐",
        image_path:
          "https://occ-0-2794-2219.1.nflxso.net/art/5e350/99d8a4f741a9f042c71a6d2f5017f39f6f35e350.png"
      },
      {
        name: "마이크",
        image_path:
          "https://occ-0-2794-2219.1.nflxso.net/art/e3d74/51f1bb3884e110978ccc3e5de2dd225f026e3d74.png"
      },
      {
        name: "윌",
        image_path:
          "https://occ-0-2794-2219.1.nflxso.net/art/7ebe6/52c85fdd3138b97853f0d3d2fa90243a5cf7ebe6.png"
      },
      {
        name: "루카스",
        image_path:
          "https://occ-0-2794-2219.1.nflxso.net/art/6414c/462e030d0b375b7837d83973ee5938ed3bd6414c.png"
      },
      {
        name: "맥스",
        image_path:
          "https://occ-0-2794-2219.1.nflxso.net/art/d1585/3daf815cc1882a08f8d1fb797b6fc4f12cbd1585.png"
      },
      {
        name: "빌리",
        image_path:
          "https://occ-0-2794-2219.1.nflxso.net/art/20537/9236ff7c9c76e45ecd80fea61d571b2eefc20537.png"
      },
      {
        name: "스티브",
        image_path:
          "https://occ-0-2794-2219.1.nflxso.net/art/df064/e84f857b3eca3a22437cfb66220f83402ecdf064.png"
      },
      {
        name: "로빈",
        image_path:
          "https://occ-0-2794-2219.1.nflxso.net/art/f46fa/688b1b5e6fecd6e896558cc9058222eb6aff46fa.png"
      },
      {
        name: "낸시",
        image_path:
          "https://occ-0-2794-2219.1.nflxso.net/art/d6c54/3ed50107615d348b72834bf775071debb5dd6c54.png"
      },
      {
        name: "조나단",
        image_path:
          "https://occ-0-2794-2219.1.nflxso.net/art/2fcad/fec1d365fc2be7531c9e2292dd0fbac6b092fcad.png"
      },
      {
        name: "에리카",
        image_path:
          "https://occ-0-2794-2219.1.nflxso.net/art/2d812/f1b81abe1f7621f96ccbefb9fd59d2ccba62d812.png"
      },
      {
        name: "호퍼",
        image_path:
          "https://occ-0-2794-2219.1.nflxso.net/art/8e4a1/e09960ca28890c05b568522d680486b4bbe8e4a1.png"
      },
      {
        name: "더스틴",
        image_path:
          "https://occ-0-2794-2219.1.nflxso.net/art/6c88d/bc78494ef8abbf1da94385a2de1f728a3736c88d.png"
      }
    ]
  };
  constructor() {}

  ngOnInit() {
    this.tabArray();
  }

  ngOnChanges() {
    this.movies = this.profileData[0].map((movie, index) => ({
      ...movie,
      order: index + 1
    }));
    this.moviesLength = this.profileData[0].length;
    console.log(this.moviesLength);

    if (this.default) {
      this.moviesClone();
    }
    this.slider = this.movies.length / this.cardCount;
    // console.log(this.category, this.movies);
  }

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

  cardHover(movieOrder, movieId) {
    if (!this.isOpen) {
      this.bobup = movieOrder;
      // setTimeout(() => {
      //   this.bobScale = "scale(0.99999)";
      // }, 300);
    }
    // console.log("호버됬당");
    this.hoverCard =
      movieOrder % this.cardCount !== 0 ? movieOrder % this.cardCount : 6;
    if (this.cardMove) return;
    this.cardMove = true;
  }

  cardHoverLeave() {
    this.bobScale = "scale(0.52222)";
    // console.log(this.moviesDetail);
    this.cardMove = false;
    // setTimeout(() => {
    this.bobup = 0;

    // }, 300);

    console.log("호버 나갔당");
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
