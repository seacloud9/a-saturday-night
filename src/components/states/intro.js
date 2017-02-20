var getUrlParams = require('../../utils').getUrlParams;
var loadJSONFromUrl = require('../../utils').loadJSONFromUrl;

AFRAME.registerComponent('intro', {
  init: function () {
    var urlParams = getUrlParams();
    if (urlParams.url) {
      var self = this;
      loadJSONFromUrl(urlParams.url, function (data) {
        var selectedAvatar = document.getElementById(data.avatar);
        var avatarHeadEl = document.getElementById('avatarHead');
        self.el.sceneEl.setAttribute('game-state', 'selectedAvatar', selectedAvatar);
        avatarHeadEl.setAttribute('obj-model', {
          obj: selectedAvatar.getAttribute('src'),
          mtl: selectedAvatar.getAttribute('mtl')
        });

        self.el.setAttribute('avatar-replayer', {
          spectatorMode: true,
          loop: true
        });
        self.el.components['avatar-replayer'].startReplaying(data.recording);
      });
    } else {
      this.el.setAttribute('avatar-replayer', {
        src: 'assets/dance.json',
        spectatorMode: true,
        loop: true
      });
    }
  },

  remove: function () {
    this.el.removeAttribute('avatar-replayer');
  }
});
