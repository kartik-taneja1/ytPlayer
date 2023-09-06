import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  buildQuery(data) {
    if (typeof (data) === 'string') { return data; }
    const query = [];
    for (const key in data) {
      if (data.hasOwnProperty(key) && encodeURIComponent(data[key])) {
        query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
      }
    }
    return "?" + query.join('&');
  }

  downloadLocalFile(url: string, fileName: string) {
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', fileName);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((key) => {
      formGroup.controls[key].markAsTouched();
      formGroup.controls[key].markAsDirty();
      const nestedFG = formGroup.controls[key] as FormGroup;
      if (nestedFG.controls) {
        this.markFormGroupTouched(nestedFG);
      }
    });
  }

  markFormGroupUnTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((key) => {
      formGroup.controls[key].markAsUntouched();
      formGroup.controls[key].markAsPristine();
    });
    formGroup.markAsPristine();
  }

  getRandomNumbers(from: number, to:number, n?:number){
    if(from>to) [from,to] = [to,from];
    const length = to - from;
    const allArray = Array.from({ length }, (_, i) => i + 1);
    
    // suffle array
    let currentIndex = allArray.length,  randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [allArray[currentIndex], allArray[randomIndex]] = [
        allArray[randomIndex], allArray[currentIndex]];
    }
    if(!n) return allArray[0];
    return allArray.slice(0,n);
  }
}
