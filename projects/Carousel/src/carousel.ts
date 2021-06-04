export {};

interface Carousel {
    currentItem: number;
    figureCont: HTMLUListElement;
    interval?: ReturnType<typeof setTimeout>;
    items: HTMLCollection;
}

/**
 * startCarouselTimeout
 * @param carousel Object The carousel object to use for automatically cycling
 */
function startCarouselTimeout(carousel: Carousel) {
    // Cancel the last automatic timer
    if (carousel.interval) clearTimeout(carousel.interval);
    // Create a new automatic timer
    // that will run carouselNext()
    // every 3 seconds
    carousel.interval = setTimeout(() => {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        carouselNext(carousel);
    }, 3000);
}

/**
 * displayCarouselItem
 * @param carousel Object The carousel object to use for updating the carousel
 */
function displayCarouselItem(carousel: Carousel) {
    // Reset the automatic timer
    startCarouselTimeout(carousel);
    // Set our new margin-left CSS property
    carousel.figureCont.style.marginLeft = (-1 * (carousel.currentItem * 256)).toString();
}

/**
 * carouselNext
 * @param carousel Object The carousel object to use for cycling next
 */
function carouselNext(carousel: Carousel) {
    // Increase the index of the current item
    carousel.currentItem++;
    // If we increased it too much
    if (carousel.currentItem >= carousel.items.length) {
        // set it back to the first item
        carousel.currentItem = 0;
    }

    // Now that we've updated the index,
    // we'll display the items
    displayCarouselItem(carousel);
}

/**
 * carouselPrev
 * @param carousel Object The carousel object to use for cycling prev
 */
function carouselPrev(carousel: Carousel) {
    // Decrease the index of the current item
    carousel.currentItem--;
    // If we're below zero, we've gone too far
    if (carousel.currentItem <= -1) {
        // Set it to the last item
        carousel.currentItem = carousel.items.length - 1;
    }

    // Now that we've updated the index,
    // we'll display the items
    displayCarouselItem(carousel);
}

// Get all the carousels on the page
const allCarousels = document.getElementsByClassName('carousel-container');

// Iterate over all of the carousels using a FOR-loop
for (let i = 0; i < allCarousels.length; i++) {
    // Create a JSON object to keep track of each carousel
    const carouselElement = allCarousels[i];
    // Get the <figure> element inside of this particular carousel
    const figure = carouselElement.querySelector('figure')!;
    // Grab the UL element inside of that
    const figureCont = figure.querySelector('ul')!;

    const carousel: Carousel = {
        // Set the default item to the first item; we'll start there
        currentItem: 0,
        figureCont,
        // Get all the list items inside of the UL
        items: figureCont.children,
    };

    // Get the buttons, which will be used for manually changing the carousel
    const buttons = {
        prev: carouselElement.querySelector('button.carousel-previous')!,
        next: carouselElement.querySelector('button.carousel-advance')!,
    };

    // Add an event listener to the previous button
    buttons.prev.addEventListener('click', () => carouselPrev(carousel));
    // Add an event listener to the next button
    buttons.next.addEventListener('click', () => carouselNext(carousel));

    // Start the automatic timer to cycle the carousel automatically
    startCarouselTimeout(carousel);
}
