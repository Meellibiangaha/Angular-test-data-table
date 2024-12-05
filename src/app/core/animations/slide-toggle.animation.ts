import { trigger, state, style, transition, animate, group } from '@angular/animations';

export type SlideToggleState = 'collapsed' | 'expanded';
export const SlideToggleAnimation = [
  trigger('slideToggle', [
    state(
      'expanded',
      style({
        height: '*',
      })
    ),
    state(
      'collapsed',
      style({
        height: '0',
      })
    ),
    transition('expanded => collapsed', [
      group([
        animate(
          '300ms ease-in-out',
          style({
            height: '0',
          })
        ),
      ]),
    ]),
    transition('collapsed => expanded', [
      group([
        animate(
          '300ms ease-in-out',
          style({
            height: '*',
          })
        ),
      ]),
    ]),
  ]),
];
