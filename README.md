<h1 align="center">React pizza</h1>

<div align="center">
  <h3>
    <a href="https://pizza-shop-taupe.vercel.app/">
      Demo
    </a>
  </h3>
</div>

<!-- TABLE OF CONTENTS -->

## Оглавление

- [Обзор](#Обзор)
    - [Разработано с помощью](#Разработано-с-помощью)
- [Как использовать](#Как-использовать)
- [Связь](#contact)

<!-- Обзор -->

## Обзор

![screenshot](https://github.com/Deevins/Pizza-shop/raw/main/public/screenshot.png)


Демо проекта можно посмотреть по ссылке выше.

Для отслеживания глобального стейта был использован RTK в связке с Typescript.

Поиск по пиццам оптимизирован с помощью lodash.debounce для избежания излишнего количества запросов на Backend. 

Корзина реализует запись в Local storage браузера данных и получение из него. 

Также были использованы React.memo и React.useCallback для увеличения производительности приложения и исключения лишних перерисовок компонентов.


Использована функция React.lazy для "ленивых" подгрузок, чтобы разделить Production bundle на несколько чанков для оптимизации приложения.
### Разработано с помощью

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Lodash](https://lodash.com/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [axios](https://axios-http.com/)

## Как использовать

```bash
# Clone this repository
$ git clone https://github.com/Deevins/windbnb

# Install dependencies
$ npm install

# Run the app
$ npm start
```

## Contact

- GitHub [@Deevins](https://{github.com/Deevins})
- Habr [Viktor](https://career.habr.com/daker255)
