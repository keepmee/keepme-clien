<template>
  <ul class="timeline" :class="{'timeline-left': side === 'left', 'timeline-right': side === 'right'}">

    <li class="timeline-item row my-2" v-for="item in services">
      <triple-shape :size="35">
        <div class="item item-center bg-color-1 d-flex justify-content-center align-items-center"
             :style="{height: `20px`, width: `20px`}">
          <i :class="item.icon" class="item-icon fa-xs text-white"></i>
        </div>
      </triple-shape>
      <div class="timeline-panel">
        <div class="timeline-heading">
          <h5 class="timeline-title">{{ item.title | capitalize }}</h5>
        </div>
        <div class="timeline-body">{{ item.body }}</div>
      </div>

      <hr class="border-strong border-color-1 my-0">
    </li>

  </ul>
</template>

<script>
    import TripleShape from "../../../../../includes/commons/partials/TripleShape";

    export default {
        name      : "ServicesTimeline",
        components: { TripleShape },
        props     : ['services', 'side']
    }
</script>

<style scoped>

  /*.timeline {
    list-style: none;
    padding: 10px 0 10px;
    position: relative;
    width: 420px;
  }

  .timeline hr {
    width: 50px;
  }

  .timeline:before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    margin-left: -1.5px;
    width: 3px;
    background-color: #eee;
  }

  .timeline.timeline-left:before {
    left: 50px;
  }

  .timeline.timeline-right:before {
    right: 50px;
  }

  .timeline > li {
    position: relative;
    margin-bottom: 10px;
  }

  .timeline > li:before, .timeline > li:after {
    content: "";
    display: table;
  }

  .timeline > li:after {
    clear: both;
  }

  .timeline > li > .timeline-panel {
    position: relative;
    padding: 20px;
    margin-left: 100px;
  }

  .timeline > li .timeline-badge {
    background-color: #999;
    border-radius: 50%;
    color: #fff;
    font-size: 1.4em;
    height: 50px;
    left: 50px;
    line-height: 52px;
    margin-left: -25px;
    position: absolute;
    text-align: center;
    top: 16px;
    width: 50px;
    z-index: 100;
  }

  .timeline.timeline-left > li .timeline-badge + .timeline-panel:before {
    content: "";
    position: absolute;
    top: 26px;
    left: -15px;
    right: auto;
    display: inline-block;
    border-top: 15px solid transparent;
    border-left: 0 solid #ccc;
    border-right: 15px solid #ccc;
    border-bottom: 15px solid transparent;
  }

  .timeline.timeline-right > li .timeline-badge + .timeline-panel:before {
    content: "";
    position: absolute;
    top: 26px;
    left: auto;
    right: 15px;
    display: inline-block;
    border-top: 15px solid transparent;
    border-left: 15px solid #ccc;
    border-right: 0 solid #ccc;
    border-bottom: 15px solid transparent;
  }

  !*.timeline > li .timeline-badge + .timeline-panel:after {
    border-bottom: 14px solid transparent;
    border-left: 0 solid #fff;
    border-right: 14px solid #fff;
    border-top: 14px solid transparent;
    content: " ";
    display: inline-block;
    position: absolute;
    left: -14px;
    right: auto;
    top: 27px;
  }*!

  .timeline-title {
    margin-top: 0;
    color: inherit;
  }

  .timeline-body > p, .timeline-body > ul {
    margin-bottom: 0;
  }

  .timeline-body > p + p {
    margin-top: 5px;
  }*/

  .item.item-center {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 2px;
    /*transform: rotate(45deg);*/
    margin: auto;
  }

  .item-center .item-icon {
    transform: rotate(-45deg);
  }

</style>
