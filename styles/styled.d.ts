// import original module declarations
import 'styled-components';
import { CSSProp } from 'styled-components';

// and extend them!
declare module 'styled-components' {
	export interface DefaultTheme {

	}
}

declare module 'react' {
	interface Attributes {
		css?: CSSProp | CSSObject;
	}
}
