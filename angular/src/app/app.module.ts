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
    ReactiveFormsModule
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
