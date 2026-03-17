import axios from "axios"
import { CryptoCurrenciesResponseSchema, CryptoPriceSchema } from "../schema/crypto-schema"
import type { Pair } from "../types"


export async function getCryptos () {
    //const url = 'https://data-api.coindesk.com/asset/v1/top/list?page=1&page_size=20&sort_by=CIRCULATING_MKT_CAP_USD&sort_direction=DESC&groups=ID,BASIC,SUPPLY,PRICE,MKT_CAP,VOLUME,CHANGE,TOPLIST_RANK&toplist_quote_asset=USD'
    const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD'
    const {data: {Data}} = await axios(url)
    const result = CryptoCurrenciesResponseSchema.safeParse(Data)
    if(result.success){
        return result.data
    }
}

export async function fetchCurrentCryptoPrice(pair: Pair){
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${pair.cryptocurrency}&tsyms=${pair.currency}`
    const {data: {DISPLAY}} = await axios(url)
    const result = CryptoPriceSchema.safeParse(DISPLAY[pair.cryptocurrency][pair.currency])
    if(result.success){
        return result.data
    }
}