
function heatOption(data,tip){
    let option = {
        tooltip:{                                      //提示框组件
            trigger: 'item',                            //触发类型,'item'数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。 'axis'坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用。
            triggerOn:"mousemove",                      //提示框触发的条件,'mousemove'鼠标移动时触发。'click'鼠标点击时触发。'mousemove|click'同时鼠标移动和点击时触发。'none'不在 'mousemove' 或 'click' 时触发
            showContent:true,   
            show:true,                        //是否显示提示框浮层
            // alwaysShowContent:true,                     //是否永远显示提示框内容
            showDelay:0,                                  //浮层显示的延迟，单位为 ms
            hideDelay:100,                                //浮层隐藏的延迟，单位为 ms
            enterable:false,                             //鼠标是否可进入提示框浮层中
            confine:false, 
            renderMode: "html",                              //是否将 tooltip 框限制在图表的区域内
            transitionDuration:0.4,                      //提示框浮层的移动动画过渡时间，单位是 s,设置为 0 的时候会紧跟着鼠标移动
            formatter:function(params){
             if(params.data){
                // return`<p>${params.data.name}</p>
                // <p>院校总数：${params.data.allNum}</p>
                // <p>本科院校：${params.data.ucNum}</p>
                // <p> 专科院校：${params.data.jceNum}</p>`
                //    }else{
                //     return`暂无数据`
                //    } 
                return`<p>${params.data.num}</p>`
                   }else{
                    return`暂无数据`
                   } 
            },
            backgroundColor:"black",            //标题背景色
            borderColor:"#ccc",                        //边框颜色
            borderWidth:0,                              //边框线宽
            padding:5 ,
        },
        visualMap: {
            min: 0,
            max: 200,
            splitNumber: 5,
            calculable: true,
            orient: 'horizontal',
            left:'center',
            bottom:'20',
            itemWidth:16,                           //图形的宽度，即长条的宽度。
            itemHeight:480,
            inRange: {
                color: [ '#FF9228',"#1D7EEB"]
            },
            textStyle: {
                color: "#fff"
            }
        },
        geo: {
            show:false,
            type:'map',
            map:'china',       
        },
          
        series: [
         {      
                type:'map',
                map:'china',       
                data:tip,
                label: {
                    normal: {
                        show: true,
                        color:'white', 
                          
                    },
                    emphasis: {
                        show: true,
                        color:'#fff000', 
                    }
                },
                roam: false,
                itemStyle: {
                    normal: {
                        areaColor: "#5f54c8", //地图背景色
                        borderColor: "#a59cff",
                    },
                    emphasis: {
                        areaColor: "#239c9d"
                    }
                },
         },
         {
            name: "热力图",
            type: "heatmap",
            coordinateSystem: "geo",
            data:data,
                           //每一列称为一个『维度』。维度下标从0开始
         },
        ],     
    };
     return option;
}
function DownheatOption(data,name){
    console.log(data);
    let option = {
        visualMap: {
            min: 0,
            max: 200,
            splitNumber: 5,
            calculable: true,
            orient: 'horizontal',
            left:'center',
            bottom:'20',
            itemWidth:16,                           //图形的宽度，即长条的宽度。
            itemHeight:480,
            inRange: {
                color: ['#FF9228',"#1D7EEB"]
            },
            textStyle: {
                color: "#fff"
            }
        },
        geo: {
            show:false,
            map:name,
           
        },
        series: [{
                type:'map',
                map:name,       
                center:name=='海南'?[109.844902, 19.0392]:'',
                layoutCenter:name=='海南'?['50%', '50%']:'undefined',
                layoutSize:name=='海南'?"600%":'undefined',
                label: {
                    normal: {
                        show: true,
                        color:'white', 
                          
                    },
                    emphasis: {
                        show: true,
                        color:'#fff000', 
                    }
                },
                roam: false,
                itemStyle: {
                    normal: {
                        areaColor: "#5f54c8", //地图背景色
                        borderColor: "#a59cff",
                    },
                    emphasis: {
                        areaColor: "#239c9d"
                    }
                },
              },
              {
                name: "热力图",
                type: "heatmap",
                coordinateSystem: "geo",
                data: data,                    //每一列称为一个『维度』。维度下标从0开始
            },
            {
                name: "圆",
                type: "scatter",
                coordinateSystem: "geo",
                // symbol: "pin", //气泡
                symbolSize: 30,
                label: {
                    normal: {
                        show: true,
                        formatter: '{@value}',
                        textStyle: {
                            color: "#fff",
                            fontSize: 9
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        color: "#F62157"
                    }
                },
                zlevel: 6,
                data:data,  //散点图数组
            }
        ],
    };
    console.log(option);
     return option;
}
export {heatOption,DownheatOption};