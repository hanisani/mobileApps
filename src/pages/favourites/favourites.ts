import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Quote } from './../../data/quote.interface';
import { QuotesService } from './../../services/quotes';
import { QuotePage } from './../quote/quote';
import { SettingsService } from './../../services/settings';

@Component({
  selector: 'page-favourites',
  templateUrl: 'favourites.html',
})
export class FavouritesPage {

  quotes: Quote[];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private quoteService: QuotesService,
    private modalCtrl: ModalController,
    private settingsService: SettingsService) {
  }

  ionViewWillEnter() {
    this.quotes = this.quoteService.getFavouriteQuotes();
  }

  onViewQuote(quote: Quote) {
    const modal = this.modalCtrl.create(QuotePage, quote);
    modal.present();
    modal.onDidDismiss((remove: boolean) => {
      if (remove) {
        this.onRemoveFromFavourites(quote);
      }
    });
  }

  onRemoveFromFavourites(quote: Quote) {
    this.quoteService.removeQuoteFromFavourites(quote);
    // this.quotes = this.quoteService.getFavouriteQuotes();
    const position = this.quotes.findIndex((quoteElement: Quote) => {
      return quoteElement.id == quote.id;
    });
    this.quotes.splice(position, 1);
  }

  getBackground() {
    return this.settingsService.isAltBackground() ? 'altQuoteBackground' : 'quoteBackground'
  }

  isAltBackground() {
    return this.settingsService.isAltBackground();
  }
}
