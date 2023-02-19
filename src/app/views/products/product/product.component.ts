import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductType} from "../../../../types/product.type";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {QueryProductsService} from "../../../shared/services/query-products.service";

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {

  product: ProductType;

  private subscriptionProduct: Subscription | null = null;

  constructor(private activatedRoute: ActivatedRoute,
              private queryProductsService: QueryProductsService,
              private router: Router) {
    this.product = {
      id: 0,
      image: '',
      title: '',
      price: 0,
      description: ''
    }
  }

  ngOnInit() {
    this.subscriptionProduct = this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.queryProductsService.getProduct(+params['id'])
          .subscribe({
            next: (data) => {
              this.product = data;
            },
            error: (error) => {
              this.router.navigate(['/'])
            }
          })
      }
    })
  }

  ngOnDestroy() {
    this.subscriptionProduct?.unsubscribe();
  }
}
