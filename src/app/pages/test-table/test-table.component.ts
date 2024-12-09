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

  readonly paginator = signal<PaginatorModel>({
    ...PAGINATION_CONFIG.DEFAULT_VALUE,
    pageSizeOptions: PAGINATION_CONFIG.PAGE_SIZE_VALUES,
  });
  readonly paginatorSubject = new BehaviorSubject<PaginatorModel>(PAGINATION_CONFIG.DEFAULT_VALUE);

  filter: FormGroup<FwbTableForm> = new FormGroup({
    sortName: new FormControl(''),
    range: new FormGroup<DateRangeForm>({
      from: new FormControl<string>(null),
      to: new FormControl<string>(''),
    }),
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

  readonly loading = signal<boolean>(false);
  readonly items = signal<FwbReportModel[]>(null);
  readonly displayedColumns: string[] = [
    'AWBID',
    'AWB_Prefix',
    'AWB_Serial',
    'AWB_Origin',
    'AWB_Destination',
    'Weight_Actual',
    'Weight_Identifier',
  ];

  isExpanded: { [key: string]: boolean } = {};

  toggleExpand(itemId: number) {
    this.isExpanded[itemId] = !this.isExpanded[itemId];
  }

  handlePageEvent(event: PageEvent): void {
    console.log(event);
    this.paginatorSubject.next({
      pageSize: event.pageSize,
      currentPage: event.pageIndex,
      totalPages: event.length,
    });
  }

  setUp(response: FwbReportsPageResult): void {
    this.items.set(response.fwb_data);
    this.paginator.set({
      ...this.paginator(),
      totalPages: response.totalRecords,
    });
  }
  ngOnInit(): void {
    this.activatedRoute.data.pipe(untilDestroyed(this)).subscribe(({ testTable }) => this.setUp(testTable));
    combineLatest([this.filterChanges$, this.paginatorSubject])
      .pipe(
        untilDestroyed(this),
        debounceTime(150),
        skip(1),
        tap(() => this.loading.set(true)),
        map(([filter, paginator]) => this.testTableService.mapFilterToRequest(filter, paginator)),
        switchMap((request) => this.testTableService.loadFWBReports(request)),
        tap(() => this.loading.set(false)),
        tap((response) => this.setUp(response))
      )
      .subscribe();
  }
}
