import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { CategoryComponent } from '../dialog/category/category.component';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-manage-category',
  templateUrl: './manage-category.component.html',
  styleUrls: ['./manage-category.component.scss']
})
export class ManageCategoryComponent implements OnInit {

  displayedColumns: string[] = ['name', 'edit'];
  dataSource: any;
  responseMessage: any;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private categoryService: CategoryService,
    private ngxService: NgxUiLoaderService
  ) { }

  ngOnInit(): void {
    this.tableData();
  }

  tableData() {
    this.ngxService.start();
    this.categoryService.getAllCategory().subscribe((res: any) => {
      this.dataSource = new MatTableDataSource(res);
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

  applyFilter(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addCategory() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Add'
    };

    dialogConfig.width = "850px";
    const dialogRef = this.dialog.open(CategoryComponent, dialogConfig);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });

    const res = dialogRef.componentInstance.onAddCategory.subscribe((response) => {
      this.tableData();
    })
  }

  editCategory(values: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Edit',
      data: values
    };

    dialogConfig.width = "850px";
    const dialogRef = this.dialog.open(CategoryComponent, dialogConfig);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });

    const res = dialogRef.componentInstance.onAddCategory.subscribe((response) => {
      this.tableData();
    })
  }

}
