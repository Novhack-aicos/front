<script >


import { onMount } from 'svelte';
let coords = [];
export let address;

onMount(() => {

    ymaps.ready(init);

    function init() {
        var myPlacemark,
            myMap = new ymaps.Map('map', {
                center: [58.5212, 31.2765],
                zoom: 15,
                controls: [],

            }, {
                searchControlProvider: 'yandex#search'
            });
        myMap.options.set('yandexMapDisablePoiInteractivity', true);
        myMap.events.add('click', function (e) {
            coords = e.get('coords');

            if (myPlacemark) {
                myPlacemark.geometry.setCoordinates(coords);
            }
            else {
                myPlacemark = createPlacemark(coords);
                myMap.geoObjects.add(myPlacemark);
                // Слушаем событие окончания перетаскивания на метке.
                myPlacemark.events.add('dragend', function () {
                    getAddress(myPlacemark.geometry.getCoordinates());
                });
            }
            getAddress(coords);
        });

        function createPlacemark(coords) {
            return new ymaps.Placemark(coords, {
                iconCaption: 'поиск...'
            }, {
                preset: 'islands#violetDotIconWithCaption',
                draggable: true
            });
        }

        // Определяем адрес по координатам (обратное геокодирование).
        function getAddress(coords) {
            myPlacemark.properties.set('iconCaption', 'поиск...');

            ymaps.geocode(coords).then(function (res) {
                var firstGeoObject = res.geoObjects.get(0);
                address=firstGeoObject.getAddressLine();

                myPlacemark.properties
                    .set({
                        // Формируем строку с данными об объекте.
                        iconCaption: [
                            // Название населенного пункта или вышестоящее административно-территориальное образование.
                            firstGeoObject.getLocalities().length ? firstGeoObject.getLocalities() : firstGeoObject.getAdministrativeAreas(),
                            // Получаем путь до топонима, если метод вернул null, запрашиваем наименование здания.
                            firstGeoObject.getThoroughfare() || firstGeoObject.getPremise()
                        ].filter(Boolean).join(', '),
                        // В качестве контента балуна задаем строку с адресом объекта.
                        //balloonContent: firstGeoObject.getAddressLine()
                        balloonContent: '<p>'+firstGeoObject.getAddressLine()+'.</p>'
                    });

            });
            myPlacemark.balloon.open();
        }

    }
});
</script>

<div id="map"></div>

<style>
#map{
    width:100%;
    height: 100%;
}
</style>