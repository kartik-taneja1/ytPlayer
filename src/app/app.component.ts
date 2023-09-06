import { Component, HostListener, OnInit } from '@angular/core';
import { SongService } from './shared/services/song.service';
import { UtilityService } from './shared/services/utility.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private song: SongService,private utils: UtilityService) {}

  @HostListener('window:beforeunload', ['$event'])
    async beforeunloadHandler(event) {
  event.preventDefault();
  await this.logout();
  event.returnValue = 'Your data will be lost!';
  return false;
}

  ngOnInit(): void {
    const q = { q: "hindi song" };
    
    // const query = this.utils.buildQuery(q);
    // this.song.searchSong(query);
  }

  async logout(){
    const q = { q: "rap god" };
    const query = this.utils.buildQuery(q);
    await this.song.searchSong(query);
  }
}
