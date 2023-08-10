// const input = document.getElementById('myInput')
// const button = document.getElementById('myButton')
// const list = document.getElementById('myList')

// const data = JSON.parse(window.localStorage.getItem('items')) || []
// const itemsKeeper = data || []

// function delButton() {
//   const buttonIcon = document.createElement('button')
//   buttonIcon.textContent = '🗑️'  
//   return buttonIcon
// }

// const item = (text) => {
//   const del = delButton()
//   const itemName = document.createElement('li')
//   itemName.setAttribute('class', 'itemList')
//   itemName.textContent = text
//   itemName.appendChild(del)
  
//   del.addEventListener('click', () => {
//     itemName.parentNode.removeChild(itemName)
//     // data.map(item => item.window.localStorage.removeItem('items'))
//   }) 

//   list.appendChild(itemName)
// }    

// const handleButton = () => {
//   item(input.value)
//   itemsKeeper.push(input.value)
//   window.localStorage.setItem('items', JSON.stringify(itemsKeeper))
  
//   input.value = ''
//   input.focus()
// }

// button.addEventListener('click', handleButton)


// ----------------------------------Chat GPT -----------------------------



const input = document.getElementById('myInput')
const button = document.getElementById('myButton')
const list = document.getElementById('myList')

// Cargar datos del localStorage al inicio
const data = JSON.parse(window.localStorage.getItem('items')) || []
const itemsKeeper = data || []


function delButton() {
  const buttonIcon = document.createElement('button')
  buttonIcon.textContent = '🗑️' 
  return buttonIcon
}

const item = (text) => {  
  const del = delButton()
  const itemName = document.createElement('li')
  itemName.setAttribute('class', 'itemList')
  itemName.textContent = text
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
  if(!isPresent){
    list.appendChild(itemName)
    window.localStorage.setItem('items', JSON.stringify(itemsKeeper))  
  }else{
    alert('Este objeto ya esta en la lista')
  }
}  

document.addEventListener('DOMContentLoaded', () => {
  const data = JSON.parse(window.localStorage.getItem('items')) || [];
  itemsKeeper.push(...data); // Agregar los elementos a itemsKeeper
  data.forEach(item => {
    item(item); // Renderizar cada elemento
  });
});

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