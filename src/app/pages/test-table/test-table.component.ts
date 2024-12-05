import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TestTableService } from './test-table.service';
import { ActivatedRoute } from '@angular/router';
import { AppStorageService } from '../../core/services/app-storage.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-test-table',
  templateUrl: './test-table.component.html',
  styleUrl: './test-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestTableComponent implements OnInit {
  constructor(
    private testTableService: TestTableService,
    private activatedRoute: ActivatedRoute,
    private storageService: AppStorageService
  ) {}

  setUp(response: any): void {
    console.log(response);
  }
  ngOnInit(): void {
    this.activatedRoute.data.pipe(untilDestroyed(this)).subscribe(({ testTable }) => this.setUp(testTable));
  }
}
