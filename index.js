const addButton = document.querySelector('.add-button');
const form = document.querySelector('form');
const firstBeverage = document.querySelector('.beverage');

let count = 1;


addRemoveButton(firstBeverage);
addButton.addEventListener('click', () =>
{
    count++;

    const newBeverage = firstBeverage.cloneNode(true);

    const title = newBeverage.querySelector('.beverage-count');
    title.textContent = `Напиток №${count}`;

    const selects = newBeverage.querySelectorAll('select');
    selects.forEach(select =>
    {
        select.selectedIndex = 0;
    });

    const inputs = newBeverage.querySelectorAll('input');

    inputs.forEach(input =>
    {
        if (input.type === 'radio')
        {
            input.name = `milk-${count}`;
            input.checked = input.value === 'usual';
        }

        if (input.type === 'checkbox')
        {
            input.checked = false;
        }
    });

    addRemoveButton(newBeverage);
    form.insertBefore(newBeverage, addButton.parentElement);
});


function updateNumbers() {
  const beverages = document.querySelectorAll('.beverage');

  beverages.forEach((bev, index) => {
    const title = bev.querySelector('.beverage-count');
    title.textContent = `Напиток №${index + 1}`;
  });
}


function addRemoveButton(beverage) {
  const removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.textContent = '✖';
  removeBtn.classList.add('remove-button');

  removeBtn.style.position = 'absolute';
  removeBtn.style.top = '10px';
  removeBtn.style.right = '10px';

  beverage.style.position = 'relative';

  removeBtn.addEventListener('click', () => {
    const beverages = document.querySelectorAll('.beverage');

    if (beverages.length === 1) return;

    beverage.remove();
    count--;

    updateNumbers();
  });

  beverage.appendChild(removeBtn);
}



form.addEventListener('submit', (e) => {
  e.preventDefault();
  createModal();
});


function createModal() {
  const overlay = document.createElement('div');
  overlay.classList.add('modal-overlay');

  const modal = document.createElement('div');
  modal.classList.add('modal');


  const closeBtn = document.createElement('button');
  closeBtn.textContent = '✖';
  closeBtn.classList.add('modal-close');

  const text = document.createElement('p');
  text.textContent = `Вы заказали ${count} ${getDrinkWord(count)}`;
  let info = getAllFieldsData();
  console.log(info)
  const table = document.createElement('table')
  for (let i = 0; i < info.length; i++) {
    const row = document.createElement("tr")

    const name = document.createElement("td")
    name.textContent = info[i].номер

    const milk = document.createElement("td")
    milk.textContent = info[i].молоко.значение

    dob = "";

    for (const d of info[i].добавки) {
      dob += ` ${d.значение}`;
    }
    
    const dobavki = document.createElement("td")
    dobavki.textContent = dob
    
    row.appendChild(name);
    row.appendChild(milk);
    row.appendChild(dobavki);

    table.appendChild(row);
  }
  
  modal.appendChild(closeBtn);
  modal.appendChild(text);
  modal.appendChild(table)
  overlay.appendChild(modal);

  document.body.appendChild(overlay);

  closeBtn.addEventListener('click', () => overlay.remove());
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.remove();
  });
}

function getDrinkWord(count) {
  const mod10 = count % 10;
  const mod100 = count % 100;

  if (mod100 >= 11 && mod100 <= 14) return 'напитков';
  if (mod10 === 1) return 'напиток';
  if (mod10 >= 2 && mod10 <= 4) return 'напитка';
  return 'напитков';
}

function getBeverageData(beverageFieldset) {
  const beverageNumber = beverageFieldset.querySelector('.beverage-count').textContent;
  
  const drinkSelect = beverageFieldset.querySelector('select');
  const drinkName = drinkSelect.options[drinkSelect.selectedIndex].text;
  const drinkValue = drinkSelect.value;
  
  const selectedMilk = beverageFieldset.querySelector('input[type="radio"]:checked');
  console.log(selectedMilk)
  const milkValue = selectedMilk ? selectedMilk.value : '';
  const milkText = selectedMilk ? selectedMilk.nextElementSibling.textContent : '';
  
  const selectedOptions = [];
  const checkboxes = beverageFieldset.querySelectorAll('input[name="options"]:checked');
  checkboxes.forEach(checkbox => {
    selectedOptions.push({
      value: checkbox.value,
      text: checkbox.nextElementSibling.textContent.trim()
    });
  });
  
  return {
    номер: beverageNumber,
    напиток: {
      значение: drinkValue,
      название: drinkName
    },
    молоко: {
      значение: milkValue,
      название: milkText.trim()
    },
    добавки: selectedOptions.map(opt => ({
      значение: opt.value,
      название: opt.text
    }))
  };
}

function getAllFieldsData() {
  const sets = document.querySelectorAll("fieldset")
  let result = []
  sets.forEach((set, inx) => {
    result.push(getBeverageData(set))
  })
  return result;
}