//import * as bcrypt from 'bcrypt';
import { Request, Response } from "express";
import { supabase } from "../../helpers/client";

export default class StatsController {
  public getMethodStats = async (req: Request, res: Response): Promise<any> => {
    let slug = req.originalUrl.split("/")[3];
    //postgrest group by method
    try {
      const { data, error } = await supabase.from("logs").select("*").eq("slug", slug);
      const methods = [...new Set(data.map(item => item.method))];
      const result = methods.map(method => {
        return {
          name: method,
          value: data.filter(item => item.method === method).length,
        }
      }).sort((a, b) => b.value - a.value);
      return res.status(200).json({
        message: "Success",
        data: result,
        // count
      });
    } catch (e) {
      // console.error(e);
      res.status(500).send({
        success: false,
        message: e.toString(),
      });
    }
  };

  public getPath = async (req: Request, res: Response): Promise<any> => {
    let slug = req.originalUrl.split("/")[3];
    try {
      const { data, error } = await supabase.from("logs").select("*").eq("slug", slug);
      const paths = [...new Set(data.map(item => item.path))];
      const result = paths.map(path => {
        return {
          path,
          count: data.filter(item => item.path === path).length,
        }
      }).sort((a, b) => b.count - a.count);
      let xAxis = []
      let yAxis = []
      result.map((item) => {
        xAxis.push(item.path)
        yAxis.push(item.count)
      })
      return res.status(200).json({
        message: "Success",
        data: {
          xAxis,
          yAxis
        },
        // count
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
