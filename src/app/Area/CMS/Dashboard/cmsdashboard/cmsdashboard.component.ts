import { Component } from '@angular/core';

@Component({
  selector: 'app-cmsdashboard',
  templateUrl: './cmsdashboard.component.html',
  styleUrls: ['./cmsdashboard.component.scss']
})
export class CmsdashboardComponent {
SelectOptionvalue:string='';
SelectOptionText:string='';
ngOnInit() {

}
onModelValueChange(value: any) {
  // Handle the change event here
  console.log('Model value changed:', value);
}
onModelValueChanges(option: { value: string, text: string }) {
  // Handle the change event here
  console.log('Model value changed:', option.value);
  console.log('Model text changed:', option.text);
}
}
