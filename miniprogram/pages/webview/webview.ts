Page({
  data: {
    url: "",
  },
  onLoad(options) {
    const url = decodeURIComponent(options.url);
    if (url) {
      this.setData({
        url,
      });
    }
  },
});
