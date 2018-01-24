import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game/game.component';
import { BoardComponent } from './board/board.component';
import { RouterModule } from '@angular/router';

const ROUTES =
  [
    {
      path: 'game/:id',
      component: BoardComponent
    },
    {
      path: 'new',
      component: GameComponent,
    }
  ];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    GameComponent,
    BoardComponent
  ]
})
export class BoardModule { }
