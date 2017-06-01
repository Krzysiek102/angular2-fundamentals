import { JQ_TOKEN } from './jQuery.service';
import { Directive, Inject, OnInit, ElementRef } from '@angular/core';

@Directive({ selector: '[modal-trigger]' })
export class ModalTriggerDirective implements OnInit {
    private el: any;
    constructor(ref: ElementRef, @Inject(JQ_TOKEN) private $: any) {
        this.el = ref.nativeElement;
    }

    ngOnInit() {
        this.el.addEventListener('click', e => {
            this.$('#simple-modal').modal({});
        });
    }
}