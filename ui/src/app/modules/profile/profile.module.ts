import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileToolbarComponent } from './components/profile-toolbar/profile-toolbar.component';
import { MateialModule } from '@common/mateial/mateial.module';
import { ProfileService } from './services/profile.service';
@NgModule({
  declarations: [ProfileToolbarComponent],
  imports: [CommonModule, MateialModule],
  exports: [ProfileToolbarComponent],
  providers: [ProfileService],
})
export class ProfileModule {}
