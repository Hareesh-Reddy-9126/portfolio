'use strict';

// element toggle function
const elementToggleFunc = function (elem) {
  if (elem) {
    elem.classList.toggle("active");
  }
}

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
if (sidebarBtn && sidebar) {
  sidebarBtn.addEventListener("click", function () {
    elementToggleFunc(sidebar);
  });
}

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

// Only add event listener if select element exists
if (select) {
  select.addEventListener("click", function () {
    elementToggleFunc(this);
  });
}

// add event in all select items
if (selectItems.length > 0 && selectValue) {
  for (let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener("click", function () {

      let selectedValue = this.innerText.toLowerCase();
      selectValue.innerText = this.innerText;
      elementToggleFunc(select);
      filterFunc(selectedValue);

    });
  }
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
}

// add event in all filter button items for large screen
if (filterBtn.length > 0 && selectValue) {
  let lastClickedBtn = filterBtn[0];

  for (let i = 0; i < filterBtn.length; i++) {
    filterBtn[i].addEventListener("click", function () {
      let selectedValue = this.innerText.toLowerCase();
      if (selectValue) selectValue.innerText = this.innerText;
      filterFunc(selectedValue);

      if (lastClickedBtn) lastClickedBtn.classList.remove("active");
      this.classList.add("active");
      lastClickedBtn = this;
    });
  }
}

// contact form variables
const form = document.querySelector("[data-form]");

// contact form handling
if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    
    const formData = new FormData(form);
    const submitBtn = form.querySelector(".form-btn");
    
    if (!submitBtn) {
      console.error('Submit button not found');
      return;
    }
    
    const originalText = submitBtn.innerHTML;
    
    // Disable button and show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<ion-icon name="hourglass-outline"></ion-icon><span>Sending...</span>';
    
    fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        // Success
        submitBtn.classList.add('success');
        submitBtn.innerHTML = '<ion-icon name="checkmark-outline"></ion-icon><span>Message Sent!</span>';
        form.reset();
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.classList.remove('success');
          submitBtn.innerHTML = originalText;
        }, 3000);
      } else {
        throw new Error('Network response was not ok');
      }
    })
    .catch(error => {
      // Error
      submitBtn.classList.add('error');
      submitBtn.innerHTML = '<ion-icon name="close-outline"></ion-icon><span>Error! Try Again</span>';
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.classList.remove('error');
        submitBtn.innerHTML = originalText;
      }, 3000);
      console.error('Error:', error);
    });
  });
}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
if (navigationLinks.length > 0 && pages.length > 0) {
  for (let i = 0; i < navigationLinks.length; i++) {
    navigationLinks[i].addEventListener("click", function () {
      for (let j = 0; j < pages.length; j++) {
        if (this.innerHTML.toLowerCase() === pages[j].dataset.page) {
          pages[j].classList.add("active");
          navigationLinks[j].classList.add("active");
          window.scrollTo(0, 0);
        } else {
          pages[j].classList.remove("active");
          navigationLinks[j].classList.remove("active");
        }
      }
    });
  }
}