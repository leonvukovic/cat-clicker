
/* ======= Model ======= */

var model = {
  adminMode: false,
  currentCat: null,
  cats: [
    {
      clickCount : 0,
      name : 'Tabby',
      imgSrc : 'img/434164568_fea0ad4013_n.jpg',
      imgAttributation: 'https://www.flickr.com/photos/bigtallguy/434164568'
    },
    {
      clickCount : 0,
      name : 'Tiger',
      imgSrc : 'img/1413379559_412a540d29_n.jpg',
      imgAttributation: 'https://www.flickr.com/photos/xshamx/4154543904'
    },
    {
      clickCount : 0,
      name : 'Sleepy',
      imgSrc : 'img/4154543904_6e2428c421_n.jpg',
      imgAttributation: 'https://www.flickr.com/photos/kpjas/22252709'
    }
  ]
};


/* ======= Octopus ======= */

var octopus = {

  init: function() {
    // set our current cat to the first one in the catListElem
    model.currentCat = model.cats[0];

    // tell our views to initialize
    catViewList.init();
    catView.init();
    adminView.init();
  },

  getCurrentCat: function() {
    return model.currentCat;
  },

  getCats: function() {
    return model.cats;
  },

  // set currently-selected cat to the object passed in
  setCurrentCat: function(cat) {
    model.currentCat = cat;
  },

  incrementCounter: function() {
    model.currentCat.clickCount++;
    catView.render();
  },

  getAdminView: function() {
    return model.adminMode;
  },

  openingView: function() {
    model.adminMode = true;
    adminView.render();
  },

  closingView: function() {
    model.adminMode = false;
    adminView.render();
  },

  updateCurrentCat: function() {
    model.currentCat.name = this.catNewName;
    model.currentCat.imgSrc = this.catNewImg;
    model.currentCat.clickCount = this.catNewClicks;

    catView.render();
    catListView.render();
  }
};


/* ======= View ======= */

var catView = {

  init: function() {
    // store pointers to DOM elements
    this.catElem = document.getElementById('cat');
    this.catNameElem = document.getElementById('cat-name');
    this.catImageElem = document.getElementById('cat-img');
    this.countElem = document.getElementById('cat-count');

    // on click, increment the current cat's counter
    this.catImageElem.addEventListener('click', function() {
      octopus.incrementCounter();
    });

    // render this view (update DOM)
    this.render();
  },

  render: function() {
    // update the DOM elements with values from the current cats
    var currentCat = octopus.getCurrentCat();
    this.countElem.textContent = currentCat.clickCount;
    this.catNameElem.textContent = currentCat.name;
    this.catImageElem.src = currentCat.imgSrc;
  }
};

var catViewList = {

  init: function() {
    // store the DOM element
    this.catListElem = document.getElementById('cat-list');

    // render this view (update DOM)
    this.render();
  },

  render: function() {
    // get the cats
    var cats = octopus.getCats();

    // empty the cat list
    this.catListElem.innerHTML = '';

    // loop over the cats
    for (var i = 0; i < cats.length; i++) {
      // current cat
      var cat = cats[i];

      // make a new cat list item and set its text
      var elem = document.createElement('li');
      elem.textContent = cat.name;

      // on click setCurrentCat and render the catViewList
      elem.addEventListener('click', (function(catCopy) {
        return function() {
          octopus.setCurrentCat(catCopy);
          catView.render();
        }
      })(cat));

      // add element to the list
      this.catListElem.appendChild(elem);
    };
  }
};

var adminView = {

  init: function() {
    // store pointers to DOM elements
    this.adminArea = document.getElementById('admin-area');
    this.adminBtn = document.getElementById('admin-btn');
    this.cancelBtn = document.getElementById('cancel-btn');
    this.saveBtn = document.getElementById('save-btn');
    this.catNewName = document.getElementById('add-name').value;
    this.catNewImg = document.getElementById('add-img').value;
    this.catNewClicks = document.getElementById('add-clicks').value;

    // add event listeners to DOM elements
    this.adminBtn.addEventListener('click', function() {
      octopus.openingView();
    });
    this.cancelBtn.addEventListener('click', function() {
      octopus.closingView();
    });
    this.saveBtn.addEventListener('click', function() {
      octopus.updateCurrentCat();
    });

    // render this view (update DOM)
    this.render();
  },

  render: function() {
    // set admin mode visible or invisibvle
    var adminMode = octopus.getAdminView();
    if (adminMode === false) {
      this.adminArea.style.display = "none";
    } else if (adminMode === true) {
      this.adminArea.style.display = "block";
    }
  }
};

// make it go!
octopus.init();
