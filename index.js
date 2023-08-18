const input = document.getElementById('myInput');
const button = document.getElementById('myButton');
const list = document.getElementById('myList');
const totalPrice = document.getElementById('totalPrice')

//Comprovar si hay datos en el localStorage al cargarse la app, si los hay los devuelve, si no devuelve array vacío
const itemsKeeper = JSON.parse(window.localStorage.getItem('items')) || [];
//Contiene todos los sub totales de los productos añadidos
const subTotalKeeper = [] 

//Crea el texto para el usuario pueda poner el precio del producto al input correspondiente y se renderiza dentro de la targeta de producto una vez creado el mismo
const priceText = () => {
  const textPrice = document.createElement('p');
  textPrice.setAttribute('id', 'textPrice');
  textPrice.textContent = 'Precio €:';
  return textPrice;
};

//Crea un input para que el usuario pueda poner el precio del producto
const itemPrice = () => {
  const priceItem = document.createElement('input');
  priceItem.setAttribute('id', 'priceInput');
  priceItem.setAttribute('type', 'number');
  priceItem.setAttribute('min', 0);
  priceItem.value = 0;
  return priceItem;
};

//Crea un texto MIRAR SI SE UTILIZA Y DONDE!!!
const subtotalItem = () => {
  const itemSubtotal = document.createElement('p');
  itemSubtotal.setAttribute('id', 'subtotalItemP');
  return itemSubtotal;
};

//Crea un botón que quita una unidad del producto al hacer click, se crea una vez introducido el producto
function minHandler() {
  const buttonMin = document.createElement('button');
  //Deshabilitamos el botón al inicio de la renderización ya que una vez añadido el producto su cantidad mínmia será siempre 1
  buttonMin.setAttribute('disabled', true);
  buttonMin.setAttribute('class', 'counter');
  buttonMin.textContent = '-1';
  return buttonMin;
}

//Crea un botón que añade una unidad del producto al hacer click, se crea una vez introducido el producto
function plusHandler() {
  const plusButton = document.createElement('button');
  plusButton.setAttribute('class', 'counter');
  plusButton.textContent = '+1';
  return plusButton;
}

//Crea un input para mostrar las unidades de producto, se crea una vez añadido un producto
function inputPurchase() {
  const inputAmount = document.createElement('input');
  inputAmount.setAttribute('class', 'inputAmount');
  //Inicializamos su valor en uno ya que si se añade un producto nuevo su cantidad mínima siempre será 1
  inputAmount.value = 1;
  return inputAmount;
}

//Función que recorre el array de subTotaKeeper para sumar sus elementos y devolver el precio total de todos los elementos añadidos a la tala 
const totalAmount = () => {
  console.log('subTotalKeeperKeeper:' , subTotalKeeper)
  //Recorre el array sumando sus valores
  const amountItems = subTotalKeeper.reduce((cont, val) => parseFloat(cont) + parseFloat(val), 0)
  console.log('amountItems:', amountItems)
  totalPrice.textContent = amountItems
}

//Elemento compuesto de los elementos anteriores para renderizarlos dentro de la targeta del producto una vez añadido
const purchaseAmountController = () => {
  //Creamos un div que contendrá los elementos de precio de producto y cantidad y le seteamos atriutos
  const purchaseElement = document.createElement('div');
  purchaseElement.setAttribute('id', 'divPurchaseController');
  const priceItem = itemPrice();
  const minButton = minHandler();
  const plusButton = plusHandler();
  const input = inputPurchase();
  const itemSubtotal = subtotalItem();

  //Función que contiene la lógica del botón que resta en uno la cantidad de producto seleccionado
  minButton.addEventListener('click', () => {
    --input.value;
    //Creamos la lógica de habilitar o deshabilitar el botón comprovando que el valor del input sea > 1
    if (parseInt(input.value) > 1) {
      minButton.removeAttribute('disabled');
    } else {
      minButton.setAttribute('disabled', true);
    }
    //Logica para que cada vez que cliquemos el botón de minButton se actualize el precio del subtotal del producto
    const subtotal = parseInt(priceItem.value) * parseInt(input.value);
    itemSubtotal.textContent = `Subtotal: ${subtotal}`;
    subTotalKeeper[0] = subtotal
    totalAmount()
  });

  //Crea la lógica del botón añadir una unidad de cantidad del producto seleccionado
  plusButton.addEventListener('click', () => {
    ++input.value;
    //Comprobamos si el valor del input es > 1 para habilitar el botón de quitar una unidad de producto
    if (parseInt(input.value) > 1) {
      minButton.removeAttribute('disabled');
    }

    //Comprobamos cuando se clica el botón de plusButton si aumenta la cantidad de unidades de producto también se actualize el subtotal del precio del producto
    const subtotal = parseInt(priceItem.value) * parseInt(input.value);
    itemSubtotal.textContent = `Subtotal: ${subtotal}`;
    const index = subTotalKeeper.map((element, index) => {
      if(element === subtotal) return index
    })
    subTotalKeeper[index] = subtotal
    totalAmount()
  });

  //Sumamos todos los elementos del array subTotalKeeper (subTotales de todos los productos) y devolvemos la suma de ellos (total) y la renderiamos por pantalla
  priceItem.addEventListener('change', e => {
    console.log('e.target.value', e.target.value);
    const subtotal = parseInt(e.target.value) * parseInt(input.value);
    itemSubtotal.textContent = `Subtotal: ${subtotal}`;
    subTotalKeeper[0] = subtotal
    totalAmount()
  });

  //Creamos el elemento que que contiene el renderizado de los elementos anteriores y los añade a la card de producto
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


//Creamos un botón para poder eliminar toda la targeta de producto, este componente se renderiza solo dentro de la card de producto una vez introducido un nuevo producto
function delButton() {
  const buttonIcon = document.createElement('button');
  buttonIcon.setAttribute('id', 'deleteButton');
  buttonIcon.textContent = '❌';
  return buttonIcon;
}

//Creamos el elemento al completo de producto una vez clicamos el botón de Add Item y lo renderiza por pantalla 
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

  //Llamamos al botón de eliminar producto y le aplicamos la lógica 
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

//Botón para añadir producto una vez tenga un nombre en el input de producto
const handleButton = () => {
  const inputValue = input.value.trim();
  const itemName = item(inputValue);
  //Comprobamos si el producto ya esta introducido a la lista
  const isPresent = itemsKeeper.some(item => item === inputValue);
  
  //Aplicamos la lógica para que al añadir producto no cree duplicados del mismo
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

//Añadimos el evento para el botón de Add Item al hacer click
button.addEventListener('click', handleButton);
