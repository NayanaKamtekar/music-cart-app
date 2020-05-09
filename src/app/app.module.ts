import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SongListComponent } from './song-list/song-list.component';
import { SongsService } from './songs.service';
import { SongCartComponent } from './song-cart/song-cart.component';

@NgModule({
  declarations: [
    AppComponent,
    SongListComponent,
    SongCartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [SongsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
