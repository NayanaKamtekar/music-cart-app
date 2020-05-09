import { Component, OnInit, OnDestroy } from "@angular/core";
import { SongsService } from "../songs.service";
import { Song } from "../song";
import { Subscription } from "rxjs";

@Component({
  selector: "app-song-cart",
  templateUrl: "./song-cart.component.html",
  styleUrls: ["./song-cart.component.css"],
})
export class SongCartComponent implements OnInit, OnDestroy {
  public songList: Song[] = [];
  public songSubscription: Subscription;

  constructor(private _songService: SongsService) {}

  ngOnInit(): void {
    this.songSubscription = this._songService
      .getSongs()
      .subscribe((fetchedSongs) => (this.songList = fetchedSongs));

    this.songList.forEach((elem) => {
      if (elem.addedToCart === undefined) elem["addedToCart"] = false;
    });

    this._songService.updateSongs(this.songList);
  }

  ngOnDestroy(): void {
    this.songSubscription.unsubscribe();
  }

  onDelete(songID: number) {
    this.songList.forEach((elem) => {
      if (elem.id === songID) elem.addedToCart = false;
    });
    this._songService.updateSongs(this.songList);
  }
}
