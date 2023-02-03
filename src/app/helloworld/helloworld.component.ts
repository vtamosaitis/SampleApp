import { Component, OnInit } from '@angular/core';

import { HelloworldService } from './helloworld.service';

@Component({
  selector: 'app-helloworld',
  templateUrl: './helloworld.component.html',
  styleUrls: ['./helloworld.component.css']
})
export class HelloworldComponent implements OnInit {
  message: String = "";
  gqlmessage: String = "";

  constructor(private hellowordService: HelloworldService) { }

  ngOnInit(): void {

    this.hellowordService.getHello().subscribe(data => {
      this.message = `${data}`;
    });
    this.hellowordService.getGqlHello().subscribe(data => {
      this.gqlmessage = `${data.data.hello}`;
    });

  }

}
