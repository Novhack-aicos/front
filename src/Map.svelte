
<script >

import { onMount } from 'svelte';

onMount(() => {
    var map;
    ymaps.ready(function () {
    	map = new ymaps.Map('map', {
    		center: [56.862578, 53.213197],
    		zoom: 0,
    		controls: []
    		});
    });
});

</script>

<div id="map"></div>

<style>
#map{
    width:100%;
    height: 100vh;
}
</style>