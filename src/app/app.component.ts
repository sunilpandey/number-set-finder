import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SetGeneraterService } from './set-generator.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'numbersetsfinder';
  allNumberSet: number[][] = [];
  formGroup: FormGroup;
  noResultFound: boolean = false;
  constructor(private formBuilder: FormBuilder,
    private generatorService: SetGeneraterService) {
    this.formGroup = this.formBuilder.group({
      allNumbers: ["", Validators.compose([Validators.required, Validators.pattern(/([+-]?\d,\s?)+[+-]?\d$/)])],
      setSize: [2, Validators.compose([Validators.required, Validators.min(2)])],
      setSum: [0, Validators.compose([Validators.required])]
    });

    this.formGroup.valueChanges.subscribe(() => {
      this.noResultFound = false;
    })
  }

  public calculate() {
    const numbers = this.formGroup.controls.allNumbers.value.split(",").map((value: string) => +value);
    const size = this.formGroup.controls.setSize.value;
    const sum = this.formGroup.controls.setSum.value;
    this.allNumberSet = this.generatorService.findNumberSets(numbers, sum, size);
    if(!this.allNumberSet.length) {
      this.noResultFound = true;
    }
  }
}
