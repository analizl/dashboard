import {CronJob, cronJob} from '@loopback/cron';
import {repository} from '@loopback/repository';
import {Price, Trade} from '../models';
import {ExchangeRepository, PriceRepository, TradeRepository} from '../repositories';
import {LoggingBindings, WinstonLogger} from '@loopback/logging';
import {inject, JSONObject} from '@loopback/core';

@cronJob()
export class MyCronJob extends CronJob {
  constructor(@repository(TradeRepository)
              public tradeRepository: TradeRepository,
              @repository(ExchangeRepository)
              public exchangeRepository:ExchangeRepository,
              @repository(PriceRepository)
              public priceRepository:PriceRepository,
              // Inject a winston logger
              @inject(LoggingBindings.WINSTON_LOGGER)
              private logger: WinstonLogger) {
    super({
      name: 'job-B', onTick: async () => {
        let trades: Trade[] = await tradeRepository.find();
        for (const trade of trades){
          try {
            const price: Price = new Price()
            price.date = (new Date()).toString()
            const exchange = await this.exchangeRepository.findById(trade.exchange_id);

            //const script_exchange = eval(exchange.script)
            //const script_trade = eval(trade.script)
            //price.price = script_trade(script_exchange)
           // price.price = script_trade


            //DATOS HARDCODEADOS
            const getContent = function(url:string) {
              return new Promise((resolve, reject) => {
                const lib = url.startsWith('https') ? require('https') : require('http');
                const request = lib.get(url, (response:any) => {
                  // handle http errors
                  if (response.statusCode < 200 || response.statusCode > 299) {
                    reject(new Error('Failed to load page, status code: ' + response.statusCode));
                  }
                  // temporary data holder
                  const body:any = [];
                  // on every content chunk, push it to the data array
                  response.on('data', (chunk:any) => body.push(chunk));
                  // we are done, resolve promise with those joined chunks
                  response.on('end', () => resolve(body.join('')));
                });
                // handle connection errors of the request
                request.on('error', (err:any) => reject(err))
              })
            };

            getContent('https://api.binance.com/api/v3/ticker/price?symbol=LTCBTC')
              .then((html:any) => {console.log(JSON.parse(html))
                  price.price=(JSON.parse(html).price);
                  console.log(price.price);
                  this.priceRepository.create(price)})
              .catch((err) => console.error(err));

            price.trade_id = trade.id ?? 0

            console.log("price"+price)

            //this.logger.log('info','success');
          } catch (e){
            //this.logger.log('info','error');
          }
        }
      },
      cronTime: '*/10 * * * * *',
      start: true,
    });}}