import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import {
  RouteConfigLoadEnd,
  RouteConfigLoadStart,
  Router,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  public renderer: Renderer2;

  constructor(private _renderer: RendererFactory2, private router: Router) {
    this.renderer = this._renderer.createRenderer(null, null);
    this.router.events.subscribe((event) => {
      if (event instanceof RouteConfigLoadStart) {
        this.start();
      } else if (event instanceof RouteConfigLoadEnd) {
        this.stop();
      }
    });
  }

  start() {
    console.log('starting loader');
    this.renderer.setStyle(
      this.renderer.selectRootElement('#loader',true),
      'display',
      'flex'
    );
  }

  stop() {
    console.log('stopping loader');
    this.renderer.setStyle(
      this.renderer.selectRootElement('#loader',true),
      'display',
      'none'
    );
  }
}
