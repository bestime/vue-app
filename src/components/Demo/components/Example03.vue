<style lang="scss" scoped>
.Example03 {
  box-sizing: border-box;
}

.map-box {
  width: 800px;
  height: 600px;
  background-color: #000;
}
</style>

<template>
  <div class="Example02">
    <a-button type="primary" @click="stopAnimate">停止动画</a-button>
    <div class="map-box" ref="map-el"></div>
  </div>
  
</template>

<script lang="ts" setup>
import AnimateMarker from '@/plugins-jcy/maptalks/AnimateMarker'
import { serverURL } from '@/request'
import { Map, TileLayer, VectorLayer } from 'maptalks'
import { reactive, onBeforeUnmount, onMounted, useTemplateRef } from 'vue'

const mapEl = useTemplateRef('map-el')
const layer = new VectorLayer(jUtilsBase.uuid())
const centerCq = [107.704962, 29.633155]
const centerBj = [103.365735,30.659462]
let map: undefined | Map;
const marker = new AnimateMarker(centerCq, {
  zIndex: 31,
  visible: true,
  editable: false,
  cursor: 'pointer',
  draggable: false,
  dragShadow: false,
  interactive: true,
  properties: {
    resident: '2'
  },
  symbol: {
    markerFile: serverURL('@local', '/static/demo/01.png'),
    markerWidth: 30,
    markerHeight: 30,
    'markerDx': 0,
    'markerDy': 0,
    'markerOpacity': 1,
    'markerHorizontalAlignment': 'middle',
    'markerVerticalAlignment': 'middle',
  }
}, {
  duration: 300
})
const markerBj = new AnimateMarker(centerBj, {
  zIndex: 31,
  visible: true,
  editable: false,
  cursor: 'pointer',
  draggable: false,
  dragShadow: false,
  interactive: true,
  properties: {
    resident: '2'
  },
  symbol: {
    markerFile: serverURL('@local', '/static/demo/01.png'),
    markerWidth: 30,
    markerHeight: 30,
    'markerDx': 0,
    'markerDy': 0,
    'markerOpacity': 1,
    'markerHorizontalAlignment': 'middle',
    'markerVerticalAlignment': 'middle',
  }
}, {
  duration: 300
})

console.log("marker", marker)


function initMap () {
  map = new Map(mapEl.value!, {
    center: centerCq,
    zoom: 5,
    baseLayer: new TileLayer('base', {
      urlTemplate: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
      subdomains: ["a","b","c","d"],
      attribution: '&copy; <a href="http://osm.org">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/">CARTO</a>'
    })
  });

  layer.addTo(map)

  

  marker.start()
  markerBj.start()


  layer.addGeometry([markerBj, marker])
  marker.addTo(layer)

  
}



function stopAnimate () {
  if(marker.isAnimating()) {
    marker.stop()
  } else {
    marker.start()
  }
  
}

onMounted(function () {
  initMap()
})

onBeforeUnmount(function () {
  layer.clear().remove()
  map?.remove()
})


</script>