/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 *
*/
// Navbar Variable
var navbar = document.getElementById('navbar__list');
// Container that holds the sections
var bodyContainer = document.getElementById('bodyContainer');
// Adding new elements button
var addingButton = document.getElementById('addSection');
// Removing elements button
var removingButton = document.getElementById('removeSection');
// A counter to keep track of current div items
var Elementscounter = 1;

/**
 * End Global Variables
 * Start Helper Functions
 *
*/

//  Function to add text inside div
let loremText = () => {
  return paragraph = `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.</p><p>Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.</p>`
};

/**
 * End Helper Functions
 * Begin Main Functions
 *
*/


// build the navbar dynmically
//          Working fine
var buildNav = (counter) => {

    let navItem = document.createElement('li');
    let itemNumber = `Item ${counter}`;
    let idName = "Item" + `${counter}`;
    let sectionId = "section"+`${counter}`;
    navItem.setAttribute('id' , idName);
    navItem.classList.add("menu__link");
    navItem.innerHTML = "<a href='#'>" + "Item "+`${counter}`+"</a>";
    if(counter === 1)
    {
      navItem.classList.add('your-active-class');
    }
    return navItem;
};

//Build body items
//        Working fine
var addBody = (counter) => {
  let section = document.createElement('section');
  let sectionID =  `section${counter}`;
  let dataNav = `Section ${counter}`;
  section.setAttribute('id',sectionID);
  section.setAttribute('data-nav',dataNav);

  let createDiv = document.createElement('div');
  createDiv.classList.add('landing__container');
  createDiv.innerHTML = `<h2>Section ${counter}</h2>` + loremText();

  if(counter === 1)
  {
    section.setAttribute('class','your-active-class');
  }

  section.appendChild(createDiv);
  return section;

}



// Add class 'active' to section when near top of viewport
var activate = (sections , navigation , current , counter) => {
  for(section of sections)
  {
    console.log('-----------');
    let location = section.getBoundingClientRect();
    console.log(location);
    if(location.y < -120 || location.y > 680)
    {
      console.log("element number " + (counter++) + " is off screen");
      section.classList.remove('your-active-class');
    }
    else if(location.y >= -120 && location.y <= 680)
    {
      current = counter;
      console.log("element number " + (counter++) + " is on screen");
      section.classList.add('your-active-class');
    }
  }

  //highlight the active nav bar
  for(let i = 0 ; i < navigation.length ; i++)
  {
    if(i == current)
    {
      console.log(`nav number ${i} is on screen`);
      navigation[i].classList.add('your-active-class');
    }
    else
    {
      navigation[i].classList.remove('your-active-class');
    }
  }
};


// Scroll to anchor ID using scrollTO event

/**

 * End Main Functions
 * Begin Events
 *
*/

// Build menu
// Adding and removing elements dynamically works perfect
addingButton.addEventListener('click', () => {
  navbar.appendChild(buildNav(Elementscounter));
  bodyContainer.appendChild(addBody(Elementscounter));
  Elementscounter++;
  var x = document.querySelectorAll('section');
  // firstElementChild
});
removingButton.addEventListener('click' , () =>  {
  let lastSection = bodyContainer.lastElementChild;
  let lastNavbar = navbar.lastElementChild;
  bodyContainer.removeChild(lastSection);
  navbar.removeChild(lastNavbar);
  Elementscounter--;
});

// Scroll to section on link click

// Set sections as active
window.addEventListener('scroll', (event)=>{
    let sections = document.querySelectorAll('section');
    let navigation = document.querySelectorAll('li');
    let current=0;
    let counter = 0;
    //remove all active classes from the section and the nav
    for(section of sections)
    {
      section.classList.remove('your-active-class');
    }
    for(nav of navigation)
    {
      nav.classList.remove('your-active-class');
    }


    //get bounds of body element and figure out which one is the active
  activate(sections , navigation , current , counter);
});
