import { Container } from 'inversify';
import {BookRepository} from './Repository/app'

export const container = new Container();

container.bind(BookRepository).toSelf();