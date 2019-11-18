import { Component, OnInit, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {
  @Input() total = 0;
  @Input() currentPage = 1;
  @Output() currentPageChange = new EventEmitter<any>();
  @Input() countsPerPage = 0;
  paginatorPages = [];
  totalPages = 1;

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    // on change detect page change
    if (changes) {
      if (changes.total && changes.countsPerPage) {
        this.totalPages = Math.floor(this.total / this.countsPerPage);
        this.paginatorPages = [];
        for (let i = 0; i < this.totalPages; i++) {
          this.paginatorPages.push(i + 1);
        }
      }
    }
  }

  ngOnInit() { }

  // on page change
  onPageChange(page: number) {
    if (page <= this.totalPages && page >= 1) {
      this.currentPage = page;
      this.currentPageChange.emit({ page });
    }
  }
}
