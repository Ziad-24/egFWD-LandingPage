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
// Back to top button
var topButton = document.getElementById('topButton');
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
// Working fine
var buildNav = (counter) => {

    let navItem = document.createElement('li');
    let itemNumber = `Item ${counter}`;
    let idName = "Item" + `${counter}`;
    let sectionId = `section${counter}`;
    navItem.setAttribute('data-nav',sectionId);
    navItem.setAttribute('id' , idName);
    navItem.classList.add("menu__link");
    navItem.innerHTML = `<a href=#${sectionId} data-nav=${sectionId}> ${itemNumber}</a>`;
    if(counter === 1)
    {
      navItem.classList.add('your-active-class');
    }
    return navItem;
};

//Build body items
// Working fine
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
  //counter is used to keep track of items
  //current is used to detect the active section
  counter = 0;
  for(section of sections)
  {
    let location = section.getBoundingClientRect();
    // if item is off the screen remove active class
    if(location.y < -70 || location.y > 600)
    {
      section.classList.remove('your-active-class');
    }
    // if inside the view then add active class
    else if(location.y >= -70 && location.y <= 600)
    {
      section.classList.add('your-active-class');
      current = counter;
    }
    counter++;
  }

  //highlight the active nav bar
  for(let i = 0 ; i < navigation.length ; i++)
  {
    if(i == current)
    {
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

});
removingButton.addEventListener('click' , () =>  {
  let lastSection = bodyContainer.lastElementChild;
  let lastNavbar = navbar.lastElementChild;
  bodyContainer.removeChild(lastSection);
  navbar.removeChild(lastNavbar);
  Elementscounter--;
});

// Scroll to section on link click
navbar.addEventListener('click' , (event) =>{
  event.preventDefault();
  let sections = document.querySelectorAll('section');
  let navId = event.target.dataset.nav;

  if(navId)
  {
    for(section of sections)
    {
      if(navId == section.id)
      {
        section.scrollIntoView({ behaviour : 'smooth'});
      }
    }
  }
});

// Set sections as active
window.addEventListener('scroll', ()=>{
    let footer = document.querySelector('footer');
    let footerButton = document.getElementById('topButton');
    let sections = document.querySelectorAll('section');
    let navigation = document.querySelectorAll('li');
    let current=0;
    let counter = 0;
    // check the Footer
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

    // check if footer is visiblie
    let footerLocation = footer.getBoundingClientRect();
    if(footerLocation.y <= 800)
    {
      footerButton.style.visibility = "visible";
    }
    else
    {
      footerButton.style.visibility = "hidden";
    }
});

// Going back to top when pressing the button
topButton.addEventListener('click' , () => {
    window.scrollTo({
      top : 0,
      behaviour : 'smooth',
    })
});
