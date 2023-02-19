import {Injectable} from '@angular/core';
import {ProductType} from "../../../types/product.type";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {OrderDataType} from "../../../types/order-data.type";

@Injectable()
export class QueryProductsService {

  constructor(private http: HttpClient) {
  }

  getProducts(searchString?: string | null | undefined): Observable<ProductType[]> {
    if (searchString) {
      return this.http.get<ProductType[]>(`https://testologia.site/tea?search=${searchString}`);
    }
    return this.http.get<ProductType[]>('https://testologia.site/tea');
  }

  getProduct(id: number): Observable<ProductType> {
    return this.http.get<ProductType>(`https://testologia.site/tea?id=${id}`);
  }

  createOrder(data: OrderDataType) {
    return this.http.post<{ success: boolean, message?: string }>('https://testologia.site/order-tea', data);
  }



}
