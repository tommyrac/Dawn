// Simple pub/sub system for Shopify theme events
window.PubSub = (function() {
  const events = {};

  function subscribe(eventName, callback) {
    if (!events[eventName]) {
      events[eventName] = [];
    }
    events[eventName].push(callback);
    
    return {
      unsubscribe: function() {
        const index = events[eventName].indexOf(callback);
        if (index > -1) {
          events[eventName].splice(index, 1);
        }
      }
    };
  }

  function publish(eventName, data) {
    if (!events[eventName]) {
      return;
    }
    
    events[eventName].forEach(callback => {
      try {
        callback(data);
      } catch (error) {
        console.error('Error in PubSub callback:', error);
      }
    });
  }

  return {
    subscribe,
    publish
  };
})();

// Artist House specific events
window.PubSub.subscribe('artistHouse:roomChanged', function(data) {
  console.log('Room changed to:', data.roomName);
});

window.PubSub.subscribe('artistHouse:navigationClicked', function(data) {
  console.log('Navigation clicked:', data.section);
});
