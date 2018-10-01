var cacheName = 'latestNews-v2';

// Cache our known resources during install
self.addEventListener('install', function(event) {
  // Perform install steps
});

self.addEventListener('push', function (event) {

  var payload = event.data ? JSON.parse(event.data.text()) : 'no payload';

  var title = 'Progressive Times';

  // Determine the type of notification to display
  if (payload.type === 'register') {
    event.waitUntil(
      self.registration.showNotification(title, {
        body: payload.msg,
        url: payload.url,
        icon: payload.icon
      })
    );
  } else if (payload.type === 'actionMessage') {
    event.waitUntil(
      self.registration.showNotification(title, {
        body: payload.msg,
        url: payload.url,
        icon: payload.icon,
        actions: [
          { action: 'voteup', title: '👍 Vote Up' },
          { action: 'votedown', title: '👎 Vote Down' }]
      })
    );
  }
});



