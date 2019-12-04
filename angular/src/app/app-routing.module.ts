import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SongComponent } from './song/song.component';
import { SongsViewComponent } from './songs-view/songs-view.component';
import { PostsViewComponent } from './posts-view/posts-view.component';
import { ProfileComponent } from './profile/profile.component';
import { NewSongComponent } from './new-song/new-song.component';



const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'songs/:songID', component: SongComponent},
  {path: 'songs', component: SongsViewComponent},
  {path: 'posts', component: PostsViewComponent},
  {path: 'profile/:userID', component: ProfileComponent},
  {path: 'new-song', component: NewSongComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
