import { Component, OnInit, EventEmitter, Output, HostListener, ElementRef} from '@angular/core';

@Component({
  selector: 'search-component',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  showSearchInput: boolean;
  searchText: String = '';
  show = false;
  @Output() valueChange = new EventEmitter();

  constructor(private eRef: ElementRef) {}

  ngOnInit() {}

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (this.eRef.nativeElement.contains(event.target)) {
      this.showSearchInput = true;
    } else if (this.searchText == '') {
      this.showSearchInput = false;
    }
  }

  public clearSearch() {
    this.searchText = '';
    this.dataChanged(this.searchText);
  }

  public dataChanged(searchText) {   
      this.valueChange.emit(searchText);
  }

}
