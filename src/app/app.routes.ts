import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing/landing-page.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';

export const routes: Routes = [
    {path: '', component: LandingPageComponent},
    {path: 'privacy-policy', component: PrivacyPolicyComponent},
];
