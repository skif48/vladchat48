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

  constructor() {
    console.log(this.url);
  }

  ngOnInit(): void {
    this.socket = io(this.url);
    this.socket.on('message', (data) => {
      console.log(data);
    });
  }

  sendMessage(message) {
    this.socket.emit('add-message', message);
  }
}
