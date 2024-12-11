import { ChangeDetectionStrategy, Component, OnInit, signal, ViewChild } from '@angular/core';
import { TestTableService } from './test-table.service';
import { ActivatedRoute } from '@angular/router';
import { AppStorageService } from '../../core/services/app-storage.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { PAGINATION_CONFIG } from '../../core/constants/pagination-config';
import { FwbReportsPageResult } from './models/fwbReports-page-result';
import { FwbDetails, FwbReportModel } from './models/fwbReports.model';
import { PaginatorModel } from '../../core/models/paginator.model';
import { PageEvent } from '@angular/material/paginator';
import { BehaviorSubject, combineLatest, debounceTime, map, skip, startWith, switchMap, tap } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { DateRange, DateRangeForm } from '../../core/models/date-range';
import { OrderByEnum } from '../../core/enums/order-by.enum';
import { FwbTableForm } from './form/fwbReports-table.form';
import { provideNativeDateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@UntilDestroy()
@Component({
  selector: 'app-test-table',
  templateUrl: './test-table.component.html',
  styleUrl: './test-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideNativeDateAdapter(), { provide: MAT_DATE_LOCALE, useValue: 'ru-RU' }],
})
export class TestTableComponent implements OnInit {
  constructor(
    private testTableService: TestTableService,
    private activatedRoute: ActivatedRoute,
    private storageService: AppStorageService
  ) {}

  /** Пагинация */
  readonly paginator = signal<PaginatorModel>({
    ...PAGINATION_CONFIG.DEFAULT_VALUE,
    pageSizeOptions: PAGINATION_CONFIG.PAGE_SIZE_VALUES,
  });
  readonly paginatorSubject = new BehaviorSubject<PaginatorModel>(PAGINATION_CONFIG.DEFAULT_VALUE);

  /** Фильтр */
  filter: FormGroup<FwbTableForm> = new FormGroup({
    range: new FormGroup<DateRangeForm>({
      from: new FormControl<string>(null),
      to: new FormControl<string>(null),
    }),
    searchTerm: new FormControl<string>(null),
    sortName: new FormControl<string>(null),
    sortBy: new FormControl<keyof FwbDetails>(null),
    sortDesc: new FormControl<OrderByEnum>(null),
  });
  readonly filterChanges$ = this.filter.valueChanges.pipe(
    startWith(null),
    tap(() =>
      this.handlePageEvent({
        pageIndex: 1,
        pageSize: this.paginator().pageSize,
        length: 1,
      })
    )
  );

  readonly orderBySubject = new BehaviorSubject<{ column: string; orderBy: OrderByEnum }>(null);

  /** Элементы таблицы, лоадеры и вспомогательные сущности */
  readonly loading = signal<boolean>(false);
  readonly items = signal<FwbReportModel[]>(null);
  readonly itemsCards = signal<FwbReportModel[]>([]);

  readonly displayedColumns: string[] = [
    'AWBID',
    'AWB_Prefix',
    'AWB_Serial',
    'AWB_Origin',
    'AWB_Destination',
    'Weight_Actual',
    'Weight_Identifier',
  ];
  readonly isExpanded: { [key: string]: boolean } = {};

  /** Логика компонента */
  toggleExpand(itemId: number) {
    this.isExpanded[itemId] = !this.isExpanded[itemId];
  }

  orderChange(sortDetails: { column: string; orderBy: OrderByEnum }): void {
    this.orderBySubject.next(sortDetails);
  }

  handlePageEvent(event: PageEvent): void {
    this.paginatorSubject.next({
      pageSize: event.pageSize,
      currentPage: event.pageIndex,
      totalPages: event.length,
    });
  }

  drop(event: CdkDragDrop<FwbReportModel[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      /** Проверка, чтобы не было одинаковых дублированных карточек */
      const item = event.previousContainer.data[event.previousIndex];
      const itemCopy = { ...item };
      const exists = this.itemsCards().some((card) => card.fWB_Details.AWBID === itemCopy.fWB_Details.AWBID);

      if (!exists) {
        this.itemsCards.update((cards) => [...cards, itemCopy]);
      }
    }
  }

  removeCard(cardId: number): void {
    this.itemsCards.update((cards) => cards.filter((card) => card.fWB_Details.AWBID !== cardId));
  }

  setUp(response: FwbReportsPageResult): void {
    this.items.set(response.fwb_data);
    this.paginator.set({
      ...this.paginator(),
      totalPages: response.totalRecords,
      currentPage: this.paginatorSubject.value.currentPage,
      pageSize: this.paginatorSubject.value.pageSize,
    });
  }
  ngOnInit(): void {
    /** Получаем данные с резолвера и подписываемся на изменения фильтра, пагинации и сортировки */
    this.activatedRoute.data.pipe(untilDestroyed(this)).subscribe(({ testTable }) => this.setUp(testTable));
    combineLatest([this.filterChanges$, this.orderBySubject, this.paginatorSubject])
      .pipe(
        untilDestroyed(this),
        debounceTime(300),
        skip(1),
        tap(() => this.loading.set(true)),
        map(([filter, sortBy, paginator]) => this.testTableService.mapFilterToRequest(filter, sortBy, paginator)),
        switchMap((request) => this.testTableService.loadFWBReports(request)),
        tap(() => this.loading.set(false)),
        tap((response) => this.setUp(response))
      )
      .subscribe();
  }
}
