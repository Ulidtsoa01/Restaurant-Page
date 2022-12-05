<template>
  <div>
    <div>
      <h2>275 Joe Routt Blvd - Memorial Student Center (MSC) </h2>
      <GmapAutocomplete
        @place_changed='setPlace'
      />
    </div>
    <br>
    <GmapMap
        :center='center'
        :zoom='12'
        style='width:100%;  height: 400px;'>
      <GmapMarker :key="index" v-for="(m, index) in markers" :position="m.position" :clickable="true" :draggable="true" @click="center=m.position"/>
      <DirectionsRenderer travelMode="DRIVING" :origin="origin" :destination="destionation"/>
    </GmapMap>
    />
  </div>
</template>

<script>
import DirectionsRenderer from "../js/DirectionsRenderer";
export default {
  components: {
    DirectionsRenderer
  },
  name: 'AddGoogleMap',
  data() {
    return {
      center: { lat: 30.6123971, lng: -96.341474 },
      currentPlace: null,
      markers: [{
        position: {
          lat: 30.6123971,
          lng: -96.341474
        }
      }],
      end: { lat: 30.6123971, lng: -96.341474 }
    }
  },
  computed: {
    origin() {
      if (!this.currentPlace) return null;
      return { query: this.currentPlace };
    },
    destionation() {
      if (!this.end) return null;
      return { query: this.end };
    }
  },
  mounted() {
    this.geolocate();
  },
  methods: {
    setPlace(place) {
      this.currentPlace = place;
    },
    geolocate: function() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      });
    },
  },
}
</script>