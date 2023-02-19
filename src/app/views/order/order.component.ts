import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {QueryProductsService} from "../../shared/services/query-products.service";

@Component({
  selector: 'order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, OnDestroy {

  private subscriptionRoute: Subscription | null = null;
  private subscriptionOrder: Subscription | null = null;
  popupSuccess: boolean = false;
  errorButton: boolean = false;
  modalOpen: boolean | null = null;

  formSubmit: HTMLElement | null = null;


  constructor(private fb: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private queryProducts: QueryProductsService,
              private router: Router) {


  }

  checkoutForm = this.fb.group({
    name: ['', [Validators.required, Validators.pattern('^[a-zA-z]+$')]],
    last_name: ['', [Validators.required, Validators.pattern('^[a-zA-z]+$')]],
    phone: ['', [Validators.required, Validators.pattern('^[\+]?[0-9]{11}$')]],
    country: ['', Validators.required],
    zip: ['', Validators.required],
    product: [{value: '', disabled: true}],
    address: ['', [Validators.required, Validators.pattern('^[a-zA-z0-9\\s\/\-]+$')]],
    comment: ['']
  })

  createOrder() {
    this.errorButton = false;
    const controls: any = this.checkoutForm.controls;
    if (this.checkoutForm.invalid) {
      Object.keys(controls)
        .forEach((item) => controls[item].markAsTouched());
      return;
    }

    this.subscriptionOrder = this.queryProducts.createOrder({
        name: this.checkoutForm.get('name')!.value,
        last_name: this.checkoutForm.get('last_name')!.value,
        phone: this.checkoutForm.get('phone')!.value,
        country: this.checkoutForm.get('country')!.value,
        zip: this.checkoutForm.get('zip')!.value,
        product: this.checkoutForm.get('product')!.value,
        address: this.checkoutForm.get('address')!.value,
        comment: this.checkoutForm.get('comment')!.value
      }
    )
      .subscribe(response => {
        this.formSubmit?.setAttribute('disabled', 'disabled');
        if (response.success && !response.message) {
          this.popupSuccess = true;
          this.checkoutForm.reset();
          this.formSubmit?.removeAttribute('disabled');
        } else {
          this.formSubmit?.removeAttribute('disabled');
          this.errorButton = true;
          setTimeout(() => {
            this.errorButton = false;
          }, 3000)
        }
      })


  }

  // closePopup() {
  //   this.popupSuccess = false;
  // }

  successOrder() {
    this.router.navigate(['/catalog']);
  }


  ngOnInit() {
    this.subscriptionRoute = this.activatedRoute.queryParams.subscribe((params) => {
      if (params['product']) {
        this.checkoutForm.patchValue({
          product: params['product']
        });
      }
    })

    this.formSubmit  = document.getElementById('form-submit');
  }

  ngOnDestroy() {
    this.subscriptionRoute?.unsubscribe();
    this.subscriptionOrder?.unsubscribe();
  }
}
