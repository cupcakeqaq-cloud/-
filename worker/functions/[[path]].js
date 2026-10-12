/* Cloudflare Pages 函数入口：所有 /api/gb/* 和 /gb/* 的请求都交给 worker/guestbook.mjs 处理。
   真正的逻辑全在 guestbook.mjs 里（那样本机 node 也能直接测），这里只做「接线」。 */
import { handleRequest } from '../guestbook.mjs';

export const onRequest = (ctx) => handleRequest(ctx.request, ctx.env);
