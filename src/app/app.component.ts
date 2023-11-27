import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'comic-web-app';
  imageUrls: (string | ArrayBuffer | null)[] = [];
  constructor(private fb: FormBuilder, private dataService: DataService) {}
  form = this.fb.group({
    roles: this.fb.array([]),
  });
  get rolesFieldAsFormArray(): any {
    return this.form.get('roles') as FormArray;
  }
  role(): any {
    return this.fb.group({
      role: this.fb.control( null,[Validators.required]),
    });
  }
  addControl(): void {
    const rolesArray = this.form.get('roles') as FormArray;
    if(rolesArray.length>=10)return;
    this.rolesFieldAsFormArray.push(this.role());
  }
  remove(i: number): void {
    this.rolesFieldAsFormArray.removeAt(i);
  }


  fetchImage() {
    // console.log(this.form.value)
    const rolesArray = this.form.get('roles') as FormArray;
    // console.log(rolesArray.length);
    this.imageUrls = [];
    for (let i = 0; i < rolesArray.length; i++) {
      this.dataService.queryImage({ 'inputs': rolesArray.at(i).value.role }).subscribe(
        (imageBlob) => {
          console.log( rolesArray.at(i).value.role );
          console.log("adsfadsf");
          const reader = new FileReader();
          reader.onloadend = () => {
            this.imageUrls.push(reader.result);
          };
          //console.log(this.imagseUrl);
          reader.readAsDataURL(imageBlob);
          // Use the URL to display the image or perform other actions
        },
        (error) => {
          // Handle errors if any
        }
      );
    }
  }
}
