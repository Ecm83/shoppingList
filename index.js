const input = document.getElementById('myInput');
const button = document.getElementById('myButton');
const list = document.getElementById('myList');
const totalPrice = document.getElementById('totalPrice')

// Cargar datos del localStorage al inicio
const itemsKeeper = JSON.parse(window.localStorage.getItem('items')) || [];
const subTotalKeeper = [] 

const priceText = () => {
  const textPrice = document.createElement('p');
  textPrice.setAttribute('id', 'textPrice');
  textPrice.textContent = 'Precio:';
  return textPrice;
};

const itemPrice = () => {
  const priceItem = document.createElement('input');
  priceItem.setAttribute('id', 'priceInput');
  priceItem.setAttribute('type', 'number');
  priceItem.setAttribute('min', 0);
  priceItem.value = 0;
  return priceItem;
};

const subtotalItem = () => {
  const itemSubtotal = document.createElement('p');
  itemSubtotal.setAttribute('id', 'subtotalItemP');
  return itemSubtotal;
};

function minHandler() {
  const buttonMin = document.createElement('button');
  buttonMin.setAttribute('disabled', true);
  buttonMin.setAttribute('class', 'counter');
  buttonMin.textContent = '-1';
  return buttonMin;
}

function plusHandler() {
  const plusButton = document.createElement('button');
  plusButton.setAttribute('class', 'counter');
  plusButton.textContent = '+1';
  return plusButton;
}

function inputPurchase() {
  const inputAmount = document.createElement('input');
  inputAmount.setAttribute('class', 'inputAmount');
  inputAmount.value = 1;
  return inputAmount;
}
const totalAmount = () => {
  console.log('subTotalKeeperKeeper:' , subTotalKeeper)
  const amountItems = subTotalKeeper.reduce((cont, val) => parseFloat(cont) + parseFloat(val), 0)
  console.log('amountItems:', amountItems)
  totalPrice.textContent = amountItems
}

const purchaseAmountController = () => {
  const purchaseElement = document.createElement('div');
  purchaseElement.setAttribute('id', 'divPurchaseController');
  const priceItem = itemPrice();
  const minButton = minHandler();
  const plusButton = plusHandler();
  const input = inputPurchase();
  const itemSubtotal = subtotalItem();

  minButton.addEventListener('click', () => {
    --input.value;
    if (parseInt(input.value) > 1) {
      minButton.removeAttribute('disabled');
    } else {
      minButton.setAttribute('disabled', true);
    }
    const subtotal = parseInt(priceItem.value) * parseInt(input.value);
    itemSubtotal.textContent = `Subtotal: ${subtotal}`;
    subTotalKeeper[0] = subtotal
    totalAmount()
  });

  plusButton.addEventListener('click', () => {
    ++input.value;
    if (parseInt(input.value) > 1) {
      minButton.removeAttribute('disabled');
    }
    const subtotal = parseInt(priceItem.value) * parseInt(input.value);
    itemSubtotal.textContent = `Subtotal: ${subtotal}`;
    const index = subTotalKeeper.map((element, index) => {
      if(element === subtotal) return index
    })
    subTotalKeeper[index] = subtotal
    totalAmount()
  });

  priceItem.addEventListener('change', e => {
    console.log('e.target.value', e.target.value);
    const subtotal = parseInt(e.target.value) * parseInt(input.value);
    itemSubtotal.textContent = `Subtotal: ${subtotal}`;
    subTotalKeeper[0] = subtotal
    totalAmount()
  });

  const initialSubtotal = parseInt(priceItem.value) * parseInt(input.value);
  itemSubtotal.textContent = `Subtotal: ${initialSubtotal}`;

  itemSubtotal.value = `${parseInt(priceItem.value) * parseInt(input.value)}`;
  console.log('subtotal es:', itemSubtotal);
  subTotalKeeper.push(itemSubtotal.value)
  
  purchaseElement.setAttribute('class', 'divPurchase');
  purchaseElement.appendChild(priceItem);
  purchaseElement.appendChild(minButton);
  purchaseElement.appendChild(input);
  purchaseElement.appendChild(plusButton);
  purchaseElement.appendChild(itemSubtotal);
  return purchaseElement;
};

function delButton() {
  const buttonIcon = document.createElement('button');
  buttonIcon.setAttribute('id', 'deleteButton');
  buttonIcon.textContent = '❌';
  return buttonIcon;
}

const item = text => {
  const del = delButton();
  const divPurchase = purchaseAmountController();
  const itemName = document.createElement('li');
  const textPrice = priceText();
  const itemSubtotal = subtotalItem(); //calcul
  itemName.setAttribute('class', 'itemList');
  itemName.textContent = text;
  itemName.appendChild(textPrice);
  itemName.appendChild(divPurchase);
  itemName.appendChild(itemSubtotal);
  itemName.appendChild(del);

  del.addEventListener('click', () => {
    itemName.parentNode.removeChild(itemName);
    const index = itemsKeeper.indexOf(text);
    if (index > -1) {
      itemsKeeper.splice(index, 1);
      window.localStorage.setItem('items', JSON.stringify(itemsKeeper));
    }
  }); 
  return (itemName)
};

// document.addEventListener('DOMContentLoaded', () => {
//   const data = JSON.parse(window.localStorage.getItem('items')) || [];
//   itemsKeeper.push(...data); // Agregar los elementos a itemsKeeper
//   data.forEach(item => {
//     item(item); // Renderizar cada elemento
//   });
// });

const handleButton = () => {
  const inputValue = input.value.trim();
  const itemName = item(inputValue);
  const isPresent = itemsKeeper.some(item => item === inputValue);
  
  console.log('isPresent:', isPresent)
  if(!isPresent && inputValue !== ''){
    list.appendChild(itemName);
    itemsKeeper.push(inputValue);
    window.localStorage.setItem('items', JSON.stringify(itemsKeeper));    
    input.value = '';
    input.focus();
  }else{
  alert('Este objeto ya esta en la lista')
  }
  // console.log('isPresent, esta presente?:', isPresent);
};  

button.addEventListener('click', handleButton);
