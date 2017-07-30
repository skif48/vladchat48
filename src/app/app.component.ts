import {Component, OnInit} from '@angular/core';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private socket;
  private url = window.location + 'api';
  public gitHubLogo = 'assets/GitHub-Mark-32px.png';
  public linkedInLogo = 'assets/Logo-Black-34px-R.png';
  public isLoggedIn = false;

  constructor() {}

  ngOnInit(): void {
    this.socket = io(this.url);
  }

  public redirectToGitHub() {
    window.open('https://github.com/skif48/vladchat48/');
  }

  public redirectToLinkedIn() {
    window.open('https://www.linkedin.com/in/vladyslav-usenko/');
  }

  sendMessage(message) {
    this.socket.emit('add-message', {message});
  }
}
