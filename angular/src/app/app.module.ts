import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { ProfileComponent } from './profile/profile.component';
import { SongsViewComponent } from './songs-view/songs-view.component';
import { SongComponent } from './song/song.component';
import { PostsViewComponent } from './posts-view/posts-view.component';
import { PostComponent } from './post/post.component';
import { HttpClientModule } from '@angular/common/http';
import { NewSongComponent } from './new-song/new-song.component';


import {AuthComponent} from './auth/auth.component'; 

import {ModalModule} from './_modal'; 

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LayoutModule } from '@angular/cdk/layout';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { MatNativeDateModule, MatCardModule } from '@angular/material';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    ProfileComponent,
    SongsViewComponent,
    SongComponent,
    PostsViewComponent,
    PostComponent,
    NewSongComponent, 
    AuthComponent,
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    AppRoutingModule,
    
    ModalModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    LayoutModule,

    MatAutocompleteModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatCardModule,

    MatNativeDateModule
  ],
  exports: [
    //NgbModalBackdrop, 
  ], 
  entryComponents: [
    
  ], 
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
