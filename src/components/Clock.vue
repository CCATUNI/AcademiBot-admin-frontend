<template>
  <div class="clock">
    <div class="clock__hours" style="padding-top: 0.4em; padding-bottom: 0.9em; padding-left: 0.7em">
      <span class="clock__hourtime" v-text="getAmPm(this.time)"></span>
      <span v-text="getHour(true, this.time)" style="top: 1em"></span>
    </div>
    <div class="clock__minutes" v-text="getMinutes(this.time)" style="padding-top: 0.4em; padding-bottom: 0.9em;"></div>
    <div class="clock__seconds" v-text="getSeconds(this.time)" style="padding-top: 0.4em; padding-bottom: 0.9em;"></div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';

  function padZero(number: number) {
      if (number < 10) {
          return "0" + number;
      }
      return '' + number;
  }
  function getHour(twelveHour: boolean, time: string) {
      let hours = parseInt(time.split(':')[0]);
      if (twelveHour && hours > 12) {
          hours = hours - 12;
      }
      return padZero(hours);
  }
  function getSeconds(time: string) {
      return padZero(parseInt(time.split(':')[2]));
  }
  function getMinutes(time: string) {
      return padZero(parseInt(time.split(':')[1]));
  }
  function getAmPm(time: string) {
      return parseInt(time.split(':')[0]) > 12 ? "pm" : "am";
  }
  export default Vue.extend({
      name: 'Clock',
      props: {
          time: {
              type: String
          }
      },
      data () {
          return {
              hours: getHour(true, this.time),
              minutes: getMinutes(this.time),
              seconds: getSeconds(this.time),
              hourtime: getAmPm(this.time),
              twelveHour: true
          }
      },
      methods: {
        padZero(number: number) {
          if (number < 10) {
            return "0" + number;
          }
          return '' + number;
        },
        getHour(twelveHour: boolean, time: string) {
          let hours = parseInt(time.split(':')[0]);
          if (twelveHour && hours > 12) {
            hours = hours - 12;
          }
          return padZero(hours);
        },
        getSeconds(time: string) {
          return padZero(parseInt(time.split(':')[2]));
        },
        getMinutes(time: string) {
          return padZero(parseInt(time.split(':')[1]));
        },
        getAmPm(time: string) {
          return parseInt(time.split(':')[0]) > 12 ? "pm" : "am";
        }
      }
  })
</script>

<style scoped>
  .clock {
    background: #fff;
    border: .3rem solid #fff;
    border-radius: .5rem;
    display: inline-block;
    margin-bottom: 1em;
  }
  .clock__hours,
  .clock__minutes,
  .clock__seconds {
    background: linear-gradient(to bottom, #26303b 50%, #2c3540 50%);
    display: inline-block;
    color: #fff;
    font-family: 'Nunito', sans-serif;
    font-size: 3rem;
    font-weight: 300;
    padding: .5rem 1rem;
    text-align: center;
    position: relative;
    height: 1em;
  }
  .clock__hours {
    border-right: .15rem solid #fff;
    border-radius: .5rem 0 0 .5rem;
  }
  .clock__minutes {
    border-right: .15rem solid #fff;
  }
  .clock__seconds {
    border-radius: 0 .75rem .75rem 0;
  }
  .clock__hourtime {
    font-size: 1rem;
    position: absolute;
    top: 2px;
    left: 8px;
  }
</style>