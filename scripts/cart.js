import { totalItemsCount, storageTotalItemsCount, totalItemsCountActiveSelector, cartCardTemplate, cartSubTotalPrice, cartGrandTotalPrice, cartCardsSection, cartClearBtn } from './constants.js';

//Если при загрузке страницы в session storage есть нужные объекты, отрисовываем количество на значке корзины
if (storageTotalItemsCount > 0) {
  totalItemsCount.classList.add(totalItemsCountActiveSelector);
  totalItemsCount.textContent = storageTotalItemsCount;
}

function createCardElement(element) {
  const cardElement = cartCardTemplate.content.querySelector('.cart__item').cloneNode(true);

  const cardElementImg = cardElement.querySelector('.cart__item-img');
  const cardElementTitle = cardElement.querySelector('.cart__item-title');
  const cardElementPrice = cardElement.querySelector('.cart__item-price');
  const cardElementColor = cardElement.querySelector('.cart__item-color');
  const cardElementSize = cardElement.querySelector('.cart__item-size');
  const cardDeleteBtn = cardElement.querySelector('.cart__item-close-btn');
  const constCardElementQuantity = cardElement.querySelector('.cart__item-characteristic-quantity-input');

  const { src, title, price, count, color, size } = element;
  cardElementImg.src = `.${src}`;
  cardElementImg.alt = title;
  cardElementTitle.textContent = title;
  cardElementPrice.textContent = `$${Number.isInteger(price) ? price + '.00' : price}`;
  cardElementColor.textContent = color;
  cardElementSize.textContent = size;
  constCardElementQuantity.value = count;

  function handleUpdateCard(event) {
    //получаем данные из хранилища
    const totalCounts = JSON.parse(sessionStorage.getItem('totalCounts'));
    const cart = JSON.parse(sessionStorage.getItem('cart'));
    const newQuantity = parseInt(event.target.value);

    const targetProduct = cart.find(product => product.id === element.id);

    //обновление значения тотал прайса после изменения инпута
    totalCounts.totalPrice = parseFloat((totalCounts.totalPrice + (newQuantity * price - targetProduct.count * price)).toFixed(2), 10);
    cartSubTotalPrice.textContent = `$${totalCounts.totalPrice}`;
    cartGrandTotalPrice.textContent = `$${totalCounts.totalPrice}`;

    //обновление значения тотал товаров после изменения инпута
    totalCounts.totalQuantity = totalCounts.totalQuantity - targetProduct.count + newQuantity;
    totalItemsCount.textContent = totalCounts.totalQuantity;

    //есл тотал товаров = 0, убрать счетчик с иконки в хедере
    if (totalCounts.totalQuantity === 0) {
      totalItemsCount.classList.remove(totalItemsCountActiveSelector);
    }

    //обновление счетчика в карточке товара
    targetProduct.count = newQuantity;

    //Если счетчик товара = 0
    if (newQuantity === 0) {
      //удаляем карточку со страницы
      event.target.closest('.cart__item').remove();
      //удаляем инфо о товаре из хранилища
      const index = cart.indexOf(targetProduct);
      cart.splice(index, 1);
    }

    //Обновляем данные в хранилище
    sessionStorage.setItem('totalCounts', JSON.stringify(totalCounts));
    sessionStorage.setItem('cart', JSON.stringify(cart));
  }

  function handleDeleteCard(event) {
    //получаем данные из хранилища
    const totalCounts = JSON.parse(sessionStorage.getItem('totalCounts'));
    const cart = JSON.parse(sessionStorage.getItem('cart'));

    const targetProduct = cart.find(product => product.id === element.id);

    //обновление значения тотал прайса после удаления карточки на странице и в сторедже
    totalCounts.totalPrice = parseFloat((totalCounts.totalPrice - targetProduct.price * targetProduct.count).toFixed(2), 10);
    cartSubTotalPrice.textContent = `$${totalCounts.totalPrice.toFixed(2)}`;
    cartGrandTotalPrice.textContent = `$${totalCounts.totalPrice.toFixed(2)}`;

    //обновление значения тотал товаров после удаления карточки на странице и в сторедже
    totalCounts.totalQuantity = totalCounts.totalQuantity - targetProduct.count;
    totalItemsCount.textContent = totalCounts.totalQuantity;

    //есл тотал товаров = 0, убрать счетчик с иконки в хедере
    if (totalCounts.totalQuantity === 0) {
      totalItemsCount.classList.remove(totalItemsCountActiveSelector);
    }

    //удалить карточку со стриницы
    event.target.closest('.cart__item').remove();

    //удалить карточку со стореджа

    const index = cart.indexOf(targetProduct);
    cart.splice(index, 1);

    //Обновляем данные в хранилище
    sessionStorage.setItem('totalCounts', JSON.stringify(totalCounts));
    sessionStorage.setItem('cart', JSON.stringify(cart));
  }

  //Обработчик на инпут
  constCardElementQuantity.addEventListener('input', event => handleUpdateCard(event));

  //Обработчик на удалить кнопку
  cardDeleteBtn.addEventListener('click', event => handleDeleteCard(event));

  return cardElement;
}

function generateTemplateCard() {
  //отрисовываем тотал прайс при открытии страницы корзины
  cartSubTotalPrice.textContent = sessionStorage.getItem('totalCounts') ? `$${JSON.parse(sessionStorage.getItem('totalCounts')).totalPrice.toLocaleString('ru-RU')}` : 0;
  cartGrandTotalPrice.textContent = sessionStorage.getItem('totalCounts') ? `$${JSON.parse(sessionStorage.getItem('totalCounts')).totalPrice.toLocaleString('ru-RU')}` : 0;

  //Получаем массив объектов с товарами, лежащими в корзине
  const productsInCart = JSON.parse(sessionStorage.getItem('cart'));

  //проходим по массиву и отрисовываем каждую карточку
  productsInCart.forEach(element => cartCardsSection.prepend(createCardElement(element)));
}

function handleCartClear(event) {
  event.preventDefault();

  //очистка хранилища
  const totalCounts = {
    totalQuantity: 0,
    totalPrice: 0
  };
  const cart = [];

  //обновление значения тотал прайса после очистки корзины
  cartSubTotalPrice.textContent = totalCounts.totalPrice;
  cartGrandTotalPrice.textContent = totalCounts.totalPrice;

  //удаление всех карточек со страницы
  const cards = Array.from(cartCardsSection.querySelectorAll('.cart__item'));
  cards.forEach(card => card.remove());

  //Обновляем данные в хранилище
  sessionStorage.setItem('totalCounts', JSON.stringify(totalCounts));
  sessionStorage.setItem('cart', JSON.stringify(cart));
}

cartClearBtn.addEventListener('click', event => handleCartClear(event));

generateTemplateCard();
