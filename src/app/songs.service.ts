import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Song } from "./song";

@Injectable({
  providedIn: "root",
})
export class SongsService {
  private songs = new BehaviorSubject<Song[]>([
    { id: 1, title: "Imagine", artist: "John Lennon" },
    { id: 2, title: "Hey Jude", artist: "The Beatles" },
    {
      id: 3,
      title: "(I Can’t Get No) Satisfaction",
      artist: "The Rolling Stones",
    },
    { id: 4, title: "Yesterday", artist: "The Beatles" },
    { id: 5, title: "Good Vibrations", artist: "The Beach Boys" },
    { id: 6, title: "Smells Like Teen Spirit", artist: "Nirvana" },
    { id: 7, title: "Johnny B. Goode", artist: "Chuck Berry" },
    { id: 8, title: "I Want To Hold Your Hand", artist: "The Beatles" },
    { id: 9, title: "Blowin’ In The Wind", artist: "Bob Dylan" },
    { id: 10, title: "God Only Knows", artist: "The Beach Boys" },
    { id: 11, title: "Like A Rolling Stone", artist: "Bob Dylan" },
    { id: 12, title: "Stairway To Heaven", artist: "Led Zeppelin" },
    { id: 13, title: "What’s Going On", artist: "Marvin Gaye" },
    {
      id: 14,
      title: "All Along The Watchtower",
      artist: "The Jimi Hendrix Experience",
    },
    { id: 15, title: "Respect", artist: "Aretha Franklin" },
    {
      id: 47,
      title: "You’ve Lost That Lovin’ Feeling",
      artist: "The Righteous Brothers",
    },
    { id: 48, title: "No Woman, No Cry", artist: "Bob Marley" },
    { id: 49, title: "One", artist: "U2" },
    { id: 50, title: "Gimme Shelter", artist: "The Rolling Stones" },
  ]);
  constructor() {}

  getSongs(): Observable<Song[]> {
    return this.songs.asObservable();
  }

  updateSongs(newSongs: Song[]): void {
    this.songs.next(newSongs);
  }
}
