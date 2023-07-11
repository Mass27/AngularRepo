
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ResultAndError } from '@zxing/ngx-scanner/lib/ResultAndError';
import { Result } from '@zxing/library';
import {  ZXingScannerComponent } from "@zxing/ngx-scanner";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'scannQr';

@ViewChild('scanner')
scanner!:ZXingScannerComponent;


hasDevices!:boolean;
qrResultString!:string;
qrResult!:string;

availableDevices!:MediaDeviceInfo[];
currentDevice!:MediaDeviceInfo;


ngOnInit(): void {
this.scanner.camerasFound.subscribe((devices:MediaDeviceInfo[])=>{
this.hasDevices =true;
this.availableDevices =devices

for(const device of devices){
  if(/back|rear|environment/gi.test(device.label)){

    this.scanner.deviceChange(device)
    this.currentDevice = device
    break;
  }

}


})

}
}
