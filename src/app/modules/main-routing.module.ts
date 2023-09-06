import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomGuard } from '../shared/services/room.guard';
import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'live',
        canActivate: [RoomGuard],
        loadChildren: () =>
          import('./live-feed/live-feed.module').then((m) => m.LiveFeedModule),
      },
      {
        path: 'rooms',
        loadChildren: () =>
          import('./room-list/room-list.module').then((m) => m.RoomListModule),
      },
      {
        path: '',
        pathMatch: 'full',
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomeModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
