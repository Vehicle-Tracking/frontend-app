import { RouterModule, Routes } from '@angular/router';
import { OverviewComponent } from './overview/overview.component';
import { LiveBoardComponent } from './live-board/live-board.component';

const appRoutes: Routes = [
  { path: '', component: OverviewComponent},
  { path: 'overview', component: OverviewComponent},
  { path: 'live-board', component: LiveBoardComponent}
];

export const appRouting = RouterModule.forRoot(appRoutes, { useHash: false });
