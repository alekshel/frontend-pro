'use strict';

class Weather {
    API_KEY = 'ea03b2d770f7319ef618859f3d23e109';
    BASE_URL = 'https://api.openweathermap.org/data/3.0';
    CONVERT_TO_MILLISECOND = 1000;
    TWO_SECONDS_IN_MILLISECONDS = 2000;

    constructor() {
        this.lastRefresh = null

        const updateBtnEl = document.getElementById('js--weather-widget__update');
        updateBtnEl.addEventListener('click', () => {
            if ((Date.now() - this.lastRefresh >= this.TWO_SECONDS_IN_MILLISECONDS) || !this.lastRefresh) {
                console.log("Refresh");
                this.lastRefresh = Date.now();
                this.setUpdateOnClick(updateBtnEl);
            }
        });

        const timer = setTimeout(() => {
            this.refresh().finally(() => {
                console.log("Init")
            });
            clearTimeout(timer);
        }, 1000);
    }

    setUpdateOnClick(updateBtnEl) {
        updateBtnEl.classList.add('rotate');

        let timer = null
        this.refresh().finally(() => {
            timer = setTimeout(() => {
                updateBtnEl.classList.remove('rotate');
                clearTimeout(timer);
            }, 500);
        });
    }

    refresh() {
        return this.getApiData().then(data => {
            this.renderUI(data);
            console.log(data);
        });
    }

    async getApiData() {
        const requestUrl = `${this.BASE_URL}/onecall?lat=41.015137&lon=28.979530&appid=${this.API_KEY}&units=metric`;
        return await fetch(requestUrl).then(response => response.json());
    }

    getLocalTime(timestamp, timezone, writeTimezone = false) {
        const date = new Date(timestamp * this.CONVERT_TO_MILLISECOND);
        const timeString = date.toLocaleTimeString(
            'en',
            {hour: '2-digit', minute: '2-digit', timeZone: timezone}
        );
        return `${timeString} ${writeTimezone ? timezone : ''}`;
    }

    getIconUrl(icon) {
        return `https://openweathermap.org/img/wn/${icon}@2x.png`;
    }

    getTemperature(temp) {
        return `${Math.round(temp)}°C`;
    }

    getFormatDescription(desc) {
        return desc.charAt(0).toUpperCase() + desc.slice(1);
    }

    getSunRiseSetDetail(data) {
        return data['current']['sunrise'] >= data['current']['dt']
            ? {title: 'Sunrise', value: this.getLocalTime(data['current']['sunrise'], data['timezone'])}
            : {title: 'Sunset', value: this.getLocalTime(data['current']['sunset'], data['timezone'])};
    }

    renderDetails(data) {
        const detailsEl = document.getElementById('js--weather-widget__details');
        detailsEl.innerHTML = '';

        let details = [
            {title: 'Wind', value: `${data['current']['wind_speed']} m/s`},
            {title: 'Humidity', value: `${data['current']['humidity']}%`},
            {title: 'Pressure', value: `${data['current']['pressure']} hPa`},
            {title: 'UV Index', value: `${data['current']['uvi']}`},
        ];

        details.push(this.getSunRiseSetDetail(data));

        details.forEach(detail => {
            const detailEl = document.createElement('div');
            detailEl.classList.add('flex', 'flex-column', 'weather-widget__detail');
            detailEl.innerHTML = `<span>${detail.title}</span> <p>${detail.value}</p>`;
            detailsEl.appendChild(detailEl);
        });
    }

    renderUI(data) {
        const cityEl = document.getElementById('js--weather-widget__city');
        const localTimeEl = document.getElementById('js--weather-widget__time');
        const iconEl = document.getElementById('js--weather-widget__icon');
        const tempEl = document.getElementById('js--weather-widget__temperature');
        const descriptionEl = document.getElementById('js--weather-widget__description');
        const feelsLikeEl = document.getElementById('js--weather-widget__feels-like');

        cityEl.textContent = 'Istanbul';
        localTimeEl.textContent = this.getLocalTime(data['current']['dt'], data['timezone'], true);

        iconEl.src = this.getIconUrl(data['current']['weather'][0]['icon']);
        tempEl.textContent = this.getTemperature(data['current']['temp']);

        descriptionEl.textContent = this.getFormatDescription(data['current']['weather'][0]['description']);
        feelsLikeEl.textContent = `Feels like: ${this.getTemperature(data['current']['feels_like'])}`;

        this.renderDetails(data);
    }
}

new Weather();