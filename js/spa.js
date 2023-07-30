"use strict";
// Alle
// hide all pages
function hideAllPages() {
  let pages = document.querySelectorAll(".page");
  for (let page of pages) {
    page.style.display = "none";
  }
}

function showHeader() {
  let headers = document.querySelectorAll("header");
  for (let header of headers) {
    header.style.display = "block";
  }
}

// show page or tab
function showPage(pageId) {
  console.log(pageId);
  if (pageId !== "adgang") {
    showHeader();
  }
  hideAllPages();
  document.querySelector(`#${pageId}`).style.display = "block";
  setActiveTab(pageId);
}

// sets active tabbar/ menu item
function setActiveTab(pageId) {
  let pages = document.querySelectorAll(".tabbar a");
  for (let page of pages) {
    if (`#${pageId}` === page.getAttribute("href")) {
      page.classList.add("active");
    } else {
      page.classList.remove("active");
    }
  }
}

// navigate to a new view/page by changing href
function navigateTo(pageId) {
  location.href = `#${pageId}`;
}

function scrollToTop() {
  window.scroll({
    top: 0,
    behavior: "auto",
  });
}

// set default page or given page by the hash url
// function is called 'onhashchange'
function pageChange() {
  let page = "adgang";
  if (location.hash) {
    page = location.hash.slice(1);
  }
  showPage(page);
  if (location.hash !== "#produkter") {
    scrollToTop();
  }
}

pageChange(); // called by default when the app is loaded for the first time
