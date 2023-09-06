import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LiveFeedComponent } from './live-feed.component';

const routes: Routes = [
  { path: '', component: LiveFeedComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LiveFeedRoutingModule { }
