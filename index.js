// // const input = document.getElementById('myInput')
// // const button = document.getElementById('myButton')
// // const list = document.getElementById('myList')

// // const data = JSON.parse(window.localStorage.getItem('items')) || []
// // const itemsKeeper = data || []

// // function delButton() {
// //   const buttonIcon = document.createElement('button')
// //   buttonIcon.textContent = '🗑️'  
// //   return buttonIcon
// // }

// // const item = (text) => {
// //   const del = delButton()
// //   const itemName = document.createElement('li')
// //   itemName.setAttribute('class', 'itemList')
// //   itemName.textContent = text
// //   itemName.appendChild(del)
  
// //   del.addEventListener('click', () => {
// //     itemName.parentNode.removeChild(itemName)
// //     // data.map(item => item.window.localStorage.removeItem('items'))
// //   }) 

// //   list.appendChild(itemName)
// // }    

// // const handleButton = () => {
// //   item(input.value)
// //   itemsKeeper.push(input.value)
// //   window.localStorage.setItem('items', JSON.stringify(itemsKeeper))
  
// //   input.value = ''
// //   input.focus()
// // }

// // button.addEventListener('click', handleButton)


// // ----------------------------------Chat GPT -----------------------------



const input = document.getElementById('myInput')
const button = document.getElementById('myButton')
const list = document.getElementById('myList')

// Cargar datos del localStorage al inicio
const data = JSON.parse(window.localStorage.getItem('items')) || []
const itemsKeeper = data || []

const priceText = () => {
  const textPrice = document.createElement('p')
  textPrice.setAttribute('id', 'textPrice')
  textPrice.textContent = 'Precio:'
  return textPrice
}

const itemPrice = () => {
  const priceItem = document.createElement('input')
  priceItem.setAttribute('id', 'priceInput')
  priceItem.value = 1
  priceItem.setAttribute('type', 'number')
  priceItem.setAttribute('min', '0')
  return priceItem
}

const subtotalItem = () => {
  const itemSubtotal = document.createElement('p')
  itemSubtotal.setAttribute('id', 'subtotalItemP')
  return itemSubtotal
}

function minHandler() {
  const buttonMin  = document.createElement('button')
  buttonMin.setAttribute('disabled', true)
  buttonMin.setAttribute('class', 'counter')
  buttonMin.textContent = '-1'
  return buttonMin
}

function plusHandler() {
  const plusButton = document.createElement('button')
  plusButton.setAttribute('class', 'counter')
  plusButton.textContent = '+1'
  return plusButton
}

function inputPurchase() {
  const inputAmount = document.createElement('input')
  inputAmount.setAttribute('class', 'inputAmount')
  inputAmount.value = 1
  return inputAmount
}


const purchaseAmountController = () => {
  const purchaseElement = document.createElement('div')
  purchaseElement.setAttribute('id', 'divPurchaseController')
  const minButton = minHandler()
  const plusButton = plusHandler()
  const input = inputPurchase()
  const priceItem = itemPrice()
  const itemSubtotal = subtotalItem()
  minButton.addEventListener('click', () => {
    --input.value;
    if (parseInt(input.value) > 1) {
      minButton.removeAttribute('disabled');
    } else {
      minButton.setAttribute('disabled', true);
    }
    const subtotal = parseInt(priceItem.value) * parseInt(input.value);
    itemSubtotal.textContent = `Subtotal: ${subtotal}`;
  });
  
  plusButton.addEventListener('click', () => {
    ++input.value;
    if (parseInt(input.value) > 1) {
      minButton.removeAttribute('disabled');
    }
    const subtotal = parseInt(priceItem.value) * parseInt(input.value);
    itemSubtotal.textContent = `Subtotal: ${subtotal}`;
  });
  const initialSubtotal = parseInt(priceItem.value) * parseInt(input.value);
itemSubtotal.textContent = `Subtotal: ${initialSubtotal}`;
  // minButton.addEventListener('click', () => {
  //   --input.value
  //   if(parseInt(input.value) > 1 ){minButton.removeAttribute('disabled')
  //     }else{
  //       minButton.setAttribute('disabled', true)
  //   }
  //   console.log('priceTtem', priceItem.value, typeof parseInt(priceItem.value))
  //   itemSubtotal.value = `${parseInt(priceItem.value) * parseInt(input.value)}`
    
  //   })
  
  // plusButton.addEventListener('click', () => {
  //   ++input.value
  //   if(parseInt(input.value) > 1 ){minButton.removeAttribute('disabled')
  // }
  // itemSubtotal.value = `${parseInt(priceItem.value) * parseInt(input.value)}`
  // })

  itemSubtotal.value = `${(parseInt(priceItem.value) * parseInt(input.value))}`
  console.log('subtotal es:', itemSubtotal)
  
  purchaseElement.setAttribute('class', 'divPurchase')
  purchaseElement.appendChild(minButton)
  purchaseElement.appendChild(input)
  purchaseElement.appendChild(plusButton)
  purchaseElement.appendChild(priceItem)
  purchaseElement.appendChild(itemSubtotal)
  return purchaseElement
}

function delButton() {
  const buttonIcon = document.createElement('button')
  buttonIcon.setAttribute('id', 'deleteButton')
  buttonIcon.textContent = '❌' 
  return buttonIcon
}

const item = (text) => {  
  const del = delButton()
  const divPurchase = purchaseAmountController()
  const itemName = document.createElement('li')
  const textPrice = priceText()
  const priceItem = itemPrice() //input del preu
  const itemSubtotal  = subtotalItem() //calcul
  itemName.setAttribute('class', 'itemList')
  itemName.textContent = text
  itemName.appendChild(textPrice)
  itemName.appendChild(priceItem)
  itemName.appendChild(divPurchase)
  itemName.appendChild(itemSubtotal)
  itemName.appendChild(del)



  
  del.addEventListener('click', () => {
    itemName.parentNode.removeChild(itemName)
    const index = itemsKeeper.indexOf(text)
    if (index > -1) {
      itemsKeeper.splice(index, 1)
      window.localStorage.setItem('items', JSON.stringify(itemsKeeper))
    }
  }) 
  
  const isPresent = itemsKeeper.some(item => item === text)
  // if(!isPresent){
    list.appendChild(itemName)
    window.localStorage.setItem('items', JSON.stringify(itemsKeeper))  
  // }else{
    // alert('Este objeto ya esta en la lista')
  // }
}  

// document.addEventListener('DOMContentLoaded', () => {
//   const data = JSON.parse(window.localStorage.getItem('items')) || [];
//   itemsKeeper.push(...data); // Agregar los elementos a itemsKeeper
//   data.forEach(item => {
//     item(item); // Renderizar cada elemento
//   });
// });

const handleButton = () => {
  const inputValue = input.value.trim()
  const isPresent = itemsKeeper.some(item => item === inputValue)
  console.log('isPresent, esta presente?:', isPresent)
  if (inputValue !== '') {    
    itemsKeeper.push(inputValue)        
    item(inputValue)
    input.value = ''
    input.focus()
  }
}

button.addEventListener('click', handleButton)