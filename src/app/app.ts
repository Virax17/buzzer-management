import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopBar } from './shared/ui/top-bar/top-bar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TopBar],
  template: '<app-top-bar /><router-outlet />',
})
export class App {}
