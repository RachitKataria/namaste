import { observable, action, decorate } from "mobx";
class KeywordStore {
  keyword = "";
  videoDuration = "";
  bodyRegion = "";

  setKeyword(keyword) {
    this.keyword = keyword;
  }
  setVideoDuration(videoDuration) {
    this.videoDuration = videoDuration;
  }
  setBodyRegion(bodyRegion) {
    this.bodyRegion = bodyRegion;
  }
}
KeywordStore = decorate(KeywordStore, {
  keyword: observable,
  videoDuration: observable,
  bodyRegion: observable,
  setKeyword: action,
  setVideoDuration: action,
  setBodyRegion: action,
});
export { KeywordStore };
