import { Component, OnInit } from '@angular/core';
import { AlertController } from "ionic-angular";
import { NavController, NavParams } from 'ionic-angular';
import { Quote } from "../../data/quote.interface";
import { QuotesService } from './../../services/quotes';

@Component({
  selector: 'page-quotes',
  templateUrl: 'quotes.html',
})
export class QuotesPage implements OnInit {

  quoteGroup: {category: string, quotes: Quote[], icon: string};

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private alertCtrl: AlertController,
    private quotesService: QuotesService) {
  }

  // ionViewDidLoad() {
  //   this.quoteGroup = this.navParams.data;
  // }

  ngOnInit() {
    this.quoteGroup = this.navParams.data;
  }

  onAddToFavourites(selectedQuote: Quote) {
    const alert = this.alertCtrl.create({
      title: 'Add Quote',
      subTitle: 'Are you sure?',
      message: 'Are you sure you want to add the quote?',
      buttons: [
        {
          text: 'Yes, go ahead',
          handler: () => {
            this.quotesService.addQuoteToFavourites(selectedQuote);
          }
        },
        {
          text: 'No, I changed my mind!',
          role: 'cancel',
          handler: () => {
            console.log('Cancel');
          }
        }
      ]
    });

    alert.present();
  }

  onRemoveFromFavourites(quote: Quote) {
    this.quotesService.removeQuoteFromFavourites(quote);
  }

  isFavourite(quote: Quote) {
    return this.quotesService.isQuoteFavourite(quote);
  }

}