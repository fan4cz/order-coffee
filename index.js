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

  modal.appendChild(closeBtn);
  modal.appendChild(text);
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