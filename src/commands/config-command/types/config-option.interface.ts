import { ConfigOptionKey } from './config-option.type';

export interface IConfigOption {
	option: ConfigOptionKey;
	value: string | null;
}
