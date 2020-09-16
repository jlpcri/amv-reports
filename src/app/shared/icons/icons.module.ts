import {NgModule} from '@angular/core';
import {LogoutIcon} from './logout';
import {LeftAngle} from './left-angle';
import {RightAngle} from './right-angle';
import {DoubleLeftAngle} from './double-left-angle';
import {DoubleRightAngle} from './double-right-angle';
import {SortNone} from './sort-none';
import {SortAsc} from './sort-asc';
import {SortDesc} from './sort-desc';
import {SearchIcon} from './search';

@NgModule({
  exports: [
    LogoutIcon, LeftAngle, RightAngle, DoubleLeftAngle, DoubleRightAngle, SortNone, SortAsc, SortDesc, SearchIcon
  ],
  declarations: [
    LogoutIcon, LeftAngle, RightAngle, DoubleLeftAngle, DoubleRightAngle, SortNone, SortAsc, SortDesc, SearchIcon
  ]
})
export class IconsModule {}
