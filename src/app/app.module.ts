import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {QueryProductsService} from "./shared/services/query-products.service";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SharedModule} from "./shared/shared.module";
import {OrderModule} from "./views/order/order.module";
import {ProductsModule} from "./views/products/products.module";
import {MainModule} from "./views/main/main.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    MainModule,
    ProductsModule,
    OrderModule,
    HttpClientModule,
    NgbModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
