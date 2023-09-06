import { Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input('isSidebarOpen') isOpen: BehaviorSubject<boolean>;

  hideSidebar(){
    if(window.innerWidth<600) this.isOpen.next(false);
  }
}
