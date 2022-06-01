import {Component, OnInit} from '@angular/core';
import {DateService} from "../shared/date.service";

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss']
})
export class SelectorComponent implements OnInit{
  public date: any
  constructor(public dateService: DateService) { }

  ngOnInit() {
    this.dateService.date.subscribe(d => this.date = d)
  }

  go(dir: number) {
    this.dateService.changeMonth(dir)
  }
}
