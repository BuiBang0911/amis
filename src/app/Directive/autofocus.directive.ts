import { Directive, ElementRef, AfterViewChecked, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[Autofocus]'
})
export class AutofocusDirective implements AfterViewChecked {
  private hasFocused = false;

  constructor(
    private el: ElementRef,
    private viewContainerRef: ViewContainerRef
  ) {}

  ngAfterViewChecked() {
    if (!this.hasFocused && this.el.nativeElement.offsetParent !== null) {
      setTimeout(() => {
        this.el.nativeElement.focus();
        this.hasFocused = true;
      }, 100);
    }
  }
}