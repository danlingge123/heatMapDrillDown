<template>
  <div class="home">
     <div id="heatMap"></div>
  </div>
</template>
<script>

import { heatOption, DownheatOption } from "../map/mapConfifg.js";
import cityData from"../map/cityDatas";
import {
  provinces,
  allcode,
  geoCoordMap,
  valuedata,
  ceshidata
} from "../map/mapArr.js"; //地图数据
export default {
  name: 'home',
  components: {   
  },
  async mounted(){
  console.log(cityData);
  let list=[];
  let  datalist=[];
  this.myChart = this.$echarts.init(document.getElementById("heatMap"));
  let map = await axios.get(`http://localhost:8080/static/json/china.json`);
  this.$echarts.registerMap("china", map.data);
  Object.values(cityData);
  for(let value of Object.values(cityData)){
     value.push(this.generate(1,100));
     datalist.push(value);
  }
  for(let key of Object.keys(cityData)){
      list.push({
        name:key,
        num:this.generate(1,100),
      })
  }
   this.myChart.setOption(heatOption(datalist,list),true); //执行渲染
  //  挂载点击事件
   this.myChart.on("click",params=> {
      // console.log(params);
      if(params.name=='南海诸岛'){
        return;
      }
      if (params.componentType == "series") {
        // this.name=params.name;
        this.down(provinces[params.name], params.name);
      }
      //跳转判断是否下钻
     
    }); //挂载回调
  },
  methods:{
  //生成随机数
     generate(start,end) {
      let Range =start-end;
      let num = Math.floor(Math.random() * (Range) + end);
      return num;
    },
     //下钻渲染
    async down(path, name){
      let json = await axios.get(path);
      this.$echarts.registerMap(name, json.data);
      //纬度数组用于热力图渲染
      let data=[];
      this.myChart.setOption(
        DownheatOption(data, name),
        true
      );
    },
  }
}
</script>
<style lang="scss" scoped>
#heatMap{
  width: 800px;
  height: 800px;
  margin: 0 auto;
}
</style>>