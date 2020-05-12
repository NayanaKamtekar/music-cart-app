import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  OnChanges,
  SimpleChanges,
} from "@angular/core";

@Component({
  selector: "app-pagination",
  templateUrl: "./pagination.component.html",
  styleUrls: ["./pagination.component.css"],
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() numberOfItems: number;
  public itemsPerPage: number = 6;
  public defaultMaxAccesiblePages: number = 3;
  public maxAccesiblePages: number;
  public numberOfPages: number;
  public firstPage: number = 1;
  public selectedPage: number = 1;
  public pageIndexes: Array<number>;

  @Output() pageChanged = new EventEmitter<object>();

  constructor() {}

  ngOnInit(): void {
    this.numberOfPages = Math.ceil(this.numberOfItems / this.itemsPerPage);
    this.maxAccesiblePages = Math.min(
      this.defaultMaxAccesiblePages,
      this.numberOfPages
    );
    this.calcPageIndexes();
    setTimeout(() => this.calcItemsOnPage(this.selectedPage));
  }

  ngOnChanges(changes: SimpleChanges) {
    this.firstPage = 1;
    this.selectedPage = 1;

    this.numberOfPages = Math.ceil(
      changes.numberOfItems.currentValue / this.itemsPerPage
    );
    this.maxAccesiblePages = Math.min(
      this.defaultMaxAccesiblePages,
      this.numberOfPages
    );
    this.calcPageIndexes();
    setTimeout(() => this.calcItemsOnPage(this.selectedPage));
  }

  private calcPageIndexes(): void {
    this.pageIndexes = [];

    this.firstPage = Math.max(
      1,
      this.selectedPage - Math.ceil(this.maxAccesiblePages / 2) + 1
    );

    if (this.firstPage + this.maxAccesiblePages - 1 > this.numberOfPages)
      Math.max(
        1,
        (this.firstPage = this.numberOfPages - this.maxAccesiblePages + 1)
      );

    for (
      let i = this.firstPage;
      // i <= this.numberOfPages &&
      i <= this.firstPage + this.maxAccesiblePages - 1;
      i++
    ) {
      this.pageIndexes.push(i);
    }
  }

  private calcItemsOnPage(pageNumber): void {
    let firstItemIndex = (pageNumber - 1) * this.itemsPerPage;
    let lastItemIndex = firstItemIndex + this.itemsPerPage;

    let itemIndexes = {
      firstItemIndex: firstItemIndex,
      lastItemIndex: lastItemIndex,
    };

    this.pageChanged.emit(itemIndexes);
  }

  onSelectPage(index: number): void {
    this.selectedPage = index;

    this.calcPageIndexes();
    this.calcItemsOnPage(this.selectedPage);
  }

  onClickPrev(): void {
    if (this.selectedPage !== 1) this.selectedPage = this.selectedPage - 1;

    this.calcPageIndexes();
    this.calcItemsOnPage(this.selectedPage);
  }

  onClickNext(): void {
    if (this.selectedPage !== this.numberOfPages)
      this.selectedPage = this.selectedPage + 1;

    this.calcPageIndexes();
    this.calcItemsOnPage(this.selectedPage);
  }

  onClickFirst(): void {
    this.selectedPage = 1;

    this.calcPageIndexes();
    this.calcItemsOnPage(this.selectedPage);
  }

  onClickLast(): void {
    this.selectedPage = this.numberOfPages;

    this.calcPageIndexes();
    this.calcItemsOnPage(this.selectedPage);
  }
}