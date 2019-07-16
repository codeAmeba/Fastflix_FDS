import {
  trigger,
  animate,
  style,
  group,
  query,
  transition,
} from '@angular/animations';

export const routerfadeinout = trigger('routerfadeinout', [
  transition('* <=> *', [
    /* order */
    /* 1 */ query(
      ':enter, :leave',
      style({ position: 'fixed', width: '100%' }),
      { optional: true }
    ),
    /* 2 */ group([
      // block executes in parallel
      query(
        ':enter',
        [style({ opacity: 0 }), animate('1s', style({ opacity: 1 }))],
        { optional: true }
      ),
      query(
        ':leave',
        [style({ opacity: 0 }), animate('1s', style({ opacity: 0 }))],
        { optional: true }
      ),
    ]),
  ]),
]);
