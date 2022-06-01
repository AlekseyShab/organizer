import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { switchMap } from 'rxjs';
import { DateService} from "../shared/date.service";
import {TasksService, Task} from "../shared/tasks.service";
@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.scss']
})
export class OrganizerComponent implements OnInit {

  public date: any;

  form: FormGroup | undefined
  tasks: Task[] = []

  constructor(private dateService: DateService,private taskService: TasksService) { }

  ngOnInit(): void {
    this.dateService.date.pipe(
      switchMap(value => this.taskService.load(value))
    ).subscribe( tasks => this.tasks = tasks)

    this.dateService.date.subscribe(d => this.date = d)
    this.form = new FormGroup({
      title: new FormControl('', Validators.required)
    })
  }

  submit() {
    const {title} = this.form.value;

    const task: Task = {
      title,
      date: this.dateService.date.value.format('DD-MM-YYYY')
    }

    this.taskService.create(task).subscribe(task => {
      this.form.reset()
    }, err => console.log(err))
  }

  remove(task: Task) {
    this.taskService.remove(task).subscribe(() => {
      this.tasks = this.tasks.filter(t => t.id !== task.id )
    }, err => console.log(err))
  }

}
