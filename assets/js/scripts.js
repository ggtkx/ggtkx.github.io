/**
 * Scripts for the theme
 */
const body = document.querySelector('body');
const menuTrigger = document.querySelector('#toggle-main-menu-mobile');
const menuContainer = document.querySelector('#main-menu-mobile');

menuTrigger.onclick = function() {
  menuContainer.classList.toggle('open');
  menuTrigger.classList.toggle('is-active');
  body.classList.toggle('lock-scroll');
};

// function openTab(evt) {
//   const tabContents = document.getElementsByClassName('tab-content');
//   for (const tabContent of tabContents) {
//     tabContent.style.display = 'none';
//   }
//   const tabLinks = document.getElementsByClassName('tab-links');
//   for (const tabLink of tabLinks) {
//     tabLink.classList.remove('active');
//   }
//   const tabName = evt.currentTarget.dataset.tabId;
//   document.getElementById(tabName).style.display = 'block';
//   evt.currentTarget.className += ' active';
// }

// Get the element with class="default-open" and click on it
const defaultOpenTabs = document.getElementsByClassName('default-open');
for (const defaultOpenTab of defaultOpenTabs) {
  defaultOpenTab.click();
}

/* toggle english and chinese */
// Get the memnu container
const menuContWeb = document.getElementById('main-menu');
// Get current url
const currentUrl = window.location.href;
// check if current url contains /english/
if (currentUrl.includes('/english/')) {
  // add class to menu container
  // the 7th child of ul(nav) is english link
  const englishLink = menuContWeb.children[0].children[6];
  // hide english link
  englishLink.style.display = 'none';

  // 主页
  menuContWeb.children[0].children[0].children[0].textContent = 'Home';
  // 近期活动
  menuContWeb.children[0].children[1].children[0].textContent = 'Events';
  // 云集栏目
  menuContWeb.children[0].children[2].children[0].textContent = 'YunJi';
  // 赞助招商
  menuContWeb.children[0].children[3].children[0].textContent = 'Sponsors';
  // 往届回顾
  menuContWeb.children[0].children[4].children[0].textContent = 'Past Events';
  // 关于我们
  menuContWeb.children[0].children[5].children[0].textContent = 'About Us';
  // 活动购票
  menuContWeb.children[0].children[8].children[0].textContent = 'Tickets';
} else {
  const chineseLink = menuContWeb.children[0].children[7];
  // hide chinese link
  chineseLink.style.display = 'none';
}
