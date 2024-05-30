import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SerialCodeComponent } from './serial-code/serial-code.component';
import { BarcodeScannerComponent } from './barcode-scanner/barcode-scanner.component';
import { AuthActivatorService } from './services/route-guards/auth-activator.service';
import { UserActivatorService } from './services/route-guards/user-activator.service';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [AuthActivatorService] },
  { path: 'signup', component: SignupComponent, canActivate: [AuthActivatorService] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [UserActivatorService] },
  { path: 'serial-code', component: SerialCodeComponent, canActivate: [UserActivatorService] },
  { path: 'barcode-scanner', component: BarcodeScannerComponent, canActivate: [UserActivatorService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
