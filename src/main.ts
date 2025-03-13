import { provideHttpClient, withFetch } from "@angular/common/http";
import { bootstrapApplication } from "@angular/platform-browser";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { provideRouter } from "@angular/router";
import { AppComponent } from "./app/app.component";
import routeConfig from "./app/routes";

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routeConfig),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
  ],
}).catch((err) => console.error(err));
