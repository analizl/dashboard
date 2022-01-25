import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import * as echarts from 'echarts';
import {AuthService} from '../auth.service';
import {DataServiceService} from '../data.service';
import {ExchangeService} from '../exchange.service';
import {Exchange} from '../model/Exchange';
import {Price} from '../model/Price';
import {Trade} from '../model/Trade';
import {TradeService} from '../trade.service';

@Component({
  selector: 'app-detail-trade',
  templateUrl: './detail-trade.component.html',
  styleUrls: ['./detail-trade.component.css']
})
export class DetailTradeComponent implements OnInit {
  trade: Trade;
  prices: Price[] = [];
  exchange: Exchange;
  idT: String;
  cryptoFrom: String;
  cryptoTo: String;
  dibujado: Boolean = false
  chartDom;
  myChart;
  chartDomCandle;
  myChartCandle;

  constructor(private route: ActivatedRoute, private router: Router, private tradeService: TradeService, private exService: ExchangeService, private cryptoService: DataServiceService, private authService: AuthService) {
    if (!authService.isAuthenticated()) {
      router.navigate(['login']);
    }
    this.idT = route.snapshot.paramMap.get("id");

  }

  ngOnInit() {
    //getTrade
    this.tradeService.getTrade(this.idT).subscribe((t) => {
      this.trade = t;
      //getExchange (nombre)
      this.exService.getExchange((this.trade.exchangeId).toString()).subscribe((e) => {
        this.exchange = e;
      });
      //getCrypto from y getCrypto to
      this.cryptoService.getCrypto((this.trade.currency_from_id).toString()).subscribe((c) => {
        this.cryptoFrom = c.name;
      });
      this.cryptoService.getCrypto((this.trade.currency_to_id).toString()).subscribe((c) => {
        this.cryptoTo = c.name;
      });

      //get Prices
      this.tradeService.getPricesListRange(this.idT, 1).subscribe((p) => {
        this.prices = p;
        this.dibujar(0);
      })

    });


  }

  dibujar(r) {
    // initialize the echarts instance
    type EChartsOption = echarts.EChartsOption;
    if (this.dibujado == true) {


      var data = [];
      this.tradeService.getPricesListRange(this.idT, r).subscribe((p) => {
        this.prices = p;
        this.prices.forEach(p => {
          data.push([p.date, p.price]);
        });


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
              show: true,
              realtime: true
            },
            {
              start: 0,
              end: 10
            }
          ],
          dataset: {
            source: data,
            dimensions: ['date', 'price']
          },
          series: [
            {
              name: 'Valor',
              type: 'line',
              showSymbol: false,
              data: data,
              encode: {
                x: 'date',
                y: 'price'
              }
            }
          ]
        };
        option && this.myChart.setOption(option);
        var dataCandle = []
        var diccDataCandle = {}

        data.forEach(element => {
          let temp = (new Date(Date.parse(element[0])));
          let tempFormatted = ((temp.getDate()).toString() + (temp.getMonth() + 1).toString()
            + (temp.getFullYear()).toString());
          if (!diccDataCandle[tempFormatted.valueOf()]) {
            diccDataCandle[tempFormatted.valueOf()] = []
          }
          diccDataCandle[tempFormatted.valueOf()].push(element[1]);

        });

        function minimo(fields) {
          let min = 9999
          fields.forEach(f => {
            if (f < min) {
              min = f
            }
          });
          return min
        }
        function maximo(fields) {
          let max = -1
          fields.forEach(f => {
            if (f > max) {
              max = f
            }
          });
          return max
        }
        function splitData(rawData) {
          const categoryData = [];
          const values = [];
          for (var i = 0; i < rawData.length; i++) {
            categoryData.push(rawData[i].splice(0, 1)[0]);
            values.push(rawData[i]);
          }
          return {
            categoryData: categoryData,
            values: values
          };
        }
        //formato => [["dia", priceOpen, priceClose, lowest, highest],
        //            ["dia", priceOpen, priceClose, lowest, highest]]
        for (const key in diccDataCandle) {
          let min = minimo(diccDataCandle[key])
          let max = maximo(diccDataCandle[key])
          let last = diccDataCandle[key].length - 1
          let fechaParseada: String = "";
          if (key.length == 7) {
            fechaParseada += key[0]
            fechaParseada += key[1]
            fechaParseada += '/'
            fechaParseada += '0'
            fechaParseada += key[2]
            fechaParseada += '/'
            fechaParseada += key[3]
            fechaParseada += key[4]
            fechaParseada += key[5]
            fechaParseada += key[6]
          } else {
            fechaParseada += key[0]
            fechaParseada += key[1]
            fechaParseada += '/'
            fechaParseada += key[2]
            fechaParseada += key[3]
            fechaParseada += '/'
            fechaParseada += key[4]
            fechaParseada += key[5]
            fechaParseada += key[6]
            fechaParseada += key[7]
          }
          let cadaDia = [fechaParseada, diccDataCandle[key][0], diccDataCandle[key][last.valueOf()], min, max]
          dataCandle.push(cadaDia)
        }
        const data0 = splitData(dataCandle)

        const upColor = '#ec0000';
        const upBorderColor = '#8A0000';
        const downColor = '#00da3c';
        const downBorderColor = '#008F28';

        optionCandle = {
          title: {
            text: 'Cotizaciones Boxplot',
            left: 0
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            }
          },
          legend: {
            data: ["Valor"]//data.[valor]
          },
          grid: {
            left: '10%',
            right: '10%',
            bottom: '15%'
          },
          xAxis: {
            type: 'category',
            data: data0.categoryData, //data.category
            scale: true,
            boundaryGap: false,
            axisLine: {onZero: false},
            splitLine: {show: false},
            min: 'dataMin',
            max: 'dataMax'
          },
          yAxis: {
            scale: true,
            splitArea: {
              show: true
            }
          },
          dataZoom: [
            {
              type: 'inside',
              start: 0,
              end: 100
            },
            {
              show: true,
              type: 'slider',
              top: '90%',
              start: 0,
              end: 100
            }
          ],
          series: [
            {
              name: 'Valor',
              type: 'candlestick',
              data: data0.values,
              itemStyle: {
                color: upColor,
                color0: downColor,
                borderColor: upBorderColor,
                borderColor0: downBorderColor
              },
              markLine: {
                symbol: ['none', 'none'],
                data: [
                  [
                    {
                      name: 'from lowest to highest',
                      type: 'min',
                      valueDim: 'lowest',
                      symbol: 'circle',
                      symbolSize: 10,
                      label: {
                        show: false
                      },
                      emphasis: {
                        label: {
                          show: false
                        }
                      }
                    },
                    {
                      type: 'max',
                      valueDim: 'highest',
                      symbol: 'circle',
                      symbolSize: 10,
                      label: {
                        show: false
                      },
                      emphasis: {
                        label: {
                          show: false
                        }
                      }
                    }
                  ],
                  {
                    name: 'min line on close',
                    type: 'min',
                    valueDim: 'close'
                  },
                  {
                    name: 'max line on close',
                    type: 'max',
                    valueDim: 'close'
                  }
                ]
              }
            }
          ]
        };
        optionCandle && this.myChartCandle.setOption(optionCandle);
      })
    } else {

      this.chartDom = document.getElementById('main')!;
      this.myChart = echarts.init(this.chartDom);
      var option: EChartsOption;
      this.dibujado = true

      this.chartDomCandle = document.getElementById('candleChart')!;
      this.myChartCandle = echarts.init(this.chartDomCandle);
      var optionCandle: EChartsOption;

      var data = [];
      this.prices.forEach(p => {
        data.push([p.date, p.price]);
      });


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
            show: true,
            realtime: true
          },
          {
            start: 0,
            end: 10
          }
        ],
        dataset: {
          source: data,
          dimensions: ['date', 'price']
        },
        series: [
          {
            name: 'Valor',
            type: 'line',
            showSymbol: false,
            data: data,
            encode: {
              x: 'date',
              y: 'price'
            }
          }
        ]
      };
      option && this.myChart.setOption(option);

    }

    var dataCandle = []
    var diccDataCandle = {}

    data.forEach(element => {
      let temp = (new Date(Date.parse(element[0])));
      let tempFormatted = ((temp.getDate()).toString() + (temp.getMonth() + 1).toString()
        + (temp.getFullYear()).toString());
      if (!diccDataCandle[tempFormatted.valueOf()]) {
        diccDataCandle[tempFormatted.valueOf()] = []
      }
      diccDataCandle[tempFormatted.valueOf()].push(element[1]);

    });

    function minimo(fields) {
      let min = 9999
      fields.forEach(f => {
        if (f < min) {
          min = f
        }
      });
      return min
    }
    function maximo(fields) {
      let max = -1
      fields.forEach(f => {
        if (f > max) {
          max = f
        }
      });
      return max
    }
    function splitData(rawData) {
      const categoryData = [];
      const values = [];
      for (var i = 0; i < rawData.length; i++) {
        categoryData.push(rawData[i].splice(0, 1)[0]);
        values.push(rawData[i]);
      }
      return {
        categoryData: categoryData,
        values: values
      };
    }
    //formato => [["dia", priceOpen, priceClose, lowest, highest],
    //            ["dia", priceOpen, priceClose, lowest, highest]]
    for (const key in diccDataCandle) {
      let min = minimo(diccDataCandle[key])
      let max = maximo(diccDataCandle[key])
      let last = diccDataCandle[key].length - 1
      let fechaParseada: String = "";
      if (key.length == 7) {
        fechaParseada += key[0]
        fechaParseada += key[1]
        fechaParseada += '/'
        fechaParseada += '0'
        fechaParseada += key[2]
        fechaParseada += '/'
        fechaParseada += key[3]
        fechaParseada += key[4]
        fechaParseada += key[5]
        fechaParseada += key[6]
      } else {
        fechaParseada += key[0]
        fechaParseada += key[1]
        fechaParseada += '/'
        fechaParseada += key[2]
        fechaParseada += key[3]
        fechaParseada += '/'
        fechaParseada += key[4]
        fechaParseada += key[5]
        fechaParseada += key[6]
        fechaParseada += key[7]
      }
      let cadaDia = [fechaParseada, diccDataCandle[key][0], diccDataCandle[key][last.valueOf()], min, max]
      dataCandle.push(cadaDia)
    }
    const data0 = splitData(dataCandle)

    const upColor = '#ec0000';
    const upBorderColor = '#8A0000';
    const downColor = '#00da3c';
    const downBorderColor = '#008F28';

    optionCandle = {
      title: {
        text: 'Cotizaciones Boxplot',
        left: 0
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        }
      },
      legend: {
        data: ["Valor"]//data.[valor]
      },
      grid: {
        left: '10%',
        right: '10%',
        bottom: '15%'
      },
      xAxis: {
        type: 'category',
        data: data0.categoryData, //data.category
        scale: true,
        boundaryGap: false,
        axisLine: {onZero: false},
        splitLine: {show: false},
        min: 'dataMin',
        max: 'dataMax'
      },
      yAxis: {
        scale: true,
        splitArea: {
          show: true
        }
      },
      dataZoom: [
        {
          type: 'inside',
          start: 0,
          end: 100
        },
        {
          show: true,
          type: 'slider',
          top: '90%',
          start: 0,
          end: 100
        }
      ],
      series: [
        {
          name: 'Valor',
          type: 'candlestick',
          data: data0.values,
          itemStyle: {
            color: upColor,
            color0: downColor,
            borderColor: upBorderColor,
            borderColor0: downBorderColor
          },
          markLine: {
            symbol: ['none', 'none'],
            data: [
              [
                {
                  name: 'from lowest to highest',
                  type: 'min',
                  valueDim: 'lowest',
                  symbol: 'circle',
                  symbolSize: 10,
                  label: {
                    show: false
                  },
                  emphasis: {
                    label: {
                      show: false
                    }
                  }
                },
                {
                  type: 'max',
                  valueDim: 'highest',
                  symbol: 'circle',
                  symbolSize: 10,
                  label: {
                    show: false
                  },
                  emphasis: {
                    label: {
                      show: false
                    }
                  }
                }
              ],
              {
                name: 'min line on close',
                type: 'min',
                valueDim: 'close'
              },
              {
                name: 'max line on close',
                type: 'max',
                valueDim: 'close'
              }
            ]
          }
        }
      ]
    };
    optionCandle && this.myChartCandle.setOption(optionCandle);
  }
}
