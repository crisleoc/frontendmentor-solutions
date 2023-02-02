let buttons = document.querySelectorAll('.rating-element');
let submitBtn = document.getElementById('submit-btn');
let selectSpan = document.getElementById('select-span');
let thanksCard = document.getElementById('thanks-card');
let mainCard = document.getElementById('main-card');

buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
        if (button.classList.contains('rating-element--active')) {
            button.classList.remove('rating-element--active');
            selectSpan.innerText = 'You selected x out of 5';
        } else {
            button.classList.add('rating-element--active');
            selectSpan.innerText = `You selected ${button.innerText} out of 5`;
        }
        buttons.forEach((btn) => {
            if (btn !== button) {
                btn.classList.remove('rating-element--active');
            }
        });
    });
});


submitBtn.addEventListener('click', (e) => {
    if (selectSpan.innerText === 'You selected x out of 5') {
        alert('Please select a rating');
    } else {
        mainCard.classList.add('hide-card');
        thanksCard.classList.remove('hide-card');
    }
});