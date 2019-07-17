import { Component, OnInit } from "@angular/core";

interface Movies {
  id: number;
  title: string;
  url: string;
}

@Component({
  selector: "app-slider",
  templateUrl: "./slider.component.html",
  styleUrls: ["./slider.component.css"]
})
export class SliderComponent implements OnInit {
  constructor() {}
  ngOnInit() {
    this.tabList(0);
  }
  movies: Movies[] = [
    {
      id: 0,
      title: "mamamia",
      url:
        "https://occ-0-3446-1007.1.nflxso.net/dnm/api/v6/0DW6CdE4gYtYx8iy3aj8gs9WtXE/AAAABXaGwBEssmNrvhe5QvscpnzAA8FQmntR5fI0WYL6QcYZLhCvPkCWNiU7GZjlHhWlBvH_RTljgJhVbh8cPamCt4Cd281fVkhJ.webp?r=1f3"
    },
    {
      id: 1,
      title: "titanic",
      url:
        "https://occ-0-3446-1007.1.nflxso.net/dnm/api/v6/0DW6CdE4gYtYx8iy3aj8gs9WtXE/AAAABSutMRiJg2Zr7FKCHrNO4_sfkGbbPSdCKN5lWVXhUMkpy8MTSshI6_tTSPzHwo5uWErPGTJh3k5B2pohz2-D6Sae8EJ3Rj4l.webp?r=48b"
    },
    {
      id: 2,
      title: "건축학개론",
      url:
        "https://occ-0-3446-1007.1.nflxso.net/dnm/api/v6/0DW6CdE4gYtYx8iy3aj8gs9WtXE/AAAABaHz8fTzwa2_UxsWPUCpUzSjB_tpTBYiTBpHRO77CkoXB-IbXM_rveYRCv8N6zkr-onKgqm4iR6XkxeDBb4FXfTlWlZ6XEhD.jpg?r=283"
    },
    {
      id: 3,
      title: "call me by your name",
      url:
        "https://occ-0-3446-1007.1.nflxso.net/dnm/api/v6/0DW6CdE4gYtYx8iy3aj8gs9WtXE/AAAABUOADmsGnDEBa9vFBwJZIjJkYYPngtOpl5wHeNmbQe6Hd9BOccuVFHzoG256PQmJxmxPFTv8nPRDm9LQsgn0CGeWHNurdO5A.webp?r=6b9"
    },
    {
      id: 4,
      title: "월터의 상상은 현실이 된다",
      url:
        "https://occ-0-3446-1007.1.nflxso.net/dnm/api/v6/0DW6CdE4gYtYx8iy3aj8gs9WtXE/AAAABdyrpIMkdiFb7ml5Lgjnxr_FA_vVjiVFgQ_ZDu08SnC8KU3KbkDE5l7znCVTw8miwgizzghciJxDfNWUsI8Kr0MgP_CvGpA4.webp?r=54a"
    },
    {
      id: 5,
      title: "500일의 썸머",
      url:
        "https://occ-0-3446-1007.1.nflxso.net/dnm/api/v6/0DW6CdE4gYtYx8iy3aj8gs9WtXE/AAAABbiKZiwAN3U9UX0NZHhYRCEpGrs0_E7U6_1UMHSi_xahiIGGJ2TEATVYKEkLxgthrNcX-N218mXt_3AFS5qcXxWwyi1M2YnY.webp?r=1ba"
    },
    {
      id: 6,
      title: "위대한 개츠비",
      url:
        "https://occ-0-3446-1007.1.nflxso.net/dnm/api/v6/0DW6CdE4gYtYx8iy3aj8gs9WtXE/AAAABVeL6k-GWe---AxBQgF4_oSbskK_hAmjCQArTnGWNFcZp3SduDrRsnLfU9SH32g582FH9Mz4lYSv6dPQinjM85-7DcUHP0Wg.jpg?r=d12"
    },
    {
      id: 7,
      title: "내가 사랑했던 모든 남자들에게",
      url:
        "https://occ-0-3446-1007.1.nflxso.net/dnm/api/v6/0DW6CdE4gYtYx8iy3aj8gs9WtXE/AAAABZuP4XdcnjAJSDd_6DL2cwR6aHzqOpiyflFfM1qX2fQhSRMchyMss9diRYpu1Ek3OshwHim6I_9rlCplPYEhDMfjy3uqyrQg5Pw2cDPB_wbSGByg6LBqyxv8t9fT.jpg?r=50b"
    },
    {
      id: 8,
      title: "그는 당신에게 반하지 않았다",
      url:
        "https://occ-0-3446-1007.1.nflxso.net/dnm/api/v6/0DW6CdE4gYtYx8iy3aj8gs9WtXE/AAAABXb4BS73-tleippRxINV7OxnM3QlrQ-3-n_Q7XUbcCYfleXx6fBuufaaHTU5JNfcBIWa-75Fb84uY32QSxGC7YKcvwBgGgoq.webp?r=92c"
    },
    {
      id: 9,
      title: "신세계",
      url:
        "https://occ-0-3446-1007.1.nflxso.net/dnm/api/v6/0DW6CdE4gYtYx8iy3aj8gs9WtXE/AAAABeAp9reKrj37zvazUUAO2uBw-0dPJ6o5TSjLRkrFfJI0DPytgbBpS_zDp_GzdigA2XD5Juhx_khBW9Ubs8VzYkC52ey_J_7d.webp?r=176"
    },
    {
      id: 10,
      title: "인셉션",
      url:
        "https://occ-0-3446-1007.1.nflxso.net/dnm/api/v6/0DW6CdE4gYtYx8iy3aj8gs9WtXE/AAAABWxYavVxYcvtSITeIMV-EqqXoBwb1neYRHTjQfsJBmtHqC4YXZnojT8cI5BBu2TO-RlGLfKgwG5ysh7MeVD389kbaplCuA1e.webp?r=c60"
    },
    {
      id: 11,
      title: "노트북",
      url:
        "https://occ-0-3446-1007.1.nflxso.net/dnm/api/v6/0DW6CdE4gYtYx8iy3aj8gs9WtXE/AAAABckxaeOPQRAGWsN1ff4sBBHbxzi3VWDuvo_Zsoc-hx1yxzOzkDuEnQ8d5MOPVk11Bt8uMrxiU69sbEtCu7gXw5doGLnRMn0N.webp?r=679"
    },
    {
      id: 12,
      title: "행오버",
      url:
        "https://occ-0-3446-1007.1.nflxso.net/dnm/api/v6/0DW6CdE4gYtYx8iy3aj8gs9WtXE/AAAABSirfG_SWIlcGh4Pq3wAVesJj1tCng3xoOqs3xG5fIkEjkM3cZm_k93aYwWRaJqhPA-xL-roOFvbJcHaLy4_b55lFBUTwZSt.webp?r=386"
    },
    {
      id: 13,
      title: "럭키원",
      url:
        "https://occ-0-3446-1007.1.nflxso.net/dnm/api/v6/0DW6CdE4gYtYx8iy3aj8gs9WtXE/AAAABXlsUN18SBvFD75849pucNXeYsA48y-mZUSdvD9_hZgSsfj2QN-5ONQkdVNUOW-F_HzKctaXiRU7PK9BYCyW1xT7ExRtF0S7.webp?r=bd4"
    },
    {
      id: 14,
      title: "리틀 포레스트",
      url:
        "https://occ-0-3446-1007.1.nflxso.net/dnm/api/v6/0DW6CdE4gYtYx8iy3aj8gs9WtXE/AAAABW4bN5rSs9XChwHXaL77GJSYDOyYkrhojXK66Vdb3MRJMOZVTewhXoDiMcoGPXP4wdeU48dAWSpClLStPbvV2hjBqnSbXaH6.webp?r=452"
    },
    {
      id: 15,
      title: "암수살인",
      url:
        "https://occ-0-3446-1007.1.nflxso.net/dnm/api/v6/0DW6CdE4gYtYx8iy3aj8gs9WtXE/AAAABQrLGJoWj6d-CXNOUuNx5kdgQHeY5mDui2x-0q0qLGJEqbPrfaVMX4mq91L3AsRo228RWaTSvwLqF1op4RFB4Uh8EMRuXh1P.webp?r=2fb"
    },
    {
      id: 16,
      title: "신과 함께-인과 연",
      url:
        "https://occ-0-3446-1007.1.nflxso.net/dnm/api/v6/0DW6CdE4gYtYx8iy3aj8gs9WtXE/AAAABSAdyNuhArmQ3GH3aFqwFP4gNee6dAbWJs2p2LXaukjJT0CAIUd1P-BKBgzYLPlFCTFUPe7v4dbis38O8urO7hKqBCZgeLVs.webp?r=2bf"
    },
    {
      id: 17,
      title: "블랙팬서",
      url:
        "https://occ-0-3446-1007.1.nflxso.net/dnm/api/v6/0DW6CdE4gYtYx8iy3aj8gs9WtXE/AAAABYSkjw8IEYs4nGPNBXSwX-LEWpmkbgAeV-QYaEGsbW2LcHwkQNwa1u5MHc9q0iAJTs0UEDbN16iLWACw6RZFSbP3JgvbH0ce.webp?r=7bc"
    }
    // {
    //   id: 18,
    //   title: "친구와 연인사이",
    //   url:
    //     "https://occ-0-3446-1007.1.nflxso.net/dnm/api/v6/0DW6CdE4gYtYx8iy3aj8gs9WtXE/AAAABSW71zHM_awT-YQvs_IeOKCVgVV4IfCxH1GIBocHUEIZk73kMMsavFaYntPtFV4g3ZRVbrqHlhrCe9P9nFpJqK-0o8SqCpTm.webp?r=e86"
    // },
    // {
    //   id: 19,
    //   title: "그랜드 부다페스트 호텔",
    //   url:
    //     "https://occ-0-3446-1007.1.nflxso.net/dnm/api/v6/0DW6CdE4gYtYx8iy3aj8gs9WtXE/AAAABTS4LAC0ecy3Qn8LVQTor7MYmWPBTl0WhbzUHahAcmz3oSX71_SUwBIz2Z6x5PTAV5iL-OWpudzPQkUlFVZThkcgRe1B9GgX.webp?r=ccb"
    // },
    // {
    //   id: 20,
    //   title: "포레스트 검프",
    //   url:
    //     "https://occ-0-3446-1007.1.nflxso.net/dnm/api/v6/0DW6CdE4gYtYx8iy3aj8gs9WtXE/AAAABRFnmYU4IONsd6sPx437eMqihH6qY18wQL-aOo5Ib6WPlNe4Nx8KL-A-nPgMBI9HSPe5OMYa0GXv2Zzf_1I2WUITtTuuO59Q.webp?r=056"
    // }
  ];
  tab = [];
  tabState: number = 0;
  tabLength: number = Math.ceil(this.movies.length / 6);
  tabShow: boolean = false;
  sliderContentActive: boolean = false;
  num = 100;
  tabList(number) {
    this.tab = [];
    for (let i = number; i < this.tabLength + number; i++) {
      this.tab = [...this.tab, i];
    }
  }
  tabStatePrev() {
    if (this.tabState === this.tab[0]) {
      this.tabState = this.tab[this.tab.length - 1];
    } else {
      if (this.tab[0] === 0) {
        this.tabList(1);
        this.tabState++;
      }
      this.tabState--;
    }
    console.log(this.tabState);

    if (this.tabState !== 2) return;
    const copy = this.movies.slice(this.movies.length - 6);
    this.movies.splice(this.movies.length - 6, 6);
    const newC = copy.concat(this.movies);
    this.movies = newC;
  }
  tabStateNext() {
    // console.log(this.tabLength);
    if (this.tabState === this.tab[this.tabLength - 1]) {
      this.tabList(1);
      this.tabState = 1;
    } else {
      this.tabState++;
    }

    // console.log(this.tabState);
    this.sliderContentActive = true;

    if (this.tabState === 1 && this.tab[0] === 0) return;
    const copy = this.movies.slice(0, 6);
    this.movies.splice(0, 6);
    const newC = this.movies.concat(copy);
    this.movies = newC;
  }
}
