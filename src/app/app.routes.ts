import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DynamicPermissionsComponent } from './dynamic-permissions/dynamic-permissions.component';
import { RoleManagementComponent } from './role-management/role-management.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { NavabarComponent } from './navbar/navbar.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { LoginComponent } from './login-page/login-page.component';
import { ThemeToggleComponent } from './theme-toggle/theme-toggle.component';

export const routes: Routes = [
  { path: 'dynamic-permissions', component: DynamicPermissionsComponent },
  { path: 'role-management', component: RoleManagementComponent },
  { path: 'user-management', component: UserManagementComponent },
  {path:'navbar',component:NavabarComponent},
  {path:'signup-page',component:SignupPageComponent},
  {path:'login-page',component:LoginComponent},
  {path:'theme-toggle',component:ThemeToggleComponent},
  { path: '', redirectTo: '/signup-page', pathMatch: 'full' }, // Default route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
