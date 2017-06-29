import { JQ_TOKEN } from './jQuery.service';
import { Directive, Inject, OnInit, ElementRef, Input } from '@angular/core';

@Directive({ selector: '[modal-trigger]' })
export class ModalTriggerDirective implements OnInit {
    @Input('modal-trigger') modalId: string;

    el: any;

    constructor(ref: ElementRef, @Inject(JQ_TOKEN) private $: any) {
        this.el = ref.nativeElement;
    }

    ngOnInit() {
        this.el.addEventListener('click', e => {
            this.$(`#${this.modalId}`).modal({});
        });
    }
}
