import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCommonModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslationPipe } from 'src/app/pipes/translation/translation.pipe';
import { GlobalFunctionsService } from 'src/app/services/global-functions/global-functions.service';
import { GlobalVariablesService } from 'src/app/services/global-variables/global-variables.service';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [
    MatPaginatorModule,
    MatSelectModule,
    MatTooltipModule,
    MatIconModule,
    MatButtonModule,

    CommonModule,
    TranslationPipe,
    FormsModule
  ],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent implements AfterViewInit{

  @Input('pageIndex') pageIndex:number=0;
  @Input('pageSizeOptions') pageSizeOptions:number[]=[5, 10, 15, 20];
  @Input('pageSize') pageSize:number=10;
  @Input('length') length:number=0;
  @ViewChild('paginator') paginator!: MatPaginator;

  @Output() messageEvent = new EventEmitter<any>();

  public loading: boolean = true;

  constructor(
    public globalVar:GlobalVariablesService,
    public globalFn:GlobalFunctionsService
  ){

  }


  ngAfterViewInit(): void {
    if(this.globalVar.oldpagination==false){
      this.globalFn.paginatorLabels(this.paginator);
    }
  }

  handlePageEvent(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    //this.getPartners();
    this.messageEvent.emit(
      {
        description: 'PageEvent',
        value: {
          pageSize: this.pageSize,
          pageIndex: this.pageIndex
        }
      }
    );
  }

  public pageUp(): void {
    this.pageIndex++;
    //this.getPartners();
    this.messageEvent.emit(
      {
        description: 'PageEvent',
        value: {
          pageSize: this.pageSize,
          pageIndex: this.pageIndex
        }
      }
    );
  }

  public pageDown(): void {
    this.pageIndex--;
    //this.getPartners();
    this.messageEvent.emit(
      {
        description: 'PageEvent',
        value: {
          pageSize: this.pageSize,
          pageIndex: this.pageIndex
        }
      }
    );
  }

  public pageFirst(): void {
    this.pageIndex = 0;
    //this.getPartners();
    this.messageEvent.emit(
      {
        description: 'PageEvent',
        value: {
          pageSize: this.pageSize,
          pageIndex: this.pageIndex
        }
      }
    );
  }

  public pageLast(): void {
    this.pageIndex = this.numberOfPages() - 1;
    //this.getPartners();
    this.messageEvent.emit(
      {
        description: 'PageEvent',
        value: {
          pageSize: this.pageSize,
          pageIndex: this.pageIndex
        }
      }
    );
  }

  public numberOfPages(): number {
    if (this.length / this.pageSize % 1 == 0) {
      return this.length / this.pageSize;
    } else {
      return this.length / this.pageSize - (this.length / this.pageSize % 1) + 1;
    }
  }

  public startingRecord(): number {
    return Math.max(1, this.pageIndex * this.pageSize + 1);
  }

  public endingRecord(): number {
    return Math.min((this.pageIndex + 1) * this.pageSize, this.length);
  }
}
