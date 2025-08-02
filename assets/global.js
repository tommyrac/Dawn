// Artist House Room Navigation JavaScript

class ArtistHouseNavigation {
  constructor() {
    this.currentRoom = 'studio';
    this.settings = window.theme?.artistHouse?.settings || {};
    this.init();
  }

  init() {
    this.bindEvents();
    this.initializeRoom();
    this.setupShopifyIntegration();
  }

  bindEvents() {
    // Room navigation
    document.addEventListener('click', (event) => {
      const roomCard = event.target.closest('.room-card');
      if (roomCard) {
        const roomName = roomCard.getAttribute('data-room-name');
        if (roomName) {
          this.goToRoom(roomName.toLowerCase());
        }
      }
    });

    // Menu toggle for mobile
    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) {
      menuToggle.addEventListener('click', this.toggleMenu.bind(this));
    }

    // Navigation menu items
    document.addEventListener('click', (event) => {
      const navLink = event.target.closest('.nav-menu a');
      if (navLink && !navLink.href.includes('http')) {
        event.preventDefault();
        const section = navLink.textContent.toLowerCase();
        this.showContent(section);
      }
    });
  }

  setupShopifyIntegration() {
    // Listen for Shopify theme editor events
    if (typeof Shopify !== 'undefined' && Shopify.designMode) {
      document.addEventListener('shopify:section:load', this.handleSectionLoad.bind(this));
      document.addEventListener('shopify:section:unload', this.handleSectionUnload.bind(this));
      document.addEventListener('shopify:section:select', this.handleSectionSelect.bind(this));
      document.addEventListener('shopify:section:deselect', this.handleSectionDeselect.bind(this));
      document.addEventListener('shopify:block:select', this.handleBlockSelect.bind(this));
      document.addEventListener('shopify:block:deselect', this.handleBlockDeselect.bind(this));
    }
  }

  goToRoom(roomName) {
    this.currentRoom = roomName;
    
    // Remove active class from all cards
    document.querySelectorAll('.room-card').forEach(card => {
      card.classList.remove('active');
    });
    
    // Add active class to clicked card
    const activeCard = document.querySelector(`[data-room-name="${this.capitalizeFirst(roomName)}"]`);
    if (activeCard) {
      activeCard.classList.add('active');
    }
    
    // Publish room change event
    if (window.PubSub) {
      window.PubSub.publish('artistHouse:roomChanged', {
        roomName: roomName,
        previousRoom: this.currentRoom
      });
    }
    
    // Update the current room display
    this.updateRoomContent(roomName);
    
    // Add some visual feedback if enabled
    if (this.settings.enableBackgroundTransitions !== false) {
      this.updateBackground();
    }
  }

  updateRoomContent(roomName) {
    // Room content updating - can be expanded for specific room content
    console.log(`Navigated to ${roomName} room`);
    
    // Update page title if needed
    if (typeof Shopify !== 'undefined' && Shopify.designMode) {
      document.title = `Artist House - ${this.capitalizeFirst(roomName)} Room`;
    }
  }

  updateBackground() {
    const gradients = [
      'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
      'linear-gradient(135deg, #2d1b69 0%, #11284b 100%)',
      'linear-gradient(135deg, #1a2a6c 0%, #b21f1f 100%)',
      'linear-gradient(135deg, #134e5e 0%, #71b280 100%)',
      'linear-gradient(135deg, #667db6 0%, #0082c8 100%)'
    ];
    
    const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];
    document.body.style.background = `${randomGradient}, url('https://images-sp.summitpost.org/tr:e-sharpen,e-contrast-1,fit-max,q-60,w-1024/390596.JPG')`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundRepeat = 'no-repeat';
  }

  showContent(section) {
    // Publish navigation event
    if (window.PubSub) {
      window.PubSub.publish('artistHouse:navigationClicked', {
        section: section
      });
    }

    // Handle navigation menu clicks
    const messages = {
      albums: 'Albums section - Explore our music collection!',
      projects: 'Projects section - View our creative works!',
      tour: 'Tour section - Join us on our journey!',
      shop: 'Shop section - Browse our merchandise!',
      explore: 'Explore section - Discover more content!'
    };

    const message = messages[section] || `${this.capitalizeFirst(section)} section - Content coming soon!`;
    
    // In a real Shopify theme, you might navigate to different pages or sections
    if (typeof Shopify !== 'undefined' && Shopify.designMode) {
      console.log(message);
    } else {
      // For production, you might want to navigate to actual pages
      // window.location.href = `/pages/${section}`;
      alert(message);
    }
  }

  toggleMenu() {
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu) {
      navMenu.classList.toggle('active');
    }
  }

  initializeRoom() {
    // Set initial active room
    const studioCard = document.querySelector('[data-room-name="Studio"]');
    if (studioCard) {
      studioCard.classList.add('active');
    }
  }

  capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  // Shopify theme editor event handlers
  handleSectionLoad(event) {
    console.log('Section loaded:', event.detail.sectionId);
  }

  handleSectionUnload(event) {
    console.log('Section unloaded:', event.detail.sectionId);
  }

  handleSectionSelect(event) {
    console.log('Section selected:', event.detail.sectionId);
  }

  handleSectionDeselect(event) {
    console.log('Section deselected:', event.detail.sectionId);
  }

  handleBlockSelect(event) {
    console.log('Block selected:', event.detail.blockId);
  }

  handleBlockDeselect(event) {
    console.log('Block deselected:', event.detail.blockId);
  }

  // Public API for external access
  getCurrentRoom() {
    return this.currentRoom;
  }

  setRoom(roomName) {
    this.goToRoom(roomName);
  }

  getAvailableRooms() {
    return window.theme?.artistHouse?.rooms || [];
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ArtistHouseNavigation();
});

// Shopify theme editor support
if (typeof Shopify !== 'undefined' && Shopify.designMode) {
  document.addEventListener('shopify:section:load', () => {
    new ArtistHouseNavigation();
  });
}
