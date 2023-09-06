import { Component } from '@angular/core';

@Component({
  selector: 'app-checbox-test',
  templateUrl: './checbox-test.component.html',
  styleUrls: ['./checbox-test.component.scss']
})
export class ChecboxTestComponent {
  task = {
    name: 'Indeterminate',
    completed: false,
    subtasks: [
      { name: 'Primary', completed: false },
      { name: 'Accent', completed: false },
      { name: 'Warn', completed: false },
    ],
  };

  allComplete: boolean = false;

  updateAllComplete() {
    this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.task.subtasks == null) {
      return;
    }
    this.task.subtasks.forEach(t => (t.completed = completed));
  }
}
