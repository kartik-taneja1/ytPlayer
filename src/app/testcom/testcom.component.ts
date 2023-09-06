import { Component, Injector } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../shared/services/api.service';

@Component({
  selector: 'app-testcom',
  templateUrl: './testcom.component.html',
  styleUrls: ['./testcom.component.scss'],
})
export class TestcomComponent {
  filterArr = [
    { label: 'Task', index: 1, value: 'task', type: 'textbox' },
    { label: 'Client', index: 2, value: 'client', type: 'checkbox' },
    { label: 'Service', index: 3, value: 'service', type: 'checkbox' },
    { label: 'Assignee', index: 4, value: 'assignees', type: 'checkbox' },
    { label: 'Followers', index: 5, value: 'follower', type: 'checkbox' },
    { label: 'Owner', index: 6, value: 'owner', type: 'checkbox' },
    { label: 'Comment', index: 7, value: 'comment', type: 'checkbox' },
    { label: 'Files', index: 8, value: 'files', type: 'checkbox' },
    { label: 'Project', index: 9, value: 'project', type: 'checkbox' },
    { label: 'Percentage', index: 10, value: 'percentage', type: 'checkbox' },
    { label: 'Priority', index: 11, value: 'priority', type: 'checkbox' },
    { label: 'Groups', index: 12, value: 'group', type: 'checkbox' },
  ];
  res = {
    "code": 200,
    "msg": "",
    "result": [
        {
            "field": {
                "id": 40,
                "company_id": 111,
                "module_id": 2,
                "is_active": true,
                "label": "Test for options",
                "field_type": "checklist",
                "is_mandatory": true,
                "is_single_select": true,
                "sub_type": null,
                "sequence": null,
                "prefix": null,
                "suffix": null,
                "starting_number": null,
                "is_auto_update_record": false,
                "is_used_for_filter": null,
                "is_used_for_view": null,
                "country_id": null,
                "allow_for": "DATE",
                "task_date": null,
                "created_by": 5,
                "updated_by": null,
                "created_at": "2023-02-07T04:45:29.000Z",
                "updated_at": "2023-04-13T03:22:13.000Z",
                "mongo_id": "63e232f0385b094598053965",
                "createdAt": null,
                "updatedAt": null
            },
            "optionDetails": [
                {
                    "id": 10,
                    "field_id": 40,
                    "option": "test",
                    "sequence": null,
                    "is_deleted": false,
                    "created_at": "1681379585365",
                    "updated_at": "1681379585365",
                    "mongo_id": "63e232f0385b094598053967"
                },
                {
                    "id": 11,
                    "field_id": 40,
                    "option": "demo",
                    "sequence": null,
                    "is_deleted": false,
                    "created_at": "1681379585401",
                    "updated_at": "1681379585401",
                    "mongo_id": "63e232f0385b094598053969"
                },
                {
                    "id": 12,
                    "field_id": 40,
                    "option": "check",
                    "sequence": null,
                    "is_deleted": false,
                    "created_at": "1681379585439",
                    "updated_at": "1681379585439",
                    "mongo_id": "63e232f0385b09459805396b"
                }
            ]
        },
        {
            "field": {
                "id": 42,
                "company_id": 111,
                "module_id": 2,
                "is_active": true,
                "label": "test",
                "field_type": "textarea",
                "is_mandatory": false,
                "is_single_select": null,
                "sub_type": null,
                "sequence": null,
                "prefix": null,
                "suffix": null,
                "starting_number": null,
                "is_auto_update_record": false,
                "is_used_for_filter": null,
                "is_used_for_view": null,
                "country_id": null,
                "allow_for": "DATE",
                "task_date": null,
                "created_by": 5,
                "updated_by": null,
                "created_at": "2023-02-07T05:03:17.000Z",
                "updated_at": "2023-04-13T03:22:13.000Z",
                "mongo_id": "63e2382a385b0945980539c6",
                "createdAt": null,
                "updatedAt": null
            },
            "optionDetails": []
        },
        {
            "field": {
                "id": 50,
                "company_id": 111,
                "module_id": 2,
                "is_active": true,
                "label": "test",
                "field_type": "textarea",
                "is_mandatory": true,
                "is_single_select": null,
                "sub_type": null,
                "sequence": null,
                "prefix": null,
                "suffix": null,
                "starting_number": null,
                "is_auto_update_record": false,
                "is_used_for_filter": null,
                "is_used_for_view": null,
                "country_id": null,
                "allow_for": "DATE",
                "task_date": null,
                "created_by": null,
                "updated_by": 5,
                "created_at": "2023-04-13T03:22:14.000Z",
                "updated_at": "2023-04-13T03:22:14.000Z",
                "mongo_id": "63e23b1c385b094598053aa7",
                "createdAt": null,
                "updatedAt": null
            },
            "optionDetails": []
        },
        {
            "field": {
                "id": 332,
                "company_id": 111,
                "module_id": 2,
                "is_active": true,
                "label": "Name",
                "field_type": "text",
                "is_mandatory": false,
                "is_single_select": null,
                "sub_type": null,
                "sequence": null,
                "prefix": null,
                "suffix": null,
                "starting_number": null,
                "is_auto_update_record": null,
                "is_used_for_filter": false,
                "is_used_for_view": true,
                "country_id": null,
                "allow_for": "ALL",
                "task_date": null,
                "created_by": 5,
                "updated_by": null,
                "created_at": "2023-04-11T01:35:15.000Z",
                "updated_at": "2023-04-13T03:22:27.000Z",
                "mongo_id": "643514c420f6518eb36f0394",
                "createdAt": null,
                "updatedAt": null
            },
            "optionDetails": []
        },
        {
            "field": {
                "id": 331,
                "company_id": 111,
                "module_id": 2,
                "is_active": true,
                "label": "Check sequience",
                "field_type": "checklist",
                "is_mandatory": false,
                "is_single_select": true,
                "sub_type": null,
                "sequence": null,
                "prefix": null,
                "suffix": null,
                "starting_number": null,
                "is_auto_update_record": null,
                "is_used_for_filter": false,
                "is_used_for_view": true,
                "country_id": null,
                "allow_for": "ALL",
                "task_date": null,
                "created_by": 5,
                "updated_by": 5,
                "created_at": "2023-04-11T01:10:42.000Z",
                "updated_at": "2023-04-11T02:52:32.000Z",
                "mongo_id": "64350f1420f6518eb36f0295",
                "createdAt": null,
                "updatedAt": null
            },
            "optionDetails": [
                {
                    "id": 156,
                    "field_id": 331,
                    "option": "check",
                    "sequence": 0,
                    "is_deleted": false,
                    "created_at": "1681379590957",
                    "updated_at": "1681379590957",
                    "mongo_id": "64350f1520f6518eb36f0297"
                },
                {
                    "id": 157,
                    "field_id": 331,
                    "option": "test",
                    "sequence": 1,
                    "is_deleted": false,
                    "created_at": "1681379590995",
                    "updated_at": "1681379590995",
                    "mongo_id": "64350f1620f6518eb36f0299"
                }
            ]
        },
        {
            "field": {
                "id": 352,
                "company_id": 111,
                "module_id": 2,
                "is_active": true,
                "label": "Radio",
                "field_type": "radio",
                "is_mandatory": false,
                "is_single_select": null,
                "sub_type": null,
                "sequence": null,
                "prefix": null,
                "suffix": null,
                "starting_number": null,
                "is_auto_update_record": null,
                "is_used_for_filter": true,
                "is_used_for_view": true,
                "country_id": null,
                "allow_for": "ALL",
                "task_date": null,
                "created_by": 5,
                "updated_by": null,
                "created_at": null,
                "updated_at": null,
                "mongo_id": null,
                "createdAt": "2023-04-26T06:21:56.146Z",
                "updatedAt": "2023-04-26T06:21:56.146Z"
            },
            "optionDetails": [
                {
                    "id": 182,
                    "field_id": 352,
                    "option": "value 1",
                    "sequence": 0,
                    "is_deleted": false,
                    "created_at": "1682490116161",
                    "updated_at": "1682490116161",
                    "mongo_id": null
                },
                {
                    "id": 183,
                    "field_id": 352,
                    "option": "value 2",
                    "sequence": 1,
                    "is_deleted": false,
                    "created_at": "1682490116165",
                    "updated_at": "1682490116165",
                    "mongo_id": null
                }
            ]
        },
        {
            "field": {
                "id": 353,
                "company_id": 111,
                "module_id": 2,
                "is_active": true,
                "label": "Checklist",
                "field_type": "checklist",
                "is_mandatory": false,
                "is_single_select": true,
                "sub_type": null,
                "sequence": null,
                "prefix": null,
                "suffix": null,
                "starting_number": null,
                "is_auto_update_record": null,
                "is_used_for_filter": true,
                "is_used_for_view": true,
                "country_id": null,
                "allow_for": "ALL",
                "task_date": null,
                "created_by": 5,
                "updated_by": null,
                "created_at": null,
                "updated_at": null,
                "mongo_id": null,
                "createdAt": "2023-04-26T07:00:54.128Z",
                "updatedAt": "2023-04-26T07:00:54.128Z"
            },
            "optionDetails": [
                {
                    "id": 184,
                    "field_id": 353,
                    "option": "ww",
                    "sequence": 0,
                    "is_deleted": false,
                    "created_at": "1682492454138",
                    "updated_at": "1682492454138",
                    "mongo_id": null
                },
                {
                    "id": 185,
                    "field_id": 353,
                    "option": "ee",
                    "sequence": 1,
                    "is_deleted": false,
                    "created_at": "1682492454141",
                    "updated_at": "1682492454141",
                    "mongo_id": null
                }
            ]
        }
    ]
}
  selectedFilter: any;
  prevSelectedFilter: any;
  filterForm: any;
  formbuilder: FormBuilder;

  constructor(
    public dialog: MatDialog,
    public injector: Injector,
    public apiService: ApiService
  ) {
    this.formbuilder = injector.get<FormBuilder>(FormBuilder);
  }

  async ngOnInit(): Promise<void> {
    this.initForm();
  }

  async initForm() {
    this.filterForm = this.formbuilder.group({
      filters: this.formbuilder.array([]),
    });
    this.addFilter();
    this.customFieldListing();
  }


  applyFilterInFilter(event: Event, index) {
    const text = (event.target as HTMLInputElement).value;
    const currentFilter = (this.filterForm.get('filters') as FormArray).at(index);
    currentFilter.get('search').setValue(text);
  }

  setFilter(filterControl: FormGroup, index) {
    const prevFilter = this.filterArr.find((filter)=> filter.value==this.prevSelectedFilter);
    if(prevFilter) prevFilter['isSelected'] = false;
    const filter = this.filterArr.find((item: any) => item.value == filterControl.value.filterName);
    filter['isSelected'] = true;
    filterControl.patchValue({
      filterName: filter.value || '',
      filterType: filter.type,
      filterValue: filter.type == 'checkbox' ? filter['checkboxes'] || [] : '',
      search: ''
    })

    switch (filter.label) {
      case 'Task':
        console.log('task');
        break;
      case 'Client':
        console.log('client');
        this.getclientList(index);
        break;
      case 'Service':
        console.log('service');
        this.getRegularService(index);
        break;
      default:
        break;
    }
  }

  async getclientList(index) {
    const checkbox = [
      { id: 1, name: 'client 1' },
      { id: 2, name: 'client 2' },
      { id: 3, name: 'client 3' },
      { id: 4, name: 'client 4' },
    ];
    this.filterArr[index]['checkboxes'] = checkbox;
  }

  async getRegularService(index) {
    const checkbox = [
      { id: 1, name: 'service 1' },
      { id: 2, name: 'service 2' },
      { id: 3, name: 'service 3' },
      { id: 4, name: 'service 4' },
    ];
    this.filterArr[index]['checkboxes'] = checkbox;
  }

  selectAll(checked: boolean, index) {
    const value = checked ? [] : this.filterArr[index]['checkboxes'].map((item: any) => item.id);
    const currentFilter = (this.filterForm.get('filters') as FormArray).at(index);
    currentFilter.get('filterValue').setValue(value);
  }

  addFilter() {
    const notSelectedFilter = this.filterArr.find(filter=> !filter['isSelected']);
    if ((this.filterForm.get('filters') as FormArray).length < 3) {
      this.addFilterGroup(notSelectedFilter);
    }
  }

  removeFilter(index){
    const filter = (this.filterForm.get('filters') as FormArray).at(index).get('filterName');
    this.filterArr.find(item=>item.value === filter.value)["isSelected"] = false;
    (this.filterForm.get('filters') as FormArray).removeAt(index);
  }

  addFilterGroup(filter: any) {
    if(!filter.checkboxes)
    filter['isSelected'] = true;
    const filterGroup = this.formbuilder.group({
      filterName: filter.value || '',
      filterType: filter.type,
      filterValue: filter.type == 'checkbox' ? filter.checkboxes || [] : '',
      search: '',
      isCustomField: filter.isCustomField
    });
    this.setFilter(filterGroup,(this.filterForm.get('filters') as FormArray).length);
    (this.filterForm.get('filters') as FormArray).push(filterGroup);
  }

  async customFieldListing() {
    (() => {
      console.log('bbb',this.res.result);
      
        this.res.result.forEach((data:any)=>{
          console.log(data);
          if(data.field.is_used_for_filter){
            const filterObj:any={
              isCustomField: true,
              label:data.field.label,
              id:data.field.id,
              type:data.field.field_type,
              value:data.field.label
            }
            if(data.field.field_type=="checklist"){
              filterObj['checkboxes'] = data.optionDetails.map((val:any)=>{
                return {
                  id:val.id,
                  name:val.option
                }
              })
            }
            console.log(filterObj);
            this.filterArr.unshift(filterObj)
              }
        })
      })();
  }

  onSubmit(){
    const emitFilterData = {};
    console.log(this.filterForm.get('filters'));
    
    const filters = this.filterForm.get('filters').value;
    for(let filter of filters) {
      emitFilterData[filter.filterName] = filter.filterValue
    }
    console.log('final filters:',emitFilterData);
  }
}
