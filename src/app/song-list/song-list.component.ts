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
  public filteredList: Song[] = [];
  public titleSearchText: string = null;
  public artistSearchText: string = null;
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
    this.filteredList = this.songList;
    this.sortSongList();
  }

  ngOnDestroy(): void {
    this.songSubscription.unsubscribe();
  }

  filterSongList(): void {
    this.filteredList = this.songList;
    if (this.titleSearchText !== "" && this.titleSearchText !== null)
      this.filteredList = this.filteredList.filter((elem) =>
        elem.title.toLowerCase().includes(this.titleSearchText.toLowerCase())
      );
    if (this.artistSearchText !== "" && this.artistSearchText !== null)
      this.filteredList = this.filteredList.filter((elem) =>
        elem.artist.toLowerCase().includes(this.artistSearchText.toLowerCase())
      );
    this.sortSongList();
  }

  artistFilterList(): void {
    this.filteredList = this.songList;

    this.sortSongList();
  }

  onClickAddToCart(songID: number) {
    this.songList.forEach((elem) => {
      if (elem.id === songID) elem.addedToCart = true;
    });
    this._songService.updateSongs(this.songList);
  }

  private sortSongList() {
    if (this.titleSorted) {
      this.filteredList.sort((a, b) => {
        if (a.title > b.title) {
          return 1;
        } else if (a.title < b.title) {
          return -1;
        } else {
          return 0;
        }
      });
    } else if (this.artistSorted) {
      this.filteredList.sort((a, b) => {
        if (a.artist > b.artist) {
          return 1;
        } else if (a.artist < b.artist) {
          return -1;
        } else {
          return 0;
        }
      });
    } else {
      this.filteredList.sort((a, b) => {
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
