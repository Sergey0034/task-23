import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
declare var $: any;

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  private observable: Observable<any> | null = null;
  modalOpen: boolean | null = null;
  private subscription: Subscription | null = null;

  constructor() {
    this.observable = new Observable<any>((observer) => {
      const interval = setInterval(() => {
        observer.next();
        observer.complete();
      }, 10000);
      return {
        unsubscribe() {
          clearInterval(interval);
        }
      }
    })
  };

  closePopup() {
    this.modalOpen = false;
  }

  ngOnInit() {
    let icons = {
      header: "ui-icon-circle-arrow-e",
      activeHeader: "ui-icon-circle-arrow-s"
    };
    let accordionElement = $("#accordion");
    accordionElement.accordion({
      icons: icons
    });
    $("#toggle").button().on("click", function () {

      if (accordionElement.accordion("option", "icons")) {
        accordionElement.accordion("option", "icons", null);
      } else {
        accordionElement.accordion("option", "icons", icons);
      }
    });
    if (this.observable) {
      this.subscription = this.observable.subscribe(()=> {
        this.modalOpen = true;
      })
    }

  };

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

}
