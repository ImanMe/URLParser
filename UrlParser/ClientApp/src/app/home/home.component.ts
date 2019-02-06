import { QueryObj } from "./../queryObj";
import { FormsModule } from "@angular/forms";
import { Component, OnInit, Query } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  isError: boolean = false;
  result: string;
  url: string = "";
  queryString: string;
  jsonResult: any;
  resultObj: any;
  validationMessage: string;
  isUrlValid: boolean = true;
  baseUrl: string;
  objectKeys = Object.keys;
  allTheKeys: string[];
  tableVisible: boolean = true;

  queryObj: QueryObj = new QueryObj();

  referenceObj: QueryObj = new QueryObj();

  refrenceKeys: string[];
  isInputDisable: boolean = false;
  ngOnInit() {}

  parseQuerystring() {
    var search = this.queryString.substring(0);
    var result = JSON.parse(
      '{"' +
        decodeURI(search)
          .replace(/"/g, '\\"')
          .replace(/&/g, '","')
          .replace(/=/g, '":"') +
        '"}'
    );
    //console.log(result);
    return result;
  }

  isValidURL() {
    var a = document.createElement("a");
    a.href = this.url;
    var result = a.host && a.host != window.location.host;
    //if (!result) this.isUrlValid = false;
    if (!result) {
      this.isInputDisable = true;
      this.isError = true;
    } else {
      this.isInputDisable = false;
      this.isError = false;
    }

    return result;
  }

  onParse() {
    //this.url = this.url.toLowerCase();
    if (!this.isValidURL()) {
      this.onClear();
      return;
    }
    if (!this.url) {
      this.onClear();
      return;
    }
    this.tableVisible = false;
    this.updateObjectFromUrl();
  }

  updateObjectFromUrl() {
    this.baseUrl = this.url.split("?")[0];
    this.queryString = this.url.split("?")[1];
    this.queryObj = this.parseQuerystring();
    this.allTheKeys = this.objectKeys(this.queryObj);
    this.refrenceKeys = this.objectKeys(this.referenceObj);
    console.log(this.queryObj);
  }

  updateUrlFromObject() {
    if (!this.isValidURL()) {
      this.onClear();
      return;
    }
    if (!this.url) {
      this.onClear();
      return;
    }
    var esc = encodeURIComponent;
    var queryString = Object.keys(this.queryObj)
      .map(k => esc(k) + "=" + esc(this.queryObj[k]))
      .join("&");
    var queryFromObject = this.baseUrl + "?" + queryString;
    this.url = queryFromObject;
  }

  onSave() {
    this.updateUrlFromObject();
  }

  onClear() {
    this.url = "";
    this.baseUrl = "";
    //this.queryObj = null;
    this.tableVisible = true;
  }
}
