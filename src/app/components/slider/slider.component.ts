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
    this.tabList();
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
      title: "맘마미아",
      url:
        "https://occ-0-3446-1007.1.nflxso.net/dnm/api/v6/0DW6CdE4gYtYx8iy3aj8gs9WtXE/AAAABb8Bpdf0K6jv3xbexJU_eSGPXADcs4_QRUouy7GWSE2S50apUVJKuAFcQbpIdY-Adrdn532te9UUZnWZJrM1hKOvnrQU8BTr.webp?r=5c4"
    },
    {
      id: 13,
      title: "미드나잇 인 파리",
      url:
        "https://occ-0-3446-1007.1.nflxso.net/dnm/api/v6/0DW6CdE4gYtYx8iy3aj8gs9WtXE/AAAABcVHjCbVL9ZOQOBJhKaLn6-ScMYbJOY4kFudbDSsjLEyHjOqmTA28lRKaWlpHx_CbJd3SeBLfCuv-t_roGjoEwPztR09fw55.webp?r=619"
    }
  ];
  tab = [];
  tabState: number = 0;
  tabLength: number = Math.ceil(this.movies.length / 6);
  tabShow: boolean = false;
  tabList() {
    for (let i = 0; i < this.tabLength; i++) {
      this.tab = [...this.tab, i];
    }
  }
}
