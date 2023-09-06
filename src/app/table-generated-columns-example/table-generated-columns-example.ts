import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Component } from '@angular/core';

export interface Users {
  name: string;
  age: number;
  mobile: number;
  subUsers?: Users[];
}

const ELEMENT_DATA: Users[] = [
  {
    name: 'first',
    age: 10,
    mobile: 1111111111,
    subUsers: [
      {
        name: 'first s1',
        age: 11,
        mobile: 1010101010,
      },
      {
        name: 'first s2',
        age: 12,
        mobile: 1010101010,
      },
      {
        name: 'first s3',
        age: 13,
        mobile: 1010101010,
      },
    ],
  },
  {
    name: 'second',
    age: 20,
    mobile: 2222222222,
  },
  {
    name: 'third',
    age: 30,
    mobile: 3333333333,
    subUsers: [
      {
        name: 'third s1',
        age: 30,
        mobile: 3434343434,
      },
    ],
  },
  {
    name: 'fourth',
    age: 40,
    mobile: 4444444444,
  },
];

@Component({
  selector: 'table-generated-columns-example',
  styleUrls: ['table-generated-columns-example.scss'],
  templateUrl: 'table-generated-columns-example.html',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class TableGeneratedColumnsExample {
  columns = [
    {
      columnDef: 'name',
      header: 'Name',
    },
    {
      columnDef: 'age',
      header: 'Age',
    },
    {
      columnDef: 'mobile',
      header: 'Mobile',
    },
  ];
  dataSource = ELEMENT_DATA;
  displayedColumns = this.columns.map((c) => c.columnDef);
  subDisplayedColumns = this.columns.map((c) => c.columnDef);

  constructor() {
    this.displayedColumns.push('expand');
  }

  expandedRows: { [key: number]: boolean } = {};
  expand(element: Users, index: number) {
    console.log(element,index);
    
    if (!element.subUsers?.length) return;
    this.expandedRows[index] = !this.expandedRows[index];
  }

}
