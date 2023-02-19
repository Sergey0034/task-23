import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import {CatalogComponent} from "./catalog/catalog.component";
import {ProductComponent} from "./product/product.component";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";
import {QueryProductsService} from "../../shared/services/query-products.service";


@NgModule({
  declarations: [
    CatalogComponent,
    ProductComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ProductsRoutingModule
  ],
  exports: [
    ProductsRoutingModule
  ],
  providers: [
    QueryProductsService
  ]

})
export class ProductsModule { }
