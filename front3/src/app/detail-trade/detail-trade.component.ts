import { Component, OnInit } from '@angular/core';
import { Trade } from '../model/Trade';
import { Price } from '../model/Price';
import { TradeService } from '../trade.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ExchangeService } from '../exchange.service';
import { DataServiceService } from '../data.service';
import { Exchange } from '../model/Exchange';
import * as echarts from 'echarts';

@Component({
  selector: 'app-detail-trade',
  templateUrl: './detail-trade.component.html',
  styleUrls: ['./detail-trade.component.css']
})
export class DetailTradeComponent implements OnInit {
  trade:Trade;
  prices:Price[]=[];
  exchange:Exchange;
  idT:String;
  cryptoFrom:String;
  cryptoTo:String;

  constructor(private route: ActivatedRoute , private router:Router, private tradeService:TradeService, private exService:ExchangeService, private cryptoService: DataServiceService) { 
    this.idT=route.snapshot.paramMap.get("id");

  }

  ngOnInit() {
    //getTrade
    this.tradeService.getTrade(this.idT).subscribe((t)=>{
      this.trade=t;
      //getExchange (nombre)
      this.exService.getExchange((this.trade.exchangeId).toString()).subscribe((e)=>{
        this.exchange = e;
      });
      //getCrypto from y getCrypto to
      this.cryptoService.getCrypto((this.trade.currency_from_id).toString()).subscribe((c)=>{
        this.cryptoFrom = c.name;
      });
      this.cryptoService.getCrypto((this.trade.currency_to_id).toString()).subscribe((c)=>{
        this.cryptoTo = c.name;
      });

      //get Prices
      this.tradeService.getPricesList(this.idT).subscribe((p)=>{
        this.prices=p;
        this.dibujar();
      })

    });
    
    
    }
    dibujar(){
       // initialize the echarts instance
    type EChartsOption = echarts.EChartsOption;

    var chartDom = document.getElementById('main')!;
    var myChart = echarts.init(chartDom);
    var option: EChartsOption;

    var chartDomCandle = document.getElementById('candleChart')!;
    var myChartCandle = echarts.init(chartDomCandle);
    var optionCandle: EChartsOption;

    var data=[];
    this.prices.forEach(p => {
      data.push([p.date,p.price]);
    });
    console.log(Date.parse((data[0])[0]))

    option = {
      title: {
        text: 'Cotizaciones'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['Valor']
      },
      xAxis: {
        type: 'time',
        name: 'Fecha',
      },
      yAxis: {
        type: 'value',
        boundaryGap: [0, '5%']
      },
      dataZoom: [
        {
          type: 'inside',
          start: 0,
          end: 10
        },
        {
          start: 0,
          end: 10
        }
      ],
      dataset:{
        source: data,
        dimensions: ['date','price']
      },
       series: [
        {
          name: 'Valor',
          type: 'line',
          data: data,
          encode: {
            x: 'date',
            y: 'price' 
          } 
        }
      ] 
    };

    function splitData(aDataSet){
      //formato => ["dia", priceOpen, priceClose, lowest, highest]
      aDataSet.array.forEach(element => {
        //while(sameDay){
          //first price --> save priceOpen
            //if price < min = save lowest
            //if price > max = save highest
            //save priceClose
        //}
      });
    }
    var dataCandle = splitData(data)
    option && myChart.setOption(option);
    optionCandle={
      title: {
        text: 'Cotizaciones'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['Valor']
      },
      xAxis: {
        type: 'time',
        name: 'Fecha',
      },
      yAxis: {
        type: 'value',
        boundaryGap: [0, '5%']
      },
      dataZoom: [
        {
          type: 'inside',
          start: 0,
          end: 10
        },
        {
          start: 0,
          end: 10
        }
      ],
      dataset:{
        source: data,
        dimensions: ['date','price']
      },
      series:[
        {
          name: '日K',
          type: 'candlestick',
          data: data,
          itemStyle: {
            color: "#00ff00",
            color0: "#ff0000",
            borderColor: "#00ff00",
            borderColor0: "#ff0000"
          },
          markPoint: {
            /* label: {
              formatter: function (param) {
                return param != null ? Math.round(param.value) + '' : '';
              }
            }, */
            data: [
              {
                name: 'Mark',
                coord: ['2013/5/31', 2300],
                value: 2300,
                itemStyle: {
                  color: 'rgb(41,60,85)'
                }
              },
              {
                name: 'highest value',
                type: 'max',
                valueDim: 'highest'
              },
              {
                name: 'lowest value',
                type: 'min',
                valueDim: 'lowest'
              },
              {
                name: 'average value on close',
                type: 'average',
                valueDim: 'close'
              }
            ]
          }
        }
      ]
    };
    optionCandle && myChartCandle.setOption(optionCandle);
    }

}
