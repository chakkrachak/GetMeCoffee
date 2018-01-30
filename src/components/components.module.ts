import { NgModule } from '@angular/core';
import { PlacePickerModalComponent } from './place-picker-modal/place-picker-modal';
import { PlaceCardComponent } from './place-card/place-card';
@NgModule({
	declarations: [PlacePickerModalComponent,
    PlaceCardComponent],
	imports: [],
	exports: [PlacePickerModalComponent,
    PlaceCardComponent]
})
export class ComponentsModule {}
