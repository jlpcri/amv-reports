import {NgModule} from "@angular/core";
import {LogoutIcon} from "./logout";
import {LeftAngle} from "./left-angle";
import {RightAngle} from "./right-angle";
import {DoubleLeftAngle} from "./double-left-angle";
import {DoubleRightAngle} from "./double-right-angle";

@NgModule({
  exports: [
    LogoutIcon, LeftAngle, RightAngle, DoubleLeftAngle, DoubleRightAngle
  ],
  declarations: [
    LogoutIcon, LeftAngle, RightAngle, DoubleLeftAngle, DoubleRightAngle
  ]
})
export class IconsModule {}
