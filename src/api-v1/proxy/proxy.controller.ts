//import * as bcrypt from 'bcrypt';
import { Request, Response } from "express";
import { supabase, redisClient } from "../../helpers/client";
import axios from "axios";
import { uniqueKey } from "../../helpers/uniqueKey";

export default class ProxyController {
  public proxyData = async (req: Request, res: Response): Promise<any> => {
    try {
      let slug = req.params.slug;
      let { data } = await supabase
        .from("config")
        .select("original_url , cache_required , cache_time_in_mins")
        .eq("slug", slug);

      let { original_url, cache_required, cache_time_in_mins } = data[0];
      let params = req.originalUrl.replace(`/v1/proxy/${slug}`, "");
      let url = `${original_url}${params}`;
      let method = req.method;

      let response = await axios.request({
        method,
        url,
        params: req.query,
        data: JSON.stringify(req.body),
      });
      if (cache_required) {
        let key = await uniqueKey(req);
        await redisClient.set(key, JSON.stringify(response.data), {
          EX: cache_time_in_mins * 60, // cache time in seconds
        });
      }
      return res.status(200).json({
        message: "Success",
        data: JSON.parse(JSON.stringify(response.data)),
      });
    } catch (e) {
      // console.error(e);
      res.status(500).send({
        success: false,
        message: e.toString(),
      });
    }
  };
}
