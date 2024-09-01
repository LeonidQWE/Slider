// -----------------Variables-----------------
let currentIndex = 0;
let initialX = null;
let initialY = null;
const menuCarouselControlPrevItemElement = document.querySelector('#menuCarouselControlPrevItem');
const menuCarouselControlNextItemElement = document.querySelector('#menuCarouselControlNextItem');
const menuCategoriesElement = document.querySelector('#menuCategories');
const menuItemsElements = document.querySelectorAll('.menu__item');
const priceSelectorElement = document.querySelector('#priceSelector');
const optionsSelectorElement = document.querySelector('#optionsSelector');
const menuCardsContainerElement = document.querySelector('#menuCardsContainer');
const menuCategoriesLineElement = document.querySelector('#menuCategoriesLine')

// ------------------Listeners------------------------
menuCarouselControlPrevItemElement.addEventListener('click', handleClickScrollCarousel);
menuCarouselControlNextItemElement.addEventListener('click', handleClickScrollCarousel);
menuCategoriesElement.addEventListener('click', handleClickSelectCategory);
menuCategoriesElement.addEventListener('touchstart', handleTouchstartGetFirstCoordinates, { passive: true });
menuCategoriesElement.addEventListener('touchmove', handleTouchmoveSwipeMenuCategory, { passive: true });

// ------------------Handlers----------------------
function handleClickScrollCarousel(event) {
    const itemWidth = menuItemsElements[0].offsetWidth;
    const { currentTarget } = event;

    if (currentTarget.tagName !== 'BUTTON') {
        return;
    }

    const { value } = currentTarget;
    const visibleItems = getVisibleItems();
    currentIndex = getCurrentIndex(value, visibleItems);

    const transformValue = -itemWidth * currentIndex;
    menuCategoriesLineElement.style.transform = `translateX(${transformValue}px)`;
}

function handleClickSelectCategory(event) {
    const { target } = event;
    const isButton = target.closest('.menu__item button');

    if (!isButton) {
        return;
    }

    toggleActiveClass(isButton);
}

function handleTouchstartGetFirstCoordinates(event) {
    initialX = event.touches[0].clientX;
    initialY = event.touches[0].clientY;
}

function handleTouchmoveSwipeMenuCategory(event) {
    const itemWidth = menuItemsElements[0].offsetWidth;
    const visibleItems = getVisibleItems();
    if (!initialX || !initialY) {
        return;
    }

    const currentX = event.touches[0].clientX;
    const currentY = event.touches[0].clientY;
    const diffX = initialX - currentX;
    const diffY = initialY - currentY;

    if (Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX < 0) {
            currentIndex = getCurrentIndex('prevItem', visibleItems);
            const transformValue = -itemWidth * currentIndex;
            menuCategoriesLineElement.style.transform = `translateX(${transformValue}px)`;
        } else {
            currentIndex = getCurrentIndex('nextItem', visibleItems);
            const transformValue = -itemWidth * currentIndex;
            menuCategoriesLineElement.style.transform = `translateX(${transformValue}px)`;
        }
    } else {
        return;
    }

    initialX = null;
    initialY = null;
}

// ------------------Helper Functions----------------------
function getCurrentIndex(value, visibleItems) {
    if (value === 'prevItem') {
        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = menuItemsElements.length - visibleItems;
        }
    } else if (value === 'nextItem') {
        currentIndex++;
        if (currentIndex > menuItemsElements.length - visibleItems) {
            currentIndex = 0;
        }
    }

    return currentIndex;
}

function getVisibleItems() {
    const screenWidthValue = window.innerWidth;
    const mobileWidth = 568;
    let visibleItems = 0;

    if (screenWidthValue <= mobileWidth) {
        visibleItems = 3;
    } else if (screenWidthValue > mobileWidth) {
        visibleItems = 5;
    }

    return visibleItems;
}

function toggleActiveClass(button) {
    const isActive = button.classList.contains('menu__category_active');
    const menuCategoryElements = document.querySelectorAll('.menu__category');

    if (isActive) {
        return;
    } else {
        menuCategoryElements.forEach(element => {;
            element.classList.remove('menu__category_active');
        })

        button.classList.add('menu__category_active');
    }
}

