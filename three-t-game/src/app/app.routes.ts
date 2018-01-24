import { AppComponent } from "./app.component";

export const ROUTES = [
    {
        path: '',
        component: AppComponent
    },
    {
        path: 'register',
        loadChildren: 'app/register/register.module#RegisterModule',
    },
    {
        path: 'board',
        loadChildren: 'app/board/board.module#BoardModule'
    }
]
