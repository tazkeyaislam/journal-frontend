import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../services/article.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GlobalConstants } from '../shared/global-constants';
import { ArticleDetailsComponent } from './article-details/article-details.component';
import { UserService } from '../services/user.service';
import { CategoryService } from '../services/category.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  responseMessage: any;
  articles: any[] = [];
  searchText: string = ' ';
  categories: any[] = [];
  selectedCategoryId: number | null = null;

  constructor(
    private articleService: ArticleService,
    private dialog: MatDialog,
    private router: Router,
    private userService: UserService,
    private ngxService: NgxUiLoaderService,
    private categoryService: CategoryService) {
    this.tableData();
    this.fetchCategories();
  }

  ngOnInit(): void {
    //if token exists on localstorage
    if (localStorage.getItem('token') != null) {
      this.userService.checkToken().subscribe((response: any) => {
        this.router.navigate(['/journal/dashboard'])
      }, (error: any) => {
        console.log(error);
      }
      )
    }
  }

  tableData() {
    this.ngxService.start();
    this.articleService.getPublicPublishedArticles().subscribe((response: any) => {
      this.articles = response;
      this.ngxService.stop();
    }, (error: any) => {
      this.ngxService.stop();
      console.log(error);
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      }
      else {
        this.responseMessage = GlobalConstants.genericError;
      }
      //snackbar
    }
    )
  }

  filteredItem(): any[] {
    const trimmedSearchText = this.searchText.trim().toLowerCase();

    return this.articles.filter((item) => {
      const matchesCategory = !this.selectedCategoryId || item.category?.id === this.selectedCategoryId;
      const matchesSearchText = item.title?.toLowerCase().includes(trimmedSearchText) ||
        item.category?.name?.toLowerCase().includes(trimmedSearchText);
      return matchesCategory && matchesSearchText;
    });
  }


  fetchCategories() {
    this.ngxService.start();
    this.categoryService.getAllCategory().subscribe((res: any) => {
      this.categories = res;
      this.ngxService.stop();
    }, (error: any) => {
      this.ngxService.stop();
      console.log(error);
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      }
      else {
        this.responseMessage = GlobalConstants.genericError;
      }
      //snackbar
    })
  }

  filterByCategory(categoryId: number | null) {
    this.selectedCategoryId = categoryId;
  }

  getAvatarColor(email: string): string {
    let hash = 0;
    for (let i = 0; i < email.length; i++) {
      hash = email.charCodeAt(i) + ((hash << 5) - hash);
    }
    const color = `hsl(${hash % 360}, 60%, 80%)`;
    return color;
  }
}

