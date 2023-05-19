import { initialArray, mainCardTemplate, mainCardsSection, totalItemsCount, storageTotalItemsCount, totalItemsCountActiveSelector } from './constants.js';

//Если при загрузке страницы в session storage есть нужные объекты, отрисовываем количество на значке корзины
if (storageTotalItemsCount > 0) {
  totalItemsCount.classList.add(totalItemsCountActiveSelector);
  totalItemsCount.textContent = storageTotalItemsCount;
}

//создаем элемент карточки
function createCardElement(element) {
  const { title, description, price, src } = element;
  const cardElement = mainCardTemplate.content.querySelector('.featured-items__card').cloneNode(true);
  const cardElementImg = cardElement.querySelector('.featured-items__card-img');
  const cardElementTitle = cardElement.querySelector('.featured-items__card-title');
  const cardElementDescription = cardElement.querySelector('.featured-items__card-subtitle');
  const cardElementPrice = cardElement.querySelector('.featured-items__card-price');
  const cardElementBuyBtn = cardElement.querySelector('.featured-items__card-add-btn');

  cardElementImg.src = src;
  cardElementImg.alt = title;
  cardElementTitle.textContent = title;
  cardElementDescription.textContent = description;
  cardElementPrice.textContent = `$${price.toFixed(2)}`;

  cardElementBuyBtn.addEventListener('click', event => {
    event.preventDefault();
    handleBuyButtonClick(element);
  });

  return cardElement;
}

//обработчик клика на "Купить"
function handleBuyButtonClick(element) {
  //Добавляем элемент в корзину
  addToCart(element);

  //при клике на кнопку обновляем общий счетчик товаров в корзине
  totalItemsCount.textContent = JSON.parse(sessionStorage.getItem('totalCounts')).totalQuantity;

  //если корзина ранее была пуста, отрисовываем круг с цифрой количества на иконке в хедере
  if (!totalItemsCount.classList.contains(totalItemsCountActiveSelector)) {
    totalItemsCount.classList.add(totalItemsCountActiveSelector);
  }
}

//Добавление элемента в хранилище
function addToCart(element) {
  const cartString = sessionStorage.getItem('cart');
  let cart = [];

  // Если массив "cart" уже существует в sessionStorage, преобразуем его из строки JSON в JavaScript-объекn
  if (cartString) {
    cart = JSON.parse(cartString);
  }
  // Поиск объекта в массиве "cart"
  const existingObject = cart.find(obj => obj.id === element.id);

  if (existingObject) {
    // Если объект уже существует, добавляем поле "count"
    existingObject.count = existingObject.count ? existingObject.count + 1 : 1;
  } else {
    // Если объект не найден, добавляем новый объект с полем "count"
    element.count = 1;
    cart.push(element);
  }

  // Преобразование обновленного массива "cart" обратно в строку JSON
  const updatedCartString = JSON.stringify(cart);
  // Сохранение обновленной строки JSON в sessionStorage
  sessionStorage.setItem('cart', updatedCartString);

  //Обновляем глобальные счетчики
  updateTotalCounts(element);
}

//Функция, отвечающая за обновление счетчика общего кол-во товаров и итоговой цены
function updateTotalCounts(element) {
  const totalCountsString = sessionStorage.getItem('totalCounts');
  let totalCounts = { totalQuantity: 1, totalPrice: element.price };

  // Если массив "totalCounts" уже существует в sessionStorage, преобразуем его из строки JSON в JavaScript-объекn
  if (totalCountsString) {
    totalCounts = JSON.parse(totalCountsString);
    totalCounts.totalQuantity += 1;
    totalCounts.totalPrice = parseFloat((totalCounts.totalPrice + element.price).toFixed(2), 10);
  }

  // Преобразование обновленного массива "totalCounts" обратно в строку JSON
  const updatedtotalCountsString = JSON.stringify(totalCounts);
  // Сохранение обновленной строки JSON в sessionStorage
  sessionStorage.setItem('totalCounts', updatedtotalCountsString);
}

//отрисовка карточки
function generateTemplateCard() {
  // проходим по массиву изначально заданных данных
  initialArray.forEach(element => {
    const cardElement = createCardElement(element);

    mainCardsSection.append(cardElement);
  });
}

generateTemplateCard();
