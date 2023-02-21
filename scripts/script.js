const burgerBtn = document.querySelector('.header__right-side-burger-btn');
const popupMenu = document.querySelector('.popup__menu');

const handleOpenPopupMenu = () => {
  popupMenu.classList.add('popup__menu_opened');
  popupMenu.addEventListener('mouseover', handleOpenPopupMenu);
};

const handleClosePopupMenu = () => {
  popupMenu.classList.remove('popup__menu_opened');
  popupMenu.addEventListener('mouseout', handleClosePopupMenu);
};

const handleBurgerBtnHover = evt => {
  if (evt.type === 'mouseover') {
    handleOpenPopupMenu(evt);
  } else if (evt.type === 'mouseout') {
    handleClosePopupMenu(evt);
  }
};

burgerBtn.addEventListener('mouseover', handleBurgerBtnHover);
burgerBtn.addEventListener('mouseout', handleBurgerBtnHover);
