import { IAppContainer } from '../app-container';
import { redirect } from './redirect';

export type IRoutes = ReturnType<typeof routes_factory>

export const routes_factory = (app: IAppContainer) => ({
	redirect: redirect(app),
})
