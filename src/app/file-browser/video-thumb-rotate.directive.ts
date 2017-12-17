import { Directive, ElementRef, HostListener, Input } from '@angular/core';


@Directive({ selector: '[thumbRotator]' })
export class ThumbRotatorDirective {
    @Input() animation: string;
    @Input('thumbRotator') enableRotation: boolean = false;
    @Input() file: any;
    private original: string;
    constructor(private el: ElementRef) { }

    @HostListener('mouseenter') onMouseEnter() {
        this.startRotating();
    }

    @HostListener('mouseleave') onMouseLeave() {
        this.stopRotating();
    }

    private rotate() {
    }

    private startRotating() {
        if (!this.enableRotation) {
            return;
        }
        if (!this.file.isLoaded) {
            return;
        }
        this.original = this.el.nativeElement.src;
        this.el.nativeElement.src = this.animation;
    }

    private stopRotating() {
        if (!this.enableRotation) {
            return;
        }
        if (!this.file.isLoaded) {
            return;
        }
        if (!this.original) {
            return;
        }
        this.el.nativeElement.src = this.original;
    }

}