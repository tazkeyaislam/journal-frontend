import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { UserService } from 'src/app/services/user.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {

  displayedColumns: string[] = ['name', 'email', 'status', 'edit']
  dataSource: any;
  responseMessage: any;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private userService: UserService,
    private ngxService: NgxUiLoaderService
  ) { }

  ngOnInit(): void {
    this.tableData()
  }

  tableData() {
    this.ngxService.start();
    this.userService.getAllAppUser().subscribe((res: any) => {
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

  changeStatus(status: boolean, id: any) {
    let data = {
      id: id,
      status: status ? 'active' : 'inactive'
    }
    this.userService.updateUserStatus(data).subscribe((response: any) => {
      this.responseMessage = response?.message;
      this.tableData();
    }, (error) => {
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
}
