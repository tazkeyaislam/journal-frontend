import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ArticleDetailsComponent } from 'src/app/article-details/article-details.component';
import { ArticleService } from 'src/app/services/article.service';
import { CategoryService } from 'src/app/services/category.service';
import { UserService } from 'src/app/services/user.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {


  responseMessage: any;
  articles: any[] = [];
  searchText: string = ' ';
  categories: any[] = [];
  selectedCategoryId: number | null = null;
  isLoading: boolean = true;  // Track loading state


  constructor(
    private articleService: ArticleService,
    private dialog: MatDialog,
    private router: Router,
    private userService: UserService,
    private categoryService: CategoryService) {
    this.tableData();
    this.fetchCategories();
  }

  ngOnInit(): void {
    //if token exists on localstorage
    if (localStorage.getItem('token') != null) {
      this.userService.checkToken().subscribe((response: any) => {
        this.router.navigate(['/articleHub/dashboard'])
      }, (error: any) => {
        console.log(error);
      }
      )
    }
  }

  tableData() {
    this.articleService.getPublicPublishedArticles().subscribe((response: any) => {
      this.articles = response;
      console.log('Articles:', this.articles); // Log to check the data
      this.isLoading = false;  // End loading after data is fetched
    }, (error: any) => {
      this.isLoading = false;  // End loading after data is fetched
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

  handleViewAction(article: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Edit',
      data: article
    };
    dialogConfig.width = "850px";
    const dialogRef = this.dialog.open(ArticleDetailsComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(updatedArticle => {
      if (updatedArticle) {
        this.updateArticleInList(updatedArticle);
      }
    });
  }

  updateArticleInList(updatedArticle: any): void {
    const index = this.articles.findIndex(a => a.id === updatedArticle.id);
    if (index !== -1) {
      this.articles[index] = updatedArticle;
      this.filteredItem();
    }
  }
  fetchCategories() {
    this.categoryService.getAllCategory().subscribe((res: any) => {
      this.categories = res;
    }, (error: any) => {
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
    this.filteredItem();

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

