import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductType} from "../../../../types/product.type";
import {QueryProductsService} from "../../../shared/services/query-products.service";
import {Router} from "@angular/router";
import {Subscription, tap} from "rxjs";
import {SearchService} from "../../../shared/services/search.service";

@Component({
  selector: 'catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit,OnDestroy {
  products: ProductType[] = [];
  private subscriptionProducts: Subscription | null = null;
  private subscriptionSearch: Subscription | null = null;
  searchPhrase: string | null | undefined = null;

  loading: boolean = false;

  constructor(private queryProductsService: QueryProductsService,
              private router: Router,
              private searchService: SearchService) {
  }

  ngOnInit() {
    this.loading = true;
    this.subscriptionSearch = this.searchService.searchString$.subscribe(phrase => {
      this.searchPhrase = phrase;
      this.subscriptionProducts = this.queryProductsService.getProducts(phrase).subscribe({
        next: productList => {
          this.products = Object.values(productList);
          this.loading = false;
        },
        error: error => {
          console.log(error.message);
          this.router.navigate(['/']);
        }
      });
    });
    this.searchService.searchString$.next(this.searchService.searchString);
  }

  ngOnDestroy() {
    this.subscriptionProducts?.unsubscribe();
    this.subscriptionSearch?.unsubscribe();
  }
}
