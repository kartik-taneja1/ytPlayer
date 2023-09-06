import { Component, OnInit } from '@angular/core';
import { SongService } from 'src/app/shared/services/song.service';
import { UtilityService } from 'src/app/shared/services/utility.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  searchText: string;
  songList: any;

  constructor(private utils: UtilityService, private song: SongService) {}

  ngOnInit(): void {
    this.song.songList.subscribe((data) => {
      this.songList = data;
    });
  }

  async search() {
    const q = { q: this.searchText };
    const query = this.utils.buildQuery(q);
    this.song.searchSong(query);
  }
}
