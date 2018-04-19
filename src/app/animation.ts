import { trigger, state, style, transition, animate } from '@angular/animations';
import { Animate } from './@core/const/animation.const';

export const PageTransition =
    trigger('transition', [

        state('in', style({ transform: 'translateY(0)', opacity: '0' })),

        transition('void => *', [
            style({ transform: 'translateY(-10px)', opacity: '.5' }),
            animate('400ms')
        ])
    ]);


export const ShowHideTriggerBlock =
    trigger('showHideTriggerBlock', [
        state(Animate.show, style({
            opacity: '1',
            display: 'block'
        })),
        state(Animate.hide, style({
            opacity: '0',
            display: 'none'
        })),
        transition(Animate.show + ' <=> ' + Animate.hide, animate('300ms'))
    ])

export const ShowHideTriggerFlex =
    trigger('showHideTriggerFlex', [
        state(Animate.show, style({
            opacity: '1',
            display: 'flex'
        })),
        state(Animate.hide, style({
            opacity: '0',
            display: 'none'
        })),
        transition(Animate.show + ' <=> ' + Animate.hide, animate('300ms'))
    ])

export const SpinExpandIconTrigger =
    trigger('spinIconTrigger', [
        state(Animate.normal, style({
            transform: "rotate(0deg)"
        })),
        state(Animate.turned, style({
            transform: "rotate(90deg)"
        })),
        transition('normal <=> turned', animate('400ms'))
    ]);

export const ShowHideDelayFlexTrigger =
    trigger('showHideDelayFlexTrigger', [
        state(Animate.show, style({
            opacity: '1',
            display: 'flex'
        })),
        state(Animate.hide, style({
            opacity: '0',
            display: 'none'
        })),
        transition(Animate.show + ' => ' + Animate.hide, animate('0ms')),
        transition(Animate.hide + ' => ' + Animate.show, animate('400ms 100ms'))
    ])

export const ShowHideDelayBlockTrigger =
    trigger('showHideDelayBlockTrigger', [
        state(Animate.show, style({
            opacity: '1',
            display: 'block'
        })),
        state(Animate.hide, style({
            opacity: '0',
            display: 'none'
        })),
        transition(Animate.show + ' => ' + Animate.hide, animate('0ms')),
        transition(Animate.hide + ' => ' + Animate.show, animate('400ms 100ms'))
    ])


export const ShowHideListTrigger =
    trigger('showHideListTrigger', [
        state(Animate.show, style({
            opacity: '1',
            display: 'block'
        })),
        state(Animate.hide, style({
            opacity: '0',
            display: 'none'
        })),
        transition(Animate.show + ' => ' + Animate.hide, animate('0ms')),
        transition(Animate.hide + ' => ' + Animate.show, animate('400ms 100ms'))
    ])



export const ShowHideCardTrigger =
    trigger('showHideCardTrigger', [
        state(Animate.show, style({
            opacity: '1',
            display: 'flex'
        })),
        state(Animate.hide, style({
            opacity: '0',
            display: 'none'
        })),
        transition(Animate.show + ' => ' + Animate.hide, animate('0ms')),
        transition(Animate.hide + ' => ' + Animate.show, animate('400ms 100ms'))
    ])

//Show Hide Similar Items Cards
export const ShowHideCard = 
trigger('showHideCard',[
      state('show', style({
        opacity: '1'
      })),
      state('hide', style({
        opacity: '0'
      })),
      transition('hide => show', animate('500ms')),
      transition('show => hide', animate('500ms'))
    ])

export const ShowPanelTrigger =
    trigger('ShowPanelTrigger', [
        state('show', style({
            opacity: '1',
            display: 'block'
        })),
        state('hide', style({
            opacity: '0',
            display: 'none'
        })),
        transition('hide => show', animate('300ms')),
        transition('show => hide', animate('300ms'))
    ])



export const ViewMoreCardTrigger =
    trigger('viewMoreCardTrigger', [
        state(Animate.hide, style({
            display: 'none',
            bottom: '-45px',
            opacity: '0'
        })),
        state(Animate.show, style({
            display: 'block',
            bottom: '0px',
            opacity: '1'
        })),
        transition(Animate.hide + '<=>' + Animate.show, animate('200ms'))
    ])
