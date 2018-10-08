import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CustomSelectComponent } from './custom/custom-select/custom-select.component';
import { OverviewComponent } from './overview/overview.component';
import { LiveBoardComponent } from './live-board/live-board.component';
import { FilterComponent } from './overview/filter/filter.component';
import { TabularOverviewComponent } from './overview/tabular-overview/tabular-overview.component';
import { appRouting } from './app.routing';
import { CoreModule } from './core/core.module';


@NgModule({
  declarations: [
    AppComponent,
    CustomSelectComponent,
    OverviewComponent,
    LiveBoardComponent,
    FilterComponent,
    TabularOverviewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CoreModule.forRoot(),
    appRouting
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
