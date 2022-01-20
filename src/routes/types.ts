/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentType } from 'react';
import { RouteComponentProps, StaticContext } from 'react-router';

// ==========================================:
export interface IRouteItem {
	path: string;
	component:
		| ComponentType<any>
		| ComponentType<RouteComponentProps<any, StaticContext, unknown>>
		| undefined;
}
