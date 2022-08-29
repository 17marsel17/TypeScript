import { Container } from 'inversify';
import {BookRepository} from '../TypeScript/app'

export const container = new Container();

container.bind(BookRepository).toSelf();