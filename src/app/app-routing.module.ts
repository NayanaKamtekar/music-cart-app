import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SongListComponent } from "./song-list/song-list.component";
import { SongCartComponent } from "./song-cart/song-cart.component";

const routes: Routes = [
  
  { path: "songs", component: SongListComponent },
  { path: "cart", component: SongCartComponent },
  { path: "", redirectTo: "/songs", pathMatch:"full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
