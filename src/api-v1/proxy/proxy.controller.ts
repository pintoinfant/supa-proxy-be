//import * as bcrypt from 'bcrypt';
import { Request, Response } from "express";
import { supabase } from "../../utils/client";
import axios from "axios";

export default class ProxyController {
  public proxyData = async (req: Request, res: Response): Promise<any> => {
    try {
      let slug = req.params.slug;
      let { data } = await supabase
        .from("config")
        .select("original_url")
        .eq("slug", slug);

      let { original_url } = data[0];
      let params = req.originalUrl.replace(`/v1/proxy/${slug}`, "");
      let url = `${original_url}${params}`;
      let method = req.method;
     
      let response = await axios.request({
        method,
        url,
        params: req.query,
        data: JSON.stringify(req.body),
      });
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
