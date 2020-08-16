export function toggleSave(
  updatedFavorited,
  savedVideos,
  videosToMetadata,
  tagsToVideos,
  videoId,
  videoChannel,
  videoThumbnail,
  videoTitle,
  bodyRegionTitle
) {
  // Update saved states
  let savedVideosUpdated = savedVideos;
  let videosToMetadataUpdated = videosToMetadata;
  let tagsToVideosUpdated = tagsToVideos;
  const tags = [parsedTag(bodyRegionTitle)];

  // Set video info in mobx and localstorage
  if (updatedFavorited) {
    savedVideosUpdated.add(videoId);

    videosToMetadataUpdated[videoId] = {
      channelName: videoChannel,
      tags: tags,
      thumbNail: videoThumbnail,
      name: videoTitle,
    };

    tags.forEach((tag) => {
      tagsToVideosUpdated[tag].push(videoId);
    });

    localStorage.setItem("tagsToVideos", JSON.stringify(tagsToVideosUpdated));
  } else {
    savedVideosUpdated.delete(videoId);

    delete videosToMetadataUpdated[videoId];

    tags.forEach((tag) => {
      const videoIndex = tagsToVideosUpdated[tag].indexOf(videoId);
      if (videoIndex > -1) {
        tagsToVideosUpdated[tag].splice(videoIndex, 1);
      }
    });
  }

  return {
    savedVideosUpdated: savedVideosUpdated,
    videosToMetadataUpdated: videosToMetadataUpdated,
    tagsToVideosUpdated: tagsToVideosUpdated,
  };
}

export const parsedTag = (tag) => {
  const removeSpaces = tag.split(" ").join("");
  const lowerCase = removeSpaces.toLowerCase();
  return lowerCase;
};

export default { toggleSave, parsedTag };
