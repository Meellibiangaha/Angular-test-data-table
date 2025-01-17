# Тестовое задание

## Установка и запуск проекта

* Установка зависимостей
> `npm install`

* Запуск проекта
> `ng serve`

## Оглавление

Проект, в который взаимодействует с бекендом через REST API, отображает данные в виде таблицы с пагинацией и реализует дополнительный функционал для детализированного просмотра записей.

## Описание функциональности

* Таблица с данными: отображает данные, полученные с сервера, в виде таблицы, поддерживает пагинацию и фильтрацию по различным полям.
* Интерактивность строки: при нажатии строка раскрывается и отображаются остальные данные строки.
* Drag & Drop: дублирование записей с возможностью их удаления.

## Архитектура проекта

1. `app` — корневой компонент, модуль роутинга, внутри папки `core`, `pages`, `shared`
2. `core` (общие сущности) — `animations` (анимация для раскрытия блока), общие типы и enum для всего приложения (папка `models` и `enums`), корневые сервисы (providedIn: 'root') в папке `services`
3. `pages` (страницы) — лежат компоненты и сущности для сборки всего приложения
4. `shared` (standalone компоненты) — сущности, в основе обёртки для элементов управления формой

## Библиотеки и инструменты извне
1. `UntilDestroy` (библиотека) — для более удобной отписки, делается внутри пайпа `someObservable.pipe(untilDestroyed(this)).subscribe(...)`, так же нужен декоратор @UntilDestroy() перед декоратором @Component()
2. `Prettier ` (инструмент) — для форматирования кода
3. `Angular Material` (библиотека) — для drag&drop, пагинатора и т.п.
