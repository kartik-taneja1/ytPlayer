import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate, Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'root',
})
export class RoomGuard implements CanActivate {
  constructor(public socket: SocketService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.socket.room.pipe(
      take(1),
      map((room) => {
        if (route.routeConfig.path != 'live' && room.roomId) {
          this.router.navigate(['live']);
          return false;
        } else if (route.routeConfig.path != '' && !room.roomId) {
          this.router.navigate(['']);
          return false;
        }
        return true;
      })
    );
  }
}
