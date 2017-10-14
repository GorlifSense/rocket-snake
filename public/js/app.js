import _ from 'lodash';
import '../css/style.scss';
import * as winston from 'winston';

winston.info(_.join(['ok', 'I\'m on'], ', '));
