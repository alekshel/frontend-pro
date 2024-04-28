'use strict';

function RoyalSlider({
     className = '.js--royal-slider',
     intervalPlayTime = 2500,
     progressType = 'basic',
     leftDirection = false
}) {
    const INTERVAL_MILLISECONDS = intervalPlayTime;

    const slider = document.querySelector(className);
    const wrapper = slider.querySelector('.js--royal-slider__wrapper');
    const progressBar = slider.querySelector('.js--royal-slider__progress-bar');

    const prevButton = slider.querySelector('.js--royal-slider__btn--prev');
    const nextButton = slider.querySelector('.js--royal-slider__btn--next');

    const slidesCount = wrapper.children.length;
    let activeSlide = 0;
    let progressBarStep = 0;

    let dragStartX = 0;
    let isDragging = false;
    let hasLinkPermission = false;

    this.init = () => {
        this.setButtons();
        this.progressBarInit();
        this.dotEventsInit();
        this.setProgress();
        this.setDragEvents();
        this.autoPlay();
    };

    this.doAction = () => {
        let translateX = activeSlide * slider.offsetWidth;
        this.setTranslate(-translateX);
        this.setProgress();
    }

    this.prev = (isInfinity = false) => {
        const step = isInfinity ? wrapper.children.length - 1 : 0;
        activeSlide = activeSlide <= 0 ? step : activeSlide - 1;
        this.doAction();
    };

    this.next = (isInfinity = false) => {
        const step = isInfinity ? 0 : activeSlide;
        activeSlide = this.isLastSlide() ? step : activeSlide + 1;
        this.doAction();
    };

    this.goTo = (slideIndex) => {
        activeSlide = slideIndex;
        this.doAction();
    }

    this.setTranslate = (translateX) => {
        wrapper.style.transform = `translateX(${translateX}px)`;
    }

    this.isMouseOnSlider = () => {
        return slider.matches(':hover');
    };

    this.isLastSlide = () => {
        return activeSlide === wrapper.children.length - 1;
    };

    this.progressBarInit = () => {
        this.basicProgressBarInit();
        switch (progressType) {
            case 'basic':
                break;
            case 'dots':
                this.dotsProgressBarInit();
                this.dotEventsInit();
                break;
            default:
                break;
        }
    };

    this.basicProgressBarInit = () => {
        progressBarStep = progressBar.offsetWidth / slidesCount;
    }

    this.dotsProgressBarInit = () => {
        progressBar.style.display = 'flex';
        for (let i = 0; i < slidesCount; i++) {
            const progressBarItem = document.createElement('div');
            progressBarItem.classList.add('royal-slider__progress-bar-item', progressType);
            progressBarItem.style.width = `${progressBarStep}px`;
            progressBar.appendChild(progressBarItem);
        }
    }

    this.dotEventsInit = () => {
        progressBar
            .querySelectorAll('.royal-slider__progress-bar-item')
            .forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    this.goTo(index);
                });
            });
    }

    this.setProgress = () => {
        this.disableButtons();
        switch (progressType) {
            case 'basic':
                this.setBasicProgress();
                break;
            case 'dots':
                this.setDotsProgress();
                break;
            default:
                break;
        }
    };

    this.setBasicProgress = () => {
        let progress = (activeSlide + 1) * progressBarStep;
        progressBar.style.setProperty("--progress-bar-width", `${progress}px`);
    };

    this.setDotsProgress = () => {
        for (let i = 0; i < progressBar.children.length; i++) {
            if (i <= activeSlide) {
                progressBar
                    .querySelector('.royal-slider__progress-bar-item:nth-child(' + (i + 1) + ')').style.opacity = '1';
            } else {
                progressBar
                    .querySelector('.royal-slider__progress-bar-item:nth-child(' + (i + 1) + ')').style.opacity = '0';
            }
        }
    };

    this.setButtons = () => {
        prevButton.addEventListener('click', this.prev.bind(this, false));
        nextButton.addEventListener('click', this.next.bind(this, false));
    };

    this.disableButtons = () => {
        activeSlide <= 0 ? prevButton.disabled = true : prevButton.disabled = false;

        this.isLastSlide() ? nextButton.disabled = true : nextButton.disabled = false;
    };

    this.dragStart = (event) => {
        isDragging = true;
        hasLinkPermission = false;
        dragStartX = event.clientX;
    };

    this.dragMove = (event) => {
        event.preventDefault();
        if (!isDragging) return;
        hasLinkPermission = true;

        let pixelsMoved = event.clientX - dragStartX;
        if (Math.abs(pixelsMoved) > 25) {
            if (pixelsMoved > 0) {
                this.prev();
            } else {
                this.next();
            }
            isDragging = false;
            return;
        }

        const invertPixelsMoved = pixelsMoved * -1;
        const matches = wrapper.style.transform.match(/-?\d+/g);
        const currentTranslateX = matches ? matches[0] : 0;

        let translateX = currentTranslateX - invertPixelsMoved;
        this.setTranslate(translateX);
    };

    this.dragEnd = (event) => {
        event.preventDefault();
        isDragging = false;
    };

    this.setDragEvents = () => {
        slider.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', (event) => {
                if (hasLinkPermission) {
                    event.preventDefault();
                }
            });
        });

        wrapper.addEventListener('mousedown', this.dragStart);
        wrapper.addEventListener('mousemove', this.dragMove);
        wrapper.addEventListener('mouseup', this.dragEnd);
        slider.addEventListener('mouseleave', this.dragEnd);
    };

    this.autoPlay = () => {
        setInterval(() => {
            if (!this.isMouseOnSlider()) {
                leftDirection ? this.prev(true) : this.next(true);
            }
        }, INTERVAL_MILLISECONDS);
    };
}

const royalSlider = new RoyalSlider({
    progressType: 'dots'
});
royalSlider.init();

const royalSlider2 = new RoyalSlider({
    className: '.js--royal-slider-2',
    leftDirection: true
});
royalSlider2.init();
