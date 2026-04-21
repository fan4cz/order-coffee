const addButton = document.querySelector('.add-button');
const form = document.querySelector('form');
const firstBeverage = document.querySelector('.beverage');

let count = 1;

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
            // Делаем уникальные name для каждой формы
            input.name = `milk-${count}`;
            input.checked = input.value === 'usual';
        }

        if (input.type === 'checkbox')
        {
            input.checked = false;
        }
    });
    form.insertBefore(newBeverage, addButton.parentElement);
});
