import { observable, action, decorate } from "mobx";
class KeywordStore {
  savedVideos = new Set();
  videosToMetadata = {};
  tagsToVideos = {
    neck: [],
    upperback: [],
    lowerback: [],
    abs: [],
  };
  currentlyDisplayedVideoInfo = {};

  setSavedVideos(savedVideos) {
    this.savedVideos = savedVideos;
  }
  setVideosToMetadata(videosToMetadata) {
    this.videosToMetadata = videosToMetadata;
  }
  setTagsToVideos(tagsToVideos) {
    this.tagsToVideos = tagsToVideos;
  }
  setCurrentlyDisplayedVideoInfo(currentlyDisplayedVideoInfo) {
    this.currentlyDisplayedVideoInfo = currentlyDisplayedVideoInfo;
  }
}

decorate(KeywordStore, {
  savedVideos: observable,
  videosToMetadata: observable,
  tagsToVideos: observable,
  currentlyDisplayedVideoInfo: observable,
  setSavedVideos: action.bound,
  setVideosToMetadata: action.bound,
  setTagsToVideos: action.bound,
  setCurrentlyDisplayedVideoInfo: action.bound,
});
export default new KeywordStore();
