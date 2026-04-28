<style lang="scss" scoped>
.Example04 {
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
    <a-button @click="toPause">暂停</a-button>
    <a-button @click="toPlay">继续</a-button>
    <div class="map-box" ref="map-el"></div>
  </div>
  
</template>

<script lang="ts" setup>
import MoveMarker from '@/plugins-jcy/maptalks/MoveMarker'
import { requestLocalFile, serverURL } from '@/request'
import { Map, MultiLineString, TileLayer, VectorLayer } from 'maptalks'
import { reactive, onBeforeUnmount, onMounted, useTemplateRef } from 'vue'

const mapEl = useTemplateRef('map-el')
const layer = new VectorLayer(jUtilsBase.uuid())
const centerCq = [107.704962, 29.633155]
const centerBj = [103.365735,30.659462]
let map: undefined | Map;
const marker = new MoveMarker(centerCq, {
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
    
    markerFile: serverURL('@local', '/static/demo/02.png'),
    markerWidth: 30,
    markerHeight: 30,
    'markerDx': 0,
    'markerDy': 0,
    'markerOpacity': 1,
    'markerHorizontalAlignment': 'middle',
    'markerVerticalAlignment': 'middle',
  }
}, {
  step: 1000
})

console.log("marker", marker)


function initMap () {
  map = new Map(mapEl.value!, {
    center: [107.7701074925537, 30.20448383254359],
    zoom: 8,
    bearing: 0,
    pitch: 0,
    baseLayer: new TileLayer('base', {
      urlTemplate: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
      subdomains: ["a","b","c","d"],
      attribution: '&copy; <a href="http://osm.org">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/">CARTO</a>'
    })
  });

  map.on('click', function (ev: any) {
    console.log("单独", `${ev.coordinate.x}, ${ev.coordinate.y}`)
  })

  addTestMarker()
}

async function addTestMarker () {
  const testLine = await requestLocalFile<any>('/static/demo/track.json')
  const multiline = new MultiLineString([testLine.data.data], {
    
    arrowPlacement : 'vertex-last', // arrow's placement: vertex-first, vertex-last, vertex-firstlast, point
    visible : true,
    editable : false,
    draggable : false,
    dragShadow : false, // display a shadow during dragging
    symbol: {
      'lineColor' : '#1bbc9b',
      'lineWidth' : 3
    }
  });
  console.log("testLine", testLine)
  layer.addTo(map!)
  marker.setSingleLine(testLine.data.data)
  layer.addGeometry([multiline, marker])
  marker.addTo(layer)  
}


function toPause () {
  marker.pause()
}
function toPlay () {
  marker.play()
}



onMounted(function () {
  initMap()
})

onBeforeUnmount(function () {
  layer.clear().remove()
  map?.remove()
})


</script>