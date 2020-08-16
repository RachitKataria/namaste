import { observable, action, decorate } from "mobx";
class KeywordStore {
  savedVideos = new Set();
  videosToMetadata = new Map();
  tagsToVideos = {
    neck: [],
    upperback: [],
    lowerback: [],
    abs: [],
  };

  setSavedVideos(savedVideos) {
    this.savedVideos = savedVideos;
  }
  setVideosToMetadata(videosToMetadata) {
    this.videosToMetadata = videosToMetadata;
  }
  setTagsToVideos(tagsToVideos) {
    this.tagsToVideos = tagsToVideos;
  }
}

decorate(KeywordStore, {
  savedVideos: observable,
  videosToMetadata: observable,
  tagsToVideos: observable,
  setSavedVideos: action.bound,
  setVideosToMetadata: action.bound,
  setTagsToVideos: action.bound,
});
export default new KeywordStore();
