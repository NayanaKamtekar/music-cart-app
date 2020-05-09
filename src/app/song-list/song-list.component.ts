import { Component, OnInit, OnDestroy } from "@angular/core";
import { SongsService } from "../songs.service";
import { Song } from "../song";
import { Subscription } from "rxjs";

@Component({
  selector: "app-song-list",
  templateUrl: "./song-list.component.html",
  styleUrls: ["./song-list.component.css"],
})
export class SongListComponent implements OnInit, OnDestroy {
  public songList: Song[] = [];
  private songSubscription: Subscription;
  public titleSorted: boolean = false;
  public artistSorted: boolean = false;
  public songListHeader: string = "Song List";
  public showCart: boolean = true;

  constructor(private _songService: SongsService) {}

  ngOnInit(): void {
    this.songSubscription = this._songService
      .getSongs()
      .subscribe((fetchedSongs) => (this.songList = fetchedSongs));

    this.songList.forEach((elem) => {
      if (elem.addedToCart === undefined) elem["addedToCart"] = false;
    });

    this._songService.updateSongs(this.songList);
    this.sortSongList();
  }

  ngOnDestroy(): void {
    this.songSubscription.unsubscribe();
  }

  onClickAddToCart(songID: number) {
    console.log("I am herrrr");
    this.songList.forEach((elem) => {
      if (elem.id === songID) elem.addedToCart = true;
    });
    this._songService.updateSongs(this.songList);
  }

  private sortSongList() {
    if (this.titleSorted) {
      this.songList.sort((a, b) => {
        if (a.title > b.title) {
          return 1;
        } else if (a.title < b.title) {
          return -1;
        } else {
          return 0;
        }
      });
    } else if (this.artistSorted) {
      this.songList.sort((a, b) => {
        if (a.artist > b.artist) {
          return 1;
        } else if (a.artist < b.artist) {
          return -1;
        } else {
          return 0;
        }
      });
    } else {
      this.songList.sort((a, b) => {
        if (a.id > b.id) {
          return 1;
        } else if (a.id < b.id) {
          return -1;
        } else {
          return 0;
        }
      });
    }
  }

  sortArtist() {
    this.artistSorted = !this.artistSorted;
    if (this.titleSorted === true) this.titleSorted = false;

    this.sortSongList();
  }

  sortTitle() {
    this.titleSorted = !this.titleSorted;
    if (this.artistSorted === true) this.artistSorted = false;

    this.sortSongList();
  }
}
