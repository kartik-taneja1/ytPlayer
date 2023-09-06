import { Component, OnInit } from '@angular/core';
import { SongService } from 'src/app/shared/services/song.service';
import { UtilityService } from 'src/app/shared/services/utility.service';

@Component({
  selector: 'app-live-feed',
  templateUrl: './live-feed.component.html',
  styleUrls: ['./live-feed.component.scss'],
})
export class LiveFeedComponent implements OnInit {
  icons = [];

  constructor(private song: SongService, private utils: UtilityService) {}
  ngOnInit(): void {
    // random svgs ui
    const length = 7;
    const randomN = this.utils.getRandomNumbers(1, 20, length);
    const randomDelay = this.utils.getRandomNumbers(1, length, length);
    for (let i = 0; i < length; i++) {
      this.icons.push({
        n: randomN[i],
        top: this.utils.getRandomNumbers(0, 100),
        left: this.utils.getRandomNumbers(0, 100),
        delay: randomDelay[i],
      });
    }
  }
}
