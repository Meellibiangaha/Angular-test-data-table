import { Directive, ElementRef, Input, Renderer2, AfterViewInit, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appScrollableContainer]',
  standalone: true,
})
export class ScrollableContainerDirective implements AfterViewInit, OnDestroy {
  private resizeObserver: ResizeObserver = null;
  private defaultHeight: number = 550;
  private tableElement: HTMLElement = null;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  @Input()
  set height(value: number) {
    this.defaultHeight = value || 550;
  }

  private updateScrollableClass(): void {
    if (!this.tableElement) {
      return;
    }
    const hasScrollableClass = this.elementRef.nativeElement.classList.contains('scrollable');

    if (this.tableElement.offsetHeight >= this.defaultHeight) {
      if (!hasScrollableClass) {
        this.renderer.addClass(this.elementRef.nativeElement, 'scrollable');
      }
    } else {
      if (hasScrollableClass) {
        this.renderer.removeClass(this.elementRef.nativeElement, 'scrollable');
      }
    }
  }

  ngAfterViewInit(): void {
    this.tableElement = this.elementRef.nativeElement.querySelector('table');

    if (this.tableElement) {
      this.resizeObserver = new ResizeObserver(() => {
        this.updateScrollableClass();
      });

      this.resizeObserver.observe(this.tableElement);
      this.updateScrollableClass();
    }
  }

  ngOnDestroy(): void {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }
}
