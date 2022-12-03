<template>
  <div>
    <div>
      <h2>275 Joe Routt Blvd - Memorial Student Center (MSC) </h2>
    </div>
    <br>
    <GmapMap
        :center='center'
        :zoom='12'
        style='width:100%;  height: 400px;'>
      <GmapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :draggable="true"
        @click="center=m.position"
      />
    </GmapMap>
    />
  </div>
</template>

<script>
export default {
  name: 'AddGoogleMap',
  data() {
    return {
      center: { lat: 30.6123971, lng: -96.341474 },
      markers: [{
        position: {
          lat: 30.6123971,
          lng: -96.341474
        }
      }]
    }
  },
}
</script>