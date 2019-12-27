<template>
  <div class="mk-rate" @touchmove="onTouchMove">
    <div
      :style="{marginRight: index === count - 1 ? '' : spacing + 'px'}"
      class="mk-rate__item"
      v-for="(status, index) in list"
      :key="index"
    >
      <svg
        v-if="halfMode"
        :fill="status === 'void' ? voidColor : color"
        :width="size / 2 + 'px'"
        :viewBox="halfViewBox"
        :data-index="index + 0.5"
        class="mk-rate__icon--half"
        @click="onSelect(index + 0.5)"
      >
        <path :d="status === 'full' ? iconPath : voidIconPath" />
      </svg>
      <svg
        :fill="status === 'full' ? color : voidColor"
        :viewBox="viewBox"
        :data-index="index + 1"
        :width="size + 'px'"
        class="mk-rate__icon"
        @click="onSelect(index + 1)"
      >
        <path :d="status === 'full' ? iconPath : voidIconPath" />
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: "rate",
  props: {
    value: Number,
    readonly: Boolean,
    halfMode: Boolean, // 半星模式
    size: {
      type: Number,
      default: 50,
    },
    spacing: {
      type: Number,
      default: 8,
    },
    viewBox:{
      type: String,
      default:"0 0 42 42"
    },
     halfViewBox:{
      type: String,
      default:"0 0 21 42"
    },
    // 背景icon 置灰状态
    iconPath: {
      type: String,
      default:
        "M20.3695378,31.8314536 L11.0863752,36.711901 C10.4240696,37.0600956 9.60489736,36.8054584 9.25670271,36.1431528 C9.11804978,35.8794193 9.07020409,35.5773335 9.12057272,35.2836619 L10.893499,24.9467084 C10.9688795,24.5072067 10.8231686,24.0587549 10.503852,23.7474981 L2.99361564,16.426827 C2.45779918,15.904535 2.44683541,15.0467686 2.96912737,14.5109522 C3.17710677,14.2975872 3.4496223,14.1587337 3.74448537,14.1158875 L14.1233767,12.6077463 C14.5646614,12.5436239 14.9461374,12.2664654 15.1434859,11.8665936 L19.7850673,2.46172263 C20.11622,1.7907338 20.9286163,1.51524225 21.5996052,1.84639504 C21.8667964,1.97826181 22.083066,2.19453136 22.2149327,2.46172263 L26.8565141,11.8665936 C27.0538626,12.2664654 27.4353386,12.5436239 27.8766233,12.6077463 L38.2555146,14.1158875 C38.9959948,14.2234856 39.5090471,14.9109888 39.401449,15.651469 C39.3586029,15.946332 39.2197493,16.2188476 39.0063844,16.426827 L31.496148,23.7474981 C31.1768314,24.0587549 31.0311205,24.5072067 31.106501,24.9467084 L32.8794273,35.2836619 C33.0059164,36.02115 32.5106039,36.7215419 31.7731158,36.848031 C31.4794441,36.8983996 31.1773584,36.8505539 30.9136248,36.711901 L21.6304622,31.8314536 C21.2357651,31.6239491 20.7642349,31.6239491 20.3695378,31.8314536 Z",
    },
    // 高亮icon 点亮状态
    voidIconPath: {
      type: String,
      default:
        "M20.3695378,31.8314536 L11.0863752,36.711901 C10.4240696,37.0600956 9.60489736,36.8054584 9.25670271,36.1431528 C9.11804978,35.8794193 9.07020409,35.5773335 9.12057272,35.2836619 L10.893499,24.9467084 C10.9688795,24.5072067 10.8231686,24.0587549 10.503852,23.7474981 L2.99361564,16.426827 C2.45779918,15.904535 2.44683541,15.0467686 2.96912737,14.5109522 C3.17710677,14.2975872 3.4496223,14.1587337 3.74448537,14.1158875 L14.1233767,12.6077463 C14.5646614,12.5436239 14.9461374,12.2664654 15.1434859,11.8665936 L19.7850673,2.46172263 C20.11622,1.7907338 20.9286163,1.51524225 21.5996052,1.84639504 C21.8667964,1.97826181 22.083066,2.19453136 22.2149327,2.46172263 L26.8565141,11.8665936 C27.0538626,12.2664654 27.4353386,12.5436239 27.8766233,12.6077463 L38.2555146,14.1158875 C38.9959948,14.2234856 39.5090471,14.9109888 39.401449,15.651469 C39.3586029,15.946332 39.2197493,16.2188476 39.0063844,16.426827 L31.496148,23.7474981 C31.1768314,24.0587549 31.0311205,24.5072067 31.106501,24.9467084 L32.8794273,35.2836619 C33.0059164,36.02115 32.5106039,36.7215419 31.7731158,36.848031 C31.4794441,36.8983996 31.1773584,36.8505539 30.9136248,36.711901 L21.6304622,31.8314536 C21.2357651,31.6239491 20.7642349,31.6239491 20.3695378,31.8314536 Z",
    },
    color: {
      type: String,
      default: "#FFBC00",
    },
    voidColor: {
      type: String,
      default: "#E9E9E9",
    },
    count: {
      type: Number,
      default: 5,
    },
  },
  computed: {
    list() {
      let listArr = [];
      for (let i = 1; i <= this.count; i++) {
        listArr.push(this.getRateStatus(this.value, i, this.halfMode));
      }
      return listArr;
    },
  },
  methods: {
    onSelect(index) {
      if (!this.readonly) {
        this.$emit("input", index);
        this.$emit("change", index);
      }
    },
    onTouchMove(event) {
      if (this.readonly || !document.elementFromPoint) {
        return;
      }
      event.preventDefault();
      const [touchInfo] = event.touches;
      const {clientX, clientY} = touchInfo;
      const target = document.elementFromPoint(clientX, clientY);
      if (target && target.dataset) {
        const {index} = target.dataset;
        if (index) {
          this.onSelect(+index);
        }
      }
    },
    getRateStatus(value, index, halfMode) {
      if (value >= index) {
        return "full";
      }
      if (value + 0.5 >= index && halfMode) {
        return "half";
      }
      return "void";
    },
  },
};
</script>

<style lang="less" scoped>
.mk-rate {
  user-select: none;

  &__item {
    padding: 0 2px;
    display: inline-block;
    position: relative;
  }

  &__icon {
    &--half {
      overflow: hidden;
      position: absolute;
      top: 0;
      left: 2px;
    }
  }
}

</style>
