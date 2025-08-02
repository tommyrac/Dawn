// Shopify theme constants
window.theme = window.theme || {};

// Artist House specific constants
window.theme.artistHouse = {
  rooms: [
    'Front',
    'Studio', 
    'Lounge',
    'Bedroom',
    'Closet',
    'Pool',
    'Kitchen',
    'Court',
    'Garage'
  ],
  
  navigationSections: [
    'Albums',
    'Projects', 
    'Tour',
    'Shop',
    'Explore'
  ],

  settings: {
    enableRoomNavigation: true,
    enableBackgroundTransitions: true,
    mobileBreakpoint: 768
  }
};

// Shopify theme utilities
window.theme.utils = {
  debounce: function(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  },

  throttle: function(func, limit) {
    var inThrottle;
    return function() {
      var args = arguments;
      var context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    }
  }
};
