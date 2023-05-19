const initialArray = [
  {
    id: 1,
    title: "ELLERY X M'O CAPSULE",
    description: 'Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.',
    price: 52,
    src: './img/feat1.jpg',
    color: 'Red',
    size: 'XL'
  },
  {
    id: 2,
    title: "ELLERY X M'O CAPSULE",
    description: 'Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.',
    price: 62,
    src: './img/feat2.jpg',
    color: 'Red',
    size: 'XL'
  },
  {
    id: 3,
    title: "ELLERY X M'O CAPSULE",
    description: 'Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.',
    price: 34,
    src: './img/feat3.jpg',
    color: 'Red',
    size: 'XL'
  },
  {
    id: 4,
    title: "ELLERY X M'O CAPSULE",
    description: 'Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.',
    price: 456.44,
    src: './img/feat4.jpg',
    color: 'Red',
    size: 'XL'
  },
  {
    id: 4,
    title: "ELLERY X M'O CAPSULE",
    description: 'Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.',
    price: 456,
    src: './img/feat5.jpg',
    color: 'Red',
    size: 'XL'
  },
  {
    id: 4,
    title: "ELLERY X M'O CAPSULE",
    description: 'Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.',
    price: 456,
    src: './img/feat6.jpg',
    color: 'Red',
    size: 'XL'
  }
];
const totalItemsCount = document.querySelector('.header__right-side-cart-count');
const totalItemsCountActiveSelector = 'header__right-side-cart-count_active';

const storageTotalItemsCount = sessionStorage.getItem('totalCounts') ? JSON.parse(sessionStorage.getItem('totalCounts')).totalQuantity : 0;

const mainCardTemplate = document.querySelector('#main-card');
const mainCardsSection = document.querySelector('.featured-items__cards');

const cartCardTemplate = document.querySelector('#cart-card');
const cartSubTotalPrice = document.querySelector('.cart__order-confirm-subtotal-cost');
const cartGrandTotalPrice = document.querySelector('.cart__order-confirm-grandtotal-cost');
const cartCardsSection = document.querySelector('.cart__items');
const cartClearBtn = document.querySelector('.cart__items-clear-btn');

export { initialArray, mainCardTemplate, mainCardsSection, totalItemsCount, storageTotalItemsCount, totalItemsCountActiveSelector, cartCardTemplate, cartSubTotalPrice, cartGrandTotalPrice, cartCardsSection, cartClearBtn };
