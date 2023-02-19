import {Component, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs";
import {FormBuilder, Validators} from "@angular/forms";
import {SearchService} from "../../services/search.service";
import {Router} from "@angular/router";

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnDestroy {

  private subscriptionSearchProduct: Subscription | null = null;
  searchForm = this.fb.group({
    search: ['', Validators.required]
  });

  constructor(private searchService: SearchService,
              private router: Router,
              private fb: FormBuilder) {

  }

  search() {
    const res: string | null | undefined = this.searchForm.get('search')?.value;
    this.searchService.setSearchPhrase(res);
    this.router.navigate(['catalog']);
    // this.searchForm.reset();
  }

  searchClear() {
    this.searchForm.reset();
    this.searchService.setSearchPhrase('');
  }

  ngOnDestroy() {
    this.subscriptionSearchProduct?.unsubscribe();
  }

  clearSearch() {
    this.searchForm.reset();
    this.searchService.setSearchPhrase('');
    this.router.navigate(['catalog']);
  }

}
