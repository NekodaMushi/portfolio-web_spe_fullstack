import { Ratelimit } from "@upstash/ratelimit";
import {redis} from './redis'

export const rateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(1, '15s'),
  prefix: '@upstash/ratelimit',
});


