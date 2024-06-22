import { Component, OnInit } from '@angular/core';
import { ISectionRequest } from 'src/app/Modules/CMS/section/Section';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit {
  departmentvalue: string = '';
  SelectOptionText: string = '';
  triggerApi: boolean = false;

  public courserequest: ISectionRequest = {
    departmentCode: ''
  };
  constructor() { }

  ngOnInit() {
  }
  onModelValueChanges(options: { value: string; text: string }) {
    // Handle the change event here
    this.SelectOptionText = options.value;
    console.log('Model value changed:', options.value);
    console.log('Model text changed:', options.text);
    this.courserequest.departmentCode = options.value;
    this.triggerApi = true;
  }
}
