import { Routes, RouterModule }         from '@angular/router';

// Layouts
import { FullLayoutComponent }          from './layouts/full-layout.component';
import { SimpleLayoutComponent }        from './layouts/simple-layout.component';

// Pages
import { p404Component }                from './pages/404.component';
import { p500Component }                from './pages/500.component';
import { LoginComponent }               from './pages/login.component';
import { RegisterComponent }            from './pages/register.component';

// Painel
import { PainelComponent }           from './painel/components/painel.component';

// Modulos
// Importe os modulos aqui, para definir suas rotas

const appRoutes: Routes = [
    // raiz da navegação
    {
        path: '',
        redirectTo: 'pages/login',
        pathMatch: 'full',
    },
    // navegação com menu
    {
        path: '',
        component: FullLayoutComponent,
        data: {
            title: 'Home'
        },
        // primeiro nivel da navegação com menu
        children: [
            { path: 'painel', component: PainelComponent, data: { title: 'Painel' } },

            // primeiro nivel com submenu
            // { path: 'receitas', redirectTo: 'receitas/consultar', pathMatch: 'full', },
            // { path: 'receitas', data: { title: 'Receitas' },
            //     children: [
            //         { path: 'consultar', component: ReceitasConsComponent, data: { title: 'Consultar' } },
            //         { path: 'cadastrar', component: ReceitasCadComponent, data: { title: 'Cadastrar' } },
            //         { path: 'cadastrar/:id', component: ReceitasCadComponent, data: { title: 'Alterar' } }
            //     ]
            // },

            // declaracao do componente
            // {
            //     path: 'processo',
            //     redirectTo: 'processo/consulta',
            //     pathMatch: 'full',
            // },
            // {
            //     path: 'processo',
            //     data: {
            //         title: 'Processo'
            //     },
            //     //navegação nas paginas do componente
            //     children: [
            //         {
            //             path: 'consultar',
            //             component: ProcessoConsComponent,
            //             data: {
            //                 title: 'Consulta'
            //             }
            //         },
            //         {
            //             path: 'visualizar',
            //             component: ProcessoVisComponent,
            //             data: {
            //                 title: 'Detalhes'
            //             }
            //         },
            //     ]
            // }
        ]
    },
    // navegação sem menu
    {
        path: 'pages',
        component: SimpleLayoutComponent,
        data: {
            title: 'Pages'
        },
        // paginas visualizadas sem o menu
        children: [
            {
                path: '404',
                component: p404Component,
                data: {
                    title: 'Page 404'
                }
            },
            {
                path: '500',
                component: p500Component,
                data: {
                    title: 'Page 500'
                }
            },
            {
                path: 'login',
                component: LoginComponent,
                data: {
                    title: 'Login Page'
                }
            },
            {
                path: 'register',
                component: RegisterComponent,
                data: {
                    title: 'Register Page'
                }
            }
        ]
    }
];

export const routing = RouterModule.forRoot(appRoutes);
